import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 px-6 pt-20 pb-12 text-white">
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-[1200px]">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-lg font-bold text-white backdrop-blur-sm">
                S
              </div>
              <h2 className="text-xl font-bold tracking-tight text-white">
                Skill<span className="text-blue-400">X</span>
              </h2>
            </Link>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/50">
              Premium virtual classroom platform for modern education. Create immersive learning
              experiences, manage students, and deliver courses from one place.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/80">Platform</h3>
            <ul className="mt-4 space-y-3">
              <li><Link href="/" className="text-sm text-white/50 transition-colors hover:text-white/80">Home</Link></li>
              <li><Link href="/courses" className="text-sm text-white/50 transition-colors hover:text-white/80">Courses</Link></li>
              <li><Link href="/pricing" className="text-sm text-white/50 transition-colors hover:text-white/80">Pricing</Link></li>
              <li><Link href="/teachers" className="text-sm text-white/50 transition-colors hover:text-white/80">Teachers</Link></li>
              <li><Link href="/about" className="text-sm text-white/50 transition-colors hover:text-white/80">About</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-white/80">Account</h3>
            <ul className="mt-4 space-y-3">
              <li><Link href="/login" className="text-sm text-white/50 transition-colors hover:text-white/80">Login</Link></li>
              <li><Link href="/signup" className="text-sm text-white/50 transition-colors hover:text-white/80">Sign up</Link></li>
              <li><Link href="/dashboard" className="text-sm text-white/50 transition-colors hover:text-white/80">Dashboard</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-16 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

        <div className="mt-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <p className="text-sm text-white/30">© 2026 SkillX. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
