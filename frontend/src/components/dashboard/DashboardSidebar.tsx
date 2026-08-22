'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { cn } from '../../lib/utils'
import { useAuth } from '../../context/AuthContext'
import type { UserRole } from '../../types'

const navByRole: Record<UserRole, Array<{ href: string; label: string }>> = {
  admin: [
    { href: '/dashboard/admin', label: 'Overview' },
    { href: '/dashboard/admin/users', label: 'Users' },
    { href: '/dashboard/admin/classes', label: 'Classes' },
  ],
  teacher: [
    { href: '/dashboard/teacher', label: 'Overview' },
    { href: '/dashboard/teacher/classes', label: 'My Classes' },
    { href: '/dashboard/teacher/assignments', label: 'Assignments' },
  ],
  student: [
    { href: '/dashboard/student', label: 'Overview' },
    { href: '/dashboard/student/courses', label: 'My Courses' },
    { href: '/dashboard/student/assignments', label: 'Assignments' },
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

  if (!user) return null

  const links = navByRole[user.role]

  return (
    <aside className="flex w-64 shrink-0 flex-col border-r border-slate-200 bg-white">
      <div className="border-b border-slate-100 p-6">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-sm font-bold text-white">
            S
          </div>
          <span className="text-lg font-bold text-slate-900">
            Skill<span className="text-blue-600">X</span>
          </span>
        </Link>
        <p className="mt-3 text-xs font-medium uppercase tracking-wider text-slate-400">
          {user.role} panel
        </p>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={cn(
              'block rounded-xl px-4 py-3 text-sm font-medium transition-colors',
              pathname === link.href
                ? 'bg-slate-900 text-white'
                : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            )}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="border-t border-slate-100 p-4">
        <div className="rounded-xl bg-slate-50 p-4">
          <p className="text-sm font-bold text-slate-900">{user.name}</p>
          <p className="mt-1 truncate text-xs text-slate-500">{user.email}</p>
        </div>
        <button
          onClick={handleLogout}
          className="mt-3 w-full rounded-xl px-4 py-2.5 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
        >
          Sign out
        </button>
        <Link
          href="/"
          className="mt-2 block text-center text-xs font-medium text-blue-600 hover:text-blue-700"
        >
          Back to site
        </Link>
      </div>
    </aside>
  )
}
