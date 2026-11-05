'use client'

import { useCallback, useEffect, useState } from 'react'
import { api, type Course } from '@/lib/api'

export default function StudentCoursesPage() {
  const [enrolled, setEnrolled] = useState<Course[]>([])
  const [catalog, setCatalog] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [busyId, setBusyId] = useState<string | null>(null)

  const load = useCallback(async () => {
    try {
      setError('')
      const [mine, all] = await Promise.all([api.myCourses(), api.courses()])
      setEnrolled(mine.courses)
      setCatalog(all.courses)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load courses.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  async function enroll(courseId: string) {
    try {
      setBusyId(courseId)
      setError('')
      await api.enroll(courseId)
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to enrol.')
    } finally {
      setBusyId(null)
    }
  }

  const enrolledIds = new Set(enrolled.map((c) => c.id))
  const available = catalog.filter((c) => !enrolledIds.has(c.id))

  return (
    <div>
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#1746d1]">
        Student workspace / Courses
      </p>
      <h1 className="mt-4 text-5xl font-bold tracking-[-0.06em]">My courses.</h1>
      <p className="mt-4 max-w-xl text-sm leading-6 text-black/50">
        Courses you are enrolled in, plus everything else you can join.
      </p>

      {error && (
        <div role="alert" className="mt-6 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="mt-10 border-t border-black/10">
        {loading ? (
          <p className="py-10 text-sm text-black/40">Loading…</p>
        ) : enrolled.length === 0 ? (
          <p className="py-10 text-sm text-black/40">
            You are not enrolled in any courses yet. Pick one below to get started.
          </p>
        ) : (
          enrolled.map((course) => (
            <article key={course.id} className="border-b border-black/10 py-6">
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#1746d1]">
                {course.level}
              </p>
              <h2 className="mt-2 text-lg font-bold tracking-[-0.02em]">{course.title}</h2>
              <p className="mt-1 text-sm text-black/45">{course.instructorName}</p>
              <div className="mt-4 h-1 overflow-hidden bg-black/10">
                <div className="h-full bg-[#1746d1]" style={{ width: `${course.progress ?? 0}%` }} />
              </div>
              <p className="mt-2 text-xs text-black/45">{course.progress ?? 0}% complete</p>
            </article>
          ))
        )}
      </div>

      {available.length > 0 && (
        <section className="mt-14">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">
            Available to join
          </p>
          <div className="mt-4 border-t border-black/10">
            {available.map((course) => (
              <article
                key={course.id}
                className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 py-6"
              >
                <div>
                  <h2 className="text-lg font-bold tracking-[-0.02em]">{course.title}</h2>
                  <p className="mt-1 text-sm text-black/45">
                    {course.instructorName} · {course.level} · {course.duration}
                  </p>
                </div>
                <button
                  onClick={() => enroll(course.id)}
                  disabled={busyId === course.id}
                  className="border border-[#171717] bg-[#171717] px-5 py-3 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:border-[#1746d1] hover:bg-[#1746d1] disabled:opacity-50"
                >
                  {busyId === course.id ? 'Enrolling…' : 'Enrol →'}
                </button>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
