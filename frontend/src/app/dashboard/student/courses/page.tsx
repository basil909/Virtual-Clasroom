'use client'

import { useEffect, useState } from 'react'
import { api, type Course } from '../../../../lib/api'

export default function StudentCoursesPage() {
  const [courses, setCourses] = useState<Course[]>([])

  useEffect(() => {
    api.myCourses().then((r) => setCourses(r.courses)).catch(() => {})
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-slate-900">My Courses</h1>
      <p className="mt-2 text-slate-500">Courses you are currently enrolled in.</p>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {courses.map((course) => (
          <article key={course.id} className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
            <p className="text-xs font-bold uppercase text-blue-600">{course.level}</p>
            <h2 className="mt-2 text-lg font-bold text-slate-900">{course.title}</h2>
            <p className="mt-2 text-sm text-slate-500">{course.instructorName}</p>
            <div className="mt-4 h-2 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-blue-600"
                style={{ width: `${course.progress ?? 0}%` }}
              />
            </div>
            <p className="mt-2 text-xs text-slate-500">{course.progress ?? 0}% complete</p>
          </article>
        ))}
      </div>
    </div>
  )
}
