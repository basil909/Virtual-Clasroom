import Link from 'next/link'
import {
  ArrowUpRight,
  Users,
  Video,
  GraduationCap,
  Star,
} from 'lucide-react'

const stats = [
  {
    number: '12K+',
    label: 'Students',
    description: 'Learners using the platform.',
    icon: Users,
  },
  {
    number: '450+',
    label: 'Teachers',
    description: 'Educators and mentors.',
    icon: GraduationCap,
  },
  {
    number: '2.4K',
    label: 'Live classes',
    description: 'Interactive sessions every week.',
    icon: Video,
  },
  {
    number: '98%',
    label: 'Satisfaction',
    description: 'Student satisfaction and engagement.',
    icon: Star,
  },
]

export default function StatsSection() {
  return (
    <section className="border-b border-black/10 bg-[#171717] text-white">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        {/* HEADER */}
        <div className="grid border-b border-white/10 py-16 lg:grid-cols-[0.75fr_1.25fr] lg:py-24">
          {/* LABEL */}
          <div>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 bg-[#4d72ff]" />

              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                03 / Platform statistics
              </span>
            </div>
          </div>

          {/* TITLE */}
          <div className="mt-8 lg:mt-0">
            <h2 className="max-w-4xl text-[clamp(3rem,6vw,6rem)] font-bold leading-[0.88] tracking-[-0.065em]">
              Numbers that
              <br />
              show the
              <br />
              <span className="text-[#4d72ff]">scale.</span>
            </h2>

            <p className="mt-8 max-w-xl text-[16px] leading-7 text-white/45">
              SkillX brings students, teachers, and live learning
              together in one virtual classroom environment.
            </p>

            <Link
              href="/about"
              className="group mt-8 inline-flex items-center gap-3 border-b border-white/30 pb-2 text-sm font-bold transition-colors hover:border-white"
            >
              Explore the platform

              <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </div>

        {/* STATISTICS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, index) => {
            const Icon = stat.icon

            return (
              <div
                key={stat.label}
                className={`group min-h-[300px] border-b border-white/10 p-7 transition-colors duration-300 hover:bg-white/[0.03] lg:min-h-[340px] ${
                  index < 3 ? 'lg:border-r' : ''
                } ${
                  index % 2 === 0 ? 'md:border-r md:border-white/10' : ''
                }`}
              >
                {/* TOP */}
                <div className="flex items-start justify-between">
                  <span className="font-mono text-[10px] text-white/25">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <Icon className="h-4 w-4 text-[#4d72ff] opacity-70 transition-opacity duration-200 group-hover:opacity-100" />
                </div>

                {/* NUMBER */}
                <div className="mt-16">
                  <p className="text-[clamp(3.5rem,5vw,5.5rem)] font-bold leading-none tracking-[-0.065em]">
                    {stat.number}
                  </p>

                  <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-white/55">
                    {stat.label}
                  </p>

                  <p className="mt-3 max-w-[220px] text-sm leading-6 text-white/35">
                    {stat.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>

        {/* FOOTER STRIP */}
        <div className="flex flex-col justify-between gap-4 border-t border-white/10 py-6 text-xs text-white/30 sm:flex-row">
          <span>SkillX / Platform statistics</span>

          <span className="font-mono uppercase tracking-[0.12em]">
            Learn. Build. Connect.
          </span>
        </div>
      </div>
    </section>
  )
}