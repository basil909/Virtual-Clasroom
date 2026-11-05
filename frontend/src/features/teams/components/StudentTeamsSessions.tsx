'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'

import { api } from '@/lib/api'
import type { ClassSession } from '@/lib/api'

function getStatus(session: ClassSession) {
  const now = Date.now()
  const start = new Date(session.startTime).getTime()
  const end = new Date(session.endTime).getTime()

  if (Number.isNaN(start) || Number.isNaN(end)) {
    return session.status ?? 'scheduled'
  }

  if (now >= start && now <= end) return 'live'
  if (now > end) return 'ended'

  return 'scheduled'
}

export default function StudentTeamsSessions() {
  const [sessions, setSessions] = useState<ClassSession[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function loadSessions() {
      try {
        setLoading(true)
        setError('')

        const response = await api.listSessions()

        if (cancelled) return

        const relevant = response.sessions
          .filter((session) => Boolean(session.joinUrl))
          .filter((session) => {
            const status = getStatus(session)

            return (
              status === 'live' ||
              status === 'scheduled'
            )
          })
          .sort(
            (a, b) =>
              new Date(a.startTime).getTime() -
              new Date(b.startTime).getTime()
          )
          .slice(0, 3)

        setSessions(relevant)
      } catch (err) {
        if (cancelled) return

        setError(
          err instanceof Error
            ? err.message
            : 'Could not load classroom sessions.'
        )
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadSessions()

    return () => {
      cancelled = true
    }
  }, [])

  if (loading) {
    return (
      <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-black/30">
        Loading classrooms...
      </p>
    )
  }

  if (error) {
    return (
      <div className="border border-red-500/20 bg-red-50 px-4 py-4">
        <p className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-red-600">
          Classroom error
        </p>

        <p className="mt-2 text-sm text-red-700">
          {error}
        </p>
      </div>
    )
  }

  if (sessions.length === 0) {
    return (
      <div className="border border-dashed border-black/15 px-5 py-7">
        <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-black/30">
          No active classrooms
        </p>

        <p className="mt-2 text-sm leading-6 text-black/40">
          Upcoming classes with a classroom link will
          appear here.
        </p>
      </div>
    )
  }

  return (
    <div className="divide-y divide-black/10 border-y border-black/10">
      {sessions.map((session) => {
        const status = getStatus(session)

        return (
          <div
            key={session.id}
            className="py-5"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h3 className="truncate text-sm font-bold">
                  {session.title}
                </h3>

                <p className="mt-1 text-xs text-black/40">
                  {new Date(
                    session.startTime
                  ).toLocaleString()}
                </p>
              </div>

              {status === 'live' ? (
                <span className="flex shrink-0 items-center gap-2 font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-red-600">
                  <span className="h-1.5 w-1.5 bg-red-600" />
                  Live
                </span>
              ) : (
                <span className="shrink-0 font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-[#1746d1]">
                  Upcoming
                </span>
              )}
            </div>

            <div className="mt-4">
              {session.joinUrl?.startsWith('/') ? (
                <Link
                  href={session.joinUrl}
                  className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#1746d1] hover:text-[#171717]"
                >
                  Join classroom →
                </Link>
              ) : (
                <a
                  href={session.joinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#1746d1] hover:text-[#171717]"
                >
                  Join classroom ↗
                </a>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}