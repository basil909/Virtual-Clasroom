'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

import { ArrowUpRight, LogOut } from 'lucide-react'

import { cn } from '@/lib/utils'
import { useAuth } from '@/providers/AuthProvider'

import type { UserRole } from '@/types'

const navByRole: Record<
  UserRole,
  Array<{
    href: string
    label: string
  }>
> = {
  admin: [
    {
      href: '/dashboard/admin',
      label: 'Overview',
    },
    {
      href: '/dashboard/admin/users',
      label: 'Users',
    },
    {
      href: '/dashboard/admin/classes',
      label: 'Classes',
    },
  ],

  teacher: [
    {
      href: '/dashboard/teacher',
      label: 'Overview',
    },
    {
      href: '/dashboard/teacher/classes',
      label: 'My Classes',
    },
    {
      href: '/dashboard/teacher/assignments',
      label: 'Assignments',
    },
  ],

  student: [
    {
      href: '/dashboard/student',
      label: 'Overview',
    },
    {
      href: '/dashboard/student/courses',
      label: 'My Courses',
    },
    {
      href: '/dashboard/student/assignments',
      label: 'Assignments',
    },
  ],
}

export default function DashboardSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const { user, logout } = useAuth()

  function handleLogout() {
    logout()
    router.push('/')
  }

  if (!user) {
    return null
  }

  const links = navByRole[user.role]

  const isActive = (href: string) => {
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <>
    {/* MOBILE / TABLET TOP BAR */}
    <header className="border-b border-black/10 bg-[#f5f4ef] text-[#171717] lg:hidden">
      <div className="flex items-center justify-between px-5 py-4">
        <Link href="/" className="flex items-center gap-3" aria-label="SkillX home">
          <span className="flex h-8 w-8 items-center justify-center bg-[#171717] text-sm font-bold text-white">
            S
          </span>
          <span className="text-lg font-bold tracking-[-0.045em]">
            Skill<span className="text-[#1746d1]">X</span>
          </span>
        </Link>

        <button
          type="button"
          onClick={handleLogout}
          className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-black/45 hover:text-[#171717]"
        >
          Sign out
          <LogOut className="h-3.5 w-3.5" />
        </button>
      </div>

      <nav aria-label="Dashboard navigation" className="flex gap-1 overflow-x-auto px-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActive(link.href) ? 'page' : undefined}
            className={cn(
              'whitespace-nowrap border-b-2 px-3 py-3 text-sm font-semibold transition-colors',
              isActive(link.href)
                ? 'border-[#1746d1] text-[#1746d1]'
                : 'border-transparent text-black/50 hover:text-[#171717]'
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </header>

    <aside className="sticky top-0 hidden h-screen w-[260px] shrink-0 flex-col lg:flex border-r border-black/10 bg-[#f5f4ef] text-[#171717]">

      {/* =====================================================
          BRAND
      ===================================================== */}

      <div className="border-b border-black/10 px-6 py-6">

        <Link
          href="/"
          className="group flex items-center gap-3"
          aria-label="SkillX home"
        >
          <span className="flex h-9 w-9 items-center justify-center bg-[#171717] text-sm font-bold text-white transition-colors duration-200 group-hover:bg-[#1746d1]">
            S
          </span>

          <span className="text-lg font-bold tracking-[-0.045em]">
            Skill<span className="text-[#1746d1]">X</span>
          </span>
        </Link>

        <div className="mt-5 flex items-center gap-3">

          <span className="h-2 w-2 bg-[#1746d1]" />

          <span className="font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-black/40">
            {user.role} workspace
          </span>

        </div>

      </div>


      {/* =====================================================
          NAVIGATION
      ===================================================== */}

      <nav
        aria-label="Dashboard navigation"
        className="flex-1 overflow-y-auto px-4 py-7"
      >

        <p className="px-3 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-black/25">
          Navigation
        </p>

        <div className="mt-4">

          {links.map((link, index) => {
            const active = isActive(link.href)

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'group relative flex items-center justify-between border-b border-black/5 px-3 py-4 transition-colors duration-200',
                  active
                    ? 'text-[#1746d1]'
                    : 'text-black/50 hover:text-[#171717]'
                )}
              >

                <div className="flex items-center gap-4">

                  <span
                    className={cn(
                      'font-mono text-[9px]',
                      active
                        ? 'text-[#1746d1]'
                        : 'text-black/20'
                    )}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span className="text-sm font-semibold">
                    {link.label}
                  </span>

                </div>

                <ArrowUpRight
                  className={cn(
                    'h-3.5 w-3.5 transition-[opacity,transform,color,background-color,border-color] duration-200',
                    active
                      ? 'text-[#1746d1]'
                      : 'text-black/15 opacity-0 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#171717] group-hover:opacity-100'
                  )}
                />

                {/* ACTIVE LINE */}

                <span
                  className={cn(
                    'absolute left-0 top-1/2 h-6 w-[2px] -translate-y-1/2 bg-[#1746d1] transition-transform duration-200',
                    active
                      ? 'scale-y-100'
                      : 'scale-y-0'
                  )}
                />

              </Link>
            )
          })}

        </div>

      </nav>


      {/* =====================================================
          USER AREA
      ===================================================== */}

      <div className="border-t border-black/10">

        <div className="px-5 py-5">

          <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-black/25">
            Signed in as
          </p>

          <div className="mt-4 flex min-w-0 items-center gap-3">

            <div className="flex h-9 w-9 shrink-0 items-center justify-center bg-[#1746d1] text-sm font-bold text-white">
              {user.name?.charAt(0).toUpperCase() || 'U'}
            </div>

            <div className="min-w-0">

              <p className="truncate text-sm font-bold">
                {user.name}
              </p>

              <p className="mt-0.5 truncate text-[10px] text-black/35">
                {user.email}
              </p>

            </div>

          </div>

        </div>


        {/* ACTIONS */}

        <div className="border-t border-black/10 p-4">

          <button
            type="button"
            onClick={handleLogout}
            className="group flex w-full items-center justify-between px-3 py-3 text-xs font-bold uppercase tracking-[0.1em] text-black/40 transition-colors hover:text-[#171717]"
          >
            <span>Sign out</span>

            <LogOut
              className="h-3.5 w-3.5 text-black/20 transition-colors group-hover:text-[#1746d1]"
            />
          </button>

          <Link
            href="/"
            className="group mt-1 flex items-center justify-between border-t border-black/5 px-3 py-3 text-xs font-bold uppercase tracking-[0.1em] text-black/35 transition-colors hover:text-[#171717]"
          >
            <span>Back to site</span>

            <ArrowUpRight
              className="h-3.5 w-3.5 text-black/20 transition-[opacity,transform,color,background-color,border-color] duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#1746d1]"
            />
          </Link>

        </div>

      </div>

    </aside>
    </>
  )
}