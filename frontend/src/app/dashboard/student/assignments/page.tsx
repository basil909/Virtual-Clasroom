'use client'

import { useEffect, useState } from 'react'
import { api, type Assignment } from '../../../../lib/api'

export default function StudentAssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([])

  useEffect(() => {
    api.myAssignments().then((r) => setAssignments(r.assignments)).catch(() => {})
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-slate-900">My Assignments</h1>
      <p className="mt-2 text-slate-500">Track due dates and submission status.</p>

      <div className="mt-8 space-y-4">
        {assignments.map((item) => (
          <div
            key={item.id}
            className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm"
          >
            <div>
              <h2 className="font-bold text-slate-900">{item.title}</h2>
              <p className="mt-1 text-sm text-slate-500">
                {item.courseTitle} · Due {item.dueDate}
              </p>
            </div>
            <span className="rounded-full bg-slate-100 px-4 py-2 text-sm font-bold capitalize text-slate-700">
              {item.status ?? 'pending'}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
