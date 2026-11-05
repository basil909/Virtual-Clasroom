import Button from '@/components/ui/Button'

import {
  ArrowUpRight,
  BarChart3,
  Check,
  GraduationCap,
  MessageSquare,
  MonitorPlay,
  Users,
} from 'lucide-react'

const values = [
  {
    number: '01',
    title: 'Accessible education',
    description:
      'Deliver high-quality learning experiences to students anywhere through modern virtual classrooms, live interaction, and collaborative learning tools.',
    icon: MonitorPlay,
  },
  {
    number: '02',
    title: 'Teacher empowerment',
    description:
      'Equip educators with tools for conducting live sessions, managing assignments, tracking progress, and simplifying classroom management.',
    icon: GraduationCap,
  },
  {
    number: '03',
    title: 'Interactive learning',
    description:
      'Create engaging online classrooms with live sessions, recordings, real-time communication, quizzes, and collaborative learning experiences.',
    icon: MessageSquare,
  },
  {
    number: '04',
    title: 'Performance analytics',
    description:
      'Provide institutions and educators with dashboards and insights to monitor engagement, attendance, and academic performance.',
    icon: BarChart3,
  },
]

const features = [
  'Live virtual classrooms',
  'Microsoft Teams integration',
  'Assignment & submission system',
  'Recorded class sessions',
  'Student performance tracking',
  'Interactive classroom chat',
  'Secure role-based access',
  'Responsive learning interface',
]

const stats = [
  {
    value: '10K+',
    label: 'Virtual sessions',
  },
  {
    value: '50K+',
    label: 'Students connected',
  },
  {
    value: '500+',
    label: 'Institutions',
  },
  {
    value: '120K+',
    label: 'Assignments submitted',
  },
]

