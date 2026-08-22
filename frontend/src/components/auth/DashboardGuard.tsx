'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '../../context/AuthContext'
import { getDashboardPath } from '../../lib/routes'
import type { UserRole } from '../../types'
import DashboardSidebar from '../dashboard/DashboardSidebar'

export default function DashboardGuard({
  children,
  allowedRole,
}: {
  children: React.ReactNode
  allowedRole?: UserRole
}) {
  const { user, loading } = useAuth()
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (loading) return
    if (!user) {
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`)
      return
    }
    if (allowedRole && user.role !== allowedRole) {
      router.replace(getDashboardPath(user.role))
    }
  }, [user, loading, router, pathname, allowedRole])

  if (loading || !user || (allowedRole && user.role !== allowedRole)) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f7fb]">
        <p className="text-sm font-medium text-slate-500">Loading dashboard...</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-[#f5f7fb]">
      <DashboardSidebar />
      <main className="flex-1 overflow-auto p-6 md:p-10">{children}</main>
    </div>
  )
}
