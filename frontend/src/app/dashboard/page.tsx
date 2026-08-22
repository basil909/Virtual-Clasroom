'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../../context/AuthContext'
import { getDashboardPath } from '../../lib/routes'

export default function DashboardIndexPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (loading) return
    if (user) {
      router.replace(getDashboardPath(user.role))
    } else {
      router.replace('/login')
    }
  }, [user, loading, router])

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f7fb]">
      <p className="text-sm text-slate-500">Redirecting...</p>
    </div>
  )
}
