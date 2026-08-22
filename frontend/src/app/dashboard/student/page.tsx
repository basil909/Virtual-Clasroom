'use client'

import { useEffect, useState } from 'react'
import StatCard from '../../../components/dashboard/StatCard'
import StudentTeamsSessions from '../../../components/teams/StudentTeamsSessions'
import { api, type Assignment, type Course } from '../../../lib/api'

export default function StudentDashboardPage() {
  const [courses, setCourses] = useState<Course[]>([])
  const [assignments, setAssignments] = useState<Assignment[]>([])

  useEffect(() => {
    Promise.all([api.myCourses(), api.myAssignments()])
      .then(([c, a]) => {
        setCourses(c.courses)
        setAssignments(a.assignments)
      })
      .catch(() => {})
  }, [])

  const pending = assignments.filter((a) => a.status === 'pending').length

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-slate-900">Student Overview</h1>
      <p className="mt-2 text-slate-500">Your courses, Teams classes, and assignments.</p>

      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <StatCard label="Enrolled Courses" value={String(courses.length)} />
        <StatCard label="Pending Assignments" value={String(pending)} />
        <StatCard label="Avg. Progress" value={`${courses.length ? Math.round(courses.reduce((s, c) => s + (c.progress ?? 0), 0) / courses.length) : 0}%`} />
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Live Teams classes</h2>
          <p className="mt-1 text-sm text-slate-500">Join scheduled sessions via Microsoft Teams.</p>
          <div className="mt-4">
            <StudentTeamsSessions />
          </div>
        </section>

        <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-bold text-slate-900">Assignments</h2>
          <ul className="mt-4 space-y-3">
            {assignments.map((item) => (
              <li key={item.id} className="rounded-xl bg-slate-50 px-4 py-3">
                <p className="font-medium text-slate-800">{item.title}</p>
                <p className="text-sm text-slate-500">
                  {item.courseTitle} · Due {item.dueDate}
                </p>
                <span className="mt-2 inline-block rounded-full bg-slate-200 px-2 py-0.5 text-xs font-bold capitalize text-slate-700">
                  {item.status ?? 'pending'}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  )
}
