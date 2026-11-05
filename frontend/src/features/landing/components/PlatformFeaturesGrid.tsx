import {
  ArrowUpRight,
  BarChart3,
  GraduationCap,
  LockKeyhole,
  MonitorPlay,
  Play,
  Users,
} from 'lucide-react'

const features = [
  {
    number: '01',
    title: 'Secure access',
    description:
      'A secure authentication system with dedicated access for students, teachers, and administrators.',
    icon: LockKeyhole,
  },
  {
    number: '02',
    title: 'Admin control',
    description:
      'Manage users, classrooms, reports, analytics, and platform activity from one central workspace.',
    icon: BarChart3,
  },
  {
    number: '03',
    title: 'Teacher workspace',
    description:
      'Create lessons, host live classes, share resources, and track student progress.',
    icon: GraduationCap,
  },
  {
    number: '04',
    title: 'Student portal',
    description:
      'Access classes, assignments, recordings, schedules, and personal learning progress.',
    icon: Users,
  },
  {
    number: '05',
    title: 'Virtual classroom',
    description:
      'Bring students and teachers together with live sessions and collaborative learning tools.',
    icon: MonitorPlay,
  },
  {
    number: '06',
    title: 'Class recordings',
    description:
      'Keep recorded sessions available so students can revisit lessons whenever they need.',
    icon: Play,
  },
]

export default function PlatformFeaturesGrid() {
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
                02 / Platform
              </span>
            </div>
          </div>

          {/* TITLE */}
          <div className="mt-8 lg:mt-0">
            <h2 className="max-w-4xl text-[clamp(3rem,6vw,6rem)] font-bold leading-[0.88] tracking-[-0.065em]">
              Everything
              <br />
              needed to
              <br />
              <span className="text-[#1746d1]">learn well.</span>
            </h2>

            <p className="mt-8 max-w-xl text-[16px] leading-7 text-black/50">
              SkillX combines the essential tools for modern
              education into one focused virtual learning
              environment.
            </p>
          </div>
        </div>

        {/* FEATURE LIST */}
        <div className="grid lg:grid-cols-2">
          {features.map((feature, index) => {
            const Icon = feature.icon

            return (
              <article
                key={feature.title}
                className={`group min-h-[310px] border-b border-black/10 p-7 transition-colors duration-300 hover:bg-white lg:p-9 ${
                  index % 2 === 0
                    ? 'lg:border-r lg:border-black/10'
                    : ''
                }`}
              >
                {/* TOP ROW */}
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[10px] text-black/30">
                    {feature.number}
                  </span>

                  <Icon className="h-5 w-5 text-[#1746d1] opacity-60 transition-opacity duration-200 group-hover:opacity-100" />
                </div>

                {/* CONTENT */}
                <div className="mt-16 max-w-lg">
                  <h3 className="text-2xl font-bold tracking-[-0.035em] md:text-3xl">
                    {feature.title}
                  </h3>

                  <p className="mt-4 max-w-md text-sm leading-6 text-black/50">
                    {feature.description}
                  </p>
                </div>

                {/* BOTTOM */}
                <div className="mt-10 flex items-center justify-between">
                  <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-black/25">
                    SkillX / Feature
                  </span>

                  <span className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-black/35 transition-colors group-hover:text-[#1746d1]">
                    Explore

                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </span>
                </div>
              </article>
            )
          })}
        </div>

        {/* BOTTOM STRIP */}
        <div className="flex flex-col justify-between gap-5 border-t border-black/10 py-6 text-xs text-black/40 sm:flex-row">
          <span>
            SkillX / Platform capabilities
          </span>

          <span className="font-mono uppercase tracking-[0.12em]">
            Six core tools
          </span>
        </div>
      </div>
    </section>
  )
}