export default function AboutPage() {
  return (
    <>
      <main className="bg-[#f5f4ef] text-[#171717]">

        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="border-b border-black/10">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">

            <div className="grid min-h-[700px] grid-cols-1 lg:grid-cols-[1.15fr_0.85fr]">

              {/* LEFT */}

              <div className="flex flex-col justify-center py-24 lg:border-r lg:border-black/10 lg:pr-20">

                <div className="mb-10 flex items-center gap-3">
                  <span className="h-2 w-2 bg-[#1746d1]" />

                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-black/45">
                    SkillX / About
                  </span>
                </div>

                <h1 className="max-w-[900px] text-[clamp(4rem,8vw,8rem)] font-bold leading-[0.84] tracking-[-0.075em]">
                  Building
                  <br />
                  better
                  <br />
                  <span className="text-[#1746d1]">
                    classrooms.
                  </span>
                </h1>

                <div className="mt-12 grid max-w-2xl gap-8 md:grid-cols-[1fr_auto] md:items-end">

                  <p className="max-w-lg text-[17px] leading-7 text-black/55">
                    SkillX is a virtual classroom platform designed
                    to bring students, teachers, and institutions
                    into one focused learning environment.
                  </p>

                  <a
                    href="#mission"
                    className="group inline-flex w-fit items-center gap-3 border-b border-black pb-2 text-sm font-bold"
                  >
                    Our mission

                    <ArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </a>

                </div>

              </div>


              {/* RIGHT */}

              <div className="flex flex-col justify-between py-12 lg:pl-12">

                <div className="flex items-center justify-between">

                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/30">
                    01 / About SkillX
                  </span>

                  <span className="font-mono text-[10px] text-black/30">
                    SKX-ABOUT
                  </span>

                </div>


                <div className="mt-20">

                  <div className="border-t border-black/10">

                    <div className="flex items-center justify-between border-b border-black/10 py-5">

                      <span className="text-xs font-bold uppercase tracking-[0.16em]">
                        The platform
                      </span>

                      <Users className="h-4 w-4 text-[#1746d1]" />

                    </div>

                    {[
                      'Students and teachers',
                      'Live virtual classrooms',
                      'Projects and assignments',
                      'Progress and analytics',
                    ].map((item, index) => (
                      <div
                        key={item}
                        className="group flex items-center justify-between border-b border-black/10 py-5"
                      >
                        <div className="flex items-center gap-5">

                          <span className="font-mono text-xs text-black/25">
                            0{index + 1}
                          </span>

                          <span className="text-sm font-medium">
                            {item}
                          </span>

                        </div>

                        <ArrowUpRight className="h-4 w-4 text-black/20 transition-[opacity,transform,color,background-color,border-color] duration-200 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#1746d1]" />
                      </div>
                    ))}

                  </div>

                  <p className="mt-10 max-w-sm text-sm leading-6 text-black/45">
                    We are building the infrastructure for
                    learning experiences that feel connected,
                    practical, and human.
                  </p>

                </div>

              </div>

            </div>

          </div>
        </section>


        {/* =====================================================
            MISSION
        ===================================================== */}

        <section
          id="mission"
          className="border-b border-black/10"
        >
          <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-10 lg:py-28">

            <div className="grid gap-16 lg:grid-cols-[0.75fr_1.25fr]">

              {/* LABEL */}

              <div>

                <div className="flex items-center gap-3">

                  <span className="h-2 w-2 bg-[#1746d1]" />

                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-black/45">
                    02 / Our mission
                  </span>

                </div>

              </div>


              {/* CONTENT */}

              <div>

                <h2 className="max-w-5xl text-[clamp(3rem,6vw,6rem)] font-bold leading-[0.88] tracking-[-0.065em]">
                  Making online
                  <br />
                  learning feel
                  <br />
                  <span className="text-[#1746d1]">
                    human.
                  </span>
                </h2>

                <div className="mt-10 grid gap-8 md:grid-cols-2">

                  <p className="text-[16px] leading-7 text-black/55">
                    Traditional online education can feel
                    disconnected and difficult to manage.
                    SkillX was created to bridge the gap
                    between physical and virtual classrooms.
                  </p>

                  <p className="text-[16px] leading-7 text-black/55">
                    Our platform gives institutions and
                    educators one environment for live
                    classes, students, assessments,
                    recordings, and learning progress.
                  </p>

                </div>

              </div>

            </div>

          </div>
        </section>


        {/* =====================================================
            PLATFORM
        ===================================================== */}

        <section className="border-b border-black/10">

          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">

            <div className="grid min-h-[600px] grid-cols-1 lg:grid-cols-[0.75fr_1.25fr]">

              {/* LEFT */}

              <div className="flex flex-col justify-between border-b border-black/10 py-12 lg:border-b-0 lg:border-r lg:py-16 lg:pr-12">

                <div>

                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-black/35">
                    03 / What we build
                  </p>

                  <h2 className="mt-5 max-w-md text-4xl font-bold leading-[0.95] tracking-[-0.05em] md:text-5xl">
                    One system.
                    <br />
                    Every part of
                    <br />
                    the classroom.
                  </h2>

                </div>

                <div className="mt-16">

                  <div className="flex items-center gap-3">

                    <span className="h-2 w-2 bg-[#1746d1]" />

                    <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-black/35">
                      Built for education
                    </span>

                  </div>

                  <p className="mt-5 max-w-sm text-sm leading-6 text-black/45">
                    From the first login to the final assignment,
                    SkillX keeps the learning journey connected.
                  </p>

                </div>

              </div>


              {/* RIGHT */}

              <div className="py-12 lg:py-16 lg:pl-12">

                <div className="border-t border-black/10">

                  {features.map((feature, index) => (

                    <div
                      key={feature}
                      className="group flex items-center justify-between border-b border-black/10 py-6"
                    >

                      <div className="flex items-center gap-6">

                        <span className="font-mono text-[10px] text-black/25">
                          {String(index + 1).padStart(2, '0')}
                        </span>

                        <span className="text-base font-semibold">
                          {feature}
                        </span>

                      </div>

                      <Check className="h-4 w-4 text-[#1746d1] opacity-40 transition-opacity duration-200 group-hover:opacity-100" />

                    </div>

                  ))}

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            VALUES
        ===================================================== */}

        <section className="border-b border-black/10">

          <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-10 lg:py-28">

            <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">

              {/* HEADER */}

              <div>

                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-black/35">
                  04 / Core values
                </p>

                <h2 className="mt-5 max-w-md text-4xl font-bold leading-[0.95] tracking-[-0.05em] md:text-5xl">
                  What drives
                  <br />
                  the platform.
                </h2>

                <p className="mt-6 max-w-md text-sm leading-6 text-black/50">
                  SkillX is built around the idea that learning
                  should be accessible, collaborative,
                  engaging, and supported by useful technology.
                </p>

              </div>


              {/* VALUES */}

              <div className="grid gap-px border border-black/10 bg-black/10 sm:grid-cols-2">

                {values.map((value) => {

                  const Icon = value.icon

                  return (
                    <article
                      key={value.title}
                      className="group min-h-[300px] bg-[#f5f4ef] p-7 transition-colors duration-300 hover:bg-white"
                    >

                      <div className="flex items-start justify-between">

                        <span className="font-mono text-[10px] text-black/30">
                          {value.number}
                        </span>

                        <Icon className="h-5 w-5 text-[#1746d1] opacity-70 transition-opacity group-hover:opacity-100" />

                      </div>

                      <div className="mt-14">

                        <h3 className="text-xl font-bold tracking-[-0.025em]">
                          {value.title}
                        </h3>

                        <p className="mt-4 text-sm leading-6 text-black/50">
                          {value.description}
                        </p>

                      </div>

                    </article>
                  )
                })}

              </div>

            </div>

          </div>

        </section>


        {/* =====================================================
            STATS
        ===================================================== */}

        <section className="border-b border-black/10 bg-[#171717] text-white">

          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">

            <div className="grid border-b border-white/10 py-16 lg:grid-cols-[0.75fr_1.25fr] lg:py-20">

              <div>

                <div className="flex items-center gap-3">

                  <span className="h-2 w-2 bg-[#4d72ff]" />

                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
                    05 / Platform scale
                  </span>

                </div>

              </div>

              <div className="mt-8 lg:mt-0">

                <h2 className="max-w-4xl text-[clamp(3rem,6vw,6rem)] font-bold leading-[0.88] tracking-[-0.065em]">
                  Learning at
                  <br />
                  <span className="text-[#4d72ff]">
                    scale.
                  </span>
                </h2>

                <p className="mt-8 max-w-xl text-[16px] leading-7 text-white/45">
                  A growing digital classroom connecting
                  students, educators, and institutions through
                  one learning environment.
                </p>

              </div>

            </div>


            <div className="grid md:grid-cols-2 lg:grid-cols-4">

              {stats.map((stat, index) => (

                <div
                  key={stat.label}
                  className={`group min-h-[280px] border-b border-white/10 p-7 transition-colors duration-300 hover:bg-white/[0.03] lg:min-h-[320px] ${
                    index < 3 ? 'lg:border-r' : ''
                  } ${
                    index % 2 === 0
                      ? 'md:border-r md:border-white/10'
                      : ''
                  }`}
                >

                  <span className="font-mono text-[10px] text-white/25">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <div className="mt-16">

                    <p className="text-[clamp(3.5rem,5vw,5.5rem)] font-bold leading-none tracking-[-0.065em]">
                      {stat.value}
                    </p>

                    <p className="mt-5 text-xs font-bold uppercase tracking-[0.16em] text-white/50">
                      {stat.label}
                    </p>

                  </div>

                </div>

              ))}

            </div>


            <div className="flex flex-col justify-between gap-4 border-t border-white/10 py-6 text-xs text-white/30 sm:flex-row">

              <span>
                SkillX / Platform scale
              </span>

              <span className="font-mono uppercase tracking-[0.12em]">
                Learn. Build. Connect.
              </span>

            </div>

          </div>

        </section>


        {/* =====================================================
            CTA
        ===================================================== */}

        <section className="border-b border-black/10 bg-[#1746d1] text-white">

          <div className="mx-auto max-w-[1280px] px-6 py-24 lg:px-10 lg:py-32">

            <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">

              <div>

                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">
                  06 / Start with SkillX
                </p>

                <h2 className="mt-5 max-w-4xl text-5xl font-bold leading-[0.88] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
                  The classroom
                  <br />
                  should feel
                  <br />
                  connected.
                </h2>

                <p className="mt-8 max-w-xl text-sm leading-6 text-white/60">
                  Give students and educators a focused
                  environment for live teaching, collaboration,
                  projects, and long-term learning.
                </p>

              </div>

              <div className="flex flex-wrap gap-4 lg:pb-2">

                <Button href="/signup" variant="white">
                  Get started

                  <ArrowUpRight className="h-4 w-4" />
                </Button>

                <Button href="/contact" variant="secondary">
                  Contact us
                </Button>

              </div>

            </div>


            <div className="mt-16 flex flex-col justify-between gap-6 border-t border-white/20 pt-6 text-xs text-white/45 sm:flex-row">

              <span>
                SkillX / About
              </span>

              <span className="font-mono uppercase tracking-[0.12em]">
                Education / Technology / People
              </span>

            </div>

          </div>

        </section>

      </main>
    </>
  )
}