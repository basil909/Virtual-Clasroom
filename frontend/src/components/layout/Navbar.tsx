'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useMemo, useState } from 'react'

import { ArrowUpRight, Menu, X } from 'lucide-react'

import { useAuth } from '@/providers/AuthProvider'
import { getDashboardPath } from '@/lib/routes'
import { cn } from '@/lib/utils'

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

  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled((prev) => { const next = window.scrollY > 20; return prev === next ? prev : next })
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  useEffect(() => {
    const shouldLockScroll = mobileOpen
    document.body.style.overflow = shouldLockScroll ? 'hidden' : ''

    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const dashboardPath = useMemo(
    () => (user ? getDashboardPath(user.role) : '/signup'),
    [user]
  )

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/'
    return pathname === href || pathname.startsWith(`${href}/`)
  }

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 border-b transition-[opacity,transform,color,background-color,border-color] duration-300',
        scrolled
          ? 'border-black/10 bg-[#f5f4ef]'
          : 'border-black/10 bg-[#f5f4ef]'
      )}
    >
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">

        {/* =====================================================
            DESKTOP / MAIN NAV
        ===================================================== */}

        <div className="flex h-[76px] items-center justify-between">

          {/* LOGO */}

          <Link
            href="/"
            aria-label="SkillX home"
            className="group flex items-center gap-3"
          >
            <span className="flex h-8 w-8 items-center justify-center bg-[#171717] text-sm font-bold text-white transition-colors duration-200 group-hover:bg-[#1746d1]">
              S
            </span>

            <span className="text-[18px] font-bold tracking-[-0.04em]">
              Skill<span className="text-[#1746d1]">X</span>
            </span>
          </Link>


          {/* DESKTOP NAVIGATION */}

          <nav
            aria-label="Main navigation"
            className="hidden items-center lg:flex"
          >
            {navLinks.map((link, index) => {
              const active = isActive(link.href)

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'group relative flex items-center gap-2 px-4 py-2 text-[12px] font-bold uppercase tracking-[0.12em] transition-colors duration-200',
                    active
                      ? 'text-[#1746d1]'
                      : 'text-black/45 hover:text-[#171717]'
                  )}
                >
                  <span className="font-mono text-[8px] text-black/20">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <span>{link.label}</span>

                  {/* ACTIVE INDICATOR */}

                  <span
                    className={cn(
                      'absolute bottom-0 left-4 right-4 h-[2px] bg-[#1746d1] transition-transform duration-200',
                      active
                        ? 'scale-x-100'
                        : 'scale-x-0 group-hover:scale-x-100'
                    )}
                  />
                </Link>
              )
            })}
          </nav>


          {/* DESKTOP ACTIONS */}

          <div className="hidden items-center gap-6 lg:flex">

            {user ? (
              <Link
                href={getDashboardPath(user.role)}
                className="text-xs font-bold uppercase tracking-[0.12em] text-black/45 transition-colors hover:text-black"
              >
                Dashboard
              </Link>
            ) : (
              <Link
                href="/login"
                className="text-xs font-bold uppercase tracking-[0.12em] text-black/45 transition-colors hover:text-black"
              >
                Log in
              </Link>
            )}

            <Link
              href={dashboardPath}
              className="group flex items-center gap-3 bg-[#171717] px-5 py-3 text-xs font-bold uppercase tracking-[0.1em] text-white transition-colors duration-200 hover:bg-[#1746d1]"
            >
              <span>
                {user ? 'Go to App' : 'Get Started'}
              </span>

              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
              />
            </Link>

          </div>


          {/* MOBILE BUTTON */}

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-label={
              mobileOpen
                ? 'Close navigation'
                : 'Open navigation'
            }
            aria-expanded={mobileOpen}
            className="flex h-10 w-10 items-center justify-center text-[#171717] lg:hidden"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>

        </div>


        {/* =====================================================
            MOBILE MENU
        ===================================================== */}

        <div
          className={cn(
            'overflow-hidden border-t border-black/10 transition-[opacity,transform,color,background-color,border-color] duration-300 lg:hidden',
            mobileOpen
              ? 'max-h-[600px] opacity-100'
              : 'max-h-0 opacity-0'
          )}
        >
          <nav
            aria-label="Mobile navigation"
            className="py-4"
          >

            {navLinks.map((link, index) => {
              const active = isActive(link.href)

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={active ? 'page' : undefined}
                  className={cn(
                    'flex items-center justify-between border-b border-black/10 py-5',
                    active
                      ? 'text-[#1746d1]'
                      : 'text-[#171717]'
                  )}
                >

                  <div className="flex items-center gap-5">

                    <span className="font-mono text-[10px] text-black/25">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <span className="text-sm font-bold uppercase tracking-[0.12em]">
                      {link.label}
                    </span>

                  </div>

                  <ArrowUpRight
                    className={cn(
                      'h-4 w-4',
                      active
                        ? 'text-[#1746d1]'
                        : 'text-black/20'
                    )}
                  />

                </Link>
              )
            })}


            {/* ACCOUNT */}

            <div className="flex flex-col gap-3 py-5">

              {user ? (
                <Link
                  href={getDashboardPath(user.role)}
                  className="flex items-center justify-between border border-black/10 px-4 py-4 text-sm font-bold"
                >
                  Dashboard

                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              ) : (
                <Link
                  href="/login"
                  className="flex items-center justify-between border border-black/10 px-4 py-4 text-sm font-bold"
                >
                  Log in

                  <ArrowUpRight className="h-4 w-4" />
                </Link>
              )}

              <Link
                href={dashboardPath}
                className="flex items-center justify-between bg-[#1746d1] px-4 py-4 text-sm font-bold text-white"
              >
                {user ? 'Go to App' : 'Get Started'}

                <ArrowUpRight className="h-4 w-4" />
              </Link>

            </div>

          </nav>
        </div>

      </div>
    </header>
  )
}