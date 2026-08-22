"use client"

import Link from 'next/link'
import { useEffect, useState } from 'react'
import storage from '../../../../lib/storage'

type PlatformType = 'video' | 'teams'

export default function StudentClassesPage() {
  const [sessions, setSessions] = useState<Array<any>>([])

  useEffect(() => {
    const saved = storage.getClasses()
    setSessions(saved)
  }, [])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">
          Upcoming Classes
        </h1>

        <p className="mt-2 text-slate-500">
          Classes scheduled by your instructors.
        </p>
      </div>

      <div className="space-y-4">
        {sessions.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
            No upcoming classes.
          </div>
        ) : (
          sessions.map((session) => (
            <div
              key={session.id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
            >
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  {session.title}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {new Date(session.startTime).toLocaleString()}
                </p>

                <div className="mt-3 flex gap-2">
                  <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                    {session.status.toUpperCase()}
                  </span>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-bold text-slate-700">
                    {session.platform === 'teams' ? 'MICROSOFT TEAMS' : 'VIDEO CALL'}
                  </span>
                </div>
              </div>

              {session.joinUrl?.startsWith('/') ? (
                <Link
                  href={session.joinUrl}
                  className="rounded-xl bg-black px-5 py-3 text-sm font-bold text-white hover:bg-slate-800"
                >
                  Join Class
                </Link>
              ) : (
                <a
                  href={session.joinUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-xl bg-black px-5 py-3 text-sm font-bold text-white hover:bg-slate-800"
                >
                  Join Class
                </a>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
