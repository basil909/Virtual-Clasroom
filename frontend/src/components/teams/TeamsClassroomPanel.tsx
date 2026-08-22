'use client'

import { FormEvent, useCallback, useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { useAuth } from '../../context/AuthContext'
import { api, type ClassSession, type TeamsStatus } from '../../lib/api'
import Button from '../ui/Button'

function toLocalInputValue(date: Date) {
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`
}

export default function TeamsClassroomPanel() {
  const { user } = useAuth()
  const searchParams = useSearchParams()
  const [status, setStatus] = useState<TeamsStatus | null>(null)
  const [sessions, setSessions] = useState<ClassSession[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [startTime, setStartTime] = useState(() => toLocalInputValue(new Date()))
  const [endTime, setEndTime] = useState(() => {
    const end = new Date()
    end.setHours(end.getHours() + 1)
    return toLocalInputValue(end)
  })
  const [submitting, setSubmitting] = useState(false)

  const load = useCallback(async () => {
    if (!user) return
    setLoading(true)
    setError('')
    try {
      const [teamsStatus, sessionsRes] = await Promise.all([
        api.teamsStatus(user.id),
        api.listSessions(user.id),
      ])
      setStatus(teamsStatus)
      setSessions(sessionsRes.sessions)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load Teams data.')
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    load()
  }, [load])

  useEffect(() => {
    const teams = searchParams.get('teams')
    const message = searchParams.get('message')
    if (teams === 'connected') {
      setSuccess('Microsoft Teams account connected successfully.')
    } else if (teams === 'error' && message) {
      setError(decodeURIComponent(message))
    }
  }, [searchParams])

  if (!user) return null

  async function handleConnect() {
    const returnUrl = `${window.location.origin}/dashboard/teacher/classes`
    window.location.href = api.teamsLoginUrl(user!.id, returnUrl)
  }

  async function handleDisconnect() {
    try {
      await api.teamsDisconnect(user!.id)
      setSuccess('Microsoft Teams disconnected.')
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Disconnect failed.')
    }
  }

  async function handleCreateSession(e: FormEvent) {
    e.preventDefault()
    setSubmitting(true)
    setError('')
    setSuccess('')
    try {
      await api.createSession({
        title,
        description: description || undefined,
        teacherEmail: user!.email,
        startTime: new Date(startTime).toISOString(),
        endTime: new Date(endTime).toISOString(),
        createTeamsMeeting: true,
      })
      setSuccess('Class session created with Microsoft Teams meeting link.')
      setTitle('')
      setDescription('')
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create session.')
    } finally {
      setSubmitting(false)
    }
  }

  async function handleDeleteSession(id: string) {
    if (!confirm('Delete this session and its Teams meeting?')) return
    try {
      await api.deleteSession(id)
      setSuccess('Session deleted.')
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Delete failed.')
    }
  }

  return (
    <div className="space-y-8">
      {/* Teams connection */}
      <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Microsoft Teams</h2>
            <p className="mt-1 text-sm text-slate-500">
              Connect your Microsoft account to schedule Teams meetings for live classes.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">📹</span>
            <span
              className={`rounded-full px-3 py-1 text-xs font-bold ${
                status?.connected
                  ? 'bg-emerald-100 text-emerald-700'
                  : 'bg-slate-100 text-slate-600'
              }`}
            >
              {loading ? 'Checking...' : status?.connected ? 'Connected' : 'Not connected'}
            </span>
          </div>
        </div>

        {status && !status.serverConfigured && (
          <p className="mt-4 rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Backend Teams integration is not configured. Set Azure credentials in{' '}
            <code className="font-mono text-xs">backend/.env</code>.
          </p>
        )}

        {status?.connected && (
          <p className="mt-4 text-sm text-slate-600">
            Signed in as <strong>{status.accountName ?? status.accountEmail}</strong>
          </p>
        )}

        <div className="mt-4 flex flex-wrap gap-3">
          {!status?.connected ? (
            <Button onClick={handleConnect} disabled={!status?.serverConfigured}>
              Connect Microsoft Teams
            </Button>
          ) : (
            <Button variant="secondary" onClick={handleDisconnect}>
              Disconnect
            </Button>
          )}
        </div>
      </section>

      {error && (
        <p className="rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-600">{error}</p>
      )}
      {success && (
        <p className="rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          {success}
        </p>
      )}

      {/* Create session */}
      <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-bold text-slate-900">Schedule Teams class session</h2>
        <p className="mt-1 text-sm text-slate-500">
          Creates a virtual classroom session with an auto-generated Teams join link.
        </p>

        <form onSubmit={handleCreateSession} className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Session title</label>
            <input
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
              placeholder="React Hooks Live Class"
            />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm font-medium text-slate-700">Description (optional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={2}
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">Start</label>
            <input
              required
              type="datetime-local"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <div>
            <label className="text-sm font-medium text-slate-700">End</label>
            <input
              required
              type="datetime-local"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
              className="mt-1 w-full rounded-xl border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <div className="md:col-span-2">
            <Button type="submit" disabled={submitting || (!status?.connected && !status?.serverConfigured)}>
              {submitting ? 'Creating...' : 'Create session + Teams meeting'}
            </Button>
          </div>
        </form>
      </section>

      {/* Sessions list */}
      <section>
        <h2 className="text-lg font-bold text-slate-900">Your Teams sessions</h2>
        {loading ? (
          <p className="mt-4 text-sm text-slate-500">Loading sessions...</p>
        ) : sessions.length === 0 ? (
          <p className="mt-4 text-sm text-slate-500">No sessions yet. Schedule your first class above.</p>
        ) : (
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            {sessions.map((session) => (
              <article
                key={session.id}
                className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
              >
                <h3 className="font-bold text-slate-900">{session.title}</h3>
                {session.description && (
                  <p className="mt-1 text-sm text-slate-500">{session.description}</p>
                )}
                <p className="mt-2 text-xs text-slate-400">
                  {new Date(session.startTime).toLocaleString()} –{' '}
                  {new Date(session.endTime).toLocaleTimeString()}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {session.joinUrl && (
                    <a
                      href={session.joinUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-xl bg-[#5b5fc7] px-4 py-2 text-sm font-bold text-white hover:bg-[#4f52b2]"
                    >
                      Join in Teams
                    </a>
                  )}
                  <button
                    onClick={() => handleDeleteSession(session.id)}
                    className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-bold text-slate-600 hover:bg-slate-50"
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
