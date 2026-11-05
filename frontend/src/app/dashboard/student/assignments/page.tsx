'use client'

import { useCallback, useEffect, useState } from 'react'
import { api, type Assignment } from '@/lib/api'

function formatDue(value: string) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return value
  return date.toLocaleDateString(undefined, { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function StudentAssignmentsPage() {
  const [assignments, setAssignments] = useState<Assignment[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [busyId, setBusyId] = useState<string | null>(null)

  const load = useCallback(async () => {
    try {
      setError('')
      const { assignments } = await api.myAssignments()
      setAssignments(assignments)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load assignments.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  async function submit(id: string) {
    try {
      setBusyId(id)
      setError('')
      await api.submitAssignment(id)
      await load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to submit assignment.')
    } finally {
      setBusyId(null)
    }
  }

  return (
    <div>
      <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#1746d1]">
        Student workspace / Assignments
      </p>
      <h1 className="mt-4 text-5xl font-bold tracking-[-0.06em]">Assignments.</h1>
      <p className="mt-4 max-w-xl text-sm leading-6 text-black/50">
        Track due dates and submit your work for the courses you are enrolled in.
      </p>

      {error && (
        <div role="alert" className="mt-6 border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="mt-10 border-t border-black/10">
        {loading ? (
          <p className="py-10 text-sm text-black/40">Loading…</p>
        ) : assignments.length === 0 ? (
          <p className="py-10 text-sm text-black/40">
            No assignments yet. Enrol in a course and your teacher&apos;s assignments will appear here.
          </p>
        ) : (
          assignments.map((item) => {
            const status = item.status ?? 'pending'
            return (
              <div
                key={item.id}
                className="flex flex-wrap items-center justify-between gap-4 border-b border-black/10 py-6"
              >
                <div className="min-w-0">
                  <h2 className="text-lg font-bold tracking-[-0.02em]">{item.title}</h2>
                  <p className="mt-1 text-sm text-black/45">
                    {item.courseTitle} · Due {formatDue(item.dueDate)}
                  </p>
                  {item.description && (
                    <p className="mt-2 max-w-xl text-sm text-black/55">{item.description}</p>
                  )}
                </div>

                <div className="flex items-center gap-4">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-black/45">
                    {status}
                    {item.grade ? ` · ${item.grade}` : ''}
                  </span>

                  {status === 'pending' && (
                    <button
                      onClick={() => submit(item.id)}
                      disabled={busyId === item.id}
                      className="border border-[#1746d1] bg-[#1746d1] px-5 py-3 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-white transition-colors hover:border-[#171717] hover:bg-[#171717] disabled:opacity-50"
                    >
                      {busyId === item.id ? 'Submitting…' : 'Mark submitted'}
                    </button>
                  )}
                </div>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
