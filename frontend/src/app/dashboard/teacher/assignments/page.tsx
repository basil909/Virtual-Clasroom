'use client'

import { FormEvent, useCallback, useEffect, useState } from 'react'
import { api, type Assignment, type Course } from '@/lib/api'

function formatDue(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })
}

const inputClass =
  'mt-2 block w-full border border-black/10 bg-[#fafafa] px-4 py-3 text-sm outline-none transition-colors focus:border-[#1746d1] focus:bg-white'

export default function TeacherAssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [creating, setCreating] = useState(false)

  const [courseId, setCourseId] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState('')

  const load = useCallback(async () => {
    try {
      setError('')
      const [a, c] = await Promise.all([api.teacherAssignments(), api.instructorCourses()])
      setAssignments(a.assignments)
      setCourses(c.courses)
      setCourseId((current) => current || c.courses[0]?.id || '')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load assignments.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  async function create(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setSuccess('')

    try {
      setCreating(true)
      await api.createAssignment({
        courseId,
        title: title.trim(),
        description: description.trim() || undefined,
        dueDate,
      })
      setTitle('')
      setDescription('')
      setDueDate('')
      setSuccess('Assignment created.')
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to create assignment.')
    } finally {
      setCreating(false)
    }
  }

  return (
    <div>
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#1746d1]">
        Teacher workspace / Assignments
      </p>
      <h1 className="mt-4 text-5xl font-bold tracking-[-0.06em]">Assignments.</h1>
      <p className="mt-4 max-w-xl text-sm leading-6 text-black/50">
        Create assignments for your courses and track how many students have submitted.
      </p>

      {error && (
        <div role="alert" className="mt-6 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}
      {success && (
        <div className="mt-6 border border-[#1746d1]/20 bg-[#1746d1]/5 px-4 py-3 text-sm text-black/60">
          {success}
        </div>
      )}

      <form onSubmit={create} className="mt-10 grid gap-5 border border-black/10 bg-white p-6 md:grid-cols-2">
        <div>
          <label htmlFor="a-course" className="text-xs font-bold text-black/60">Course</label>
          <select
            id="a-course"
            required
            value={courseId}
            onChange={(e) => setCourseId(e.target.value)}
            className={inputClass}
          >
            {courses.length === 0 && <option value="">No courses assigned to you</option>}
            {courses.map((course) => (
              <option key={course.id} value={course.id}>{course.title}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="a-due" className="text-xs font-bold text-black/60">Due date</label>
          <input
            id="a-due"
            type="date"
            required
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="a-title" className="text-xs font-bold text-black/60">Title</label>
          <input
            id="a-title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Build a todo app"
            className={inputClass}
          />
        </div>

        <div className="md:col-span-2">
          <label htmlFor="a-desc" className="text-xs font-bold text-black/60">Description</label>
          <textarea
            id="a-desc"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={inputClass}
          />
        </div>

        <div className="md:col-span-2">
          <button
            type="submit"
            disabled={creating || !courseId}
            className="border border-[#171717] bg-[#171717] px-6 py-4 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:border-[#1746d1] hover:bg-[#1746d1] disabled:opacity-40"
          >
            {creating ? 'Creating…' : 'Create assignment →'}
          </button>
        </div>
      </form>

      <div className="mt-10 border-t border-black/10">
        {loading ? (
          <p className="py-10 text-sm text-black/40">Loading…</p>
        ) : assignments.length === 0 ? (
          <p className="py-10 text-sm text-black/40">No assignments yet.</p>
        ) : (
          assignments.map((item) => (
            <div
              key={item.id}
              className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 py-6"
            >
              <div className="min-w-0">
                <h2 className="text-lg font-bold tracking-[-0.02em]">{item.title}</h2>
                <p className="mt-1 text-sm text-black/45">
                  {item.courseTitle} · Due {formatDue(item.dueDate)}
                </p>
              </div>
              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-black/45">
                {item.submissionCount ?? 0} submitted
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
