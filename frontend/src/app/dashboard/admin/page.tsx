 'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import StatCard from '../../../components/dashboard/StatCard'
import { api, type ClassSession, type Course } from '../../../lib/api'

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({ students: 0, teachers: 0, courses: 0, liveSessions: 0, recordings: 0 })
  const [courses, setCourses] = useState<Course[]>([])
  const [sessions, setSessions] = useState<ClassSession[]>([])

  useEffect(() => {
    Promise.all([api.adminStats(), api.adminCourses(), api.adminSessions()])
      .then(([statsRes, coursesRes, sessionsRes]) => {
        setStats(statsRes.stats)
        setCourses(coursesRes.courses)
        setSessions(sessionsRes.sessions)
      })
      .catch(() => {})
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-slate-900">Admin Overview</h1>
      <p className="mt-2 text-slate-500">Platform-wide metrics and activity at a glance.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Students" value={String(stats.students)} />
        <StatCard label="Teachers" value={String(stats.teachers)} />
        <StatCard label="Live Classes" value={String(stats.liveSessions)} />
        <StatCard label="Total Sessions" value={String(stats.recordings)} />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Active courses</h2>
          <ul className="mt-4 space-y-3">
            {courses.map((course) => (
              <li key={course.id} className="flex justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm">
                <span className="font-medium text-slate-800">{course.title}</span>
                <span className="text-slate-500">{course.studentCount} students</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Class sessions</h2>
          <ul className="mt-4 space-y-3">
            {sessions.map((session) => (
              <li key={session.id} className="flex justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm">
                <div>
                  <p className="font-medium text-slate-800">{session.title}</p>
                  <p className="text-slate-500">{new Date(session.startTime).toLocaleString()}</p>
                </div>
                {session.joinUrl && (
                  session.joinUrl.startsWith('/') ? (
                    <Link href={session.joinUrl} className="text-xs font-bold text-[#5b5fc7]">
                      Join
                    </Link>
                  ) : (
                    <a href={session.joinUrl} target="_blank" rel="noreferrer" className="text-xs font-bold text-[#5b5fc7]">
                      Teams
                    </a>
                  )
                )}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
