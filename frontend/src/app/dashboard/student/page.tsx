'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'

import { api } from '@/lib/api'
import { useAuth } from '@/providers/AuthProvider'
import type { Assignment, Course } from '@/lib/api'

function formatDueDate(value: string) {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return value
  }

  return date.toLocaleDateString(undefined, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

export default function StudentDashboardPage() {
  const { user } = useAuth()

  const [courses, setCourses] = useState<Course[]>([])
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function loadDashboard() {
      try {
        setLoading(true)
        setError('')

        const [coursesResponse, assignmentsResponse] =
          await Promise.all([
            api.myCourses(),
            api.myAssignments(),
          ])

        if (cancelled) return

        setCourses(coursesResponse.courses)
        setAssignments(assignmentsResponse.assignments)
      } catch (err) {
        if (cancelled) return

        setError(
          err instanceof Error
            ? err.message
            : 'Unable to load your dashboard.'
        )
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadDashboard()

    return () => {
      cancelled = true
    }
  }, [])

  const pendingAssignments = useMemo(
    () =>
      assignments.filter(
        (assignment) =>
          assignment.status === 'pending'
      ),
    [assignments]
  )

  const averageProgress = useMemo(() => {
    if (!courses.length) return 0

    const total = courses.reduce(
      (sum, course) =>
        sum + (course.progress ?? 0),
      0
    )

    return Math.round(total / courses.length)
  }, [courses])

  const activeCourses = useMemo(
    () =>
      courses.filter(
        (course) => (course.progress ?? 0) < 100
      ),
    [courses]
  )

  return (
    <div className="min-h-full bg-[#f5f4ef] text-[#171717]">
      {/* HEADER */}

      <header className="border-b border-black/10 pb-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 bg-[#1746d1]" />

              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-black/40">
                Student workspace / 01
              </span>
            </div>

            <h1 className="mt-6 text-[clamp(3.5rem,7vw,7rem)] font-bold leading-[0.82] tracking-[-0.075em]">
              Keep
              <br />
              <span className="text-[#1746d1]">
                learning.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-[15px] leading-7 text-black/50">
              Welcome back{user?.name ? `, ${user.name}` : ''}.
              Your courses, upcoming classrooms, and
              assignments are all here.
            </p>
          </div>

          <Link
            href="/dashboard/student/classes"
            className="group inline-flex shrink-0 items-center justify-center gap-4 border border-[#171717] bg-[#171717] px-6 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:border-[#1746d1] hover:bg-[#1746d1]"
          >
            View classes

            <span className="text-base transition-transform duration-200 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </header>

      {/* ERROR */}

      {error && (
        <div className="mt-6 border border-red-500/20 bg-red-50 px-5 py-4">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-red-600">
            Dashboard error
          </p>

          <p className="mt-2 text-sm text-red-700">
            {error}
          </p>
        </div>
      )}

      {/* METRICS */}

      <section className="border-b border-black/10 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          <Metric
            number="01"
            label="Courses"
            value={
              loading ? '—' : String(courses.length)
            }
            detail="Currently enrolled"
          />

          <Metric
            number="02"
            label="Assignments"
            value={
              loading
                ? '—'
                : String(pendingAssignments.length)
            }
            detail="Pending work"
          />

          <Metric
            number="03"
            label="Progress"
            value={
              loading
                ? '—'
                : `${averageProgress}%`
            }
            detail="Average course progress"
          />

          <Metric
            number="04"
            label="Active"
            value={
              loading
                ? '—'
                : String(activeCourses.length)
            }
            detail="Courses in progress"
          />
        </div>
      </section>

      {/* MAIN */}

      <div className="grid xl:grid-cols-[1.35fr_0.65fr]">
        {/* COURSES */}

        <section className="border-b border-black/10 py-10 xl:border-b-0 xl:border-r xl:pr-10">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-black/35">
                02 / Learning
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-[-0.05em]">
                My courses
              </h2>
            </div>

            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-black/30">
              {courses.length} enrolled
            </span>
          </div>

          <div className="mt-8 divide-y divide-black/10 border-y border-black/10">
            {loading ? (
              <div className="py-12">
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-black/30">
                  Loading courses...
                </p>
              </div>
            ) : courses.length === 0 ? (
              <div className="py-12">
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-black/30">
                  No courses
                </p>

                <h3 className="mt-3 text-xl font-bold">
                  Your learning space is empty.
                </h3>

                <p className="mt-2 max-w-md text-sm leading-6 text-black/40">
                  Courses you enroll in will appear here.
                </p>
              </div>
            ) : (
              courses.map((course, index) => {
                const progress = Math.min(
                  100,
                  Math.max(0, course.progress ?? 0)
                )

                return (
                  <article
                    key={course.id}
                    className="group py-7"
                  >
                    <div className="grid gap-6 md:grid-cols-[56px_1fr_160px] md:items-center">
                      <span className="font-mono text-[10px] text-black/25">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <div>
                        <h3 className="text-xl font-bold tracking-[-0.035em]">
                          {course.title}
                        </h3>

                        <p className="mt-2 text-sm text-black/40">
                          {course.studentCount ?? 0}{' '}
                          students enrolled
                        </p>
                      </div>

                      <div>
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-black/30">
                            Progress
                          </span>

                          <span className="font-mono text-[10px] font-bold text-[#1746d1]">
                            {progress}%
                          </span>
                        </div>

                        <div className="mt-3 h-[2px] bg-black/10">
                          <div
                            className="h-full bg-[#1746d1] transition-[opacity,transform,color,background-color,border-color]"
                            style={{
                              width: `${progress}%`,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </article>
                )
              })
            )}
          </div>
        </section>

        {/* RIGHT */}

        <aside className="py-10 xl:pl-10">
          {/* CLASSES */}

          <section>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-black/35">
                  03 / Classroom
                </p>

                <h2 className="mt-3 text-2xl font-bold tracking-[-0.04em]">
                  Live learning
                </h2>
              </div>

              <Link
                href="/dashboard/student/classes"
                className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-[#1746d1]"
              >
                View all →
              </Link>
            </div>

            <div className="mt-5 border border-black/10 bg-white">
              <div className="border-b border-black/10 px-6 py-5">
                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 bg-[#1746d1]" />

                  <span className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-black/35">
                    Virtual classroom
                  </span>
                </div>

                <p className="mt-4 text-sm leading-6 text-black/45">
                  Join scheduled classes and live sessions
                  from your student classroom.
                </p>
              </div>

              <div className="px-6 py-5">
                <Link
                  href="/dashboard/student/classes"
                  className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[#1746d1]"
                >
                  Open classroom →
                </Link>
              </div>
            </div>
          </section>

          {/* ASSIGNMENTS */}

          <section className="mt-12">
            <div className="flex items-end justify-between">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-black/35">
                  04 / Assessment
                </p>

                <h2 className="mt-3 text-2xl font-bold tracking-[-0.04em]">
                  Assignments
                </h2>
              </div>

              <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-black/30">
                {assignments.length} total
              </span>
            </div>

            <div className="mt-5 divide-y divide-black/10 border-y border-black/10">
              {loading ? (
                <div className="py-8">
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-black/30">
                    Loading...
                  </p>
                </div>
              ) : assignments.length === 0 ? (
                <div className="py-8">
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-black/30">
                    No assignments yet.
                  </p>
                </div>
              ) : (
                assignments.slice(0, 5).map((assignment) => (
                  <article
                    key={assignment.id}
                    className="py-5"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h3 className="truncate text-sm font-bold">
                          {assignment.title}
                        </h3>

                        <p className="mt-1 text-xs text-black/40">
                          {assignment.courseTitle}
                        </p>
                      </div>

                      <Status status={assignment.status} />
                    </div>

                    <div className="mt-3 flex items-center justify-between gap-4">
                      <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-black/30">
                        Due {formatDueDate(assignment.dueDate)}
                      </span>

                      {assignment.status === 'pending' && (
                        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#1746d1]">
                          Action needed
                        </span>
                      )}
                    </div>
                  </article>
                ))
              )}
            </div>
          </section>
        </aside>
      </div>

      {/* FOOTER */}

      <div className="border-t border-black/10 py-6">
        <div className="flex flex-col justify-between gap-3 font-mono text-[9px] uppercase tracking-[0.15em] text-black/25 sm:flex-row">
          <span>SkillX / Student workspace</span>

          <span>
            {user?.email || 'Student account'}
          </span>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* COMPONENTS                                                                 */
/* -------------------------------------------------------------------------- */

function Metric({
  number,
  label,
  value,
  detail,
}: {
  number: string
  label: string
  value: string
  detail: string
}) {
  return (
    <div className="border-r border-black/10 px-5 first:pl-0 last:border-r-0 lg:px-7">
      <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-black/25">
        {number}
      </p>

      <p className="mt-4 text-4xl font-bold tracking-[-0.06em]">
        {value}
      </p>

      <p className="mt-1 text-sm font-semibold">
        {label}
      </p>

      <p className="mt-1 text-xs text-black/35">
        {detail}
      </p>
    </div>
  )
}

function Status({
  status,
}: {
  status?: string | null
}) {
  const normalized = status ?? 'pending'

  const className =
    normalized === 'completed'
      ? 'text-emerald-600'
      : normalized === 'submitted'
        ? 'text-[#1746d1]'
        : 'text-amber-600'

  return (
    <span
      className={`shrink-0 font-mono text-[8px] font-bold uppercase tracking-[0.14em] ${className}`}
    >
      {normalized}
    </span>
  )
}