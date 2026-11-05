'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'

import { api } from '@/lib/api'
import { useAuth } from '@/providers/AuthProvider'
import type {
  Assignment,
  ClassSession,
  Course,
} from '@/lib/api'

function getSessionStatus(session: ClassSession) {
  const now = Date.now()
  const start = new Date(session.startTime).getTime()
  const end = new Date(session.endTime).getTime()

  if (Number.isNaN(start) || Number.isNaN(end)) {
    return session.status ?? 'scheduled'
  }

  if (now >= start && now <= end) {
    return 'live'
  }

  if (now > end) {
    return 'ended'
  }

  return 'scheduled'
}

function formatDate(value: string) {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return 'Unknown date'
  }

  return date.toLocaleDateString(undefined, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function formatTime(value: string) {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return '--:--'
  }

  return date.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatSessionDate(start: string, end: string) {
  return `${formatDate(start)} · ${formatTime(start)}–${formatTime(end)}`
}

function statusLabel(status: string) {
  switch (status) {
    case 'live':
      return 'LIVE'
    case 'ended':
      return 'COMPLETED'
    default:
      return 'UPCOMING'
  }
}

export default function TeacherDashboardPage() {
  const { user } = useAuth()

  const [courses, setCourses] = useState<Course[]>([])
  const [sessions, setSessions] = useState<ClassSession[]>([])
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!user) return

    let cancelled = false

    async function loadDashboard() {
      try {
        setLoading(true)
        setError('')

        const [coursesResponse, sessionsResponse, assignmentsResponse] =
          await Promise.all([
            api.instructorCourses(),
            api.listSessions(user.id),
            api.teacherAssignments(),
          ])

        if (cancelled) return

        setCourses(coursesResponse.courses)
        setSessions(sessionsResponse.sessions)
        setAssignments(assignmentsResponse.assignments)
      } catch (err) {
        if (cancelled) return

        setError(
          err instanceof Error
            ? err.message
            : 'Unable to load the teacher dashboard.'
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
  }, [user])

  const totalStudents = useMemo(
    () =>
      courses.reduce(
        (total, course) => total + (course.studentCount ?? 0),
        0
      ),
    [courses]
  )

  const pendingReviews = useMemo(
    () =>
      assignments.reduce(
        (total, assignment) =>
          total + (assignment.submissionCount ?? 0),
        0
      ),
    [assignments]
  )

  const liveSessions = useMemo(
    () =>
      sessions.filter(
        (session) => getSessionStatus(session) === 'live'
      ),
    [sessions]
  )

  const upcomingSessions = useMemo(
    () =>
      sessions
        .filter(
          (session) => getSessionStatus(session) === 'scheduled'
        )
        .sort(
          (a, b) =>
            new Date(a.startTime).getTime() -
            new Date(b.startTime).getTime()
        ),
    [sessions]
  )

  const completedSessions = useMemo(
    () =>
      sessions.filter(
        (session) => getSessionStatus(session) === 'ended'
      ),
    [sessions]
  )

  const nextSession = upcomingSessions[0]

  return (
    <div className="min-h-full bg-[#f5f4ef] text-[#171717]">
      {/* HEADER */}

      <header className="border-b border-black/10 pb-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 bg-[#1746d1]" />

              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-black/40">
                Teacher workspace / 01
              </span>
            </div>

            <h1 className="mt-6 max-w-4xl text-[clamp(3.5rem,7vw,7rem)] font-bold leading-[0.82] tracking-[-0.075em]">
              Welcome
              <br />
              <span className="text-[#1746d1]">
                {user?.name || 'Teacher'}.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-[15px] leading-7 text-black/50">
              Manage your courses, schedule live classrooms,
              and keep track of student work from one place.
            </p>
          </div>

          <div className="shrink-0">
            <Link
              href="/dashboard/teacher/classes"
              className="group inline-flex items-center gap-4 border border-[#171717] bg-[#171717] px-6 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#1746d1] hover:border-[#1746d1]"
            >
              Manage classes

              <span className="text-base transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>
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
            index="01"
            label="Courses"
            value={loading ? '—' : String(courses.length)}
            detail="Assigned to you"
          />

          <Metric
            index="02"
            label="Students"
            value={loading ? '—' : String(totalStudents)}
            detail="Across your courses"
          />

          <Metric
            index="03"
            label="Live now"
            value={loading ? '—' : String(liveSessions.length)}
            detail="Active classrooms"
          />

          <Metric
            index="04"
            label="Reviews"
            value={loading ? '—' : String(pendingReviews)}
            detail="Submissions awaiting review"
          />
        </div>
      </section>

      {/* MAIN GRID */}

      <div className="grid xl:grid-cols-[1.4fr_0.6fr]">
        {/* LEFT */}

        <section className="border-b border-black/10 py-10 xl:border-b-0 xl:border-r xl:pr-10">
          <div className="flex items-end justify-between gap-6">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-black/35">
                02 / Teaching
              </p>

              <h2 className="mt-3 text-3xl font-bold tracking-[-0.05em]">
                My courses
              </h2>
            </div>

            <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-black/35">
              {courses.length} total
            </span>
          </div>

          <div className="mt-8 divide-y divide-black/10 border-y border-black/10">
            {loading ? (
              <CourseLoading />
            ) : courses.length === 0 ? (
              <EmptyState
                title="No courses assigned"
                description="Courses assigned to your teacher account will appear here."
              />
            ) : (
              courses.map((course, index) => (
                <article
                  key={course.id}
                  className="group py-7 transition-colors hover:bg-black/[0.02]"
                >
                  <div className="grid gap-6 md:grid-cols-[56px_1fr_auto] md:items-center">
                    <span className="font-mono text-[11px] text-black/25">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <div>
                      <h3 className="text-xl font-bold tracking-[-0.035em]">
                        {course.title}
                      </h3>

                      <p className="mt-2 text-sm text-black/45">
                        {course.studentCount ?? 0} enrolled students
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-6 md:block md:text-right">
                      <span className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#1746d1]">
                        Active
                      </span>

                      <span className="ml-4 text-xl text-black/20 transition-[opacity,transform,color,background-color,border-color] group-hover:translate-x-1 group-hover:text-[#1746d1]">
                        →
                      </span>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>

        {/* RIGHT */}

        <aside className="py-10 xl:pl-10">
          {/* NEXT CLASS */}

          <section>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-black/35">
              03 / Next class
            </p>

            {nextSession ? (
              <div className="mt-5 border border-black/10 bg-white">
                <div className="border-b border-black/10 px-6 py-5">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#1746d1]">
                      Upcoming
                    </span>

                    <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-black/30">
                      {formatDate(nextSession.startTime)}
                    </span>
                  </div>

                  <h3 className="mt-5 text-2xl font-bold leading-tight tracking-[-0.045em]">
                    {nextSession.title}
                  </h3>

                  <p className="mt-3 text-sm text-black/45">
                    {formatTime(nextSession.startTime)} –{' '}
                    {formatTime(nextSession.endTime)}
                  </p>
                </div>

                <div className="flex items-center justify-between px-6 py-4">
                  <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-black/35">
                    {nextSession.joinUrl
                      ? 'Classroom ready'
                      : 'Classroom link pending'}
                  </span>

                  {nextSession.joinUrl && (
                    nextSession.joinUrl.startsWith('/') ? (
                      <Link
                        href={nextSession.joinUrl}
                        className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#1746d1] hover:text-[#171717]"
                      >
                        Join →
                      </Link>
                    ) : (
                      <a
                        href={nextSession.joinUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-[#1746d1] hover:text-[#171717]"
                      >
                        Join →
                      </a>
                    )
                  )}
                </div>
              </div>
            ) : (
              <div className="mt-5 border border-dashed border-black/15 px-6 py-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-black/35">
                  No upcoming classes
                </p>

                <Link
                  href="/dashboard/teacher/classes"
                  className="mt-5 inline-block text-sm font-bold text-[#1746d1]"
                >
                  Schedule a class →
                </Link>
              </div>
            )}
          </section>

          {/* SESSION LIST */}

          <section className="mt-12">
            <div className="flex items-end justify-between">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-black/35">
                  04 / Schedule
                </p>

                <h2 className="mt-3 text-2xl font-bold tracking-[-0.04em]">
                  Recent sessions
                </h2>
              </div>

              <Link
                href="/dashboard/teacher/classes"
                className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-[#1746d1]"
              >
                View all →
              </Link>
            </div>

            <div className="mt-5 divide-y divide-black/10 border-y border-black/10">
              {loading ? (
                <div className="py-8">
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-black/30">
                    Loading sessions...
                  </p>
                </div>
              ) : sessions.length === 0 ? (
                <div className="py-8">
                  <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-black/30">
                    No sessions yet.
                  </p>
                </div>
              ) : (
                sessions.slice(0, 5).map((session) => {
                  const status = getSessionStatus(session)

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
                            {formatSessionDate(
                              session.startTime,
                              session.endTime
                            )}
                          </p>
                        </div>

                        <span
                          className={
                            status === 'live'
                              ? 'shrink-0 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-red-600'
                              : status === 'ended'
                                ? 'shrink-0 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-black/30'
                                : 'shrink-0 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#1746d1]'
                          }
                        >
                          {statusLabel(status)}
                        </span>
                      </div>

                      {status === 'live' && session.joinUrl && (
                        <div className="mt-3">
                          {session.joinUrl.startsWith('/') ? (
                            <Link
                              href={session.joinUrl}
                              className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-[#1746d1]"
                            >
                              Enter classroom →
                            </Link>
                          ) : (
                            <a
                              href={session.joinUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-[#1746d1]"
                            >
                              Enter classroom →
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  )
                })
              )}
            </div>
          </section>
        </aside>
      </div>

      {/* ASSIGNMENTS */}

      <section className="border-t border-black/10 py-10">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-black/35">
              05 / Assessment
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-[-0.05em]">
              Assignment activity
            </h2>
          </div>

          <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-black/30">
            {assignments.length} assignments
          </span>
        </div>

        <div className="mt-7 grid gap-px border border-black/10 bg-black/10 md:grid-cols-3">
          <ActivityBlock
            label="Assignments"
            value={assignments.length}
            detail="Created for your courses"
          />

          <ActivityBlock
            label="Submissions"
            value={pendingReviews}
            detail="Student submissions"
          />

          <ActivityBlock
            label="Completed classes"
            value={completedSessions.length}
            detail="Sessions finished"
          />
        </div>
      </section>

      {/* FOOTER META */}

      <div className="border-t border-black/10 py-6">
        <div className="flex flex-col justify-between gap-3 font-mono text-[9px] uppercase tracking-[0.15em] text-black/25 sm:flex-row">
          <span>SkillX / Teacher workspace</span>
          <span>{user?.email || 'Teacher account'}</span>
        </div>
      </div>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* COMPONENTS                                                                 */
/* -------------------------------------------------------------------------- */

function Metric({
  index,
  label,
  value,
  detail,
}: {
  index: string
  label: string
  value: string
  detail: string
}) {
  return (
    <div className="border-r border-black/10 px-5 py-2 first:pl-0 last:border-r-0 lg:px-7">
      <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-black/25">
        {index}
      </p>

      <p className="mt-4 text-3xl font-bold tracking-[-0.06em] md:text-4xl">
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

function ActivityBlock({
  label,
  value,
  detail,
}: {
  label: string
  value: number
  detail: string
}) {
  return (
    <div className="bg-[#f5f4ef] p-6 md:p-8">
      <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-black/35">
        {label}
      </p>

      <p className="mt-5 text-4xl font-bold tracking-[-0.06em]">
        {value}
      </p>

      <p className="mt-2 text-sm text-black/40">
        {detail}
      </p>
    </div>
  )
}

function EmptyState({
  title,
  description,
}: {
  title: string
  description: string
}) {
  return (
    <div className="py-12">
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-black/30">
        Empty
      </p>

      <h3 className="mt-3 text-lg font-bold">
        {title}
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-black/40">
        {description}
      </p>
    </div>
  )
}

function CourseLoading() {
  return (
    <div className="py-10">
      <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-black/30">
        Loading courses...
      </p>
    </div>
  )
}