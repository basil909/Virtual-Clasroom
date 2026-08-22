'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '../../context/AuthContext'
import { getDashboardPath } from '../../lib/routes'
import { cn } from '../../lib/utils'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/courses', label: 'Courses' },
  { href: '/teachers', label: 'Teachers' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
]

export default function Navbar() {
  const pathname = usePathname()
  const { user } = useAuth()

  return (
    <header className="sticky top-0 z-50 px-6 py-6">
      <div className="mx-auto flex max-w-[1200px] items-center justify-between rounded-2xl border border-slate-100 bg-white/80 px-8 py-4 shadow-lg shadow-slate-100/50 backdrop-blur-xl">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-lg font-bold text-white">
            S
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Skill<span className="text-blue-600">X</span>
          </h1>
        </Link>

        <nav className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                'text-sm font-medium transition-colors',
                pathname === link.href
                  ? 'text-slate-900'
                  : 'text-slate-500 hover:text-slate-900'
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <Link
              href={getDashboardPath(user.role)}
              className="hidden rounded-xl bg-blue-50 px-5 py-3 text-sm font-bold text-blue-700 transition-colors hover:bg-blue-100 md:block"
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/login"
              className="hidden text-sm font-bold text-slate-600 transition-colors hover:text-slate-900 md:block"
            >
              Login
            </Link>
          )}
          <Link
            href={user ? getDashboardPath(user.role) : '/signup'}
            className="group relative overflow-hidden rounded-xl bg-slate-900 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-slate-200 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-slate-300 active:scale-[0.98]"
          >
            <span className="relative z-10">{user ? 'Go to App' : 'Free Trial'}</span>
            <div className="absolute inset-0 -z-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </Link>
        </div>
      </div>
    </header>
  )
}
