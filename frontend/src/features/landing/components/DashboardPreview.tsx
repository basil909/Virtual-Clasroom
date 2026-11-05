import Link from 'next/link'
import {
  ArrowUpRight,
  BarChart3,
  BookOpen,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Users,
  Video,
} from 'lucide-react'

const stats = [
  {
    label: 'Students',
    value: '12K',
  },
  {
    label: 'Teachers',
    value: '450',
  },
  {
    label: 'Live classes',
    value: '84',
  },
  {
    label: 'Recordings',
    value: '1.2K',
  },
]

const schedule = [
  {
    time: '09:00',
    title: 'Web Development',
    teacher: 'James Wilson',
    status: 'Live',
  },
  {
    time: '11:30',
    title: 'Data Structures',
    teacher: 'Sarah Thomas',
    status: 'Upcoming',
  },
  {
    time: '14:00',
    title: 'Machine Learning',
    teacher: 'David Miller',
    status: 'Upcoming',
  },
]

export default function DashboardPreview() {
  return (
    <section className="border-b border-black/10 bg-[#f5f4ef] text-[#171717]">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        {/* HEADER */}
        <div className="grid border-b border-black/10 py-16 lg:grid-cols-[0.75fr_1.25fr] lg:py-24">
          {/* LABEL */}
          <div>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 bg-[#1746d1]" />

              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-black/45">
                04 / The workspace
              </span>
            </div>
          </div>

          {/* TITLE */}
          <div className="mt-8 lg:mt-0">
            <h2 className="max-w-4xl text-[clamp(3rem,6vw,6rem)] font-bold leading-[0.88] tracking-[-0.065em]">
              One place
              <br />
              to run the
              <br />
              <span className="text-[#1746d1]">classroom.</span>
            </h2>

            <p className="mt-8 max-w-xl text-[16px] leading-7 text-black/50">
              Give administrators, teachers, and students the tools
              they need to manage learning without jumping between
              disconnected systems.
            </p>

            <Link
              href="/login"
              className="group mt-8 inline-flex items-center gap-3 border-b border-black pb-2 text-sm font-bold"
            >
              Explore the dashboard

              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </div>

        {/* DASHBOARD */}
        <div className="py-16 lg:py-20">
          <div className="overflow-hidden border border-black/10 bg-white">
            {/* TOP BAR */}
            <div className="flex flex-col justify-between gap-5 border-b border-black/10 px-6 py-5 sm:flex-row sm:items-center lg:px-8">
              <div className="flex items-center gap-5">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-black/35">
                  SkillX
                </span>

                <span className="h-3 w-px bg-black/10" />

                <span className="text-sm font-semibold">
                  Admin workspace
                </span>
              </div>

              <div className="flex items-center gap-5">
                <span className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-black/40">
                  <span className="h-2 w-2 bg-emerald-500" />
                  System online
                </span>

                <span className="font-mono text-[10px] text-black/25">
                  09:42:18
                </span>
              </div>
            </div>

            {/* DASHBOARD BODY */}
            <div className="grid lg:grid-cols-[220px_1fr]">
              {/* SIDEBAR */}
              <aside className="border-b border-black/10 bg-[#faf9f5] lg:border-b-0 lg:border-r">
                <div className="p-5">
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-black/30">
                    Navigation
                  </p>

                  <nav className="mt-5 space-y-1">
                    {[
                      {
                        label: 'Overview',
                        icon: BarChart3,
                        active: true,
                      },
                      {
                        label: 'Classes',
                        icon: Video,
                        active: false,
                      },
                      {
                        label: 'Students',
                        icon: Users,
                        active: false,
                      },
                      {
                        label: 'Courses',
                        icon: BookOpen,
                        active: false,
                      },
                      {
                        label: 'Calendar',
                        icon: CalendarDays,
                        active: false,
                      },
                    ].map((item) => {
                      const Icon = item.icon

                      return (
                        <div
                          key={item.label}
                          className={`flex items-center gap-3 px-3 py-2.5 text-xs font-medium ${
                            item.active
                              ? 'bg-[#171717] text-white'
                              : 'text-black/45 hover:text-black'
                          }`}
                        >
                          <Icon className="h-3.5 w-3.5" />

                          {item.label}
                        </div>
                      )
                    })}
                  </nav>
                </div>

                <div className="mt-8 border-t border-black/10 p-5">
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-black/30">
                    Workspace
                  </p>

                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center bg-[#1746d1] text-xs font-bold text-white">
                      A
                    </div>

                    <div>
                      <p className="text-xs font-bold">
                        Admin
                      </p>

                      <p className="text-[10px] text-black/35">
                        SkillX Academy
                      </p>
                    </div>
                  </div>
                </div>
              </aside>

              {/* MAIN CONTENT */}
              <div className="min-w-0">
                {/* DASHBOARD HEADER */}
                <div className="border-b border-black/10 px-6 py-6 lg:px-8">
                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-black/30">
                        Monday / September 21
                      </p>

                      <h3 className="mt-2 text-2xl font-bold tracking-[-0.035em]">
                        Good morning, Admin.
                      </h3>
                    </div>

                    <Link
                      href="/dashboard/admin/classes"
                      className="flex w-fit items-center gap-2 border border-black/10 px-4 py-2 text-xs font-semibold transition-colors hover:border-black/30"
                    >
                      <CalendarDays className="h-3.5 w-3.5" />
                      View calendar
                    </Link>
                  </div>
                </div>

                {/* STATS */}
                <div className="grid grid-cols-2 border-b border-black/10 xl:grid-cols-4">
                  {stats.map((stat, index) => (
                    <div
                      key={stat.label}
                      className={`p-5 lg:p-6 ${
                        index < 3
                          ? 'border-r border-black/10'
                          : ''
                      }`}
                    >
                      <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-black/30">
                        {stat.label}
                      </p>

                      <p className="mt-3 text-3xl font-bold tracking-[-0.05em]">
                        {stat.value}
                      </p>
                    </div>
                  ))}
                </div>

                {/* LOWER GRID */}
                <div className="grid xl:grid-cols-[1.3fr_0.7fr]">
                  {/* SCHEDULE */}
                  <div className="border-b border-black/10 p-6 xl:border-b-0 xl:border-r lg:p-8">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-black/30">
                          Today
                        </p>

                        <h4 className="mt-2 text-lg font-bold">
                          Class schedule
                        </h4>
                      </div>

                      <span className="text-xs text-black/30">
                        3 sessions
                      </span>
                    </div>

                    <div className="mt-7 border-t border-black/10">
                      {schedule.map((item) => (
                        <div
                          key={`${item.time}-${item.title}`}
                          className="grid grid-cols-[60px_1fr_auto] items-center gap-4 border-b border-black/10 py-5"
                        >
                          <span className="font-mono text-[10px] text-black/35">
                            {item.time}
                          </span>

                          <div>
                            <p className="text-sm font-semibold">
                              {item.title}
                            </p>

                            <p className="mt-1 text-[10px] text-black/35">
                              {item.teacher}
                            </p>
                          </div>

                          {item.status === 'Live' ? (
                            <span className="flex items-center gap-2 text-[9px] font-bold uppercase tracking-wider text-emerald-600">
                              <span className="h-1.5 w-1.5 bg-emerald-500" />
                              Live
                            </span>
                          ) : (
                            <span className="text-[9px] font-bold uppercase tracking-wider text-black/25">
                              Upcoming
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* ACTIVITY */}
                  <div className="p-6 lg:p-8">
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-black/30">
                      Activity
                    </p>

                    <h4 className="mt-2 text-lg font-bold">
                      Platform activity
                    </h4>

                    <div className="mt-7 space-y-5">
                      <div className="flex items-start gap-3">
                        <CheckCircle2 className="mt-0.5 h-4 w-4 text-[#1746d1]" />

                        <div>
                          <p className="text-xs font-semibold">
                            New class published
                          </p>

                          <p className="mt-1 text-[10px] text-black/35">
                            Web Development · 8 min ago
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Users className="mt-0.5 h-4 w-4 text-[#1746d1]" />

                        <div>
                          <p className="text-xs font-semibold">
                            24 students joined
                          </p>

                          <p className="mt-1 text-[10px] text-black/35">
                            Data Structures · 32 min ago
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-3">
                        <Clock3 className="mt-0.5 h-4 w-4 text-[#1746d1]" />

                        <div>
                          <p className="text-xs font-semibold">
                            Recording processed
                          </p>

                          <p className="mt-1 text-[10px] text-black/35">
                            Machine Learning · 1 hr ago
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="mt-10 border-t border-black/10 pt-5">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] text-black/35">
                          Weekly engagement
                        </span>

                        <span className="text-xs font-bold text-[#1746d1]">
                          +92%
                        </span>
                      </div>

                      <div className="mt-3 h-1 bg-black/5">
                        <div className="h-1 w-[78%] bg-[#1746d1]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CAPTION */}
          <div className="mt-6 flex flex-col justify-between gap-4 text-xs text-black/35 sm:flex-row">
            <span>
              SkillX / Admin workspace preview
            </span>

            <span className="font-mono uppercase tracking-[0.12em]">
              One system / three roles
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}