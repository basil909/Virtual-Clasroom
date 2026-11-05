'use client'

import { useEffect, useMemo, useState } from 'react'
import Link from 'next/link'

import { api } from '@/lib/api'
import { useAuth } from '@/providers/AuthProvider'
import type { ClassSession, Course } from '@/lib/api'

type Filter = 'all' | 'upcoming' | 'live' | 'completed'

function getStatus(session: ClassSession) {
  const now = Date.now()
  const start = new Date(session.startTime).getTime()
  const end = new Date(session.endTime).getTime()

  if (Number.isNaN(start) || Number.isNaN(end)) {
    return session.status ?? 'scheduled'
  }

  if (now >= start && now <= end) return 'live'
  if (now > end) return 'ended'

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

export default function StudentClassesPage() {
  const { user } = useAuth()

  const [sessions, setSessions] = useState<ClassSession[]>([])
  const [courses, setCourses] = useState<Course[]>([])

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const [filter, setFilter] = useState<Filter>('all')

  useEffect(() => {
    if (!user) return

    let cancelled = false

    async function loadClasses() {
      try {
        setLoading(true)
        setError('')

        /*
         * At the moment the backend session endpoint does not
         * have a studentId filter, so we retrieve the available
         * sessions and correlate course information locally.
         */
        const [sessionsResponse, coursesResponse] =
          await Promise.all([
            api.listSessions(),
            api.myCourses(),
          ])

        if (cancelled) return

        setSessions(sessionsResponse.sessions)
        setCourses(coursesResponse.courses)
      } catch (err) {
        if (cancelled) return

        setError(
          err instanceof Error
            ? err.message
            : 'Unable to load your classes.'
        )
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadClasses()

    return () => {
      cancelled = true
    }
  }, [user])

  const visibleSessions = useMemo(() => {
    return sessions
      .filter((session) => {
        const status = getStatus(session)

        if (filter === 'upcoming') {
          return status === 'scheduled'
        }

        if (filter === 'live') {
          return status === 'live'
        }

        if (filter === 'completed') {
          return status === 'ended'
        }

        return true
      })
      .sort(
        (a, b) =>
          new Date(a.startTime).getTime() -
          new Date(b.startTime).getTime()
      )
  }, [sessions, filter])

  const stats = useMemo(() => {
    let upcoming = 0
    let live = 0
    let completed = 0

    for (const session of sessions) {
      const status = getStatus(session)

      if (status === 'scheduled') upcoming++
      if (status === 'live') live++
      if (status === 'ended') completed++
    }

    return {
      total: sessions.length,
      upcoming,
      live,
      completed,
    }
  }, [sessions])

  function getCourseTitle(courseId: string | null) {
    if (!courseId) {
      return 'General classroom'
    }

    return (
      courses.find((course) => course.id === courseId)
        ?.title ?? 'Course classroom'
    )
  }

  return (
    <div className="min-h-full bg-[#f5f4ef] text-[#171717]">
      {/* HEADER */}

      <header className="border-b border-black/10 pb-8">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 bg-[#1746d1]" />

              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-black/40">
                Student workspace / Classes
              </span>
            </div>

            <h1 className="mt-6 text-[clamp(3.5rem,7vw,7rem)] font-bold leading-[0.82] tracking-[-0.075em]">
              Your
              <br />
              <span className="text-[#1746d1]">
                classroom.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-[15px] leading-7 text-black/50">
              Find your upcoming classes, join live sessions,
              and review previous classroom activity.
            </p>
          </div>

          <Link
            href="/dashboard/student"
            className="group inline-flex shrink-0 items-center gap-4 border border-[#171717] px-6 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.16em] transition-colors hover:bg-[#171717] hover:text-white"
          >
            Back to dashboard

            <span className="transition-transform group-hover:-translate-x-1">
              ←
            </span>
          </Link>
        </div>
      </header>

      {/* ERROR */}

      {error && (
        <div className="mt-6 border border-red-500/20 bg-red-50 px-5 py-4">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-red-600">
            Classroom error
          </p>

          <p className="mt-2 text-sm text-red-700">
            {error}
          </p>
        </div>
      )}

      {/* STATS */}

      <section className="border-b border-black/10 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          <Metric
            number="01"
            label="Total"
            value={loading ? '—' : stats.total}
          />

          <Metric
            number="02"
            label="Upcoming"
            value={loading ? '—' : stats.upcoming}
          />

          <Metric
            number="03"
            label="Live"
            value={loading ? '—' : stats.live}
          />

          <Metric
            number="04"
            label="Completed"
            value={loading ? '—' : stats.completed}
          />
        </div>
      </section>

      {/* SCHEDULE */}

      <section className="py-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-black/35">
              02 / Schedule
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-[-0.05em]">
              Class schedule
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            <FilterButton
              active={filter === 'all'}
              onClick={() => setFilter('all')}
            >
              All
            </FilterButton>

            <FilterButton
              active={filter === 'upcoming'}
              onClick={() => setFilter('upcoming')}
            >
              Upcoming
            </FilterButton>

            <FilterButton
              active={filter === 'live'}
              onClick={() => setFilter('live')}
            >
              Live
            </FilterButton>

            <FilterButton
              active={filter === 'completed'}
              onClick={() => setFilter('completed')}
            >
              Completed
            </FilterButton>
          </div>
        </div>

        <div className="mt-8 border-y border-black/10">
          {loading ? (
            <div className="py-16 text-center">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-black/30">
                Loading classrooms...
              </p>
            </div>
          ) : visibleSessions.length === 0 ? (
            <EmptyClasses />
          ) : (
            visibleSessions.map((session, index) => {
              const status = getStatus(session)

              return (
                <article
                  key={session.id}
                  className="group border-b border-black/10 py-7 last:border-b-0"
                >
                  <div className="grid gap-6 lg:grid-cols-[56px_1fr_220px_180px] lg:items-center">
                    {/* NUMBER */}

                    <span className="font-mono text-[10px] text-black/25">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    {/* CLASS */}

                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-xl font-bold tracking-[-0.035em]">
                          {session.title}
                        </h3>

                        <Status status={status} />
                      </div>

                      <p className="mt-2 text-sm text-black/40">
                        {getCourseTitle(session.courseId)}
                      </p>

                      {session.description && (
                        <p className="mt-3 max-w-xl text-sm leading-6 text-black/45">
                          {session.description}
                        </p>
                      )}
                    </div>

                    {/* TIME */}

                    <div className="lg:border-l lg:border-black/10 lg:pl-6">
                      <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-black/30">
                        Session
                      </p>

                      <p className="mt-2 text-sm font-semibold">
                        {formatDate(session.startTime)}
                      </p>

                      <p className="mt-1 text-xs text-black/40">
                        {formatTime(session.startTime)} –{' '}
                        {formatTime(session.endTime)}
                      </p>
                    </div>

                    {/* ACTION */}

                    <div className="flex items-center gap-5 lg:justify-end">
                      {session.joinUrl &&
                        status !== 'ended' && (
                          <JoinButton
                            href={session.joinUrl}
                          />
                        )}

                      {status === 'ended' && (
                        <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-black/25">
                          Session ended
                        </span>
                      )}
                    </div>
                  </div>
                </article>
              )
            })
          )}
        </div>
      </section>

      {/* INFO */}

      <section className="border-t border-black/10 py-10">
        <div className="grid gap-px border border-black/10 bg-black/10 md:grid-cols-3">
          <InfoBlock
            number="01"
            title="Upcoming"
            description="Classes that have been scheduled but have not started yet."
          />

          <InfoBlock
            number="02"
            title="Live"
            description="Classes currently running. Join when your instructor opens the classroom."
          />

          <InfoBlock
            number="03"
            title="Teams"
            description="Classes with a Microsoft Teams meeting link can open directly in Teams."
          />
        </div>
      </section>
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
}: {
  number: string
  label: string
  value: number | string
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
    </div>
  )
}

function FilterButton({
  active,
  children,
  onClick,
}: {
  active: boolean
  children: React.ReactNode
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={
        active
          ? 'border border-[#171717] bg-[#171717] px-4 py-2 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-white'
          : 'border border-black/10 px-4 py-2 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-black/40 transition-colors hover:border-black/30 hover:text-black'
      }
    >
      {children}
    </button>
  )
}

function Status({
  status,
}: {
  status: string
}) {
  if (status === 'live') {
    return (
      <span className="flex items-center gap-2 font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-red-600">
        <span className="h-1.5 w-1.5 bg-red-600" />
        Live
      </span>
    )
  }

  if (status === 'ended') {
    return (
      <span className="font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-black/25">
        Completed
      </span>
    )
  }

  return (
    <span className="font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-[#1746d1]">
      Upcoming
    </span>
  )
}

function JoinButton({
  href,
}: {
  href: string
}) {
  const isInternal = href.startsWith('/')

  const className =
    'inline-flex items-center gap-3 border border-[#1746d1] bg-[#1746d1] px-5 py-3 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:border-[#171717] hover:bg-[#171717]'

  if (isInternal) {
    return (
      <Link
        href={href}
        className={className}
      >
        Join class
        <span>→</span>
      </Link>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      Join class
      <span>↗</span>
    </a>
  )
}

function EmptyClasses() {
  return (
    <div className="py-16">
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-black/30">
        No classes
      </p>

      <h3 className="mt-4 text-2xl font-bold tracking-[-0.04em]">
        Nothing scheduled yet.
      </h3>

      <p className="mt-3 max-w-md text-sm leading-6 text-black/40">
        When your instructors schedule a classroom,
        it will appear here.
      </p>
    </div>
  )
}

function InfoBlock({
  number,
  title,
  description,
}: {
  number: string
  title: string
  description: string
}) {
  return (
    <div className="bg-[#f5f4ef] p-6 md:p-8">
      <span className="font-mono text-[9px] font-bold tracking-[0.15em] text-[#1746d1]">
        {number}
      </span>

      <h3 className="mt-5 text-lg font-bold">
        {title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-black/40">
        {description}
      </p>
    </div>
  )
}