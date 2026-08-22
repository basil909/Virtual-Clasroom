'use client'

import { useEffect, useState } from 'react'
import { api, type ClassSession } from '../../lib/api'

export default function StudentTeamsSessions() {
  const [sessions, setSessions] = useState<ClassSession[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    api
      .listSessions()
      .then((res) => setSessions(res.sessions.filter((s) => s.joinUrl)))
      .catch((err) =>
        setError(err instanceof Error ? err.message : 'Could not load live sessions.')
      )
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return <p className="text-sm text-slate-500">Loading live sessions...</p>
  }

  if (error) {
    return (
      <p className="rounded-xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
        {error} — ensure the backend is running at {process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:4000'}
      </p>
    )
  }

  if (sessions.length === 0) {
    return <p className="text-sm text-slate-500">No live Teams sessions scheduled yet.</p>
  }

  return (
    <ul className="space-y-3">
      {sessions.map((session) => (
        <li
          key={session.id}
          className="flex flex-wrap items-center justify-between gap-3 rounded-xl bg-slate-50 px-4 py-3"
        >
          <div>
            <p className="font-medium text-slate-800">{session.title}</p>
            <p className="text-sm text-slate-500">
              {new Date(session.startTime).toLocaleString()}
            </p>
          </div>
          {session.joinUrl && (
            <a
              href={session.joinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg bg-[#5b5fc7] px-4 py-2 text-xs font-bold text-white hover:bg-[#4f52b2]"
            >
              Join in Teams
            </a>
          )}
        </li>
      ))}
    </ul>
  )
}
