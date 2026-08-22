"use client"

import Link from 'next/link'
import { useEffect, useState } from 'react'
import storage, { ClassSessionSchema } from '../../../../lib/storage'

type PlatformType = 'video' | 'teams'

type ClassSession = z.infer<typeof ClassSessionSchema>

import { z } from 'zod'

export default function AdminClassesPage() {
  const [sessions, setSessions] = useState<ClassSession[]>([])

  const [title, setTitle] = useState('')
  const [time, setTime] = useState('')
  const [platform, setPlatform] = useState<PlatformType>('video')

  const createClass = () => {
    if (!title || !time) return

    const newSession = {
      id: crypto.randomUUID(),
      title,
      startTime: time,
      status: 'scheduled',
      platform,
      joinUrl:
        platform === 'teams'
          ? 'https://teams.microsoft.com/l/meetup-join/YOUR_TEAMS_LINK'
          : `/video-room/${crypto.randomUUID()}`,
    }

    // persist via storage helper
    const next = storage.addClass(newSession as any)
    setSessions(next)

    setTitle('')
    setTime('')
    setPlatform('video')
  }

  // Load saved classes from localStorage on mount
  useEffect(() => {
    const saved = storage.getClasses()
    setSessions(saved)
  }, [])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900">
          Class Management
        </h1>

        <p className="mt-2 text-slate-500">
          Schedule and manage virtual classroom sessions.
        </p>
      </div>

      {/* CREATE CLASS CARD */}

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-bold text-slate-900">
          Create a Class
        </h2>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <input
            type="text"
            placeholder="Class Name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#5b5fc7]"
          />

          <input
            type="datetime-local"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#5b5fc7]"
          />

          <select
            value={platform}
            onChange={(e) =>
              setPlatform(e.target.value as PlatformType)
            }
            className="rounded-xl border border-slate-200 px-4 py-3 outline-none focus:border-[#5b5fc7]"
          >
            <option value="video">Built-in Video Call</option>
            <option value="teams">Microsoft Teams</option>
          </select>
        </div>

        <button
          onClick={createClass}
          className="mt-6 rounded-xl bg-[#5b5fc7] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#4f52b2]"
        >
          Create Session
        </button>
      </div>

      {/* SESSION LIST */}

      <div className="space-y-4">
        {sessions.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
            No classes created yet.
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
                    {session.platform === 'teams'
                      ? 'MICROSOFT TEAMS'
                      : 'VIDEO CALL'}
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
              {session.recordingUrl && (
                <a
                  href={session.recordingUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="ml-3 rounded-xl bg-red-500 px-5 py-3 text-sm font-bold text-white hover:bg-red-600"
                >
                  Watch Recording
                </a>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  )
}