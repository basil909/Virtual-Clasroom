import Link from 'next/link'
import {
  ArrowDownRight,
  ArrowUpRight,
  BookOpen,
  Check,
  CirclePlay,
  MonitorPlay,
  Users,
} from 'lucide-react'

const features = [
  {
    number: '01',
    label: 'Live classes',
    icon: MonitorPlay,
  },
  {
    number: '02',
    label: 'Real projects',
    icon: BookOpen,
  },
  {
    number: '03',
    label: 'Connected learning',
    icon: Users,
  },
]

export default function HeroSection() {
  return (
    <section className="border-b border-black/10 bg-[#f5f4ef] text-[#171717]">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        {/* HERO */}
        <div className="grid min-h-[760px] grid-cols-1 lg:grid-cols-[1.15fr_0.85fr]">
          {/* LEFT */}
          <div className="flex flex-col justify-center border-b border-black/10 py-20 lg:border-b-0 lg:border-r lg:py-28 lg:pr-20">
            {/* Eyebrow */}
            <div className="mb-10 flex items-center gap-3">
              <span className="h-2 w-2 bg-[#1746d1]" />

              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-black/50">
                SkillX / Virtual Classroom
              </span>
            </div>

            {/* Heading */}
            <h1 className="max-w-[900px] text-[clamp(4rem,8vw,8.5rem)] font-bold leading-[0.84] tracking-[-0.075em]">
              Learn
              <br />
              <span className="text-[#1746d1]">together.</span>
              <br />
              Build better.
            </h1>

            {/* Description + CTA */}
            <div className="mt-12 grid max-w-2xl grid-cols-1 gap-8 md:grid-cols-[1fr_auto] md:items-end">
              <p className="max-w-lg text-[17px] leading-7 text-black/55">
                A modern virtual classroom built for live teaching,
                practical projects, and meaningful collaboration.
              </p>

              <Link
                href="/courses"
                className="group inline-flex w-fit items-center gap-3 border-b border-black pb-2 text-sm font-bold"
              >
                Explore courses

                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>

            {/* Small credibility row */}
            <div className="mt-16 flex flex-wrap gap-x-8 gap-y-4 border-t border-black/10 pt-6">
              <div className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-[#1746d1]" />

                <span className="text-xs font-medium text-black/50">
                  Live instruction
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-[#1746d1]" />

                <span className="text-xs font-medium text-black/50">
                  Practical learning
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Check className="h-3.5 w-3.5 text-[#1746d1]" />

                <span className="text-xs font-medium text-black/50">
                  Learn anywhere
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="relative flex min-h-[560px] flex-col justify-between py-10 lg:min-h-0 lg:py-12 lg:pl-12">
            {/* Index */}
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/35">
                01 / The classroom
              </span>

              <span className="font-mono text-[10px] text-black/30">
                SKX-001
              </span>
            </div>

            {/* Main visual */}
            <div className="relative py-12">
              <div className="relative overflow-hidden bg-[#172033] p-7 text-white md:p-9">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-white/10 pb-5">
                  <div className="flex items-center gap-3">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute h-full w-full animate-ping bg-[#4ade80] opacity-60" />
                      <span className="relative h-2.5 w-2.5 bg-[#4ade80]" />
                    </span>

                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/65">
                      Live classroom
                    </span>
                  </div>

                  <span className="font-mono text-[10px] text-white/30">
                    09:42
                  </span>
                </div>

                {/* Visual title */}
                <div className="py-12">
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-blue-300">
                    Current session
                  </p>

                  <h2 className="mt-5 max-w-md text-3xl font-bold leading-[0.95] tracking-[-0.045em] md:text-5xl">
                    Build.
                    <br />
                    Learn.
                    <br />
                    Connect.
                  </h2>

                  <p className="mt-6 max-w-sm text-sm leading-6 text-white/45">
                    Everything students and instructors need to
                    learn together in one focused environment.
                  </p>
                </div>

                {/* Bottom metrics */}
                <div className="grid grid-cols-3 border-t border-white/10">
                  <div className="border-r border-white/10 py-5 pr-4">
                    <p className="font-mono text-[9px] uppercase tracking-wider text-white/30">
                      Students
                    </p>

                    <p className="mt-2 text-xl font-bold">128</p>
                  </div>

                  <div className="border-r border-white/10 px-4 py-5">
                    <p className="font-mono text-[9px] uppercase tracking-wider text-white/30">
                      Lessons
                    </p>

                    <p className="mt-2 text-xl font-bold">24</p>
                  </div>

                  <div className="py-5 pl-4">
                    <p className="font-mono text-[9px] uppercase tracking-wider text-white/30">
                      Status
                    </p>

                    <p className="mt-2 text-xl font-bold text-[#4ade80]">
                      Live
                    </p>
                  </div>
                </div>
              </div>

              {/* Floating session label */}
              <div className="absolute -bottom-7 -left-4 border border-black/10 bg-[#f5f4ef] p-4 md:-left-8">
                <div className="flex items-center gap-3">
                  <CirclePlay className="h-4 w-4 text-[#1746d1]" />

                  <div>
                    <p className="font-mono text-[9px] uppercase tracking-wider text-black/35">
                      Next lesson
                    </p>

                    <p className="mt-1 text-xs font-bold">
                      Introduction to Web Development
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom copy */}
            <div className="border-t border-black/10 pt-6">
              <p className="max-w-sm text-sm leading-6 text-black/45">
                Not another video library. SkillX brings the classroom,
                the teacher, and the student into the same space.
              </p>

              <div className="mt-6 flex items-center gap-2 text-xs font-bold uppercase tracking-wider">
                Scroll to explore

                <ArrowDownRight className="h-3.5 w-3.5 text-[#1746d1]" />
              </div>
            </div>
          </div>
        </div>

        {/* FEATURE STRIP */}
        <div className="grid border-t border-black/10 md:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon

            return (
              <div
                key={feature.number}
                className="group flex items-center justify-between border-b border-black/10 py-6 md:border-b-0 md:border-r md:px-7 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
              >
                <div className="flex items-center gap-5">
                  <span className="font-mono text-[10px] text-black/30">
                    {feature.number}
                  </span>

                  <span className="text-sm font-bold">
                    {feature.label}
                  </span>
                </div>

                <Icon className="h-4 w-4 text-black/25 transition-colors duration-200 group-hover:text-[#1746d1]" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}