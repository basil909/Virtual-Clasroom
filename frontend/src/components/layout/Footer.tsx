import Link from 'next/link'

const platformLinks = [
  { href: '/', label: 'Home' },
  { href: '/courses', label: 'Courses' },
  { href: '/teachers', label: 'Teachers' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/about', label: 'About' },
]

const accountLinks = [
  { href: '/login', label: 'Log in' },
  { href: '/signup', label: 'Sign up' },
  { href: '/dashboard', label: 'Dashboard' },
]

export default function Footer() {
  return (
    <footer className="border-t border-black/10 bg-[#f5f4ef] text-[#171717]">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">

        {/* MAIN FOOTER */}

        <div className="grid border-b border-black/10 py-20 lg:grid-cols-[1.4fr_0.6fr_0.6fr] lg:py-24">

          {/* BRAND */}

          <div className="border-b border-black/10 pb-12 lg:border-b-0 lg:border-r lg:pb-0 lg:pr-16">
            <Link
              href="/"
              className="group inline-flex items-center gap-3"
            >
              <span className="flex h-9 w-9 items-center justify-center bg-[#171717] text-sm font-bold text-white transition-colors duration-200 group-hover:bg-[#1746d1]">
                S
              </span>

              <span className="text-xl font-bold tracking-[-0.045em]">
                Skill<span className="text-[#1746d1]">X</span>
              </span>
            </Link>

            <p className="mt-7 max-w-md text-[15px] leading-7 text-black/50">
              A modern virtual classroom for live teaching,
              practical learning, collaboration, and meaningful
              student experiences.
            </p>

            <Link
              href="/courses"
              className="mt-8 inline-flex items-center gap-3 border-b border-black pb-2 text-sm font-bold transition-colors hover:border-[#1746d1] hover:text-[#1746d1]"
            >
              Explore courses
              <span aria-hidden="true">↗</span>
            </Link>
          </div>


          {/* PLATFORM */}

          <div className="border-b border-black/10 py-12 lg:border-b-0 lg:border-r lg:px-10 lg:py-0">

            <div className="flex items-center gap-3">
              <span className="h-2 w-2 bg-[#1746d1]" />

              <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-black/45">
                Platform
              </h3>
            </div>

            <nav className="mt-7">
              <ul className="space-y-4">

                {platformLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center justify-between text-sm font-medium text-black/55 transition-colors duration-200 hover:text-[#171717]"
                    >
                      <span>{link.label}</span>

                      <span
                        aria-hidden="true"
                        className="text-black/20 opacity-0 transition-[opacity,transform,color,background-color,border-color] duration-200 group-hover:translate-x-1 group-hover:text-[#1746d1] group-hover:opacity-100"
                      >
                        ↗
                      </span>
                    </Link>
                  </li>
                ))}

              </ul>
            </nav>
          </div>


          {/* ACCOUNT */}

          <div className="pt-12 lg:pl-10 lg:pt-0">

            <div className="flex items-center gap-3">
              <span className="h-2 w-2 bg-[#1746d1]" />

              <h3 className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-black/45">
                Account
              </h3>
            </div>

            <nav className="mt-7">
              <ul className="space-y-4">

                {accountLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="group flex items-center justify-between text-sm font-medium text-black/55 transition-colors duration-200 hover:text-[#171717]"
                    >
                      <span>{link.label}</span>

                      <span
                        aria-hidden="true"
                        className="text-black/20 opacity-0 transition-[opacity,transform,color,background-color,border-color] duration-200 group-hover:translate-x-1 group-hover:text-[#1746d1] group-hover:opacity-100"
                      >
                        ↗
                      </span>
                    </Link>
                  </li>
                ))}

              </ul>
            </nav>
          </div>
        </div>


        {/* LOWER SECTION */}

        <div className="grid gap-10 border-b border-black/10 py-10 md:grid-cols-[1fr_auto] md:items-end">

          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-black/30">
              SkillX / Virtual Classroom
            </p>

            <p className="mt-4 max-w-xl text-2xl font-bold leading-tight tracking-[-0.035em] md:text-3xl">
              Learn.
              <span className="text-[#1746d1]"> Build.</span>
              Connect.
            </p>
          </div>


          {/* SOCIAL LINKS */}

          <div className="flex items-center gap-2">

            <Link
              href="/contact"
              aria-label="Contact SkillX"
              className="flex h-10 w-10 items-center justify-center border border-black/10 text-sm transition-colors hover:border-[#1746d1] hover:bg-[#1746d1] hover:text-white"
            >
              @
            </Link>

            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="SkillX GitHub"
              className="flex h-10 w-10 items-center justify-center border border-black/10 text-xs font-bold transition-colors hover:border-[#1746d1] hover:bg-[#1746d1] hover:text-white"
            >
              GH
            </a>

            <a
              href="https://www.linkedin.com"
              target="_blank"
              rel="noreferrer"
              aria-label="SkillX LinkedIn"
              className="flex h-10 w-10 items-center justify-center border border-black/10 text-xs font-bold transition-colors hover:border-[#1746d1] hover:bg-[#1746d1] hover:text-white"
            >
              in
            </a>

          </div>
        </div>


        {/* COPYRIGHT */}

        <div className="flex flex-col justify-between gap-4 py-6 text-xs text-black/35 sm:flex-row">

          <p>
            © 2026 SkillX. All rights reserved.
          </p>

          <div className="flex items-center gap-6 font-mono uppercase tracking-[0.12em]">
            <span>Education / Technology</span>
            <span>SKX-2026</span>
          </div>

        </div>

      </div>
    </footer>
  )
}