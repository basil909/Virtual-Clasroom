'use client'

import { FormEvent, useEffect, useMemo, useState } from 'react'
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

  return date.toLocaleDateString(undefined, {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

function formatTime(value: string) {
  const date = new Date(value)

  return date.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function TeacherClassesPage() {
  const { user } = useAuth()

  const [sessions, setSessions] = useState<ClassSession[]>([])
  const [courses, setCourses] = useState<Course[]>([])

  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const [filter, setFilter] = useState<Filter>('all')
  const [showCreateForm, setShowCreateForm] = useState(false)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [courseId, setCourseId] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [createTeamsMeeting, setCreateTeamsMeeting] = useState(false)

  useEffect(() => {
    if (!user) return

    let cancelled = false

    async function load() {
      try {
        setLoading(true)
        setError('')

        const [sessionsResponse, coursesResponse] =
          await Promise.all([
            api.listSessions(user.id),
            api.instructorCourses(),
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

    load()

    return () => {
      cancelled = true
    }
  }, [user])

  const visibleSessions = useMemo(() => {
    return sessions
      .filter((session) => {
        const status = getStatus(session)

        if (filter === 'upcoming') return status === 'scheduled'
        if (filter === 'live') return status === 'live'
        if (filter === 'completed') return status === 'ended'

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

  function resetForm() {
    setTitle('')
    setDescription('')
    setCourseId('')
    setStartTime('')
    setEndTime('')
    setCreateTeamsMeeting(false)
  }

  async function createClass(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setError('')
    setSuccess('')

    const cleanTitle = title.trim()
    const cleanDescription = description.trim()

    if (!cleanTitle) {
      setError('Enter a class title.')
      return
    }

    if (!startTime || !endTime) {
      setError('Choose both a start and end time.')
      return
    }

    const start = new Date(startTime)
    const end = new Date(endTime)

    if (
      Number.isNaN(start.getTime()) ||
      Number.isNaN(end.getTime())
    ) {
      setError('Enter valid class times.')
      return
    }

    if (start.getTime() <= Date.now()) {
      setError('The class must start in the future.')
      return
    }

    if (end.getTime() <= start.getTime()) {
      setError('The end time must be after the start time.')
      return
    }

    try {
      setCreating(true)

      const response = await api.createSession({
        title: cleanTitle,
        description: cleanDescription || undefined,
        teacherId: user?.id,
        courseId: courseId || undefined,
        startTime: start.toISOString(),
        endTime: end.toISOString(),
        createTeamsMeeting,
      })

      setSessions((current) => [
        response.session,
        ...current,
      ])

      resetForm()
      setShowCreateForm(false)

      setSuccess('Class scheduled successfully.')

      setTimeout(() => {
        setSuccess('')
      }, 4000)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to schedule the class.'
      )
    } finally {
      setCreating(false)
    }
  }

  async function deleteClass(id: string) {
    const confirmed = window.confirm(
      'Delete this class? This cannot be undone.'
    )

    if (!confirmed) return

    try {
      setError('')
      setSuccess('')

      await api.deleteSession(id)

      setSessions((current) =>
        current.filter((session) => session.id !== id)
      )

      setSuccess('Class deleted.')
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to delete the class.'
      )
    }
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
                Teacher workspace / Classes
              </span>
            </div>

            <h1 className="mt-6 text-[clamp(3.5rem,7vw,7rem)] font-bold leading-[0.82] tracking-[-0.075em]">
              My
              <br />
              <span className="text-[#1746d1]">
                classes.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-[15px] leading-7 text-black/50">
              Schedule live classrooms, manage upcoming
              sessions, and keep your teaching calendar
              organized.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              setShowCreateForm((value) => !value)
              setError('')
              setSuccess('')
            }}
            className="group inline-flex shrink-0 items-center justify-center gap-4 border border-[#171717] bg-[#171717] px-6 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:border-[#1746d1] hover:bg-[#1746d1]"
          >
            {showCreateForm
              ? 'Close scheduler'
              : 'Schedule class'}

            <span className="text-base">
              {showCreateForm ? '×' : '+'}
            </span>
          </button>
        </div>
      </header>

      {/* STATUS */}

      {error && (
        <div className="mt-6 border border-red-500/20 bg-red-50 px-5 py-4">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-red-600">
            Error
          </p>

          <p className="mt-2 text-sm text-red-700">
            {error}
          </p>
        </div>
      )}

      {success && (
        <div className="mt-6 border border-[#1746d1]/20 bg-[#1746d1]/5 px-5 py-4">
          <p className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[#1746d1]">
            Success
          </p>

          <p className="mt-2 text-sm text-black/60">
            {success}
          </p>
        </div>
      )}

      {/* CREATE FORM */}

      {showCreateForm && (
        <section className="border-b border-black/10 py-10">
          <div className="grid gap-10 lg:grid-cols-[0.4fr_1fr]">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-black/35">
                01 / New class
              </p>

              <h2 className="mt-4 text-3xl font-bold tracking-[-0.05em]">
                Schedule a classroom
              </h2>

              <p className="mt-4 max-w-sm text-sm leading-6 text-black/45">
                Create a session for one of your courses.
                The session will be stored in the SkillX
                classroom system.
              </p>
            </div>

            <form
              onSubmit={createClass}
              className="border border-black/10 bg-white p-6 md:p-8"
            >
              <div className="grid gap-6 md:grid-cols-2">
                <Field
                  label="Class title"
                  required
                  className="md:col-span-2"
                >
                  <input
                    value={title}
                    onChange={(event) =>
                      setTitle(event.target.value)
                    }
                    placeholder="e.g. React Components & State"
                    className="input"
                  />
                </Field>

                <Field
                  label="Course"
                  className="md:col-span-2"
                >
                  <select
                    value={courseId}
                    onChange={(event) =>
                      setCourseId(event.target.value)
                    }
                    className="input"
                  >
                    <option value="">
                      No course selected
                    </option>

                    {courses.map((course) => (
                      <option
                        key={course.id}
                        value={course.id}
                      >
                        {course.title}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field
                  label="Start"
                  required
                >
                  <input
                    type="datetime-local"
                    value={startTime}
                    onChange={(event) =>
                      setStartTime(event.target.value)
                    }
                    className="input"
                  />
                </Field>

                <Field
                  label="End"
                  required
                >
                  <input
                    type="datetime-local"
                    value={endTime}
                    onChange={(event) =>
                      setEndTime(event.target.value)
                    }
                    className="input"
                  />
                </Field>

                <Field
                  label="Description"
                  className="md:col-span-2"
                >
                  <textarea
                    value={description}
                    onChange={(event) =>
                      setDescription(event.target.value)
                    }
                    rows={4}
                    placeholder="What will students learn?"
                    className="input resize-none"
                  />
                </Field>
              </div>

              <div className="mt-7 flex flex-col justify-between gap-6 border-t border-black/10 pt-6 md:flex-row md:items-center">
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    checked={createTeamsMeeting}
                    onChange={(event) =>
                      setCreateTeamsMeeting(
                        event.target.checked
                      )
                    }
                    className="mt-0.5 h-4 w-4 accent-[#1746d1]"
                  />

                  <span>
                    <span className="block text-sm font-bold">
                      Create Microsoft Teams meeting
                    </span>

                    <span className="mt-1 block text-xs text-black/40">
                      Requires Microsoft Teams to be configured
                      on the backend.
                    </span>
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={creating}
                  className="border border-[#1746d1] bg-[#1746d1] px-6 py-4 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#171717] hover:border-[#171717] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {creating
                    ? 'Scheduling...'
                    : 'Create class →'}
                </button>
              </div>
            </form>
          </div>
        </section>
      )}

      {/* STATS */}

      <section className="border-b border-black/10 py-8">
        <div className="grid grid-cols-2 lg:grid-cols-4">
          <Stat
            number="01"
            label="Total"
            value={loading ? '—' : stats.total}
          />

          <Stat
            number="02"
            label="Upcoming"
            value={loading ? '—' : stats.upcoming}
          />

          <Stat
            number="03"
            label="Live"
            value={loading ? '—' : stats.live}
          />

          <Stat
            number="04"
            label="Completed"
            value={loading ? '—' : stats.completed}
          />
        </div>
      </section>

      {/* SESSION LIST */}

      <section className="py-10">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-black/35">
              02 / Schedule
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-[-0.05em]">
              Classroom schedule
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
                Loading classes...
              </p>
            </div>
          ) : visibleSessions.length === 0 ? (
            <div className="py-16">
              <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-black/30">
                No classes found
              </p>

              <h3 className="mt-4 text-2xl font-bold tracking-[-0.04em]">
                Nothing here yet.
              </h3>

              <p className="mt-2 max-w-md text-sm leading-6 text-black/40">
                Schedule your first classroom to start
                teaching through SkillX.
              </p>

              <button
                type="button"
                onClick={() => setShowCreateForm(true)}
                className="mt-6 font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[#1746d1]"
              >
                Schedule a class →
              </button>
            </div>
          ) : (
            visibleSessions.map((session, index) => {
              const status = getStatus(session)

              const course = courses.find(
                (item) => item.id === session.courseId
              )

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

                    {/* TITLE */}

                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-xl font-bold tracking-[-0.035em]">
                          {session.title}
                        </h3>

                        <Status status={status} />
                      </div>

                      <p className="mt-2 text-sm text-black/40">
                        {course?.title ||
                          'No course assigned'}
                      </p>

                      {session.description && (
                        <p className="mt-3 max-w-xl text-sm leading-6 text-black/45">
                          {session.description}
                        </p>
                      )}
                    </div>

                    {/* DATE */}

                    <div className="lg:border-l lg:border-black/10 lg:pl-6">
                      <p className="font-mono text-[9px] uppercase tracking-[0.14em] text-black/30">
                        Date
                      </p>

                      <p className="mt-2 text-sm font-semibold">
                        {formatDate(session.startTime)}
                      </p>

                      <p className="mt-1 text-xs text-black/40">
                        {formatTime(session.startTime)} –{' '}
                        {formatTime(session.endTime)}
                      </p>
                    </div>

                    {/* ACTIONS */}

                    <div className="flex flex-wrap items-center gap-4 lg:justify-end">
                      {session.joinUrl &&
                        status === 'live' && (
                          session.joinUrl.startsWith('/') ? (
                            <Link
                              href={session.joinUrl}
                              className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#1746d1] hover:text-[#171717]"
                            >
                              Join →
                            </Link>
                          ) : (
                            <a
                              href={session.joinUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-[#1746d1] hover:text-[#171717]"
                            >
                              Join →
                            </a>
                          )
                        )}

                      {status !== 'ended' && (
                        <button
                          type="button"
                          onClick={() =>
                            deleteClass(session.id)
                          }
                          className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-black/30 transition-colors hover:text-red-600"
                        >
                          Delete
                        </button>
                      )}
                    </div>
                  </div>
                </article>
              )
            })
          )}
        </div>
      </section>

      {/* TEAMS */}

      <section className="border-t border-black/10 py-10">
        <div className="grid gap-8 lg:grid-cols-[0.35fr_1fr]">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-black/35">
              03 / Integration
            </p>

            <h2 className="mt-3 text-3xl font-bold tracking-[-0.05em]">
              Microsoft Teams
            </h2>

            <p className="mt-4 max-w-sm text-sm leading-6 text-black/40">
              Connect your Microsoft account to create and
              manage Teams meetings from SkillX.
            </p>
          </div>

          <div className="border border-black/10 bg-white p-6 md:p-8">
            <TeamsStatus />
          </div>
        </div>
      </section>
    </div>
  )
}

/* -------------------------------------------------------------------------- */
/* COMPONENTS                                                                 */
/* -------------------------------------------------------------------------- */

function Stat({
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
          : 'border border-black/10 bg-transparent px-4 py-2 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-black/40 transition-colors hover:border-black/30 hover:text-black'
      }
    >
      {children}
    </button>
  )
}

function Status({ status }: { status: string }) {
  const live = status === 'live'
  const ended = status === 'ended'

  return (
    <span
      className={
        live
          ? 'font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-red-600'
          : ended
            ? 'font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-black/30'
            : 'font-mono text-[8px] font-bold uppercase tracking-[0.14em] text-[#1746d1]'
      }
    >
      {live
        ? 'Live'
        : ended
          ? 'Completed'
          : 'Upcoming'}
    </span>
  )
}

function Field({
  label,
  required,
  className = '',
  children,
}: {
  label: string
  required?: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <label className={`block ${className}`}>
      <span className="font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-black/40">
        {label}
        {required && (
          <span className="ml-1 text-[#1746d1]">*</span>
        )}
      </span>

      <div className="mt-2">
        {children}
      </div>
    </label>
  )
}

function TeamsStatus() {
  return (
    <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
      <div>
        <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-black/30">
          Microsoft Teams
        </p>

        <h3 className="mt-3 text-xl font-bold tracking-[-0.03em]">
          Integration status
        </h3>

        <p className="mt-2 max-w-lg text-sm leading-6 text-black/40">
          Teams meeting creation depends on Azure
          configuration in the backend.
        </p>
      </div>

      <div className="shrink-0 border border-black/10 px-4 py-3">
        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-black/35">
          Configuration required
        </span>
      </div>
    </div>
  )
}