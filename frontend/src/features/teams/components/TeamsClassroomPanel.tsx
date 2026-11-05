'use client'

import { useCallback, useEffect, useState } from 'react'

import { useSearchParams } from 'next/navigation'

import { useAuth } from '@/providers/AuthProvider'
import {
  api,
  type TeamsStatus,
} from '@/lib/api'

export default function TeamsClassroomPanel() {
  const { user } = useAuth()
  const searchParams = useSearchParams()

  const [status, setStatus] = useState<TeamsStatus | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const loadStatus = useCallback(async () => {
    if (!user) return

    try {
      setLoading(true)
      setError('')

      const teamsStatus = await api.teamsStatus()

      setStatus(teamsStatus)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to load Microsoft Teams status.'
      )
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    loadStatus()
  }, [loadStatus])

  useEffect(() => {
    const teams = searchParams.get('teams')
    const message = searchParams.get('message')

    if (teams === 'connected') {
      setSuccess(
        'Microsoft Teams account connected successfully.'
      )
    }

    if (teams === 'error' && message) {
      setError(decodeURIComponent(message))
    }
  }, [searchParams])

  if (!user) return null

  async function handleConnect() {
    try {
      setError('')

      const { url } = await api.teamsConnect(
        `${window.location.origin}/dashboard/teacher/classes`
      )

      window.location.href = url
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to start Microsoft sign-in.'
      )
    }
  }

  async function handleDisconnect() {
    try {
      setError('')
      setSuccess('')

      await api.teamsDisconnect()

      setSuccess('Microsoft Teams disconnected.')

      await loadStatus()
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to disconnect Microsoft Teams.'
      )
    }
  }

  return (
    <div>
      {/* HEADER */}

      <div className="flex flex-col justify-between gap-6 md:flex-row md:items-start">
        <div>
          <div className="flex items-center gap-3">
            <span
              className={
                status?.connected
                  ? 'h-2 w-2 bg-emerald-500'
                  : 'h-2 w-2 bg-black/20'
              }
            />

            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-black/35">
              Microsoft / Teams
            </span>
          </div>

          <h3 className="mt-5 text-2xl font-bold tracking-[-0.04em]">
            {status?.connected
              ? 'Teams is connected.'
              : 'Connect Microsoft Teams.'}
          </h3>

          <p className="mt-3 max-w-xl text-sm leading-6 text-black/45">
            Connect your Microsoft account to let SkillX
            create Teams meetings for scheduled classrooms.
          </p>
        </div>

        {/* STATUS */}

        <div className="shrink-0 border border-black/10 px-4 py-3">
          <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-black/30">
            Connection
          </p>

          <p className="mt-2 text-sm font-bold">
            {loading
              ? 'Checking...'
              : status?.connected
                ? 'Connected'
                : 'Not connected'}
          </p>
        </div>
      </div>

      {/* SERVER CONFIGURATION */}

      {status && !status.serverConfigured && (
        <div className="mt-7 border border-amber-500/20 bg-amber-50 px-5 py-4">
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-amber-700">
            Backend configuration required
          </p>

          <p className="mt-2 text-sm leading-6 text-amber-800">
            Microsoft Teams is not configured on the SkillX
            backend. Add the Azure credentials to:
          </p>

          <code className="mt-3 block font-mono text-[11px] text-amber-900">
            backend/.env
          </code>
        </div>
      )}

      {/* ACCOUNT */}

      {status?.connected && (
        <div className="mt-7 border-y border-black/10 py-5">
          <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <p className="font-mono text-[8px] uppercase tracking-[0.15em] text-black/30">
                Microsoft account
              </p>

              <p className="mt-2 text-sm font-semibold">
                {status.accountName ||
                  status.accountEmail ||
                  'Connected account'}
              </p>
            </div>

            <span className="font-mono text-[9px] uppercase tracking-[0.14em] text-emerald-600">
              Active connection
            </span>
          </div>
        </div>
      )}

      {/* MESSAGES */}

      {error && (
        <div className="mt-6 border border-red-500/20 bg-red-50 px-5 py-4">
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-red-600">
            Teams error
          </p>

          <p className="mt-2 text-sm leading-6 text-red-700">
            {error}
          </p>
        </div>
      )}

      {success && (
        <div className="mt-6 border border-[#1746d1]/20 bg-[#1746d1]/5 px-5 py-4">
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#1746d1]">
            Teams update
          </p>

          <p className="mt-2 text-sm leading-6 text-black/60">
            {success}
          </p>
        </div>
      )}

      {/* ACTION */}

      <div className="mt-8 flex flex-col justify-between gap-5 border-t border-black/10 pt-6 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-semibold">
            {status?.connected
              ? 'Microsoft account connected'
              : 'No Microsoft account connected'}
          </p>

          <p className="mt-1 text-xs text-black/35">
            {status?.connected
              ? 'New Teams meetings can be created when scheduling a class.'
              : 'Connect your account before creating Teams meetings.'}
          </p>
        </div>

        {!status?.connected ? (
          <button
            type="button"
            onClick={handleConnect}
            disabled={
              loading ||
              !status?.serverConfigured
            }
            className="inline-flex shrink-0 items-center justify-center gap-4 border border-[#1746d1] bg-[#1746d1] px-6 py-4 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-white transition-colors hover:border-[#171717] hover:bg-[#171717] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Connect Microsoft Teams
            <span className="text-base">→</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleDisconnect}
            className="inline-flex shrink-0 items-center justify-center gap-4 border border-black/15 px-6 py-4 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-black/55 transition-colors hover:border-red-500 hover:text-red-600"
          >
            Disconnect
            <span className="text-base">×</span>
          </button>
        )}
      </div>

      {/* HOW IT WORKS */}

      <div className="mt-10 grid gap-px border border-black/10 bg-black/10 md:grid-cols-3">
        <Step
          number="01"
          title="Connect"
          description="Authorize your Microsoft account through SkillX."
        />

        <Step
          number="02"
          title="Schedule"
          description="Create a class from your teacher workspace."
        />

        <Step
          number="03"
          title="Meet"
          description="SkillX stores the Teams join link with your class."
        />
      </div>
    </div>
  )
}

function Step({
  number,
  title,
  description,
}: {
  number: string
  title: string
  description: string
}) {
  return (
    <div className="bg-[#f5f4ef] p-5">
      <span className="font-mono text-[9px] font-bold tracking-[0.15em] text-[#1746d1]">
        {number}
      </span>

      <h4 className="mt-4 text-sm font-bold">
        {title}
      </h4>

      <p className="mt-2 text-xs leading-5 text-black/40">
        {description}
      </p>
    </div>
  )
}