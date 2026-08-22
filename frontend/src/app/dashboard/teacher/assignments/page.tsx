'use client'

import { useEffect, useState } from 'react'
import { api, type Assignment } from '../../../../lib/api'

export default function TeacherAssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([])

  useEffect(() => {
    api.teacherAssignments().then((r) => setAssignments(r.assignments)).catch(() => {})
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-slate-900">Assignments</h1>
      <p className="mt-2 text-slate-500">Review student submissions across your courses.</p>

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
            <span className="rounded-full bg-amber-50 px-4 py-2 text-sm font-bold text-amber-700">
              {item.submissionCount ?? 0} submissions
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}
