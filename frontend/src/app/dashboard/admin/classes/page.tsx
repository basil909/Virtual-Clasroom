'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState, type FormEvent } from 'react'

import { api } from '@/lib/api'
import type { ClassSession, Course, Teacher } from '@/lib/api'

type SessionFilter = 'all' | 'upcoming' | 'live' | 'completed'

const formatDate = (value: string) => {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return 'Invalid date'
  }

  return new Intl.DateTimeFormat('en-IN', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(date)
}

const formatTime = (value: string) => {
  const date = new Date(value)

  if (Number.isNaN(date.getTime())) {
    return '--:--'
  }

  return new Intl.DateTimeFormat('en-IN', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(date)
}

const getEffectiveStatus = (session: ClassSession) => {
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

const statusLabel = (status: string) => {
  switch (status) {
    case 'live':
      return 'Live now'
    case 'ended':
      return 'Completed'
    case 'scheduled':
    default:
      return 'Upcoming'
  }
}

const statusClass = (status: string) => {
  switch (status) {
    case 'live':
      return 'border-[#1746d1] bg-[#1746d1] text-white'
    case 'ended':
      return 'border-black/10 bg-black/[0.04] text-black/45'
    default:
      return 'border-black/10 bg-white text-black/60'
  }
}

export default function AdminClassesPage() {
  const [sessions, setSessions] = useState<ClassSession[]>([])
  const [teachers, setTeachers] = useState<Teacher[]>([])
  const [courses, setCourses] = useState<Course[]>([])

  const [loading, setLoading] = useState(true)
  const [creating, setCreating] = useState(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [teacherId, setTeacherId] = useState('')
  const [courseId, setCourseId] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [createTeamsMeeting, setCreateTeamsMeeting] = useState(false)

  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState<SessionFilter>('all')

  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const loadData = async () => {
    try {
      setLoading(true)
      setError('')

      const [sessionsResponse, teachersResponse, coursesResponse] =
        await Promise.all([
          api.listSessions(),
          api.teachers(),
          api.courses(),
        ])

      setSessions(sessionsResponse.sessions)
      setTeachers(teachersResponse.teachers)
      setCourses(coursesResponse.courses)
    } catch (err) {
      console.error('Failed to load classes:', err)

      setError(
        err instanceof Error
          ? err.message
          : 'Unable to load classes.',
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    void loadData()
  }, [])

  const stats = useMemo(() => {
    const upcoming = sessions.filter(
      (session) => getEffectiveStatus(session) === 'scheduled',
    ).length

    const live = sessions.filter(
      (session) => getEffectiveStatus(session) === 'live',
    ).length

    const completed = sessions.filter(
      (session) => getEffectiveStatus(session) === 'ended',
    ).length

    return {
      total: sessions.length,
      upcoming,
      live,
      completed,
    }
  }, [sessions])

  const filteredSessions = useMemo(() => {
    const query = search.trim().toLowerCase()

    return [...sessions]
      .sort(
        (a, b) =>
          new Date(a.startTime).getTime() -
          new Date(b.startTime).getTime(),
      )
      .filter((session) => {
        const status = getEffectiveStatus(session)

        if (filter === 'upcoming' && status !== 'scheduled') {
          return false
        }

        if (filter === 'live' && status !== 'live') {
          return false
        }

        if (filter === 'completed' && status !== 'ended') {
          return false
        }

        if (!query) {
          return true
        }

        return (
          session.title.toLowerCase().includes(query) ||
          session.description?.toLowerCase().includes(query) ||
          session.teacherEmail
            ?.toLowerCase()
            .includes(query)
        )
      })
  }, [sessions, search, filter])

  const resetForm = () => {
    setTitle('')
    setDescription('')
    setTeacherId('')
    setCourseId('')
    setStartTime('')
    setEndTime('')
    setCreateTeamsMeeting(false)
  }

  const createClass = async (
    event: FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()
  
    console.log('=== CREATE CLASS ===')
  
    setError('')
    setSuccess('')
  
    const cleanTitle = title.trim()
    const cleanDescription = description.trim()
  
    console.log('Title:', cleanTitle)
    console.log('Teacher:', teacherId)
    console.log('Course:', courseId)
    console.log('Start:', startTime)
    console.log('End:', endTime)
    console.log('Teams:', createTeamsMeeting)
  
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
      setError('The selected date and time is invalid.')
      return
    }
  
    if (end.getTime() <= start.getTime()) {
      setError('The end time must be after the start time.')
      return
    }
  
    const selectedTeacher = teachers.find(
      (teacher) => teacher.id === teacherId,
    )
  
    try {
      setCreating(true)
  
      console.log('Sending request to backend...')
  
      const response = await api.createSession({
        title: cleanTitle,
        description: cleanDescription || undefined,
        teacherId: selectedTeacher?.id,
        courseId: courseId || undefined,
        startTime: start.toISOString(),
        endTime: end.toISOString(),
        createTeamsMeeting,
      })
  
      console.log('Backend response:', response)
  
      setSessions((current) => [
        response.session,
        ...current,
      ])
  
      resetForm()
  
      setSuccess('Class scheduled successfully.')
  
      window.setTimeout(() => {
        setSuccess('')
      }, 3500)
    } catch (err) {
      console.error('CREATE CLASS ERROR:', err)
  
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to create the class.',
      )
    } finally {
      setCreating(false)
    }
  }

  const deleteClass = async (id: string) => {
    const confirmed = window.confirm(
      'Delete this class? This action cannot be undone.',
    )

    if (!confirmed) {
      return
    }

    try {
      setDeletingId(id)
      setError('')

      await api.deleteSession(id)

      setSessions((current) =>
        current.filter((session) => session.id !== id),
      )

      setSuccess('Class deleted.')

      window.setTimeout(() => {
        setSuccess('')
      }, 3000)
    } catch (err) {
      console.error('Failed to delete class:', err)

      setError(
        err instanceof Error
          ? err.message
          : 'Unable to delete the class.',
      )
    } finally {
      setDeletingId(null)
    }
  }

  const getTeacherName = (session: ClassSession) => {
    const teacher = teachers.find(
      (item) => item.id === session.teacherId,
    )

    return teacher?.name ?? session.teacherEmail ?? 'Unassigned'
  }

  const getCourseName = (session: ClassSession) => {
    const course = courses.find(
      (item) => item.id === session.courseId,
    )

    return course?.title ?? 'General classroom'
  }

  const getJoinUrl = (session: ClassSession) => {
    if (session.joinUrl) {
      return session.joinUrl
    }

    return `/video-room/${session.id}`
  }

  return (
    <main className="min-h-screen bg-[#f5f4ef] text-[#171717]">
      <div className="mx-auto max-w-[1280px] px-6 py-10 lg:px-10 lg:py-14">

        {/* ================================================= */}
        {/* HEADER */}
        {/* ================================================= */}

        <header className="border-b border-black/10 pb-10">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">

            <div>
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 bg-[#1746d1]" />

                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">
                  01 / Classroom
                </span>
              </div>

              <h1 className="mt-5 max-w-4xl text-[clamp(3.5rem,7vw,7rem)] font-bold leading-[0.82] tracking-[-0.075em]">
                Class
                <br />
                <span className="text-[#1746d1]">
                  management.
                </span>
              </h1>

              <p className="mt-7 max-w-2xl text-base leading-7 text-black/50">
                Schedule, manage and launch every SkillX
                learning session from one place.
              </p>
            </div>

            <Link
              href="/dashboard/admin"
              className="group flex w-fit items-center gap-3 border border-black/10 px-5 py-3 text-xs font-bold uppercase tracking-[0.12em] transition-colors hover:border-black/30 hover:bg-white"
            >
              <span>←</span>
              Back to dashboard
            </Link>
          </div>
        </header>

        {/* ================================================= */}
        {/* ERROR / SUCCESS */}
        {/* ================================================= */}

        {(error || success) && (
          <div
            className={`mt-6 border px-4 py-4 text-sm font-medium ${
              error
                ? 'border-red-200 bg-red-50 text-red-700'
                : 'border-[#1746d1]/20 bg-[#1746d1]/5 text-[#1746d1]'
            }`}
            role="status"
          >
            {error || success}
          </div>
        )}

        {/* ================================================= */}
        {/* STATS */}
        {/* ================================================= */}

        <section className="mt-10 grid border-y border-black/10 sm:grid-cols-4">
          <div className="border-b border-black/10 px-5 py-6 sm:border-b-0 sm:border-r">
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-black/35">
              Total
            </p>

            <p className="mt-3 text-4xl font-bold tracking-[-0.06em]">
              {stats.total}
            </p>
          </div>

          <div className="border-b border-black/10 px-5 py-6 sm:border-b-0 sm:border-r">
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-black/35">
              Upcoming
            </p>

            <p className="mt-3 text-4xl font-bold tracking-[-0.06em]">
              {stats.upcoming}
            </p>
          </div>

          <div className="border-b border-black/10 px-5 py-6 sm:border-b-0 sm:border-r">
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-black/35">
              Live
            </p>

            <div className="mt-3 flex items-center gap-3">
              <p className="text-4xl font-bold tracking-[-0.06em]">
                {stats.live}
              </p>

              <span
                className={`h-2 w-2 ${
                  stats.live > 0
                    ? 'animate-pulse bg-[#1746d1]'
                    : 'bg-black/15'
                }`}
              />
            </div>
          </div>

          <div className="px-5 py-6">
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-black/35">
              Completed
            </p>

            <p className="mt-3 text-4xl font-bold tracking-[-0.06em]">
              {stats.completed}
            </p>
          </div>
        </section>

        {/* ================================================= */}
        {/* CONTENT */}
        {/* ================================================= */}

        <div className="mt-12 grid gap-12 xl:grid-cols-[0.72fr_1.28fr]">

          {/* ================================================= */}
          {/* CREATE */}
          {/* ================================================= */}

          <section className="h-fit border border-black/10 bg-[#171717] p-7 text-white lg:p-8">

            <div>
              <div className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-white/35">
                02 / New session
              </div>

              <h2 className="mt-4 text-3xl font-bold tracking-[-0.055em]">
                Schedule a class.
              </h2>

              <p className="mt-3 text-sm leading-6 text-white/45">
                Create a live classroom and assign it to a
                teacher and course.
              </p>
            </div>

            <form
              onSubmit={createClass}
              className="mt-8 space-y-6"
            >

              {/* TITLE */}

              <div>
                <label
                  htmlFor="class-title"
                  className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-white/40"
                >
                  Class title
                </label>

                <input
                  id="class-title"
                  value={title}
                  onChange={(event) =>
                    setTitle(event.target.value)
                  }
                  placeholder="React Architecture"
                  className="mt-2 w-full border border-white/10 bg-white/[0.05] px-4 py-3.5 text-sm outline-none placeholder:text-white/20 focus:border-[#1746d1]"
                />
              </div>

              {/* DESCRIPTION */}

              <div>
                <label
                  htmlFor="class-description"
                  className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-white/40"
                >
                  Description
                </label>

                <textarea
                  id="class-description"
                  value={description}
                  onChange={(event) =>
                    setDescription(event.target.value)
                  }
                  placeholder="What will students learn?"
                  rows={3}
                  className="mt-2 w-full resize-none border border-white/10 bg-white/[0.05] px-4 py-3.5 text-sm outline-none placeholder:text-white/20 focus:border-[#1746d1]"
                />
              </div>

              {/* COURSE */}

              <div>
                <label
                  htmlFor="class-course"
                  className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-white/40"
                >
                  Course
                </label>

                <select
                  id="class-course"
                  value={courseId}
                  onChange={(event) =>
                    setCourseId(event.target.value)
                  }
                  className="mt-2 w-full border border-white/10 bg-[#171717] px-4 py-3.5 text-sm outline-none focus:border-[#1746d1]"
                >
                  <option value="">
                    General classroom
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
              </div>

              {/* TEACHER */}

              <div>
                <label
                  htmlFor="class-teacher"
                  className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-white/40"
                >
                  Teacher
                </label>

                <select
                  id="class-teacher"
                  value={teacherId}
                  onChange={(event) =>
                    setTeacherId(event.target.value)
                  }
                  className="mt-2 w-full border border-white/10 bg-[#171717] px-4 py-3.5 text-sm outline-none focus:border-[#1746d1]"
                >
                  <option value="">
                    Use current admin account
                  </option>

                  {teachers.map((teacher) => (
                    <option
                      key={teacher.id}
                      value={teacher.id}
                    >
                      {teacher.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* DATE */}

              <div>
                <label
                  htmlFor="class-start"
                  className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-white/40"
                >
                  Start
                </label>

                <input
                  id="class-start"
                  type="datetime-local"
                  value={startTime}
                  onChange={(event) =>
                    setStartTime(event.target.value)
                  }
                  className="mt-2 w-full border border-white/10 bg-white/[0.05] px-4 py-3.5 text-sm outline-none focus:border-[#1746d1]"
                />
              </div>

              {/* END */}

              <div>
                <label
                  htmlFor="class-end"
                  className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-white/40"
                >
                  End
                </label>

                <input
                  id="class-end"
                  type="datetime-local"
                  value={endTime}
                  onChange={(event) =>
                    setEndTime(event.target.value)
                  }
                  className="mt-2 w-full border border-white/10 bg-white/[0.05] px-4 py-3.5 text-sm outline-none focus:border-[#1746d1]"
                />
              </div>

              {/* TEAMS */}

              <label className="flex cursor-pointer items-start gap-4 border-t border-white/10 pt-5">
                <input
                  type="checkbox"
                  checked={createTeamsMeeting}
                  onChange={(event) =>
                    setCreateTeamsMeeting(
                      event.target.checked,
                    )
                  }
                  className="mt-1 h-4 w-4 accent-[#1746d1]"
                />

                <span>
                  <span className="block text-sm font-bold">
                    Create Microsoft Teams meeting
                  </span>

                  <span className="mt-1 block text-xs leading-5 text-white/40">
                    Requires Microsoft Teams to be
                    configured on the backend.
                  </span>
                </span>
              </label>

              {/* SUBMIT */}

              <button
                type="submit"
                disabled={creating || loading}
                className="group flex w-full items-center justify-between bg-[#1746d1] px-5 py-4 text-sm font-bold text-white transition-colors hover:bg-white hover:text-[#171717] disabled:cursor-not-allowed disabled:opacity-40"
              >
                <span>
                  {creating
                    ? 'Scheduling...'
                    : 'Schedule class'}
                </span>

                <span className="text-lg transition-transform group-hover:translate-x-1">
                  →
                </span>
              </button>
            </form>
          </section>

          {/* ================================================= */}
          {/* CLASS LIST */}
          {/* ================================================= */}

          <section>

            <div className="border-b border-black/10 pb-6">
              <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                <div>
                  <div className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-black/35">
                    03 / Schedule
                  </div>

                  <h2 className="mt-3 text-3xl font-bold tracking-[-0.055em]">
                    All classes.
                  </h2>
                </div>

                <input
                  type="search"
                  value={search}
                  onChange={(event) =>
                    setSearch(event.target.value)
                  }
                  placeholder="Search..."
                  className="w-full border border-black/10 bg-white px-4 py-3 text-sm outline-none placeholder:text-black/30 focus:border-[#1746d1] sm:w-56"
                />
              </div>

              {/* FILTERS */}

              <div className="mt-6 flex flex-wrap gap-2">
                {(
                  [
                    ['all', 'All'],
                    ['upcoming', 'Upcoming'],
                    ['live', 'Live'],
                    ['completed', 'Completed'],
                  ] as const
                ).map(([value, label]) => (
                  <button
                    key={value}
                    type="button"
                    onClick={() => setFilter(value)}
                    className={`border px-4 py-2 text-[10px] font-bold uppercase tracking-[0.12em] transition-colors ${
                      filter === value
                        ? 'border-[#171717] bg-[#171717] text-white'
                        : 'border-black/10 bg-transparent text-black/45 hover:border-black/30 hover:text-black'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* LOADING */}

            {loading ? (
              <div className="py-20 text-center">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/30">
                  Loading classes...
                </p>
              </div>
            ) : filteredSessions.length === 0 ? (
              <div className="border-b border-black/10 py-20">
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/30">
                  00 / No results
                </p>

                <h3 className="mt-4 text-3xl font-bold tracking-[-0.05em]">
                  Nothing scheduled.
                </h3>

                <p className="mt-3 max-w-md text-sm leading-6 text-black/45">
                  {sessions.length === 0
                    ? 'Create your first class using the scheduler.'
                    : 'Try another search or filter.'}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-black/10">
                {filteredSessions.map((session) => {
                  const status = getEffectiveStatus(session)
                  const joinUrl = getJoinUrl(session)
                  const internal =
                    joinUrl.startsWith('/')

                  return (
                    <article
                      key={session.id}
                      className="group py-7"
                    >
                      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                        {/* TIME */}

                        <div className="flex min-w-0 gap-6">
                          <div className="w-20 shrink-0">
                            <p className="font-mono text-xl font-bold tracking-[-0.04em]">
                              {formatTime(
                                session.startTime,
                              )}
                            </p>

                            <p className="mt-1 font-mono text-[8px] uppercase tracking-[0.15em] text-black/30">
                              {formatDate(
                                session.startTime,
                              )}
                            </p>
                          </div>

                          <div className="min-w-0 border-l border-black/10 pl-6">
                            <div className="flex flex-wrap items-center gap-2">
                              <span
                                className={`border px-2 py-1 text-[8px] font-bold uppercase tracking-[0.12em] ${statusClass(
                                  status,
                                )}`}
                              >
                                {statusLabel(status)}
                              </span>

                              {session.teamsMeetingId && (
                                <span className="border border-[#1746d1]/20 bg-[#1746d1]/5 px-2 py-1 font-mono text-[8px] font-bold uppercase tracking-[0.12em] text-[#1746d1]">
                                  Teams
                                </span>
                              )}
                            </div>

                            <h3 className="mt-3 truncate text-xl font-bold tracking-[-0.045em]">
                              {session.title}
                            </h3>

                            <p className="mt-1 text-sm text-black/45">
                              {getCourseName(session)}
                              {' · '}
                              {getTeacherName(session)}
                            </p>

                            {session.description && (
                              <p className="mt-3 max-w-xl text-sm leading-6 text-black/40">
                                {session.description}
                              </p>
                            )}
                          </div>
                        </div>

                        {/* ACTIONS */}

                        <div className="flex shrink-0 flex-wrap items-center gap-2 lg:justify-end">

                          {status === 'live' ||
                          status === 'scheduled' ? (
                            internal ? (
                              <Link
                                href={joinUrl}
                                className="bg-[#1746d1] px-5 py-3 text-xs font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#171717]"
                              >
                                {status === 'live'
                                  ? 'Join live →'
                                  : 'Open room →'}
                              </Link>
                            ) : (
                              <a
                                href={joinUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="bg-[#1746d1] px-5 py-3 text-xs font-bold uppercase tracking-[0.1em] text-white transition-colors hover:bg-[#171717]"
                              >
                                Open Teams →
                              </a>
                            )
                          ) : null}

                          <button
                            type="button"
                            onClick={() =>
                              deleteClass(session.id)
                            }
                            disabled={
                              deletingId === session.id
                            }
                            className="border border-black/10 px-4 py-3 text-xs font-bold uppercase tracking-[0.1em] text-black/40 transition-colors hover:border-red-200 hover:text-red-600 disabled:opacity-30"
                          >
                            {deletingId === session.id
                              ? 'Deleting'
                              : 'Delete'}
                          </button>
                        </div>
                      </div>
                    </article>
                  )
                })}
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  )
}