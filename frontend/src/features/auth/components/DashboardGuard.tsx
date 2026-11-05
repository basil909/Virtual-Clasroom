'use client'

import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'

import { useAuth } from '@/providers/AuthProvider'
import { getDashboardPath } from '@/lib/routes'
import type { UserRole } from '@/types'

import DashboardSidebar from '@/features/dashboard/components/DashboardSidebar'

type DashboardGuardProps = {
  children: React.ReactNode
  allowedRole?: UserRole
}

export default function DashboardGuard({
  children,
  allowedRole,
}: DashboardGuardProps) {
  const { user, loading } = useAuth()

  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    if (loading) {
      return
    }

    if (!user) {
      const redirect = encodeURIComponent(pathname || '/dashboard')

      router.replace(`/login?redirect=${redirect}`)

      return
    }

    if (allowedRole && user.role !== allowedRole) {
      router.replace(getDashboardPath(user.role))
    }
  }, [
    user,
    loading,
    router,
    pathname,
    allowedRole,
  ])

  /* =========================================================
     AUTHENTICATION LOADING
  ========================================================= */

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f4ef] text-[#171717]">

        <div className="w-full max-w-xs px-6">

          <div className="flex items-center gap-3">

            <span className="h-2 w-2 animate-pulse bg-[#1746d1]" />

            <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-black/40">
              SkillX / Authentication
            </span>

          </div>

          <div className="mt-5 border-t border-black/10 pt-5">

            <p className="text-sm font-medium">
              Loading dashboard
              <span className="text-[#1746d1]">...</span>
            </p>

            <div className="mt-4 h-px w-full overflow-hidden bg-black/10">
              <div className="h-px w-1/3 animate-pulse bg-[#1746d1]" />
            </div>

          </div>

        </div>

      </div>
    )
  }


  /* =========================================================
     UNAUTHENTICATED
  ========================================================= */

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f4ef]">

        <div className="text-center">

          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/35">
            Redirecting
          </p>

          <p className="mt-3 text-sm font-medium text-black/50">
            Taking you to the sign in page...
          </p>

        </div>

      </div>
    )
  }


  /* =========================================================
     ROLE REDIRECT
  ========================================================= */

  if (allowedRole && user.role !== allowedRole) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f5f4ef]">

        <div className="text-center">

          <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[#1746d1]">
            Access redirect
          </p>

          <p className="mt-3 text-sm font-medium text-black/50">
            Opening your dashboard...
          </p>

        </div>

      </div>
    )
  }


  /* =========================================================
     DASHBOARD
  ========================================================= */

  return (
    <div className="flex min-h-screen min-w-0 flex-col bg-[#f5f4ef] text-[#171717] lg:flex-row">

      {/* SIDEBAR */}

      <DashboardSidebar />


      {/* MAIN CONTENT */}

      <main className="min-w-0 flex-1 overflow-x-hidden">

        <div className="min-h-screen p-5 md:p-7 lg:p-10">

          {children}

        </div>

      </main>

    </div>
  )
}