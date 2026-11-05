import Link from 'next/link'
import {
  ArrowUpRight,
  Check,
  CircleArrowRight,
} from 'lucide-react'

const benefits = [
  'Live virtual classrooms',
  'Interactive learning',
  'Projects and assignments',
  'Student collaboration',
]

export default function CTASection() {
  return (
    <section className="border-t border-black/10 bg-[#f5f4ef] text-[#171717]">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        {/* TOP LABEL */}
        <div className="border-b border-black/10 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 bg-[#1746d1]" />

              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-black/45">
                06 / Get started
              </span>
            </div>

            <span className="font-mono text-[10px] text-black/30">
              SKX / 006
            </span>
          </div>
        </div>

        {/* MAIN CTA */}
        <div className="grid min-h-[600px] grid-cols-1 lg:grid-cols-[1.25fr_0.75fr]">
          {/* LEFT */}
          <div className="flex flex-col justify-center border-b border-black/10 py-20 lg:border-b-0 lg:border-r lg:py-28 lg:pr-20">
            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#1746d1]">
              Your classroom, rethought.
            </p>

            <h2 className="mt-7 max-w-[850px] text-[clamp(3.5rem,7vw,7.5rem)] font-bold leading-[0.86] tracking-[-0.07em]">
              Learn
              <br />
              <span className="text-[#1746d1]">together.</span>
            </h2>

            <p className="mt-10 max-w-xl text-[17px] leading-7 text-black/55">
              Bring teaching, learning, projects, and collaboration
              into one focused virtual classroom.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-6">
              <Link
                href="/signup"
                className="group inline-flex items-center gap-3 bg-[#171717] px-6 py-4 text-sm font-bold text-white transition-colors duration-200 hover:bg-[#1746d1]"
              >
                Start learning

                <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>

              <Link
                href="/courses"
                className="group inline-flex items-center gap-2 border-b border-black pb-1 text-sm font-bold"
              >
                Browse courses

                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </Link>
            </div>
          </div>

          {/* RIGHT */}
          <div className="flex flex-col justify-between py-12 lg:pl-12">
            {/* Intro */}
            <div>
              <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/35">
                What you get
              </span>

              <p className="mt-5 max-w-sm text-sm leading-6 text-black/50">
                Everything you need to turn online education
                into an actual classroom experience.
              </p>
            </div>

            {/* Benefits */}
            <div className="border-t border-black/10">
              {benefits.map((benefit, index) => (
                <div
                  key={benefit}
                  className="group flex items-center justify-between border-b border-black/10 py-5"
                >
                  <div className="flex items-center gap-5">
                    <span className="font-mono text-[10px] text-black/30">
                      {String(index + 1).padStart(2, '0')}
                    </span>

                    <span className="text-sm font-semibold">
                      {benefit}
                    </span>
                  </div>

                  <Check className="h-4 w-4 text-[#1746d1] opacity-50 transition-opacity group-hover:opacity-100" />
                </div>
              ))}
            </div>

            {/* Small platform block */}
            <div className="mt-12 bg-[#1746d1] p-7 text-white">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-white/50">
                    SkillX
                  </p>

                  <p className="mt-4 max-w-[220px] text-2xl font-bold leading-tight tracking-[-0.035em]">
                    Learn. Build. Connect.
                  </p>
                </div>

                <CircleArrowRight className="h-6 w-6 text-white/70" />
              </div>

              <div className="mt-10 border-t border-white/20 pt-4">
                <p className="text-xs leading-5 text-white/55">
                  A virtual classroom designed around
                  people, not just content.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM STRIP */}
        <div className="flex flex-col justify-between gap-4 border-t border-black/10 py-6 text-xs text-black/40 sm:flex-row">
          <span>SkillX / Virtual Classroom</span>

          <span className="font-mono uppercase tracking-[0.12em]">
            Learn. Build. Connect.
          </span>
        </div>
      </div>
    </section>
  )
}