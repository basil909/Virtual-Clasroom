'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import StatCard from '../../../components/dashboard/StatCard'
import { useAuth } from '../../../context/AuthContext'

import {
  api,
  type Assignment,
  type ClassSession,
  type Course,
} from '../../../lib/api'

export default function TeacherDashboardPage() {
  const { user } = useAuth()

  const [courses, setCourses] = useState<Course[]>([])
  const [sessions, setSessions] = useState<ClassSession[]>([])
  const [assignments, setAssignments] = useState<Assignment[]>([])

  useEffect(() => {
    if (!user) return

    Promise.all([
      api.instructorCourses(),
      api.listSessions(user.id),
      api.teacherAssignments(),
    ])
      .then(([c, s, a]) => {
        setCourses(c.courses)
        setSessions(s.sessions)
        setAssignments(a.assignments)
      })
      .catch(() => {})
  }, [user])

  const totalStudents = courses.reduce(
    (sum, c) => sum + c.studentCount,
    0
  )

  const pendingGrades = assignments.reduce(
    (sum, a) => sum + (a.submissionCount ?? 0),
    0
  )

  return (
    <div className="space-y-8">
      {/* HERO SECTION */}

      <section className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#4f46e5] via-[#5b5fc7] to-[#312e81] p-8 text-white shadow-xl">
        <div className="absolute right-0 top-0 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

        <div className="relative z-10 flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          {/* LEFT */}

          <div className="max-w-2xl">
            <div className="flex items-center gap-4">
              <div className="relative h-20 w-20 overflow-hidden rounded-2xl border-4 border-white/20">
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400"
                  alt="Teacher"
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h1 className="text-4xl font-black">
                  Welcome back,
                </h1>

                <p className="mt-1 text-lg text-indigo-100">
                  {user?.name || 'Professor'}
                </p>
              </div>
            </div>

            <p className="mt-6 max-w-xl text-base leading-7 text-indigo-100">
              Manage virtual classrooms, monitor student
              engagement, conduct live sessions, and track
              assignment performance from one place.
            </p>

            {/* TEACHER INFO */}

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-md">
                Full Stack Development
              </span>

              <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-md">
                Data Structures
              </span>

              <span className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-md">
                AI & ML
              </span>
            </div>
          </div>

          {/* RIGHT */}

          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-md">
              <p className="text-sm text-indigo-100">
                Active Courses
              </p>

              <h2 className="mt-2 text-3xl font-black">
                {courses.length}
              </h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-md">
              <p className="text-sm text-indigo-100">
                Students
              </p>

              <h2 className="mt-2 text-3xl font-black">
                {totalStudents}
              </h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-md">
              <p className="text-sm text-indigo-100">
                Live Sessions
              </p>

              <h2 className="mt-2 text-3xl font-black">
                {sessions.length}
              </h2>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/10 p-5 backdrop-blur-md">
              <p className="text-sm text-indigo-100">
                Pending Reviews
              </p>

              <h2 className="mt-2 text-3xl font-black">
                {pendingGrades}
              </h2>
            </div>
          </div>
        </div>
      </section>

      {/* STATS */}

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          label="My Students"
          value={String(totalStudents)}
          hint={`${courses.length} active courses`}
        />

        <StatCard
          label="Teams Sessions"
          value={String(sessions.length)}
          hint="Virtual classroom sessions"
        />

        <StatCard
          label="Assignment Reviews"
          value={String(pendingGrades)}
          hint="Awaiting grading"
        />
      </div>

      {/* MAIN CONTENT */}

      <div className="grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        {/* COURSES */}

        <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                My Courses
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Courses currently assigned to you
              </p>
            </div>

            <button className="rounded-xl bg-[#5b5fc7] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#4f52b2]">
              + Add Course
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {courses.map((course) => (
              <div
                key={course.id}
                className="group rounded-2xl border border-slate-100 bg-slate-50 p-5 transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900">
                      {course.title}
                    </h3>

                    <p className="mt-2 text-sm text-slate-500">
                      {course.studentCount} enrolled students
                    </p>
                  </div>

                  <div className="rounded-xl bg-indigo-100 px-3 py-1 text-xs font-bold text-indigo-700">
                    ACTIVE
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-9 w-9 rounded-full border-2 border-white bg-slate-300"
                      />
                    ))}
                  </div>

                  <button className="text-sm font-bold text-[#5b5fc7] transition hover:text-[#4f52b2]">
                    Open →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* RIGHT SIDEBAR */}

        <div className="space-y-6">
          {/* LIVE SESSIONS */}

          <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Upcoming Sessions
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Manage live classrooms
                </p>
              </div>

              <Link
                href="/dashboard/teacher/classes"
                className="text-sm font-bold text-[#5b5fc7]"
              >
                Manage →
              </Link>
            </div>

            <div className="mt-5 space-y-4">
              {sessions.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-slate-300 p-8 text-center text-sm text-slate-500">
                  No live sessions scheduled yet.
                </div>
              ) : (
                sessions.slice(0, 4).map((session) => (
                  <div
                    key={session.id}
                    className="rounded-2xl bg-slate-50 p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-bold text-slate-900">
                          {session.title}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          {new Date(
                            session.startTime
                          ).toLocaleString()}
                        </p>
                      </div>

                      <div className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">
                        LIVE
                      </div>
                    </div>

                    <div className="mt-4 flex gap-2">
                      {session.joinUrl && (
                        session.joinUrl.startsWith('/') ? (
                          <Link href={session.joinUrl} className="rounded-xl bg-[#5b5fc7] px-4 py-2 text-xs font-bold text-white">
                            Join Session
                          </Link>
                        ) : (
                          <a href={session.joinUrl} target="_blank" rel="noreferrer" className="rounded-xl bg-[#5b5fc7] px-4 py-2 text-xs font-bold text-white">
                            Join Session
                          </a>
                        )
                      )}

                      <button className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-700">
                        View Details
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* TEACHER PROFILE */}

          <section className="rounded-3xl border border-slate-100 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-slate-900">
              Teacher Profile
            </h2>

            <div className="mt-5 flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400"
                  alt="Teacher"
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <h3 className="font-bold text-slate-900">
                  {user?.name || 'Professor'}
                </h3>

                <p className="text-sm text-slate-500">
                  Senior Instructor
                </p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Expertise
                </p>

                <p className="mt-1 text-sm text-slate-700">
                  Web Development, AI, System Design
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Experience
                </p>

                <p className="mt-1 text-sm text-slate-700">
                  8+ years teaching experience
                </p>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                  Availability
                </p>

                <p className="mt-1 text-sm text-emerald-600">
                  Available for mentoring
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}