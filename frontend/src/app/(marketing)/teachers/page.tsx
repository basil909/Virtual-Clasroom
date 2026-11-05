import Button from '@/components/ui/Button'
import { api } from '@/lib/api'

import {
  ArrowUpRight,
  Award,
  BarChart3,
  BookOpen,
  Check,
  GraduationCap,
  Star,
  Users,
  Video,
} from 'lucide-react'

export const revalidate = 60

export default async function TeachersPage() {
  let teachers: Awaited<
    ReturnType<typeof api.teachers>
  >['teachers'] = []
  let teachersUnavailable = false

  try {
    teachers = (await api.teachers()).teachers
  } catch {
    teachersUnavailable = true
  }

  return (
    <>
      <main className="bg-[#f5f4ef] text-[#171717]">

        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="border-b border-black/10">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
            <div className="grid min-h-[680px] grid-cols-1 lg:grid-cols-[1.15fr_0.85fr]">

              {/* LEFT */}
              <div className="flex flex-col justify-center py-24 lg:border-r lg:border-black/10 lg:pr-20">

                <div className="mb-10 flex items-center gap-3">
                  <span className="h-2 w-2 bg-[#1746d1]" />

                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-black/45">
                    SkillX / Educators
                  </span>
                </div>

                <h1 className="max-w-[900px] text-[clamp(4rem,8vw,8rem)] font-bold leading-[0.84] tracking-[-0.075em]">
                  Learn
                  <br />
                  from
                  <br />
                  <span className="text-[#1746d1]">
                    people.
                  </span>
                </h1>

                <div className="mt-12 grid max-w-2xl gap-8 md:grid-cols-[1fr_auto] md:items-end">

                  <p className="max-w-lg text-[17px] leading-7 text-black/55">
                    Meet educators, mentors, and industry
                    professionals who bring practical knowledge
                    into every SkillX classroom.
                  </p>

                  <a
                    href="#teachers"
                    className="group inline-flex w-fit items-center gap-3 border-b border-black pb-2 text-sm font-bold"
                  >
                    Meet the teachers

                    <ArrowUpRight
                      className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
                    />
                  </a>

                </div>

              </div>

              {/* RIGHT */}
              <div className="flex flex-col justify-end py-12 lg:pl-12">

                <div className="mb-auto flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/30">
                    01 / Educators
                  </span>

                  <span className="font-mono text-[10px] text-black/30">
                    {String(teachers.length).padStart(2, '0')}
                  </span>
                </div>

                <div className="mt-20">

                  <div className="border-t border-black/10">

                    <div className="flex items-center justify-between border-b border-black/10 py-5">
                      <span className="text-xs font-bold uppercase tracking-[0.16em]">
                        Teaching at SkillX
                      </span>

                      <GraduationCap className="h-4 w-4 text-[#1746d1]" />
                    </div>

                    {[
                      'Industry experience',
                      'Live instruction',
                      'Practical projects',
                      'Student mentorship',
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
                    The best classrooms are built around
                    people who know their subject and know
                    how to teach it.
                  </p>

                </div>

              </div>

            </div>
          </div>
        </section>


        {/* =====================================================
            TEACHER DIRECTORY
        ===================================================== */}

        <section
          id="teachers"
          className="border-b border-black/10"
        >
          <div className="mx-auto max-w-[1280px] px-6 py-16 lg:px-10 lg:py-20">

            {/* HEADER */}

            <div className="flex flex-col justify-between gap-8 border-b border-black/10 pb-12 md:flex-row md:items-end">

              <div>

                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-black/35">
                  02 / Teacher directory
                </p>

                <h2 className="mt-4 text-4xl font-bold tracking-[-0.045em] md:text-5xl">
                  Find your instructor.
                </h2>

              </div>

              <div className="max-w-md">
                <p className="text-sm leading-6 text-black/50">
                  Explore the educators currently teaching
                  on SkillX and discover the people behind
                  the courses.
                </p>
              </div>

            </div>


            {/* QUICK STATS */}

            <div className="grid border-b border-black/10 sm:grid-cols-2 lg:grid-cols-4">

              <div className="border-b border-black/10 p-6 sm:border-r lg:border-b-0">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-black/30">
                  Teachers
                </p>

                <p className="mt-3 text-4xl font-bold tracking-[-0.05em]">
                  {teachers.length}
                </p>
              </div>

              <div className="border-b border-black/10 p-6 lg:border-b-0 lg:border-r">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-black/30">
                  Rating
                </p>

                <p className="mt-3 text-4xl font-bold tracking-[-0.05em]">
                  4.9
                </p>
              </div>

              <div className="border-b border-black/10 p-6 sm:border-r lg:border-b-0">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-black/30">
                  Format
                </p>

                <p className="mt-3 text-xl font-bold">
                  Live
                </p>
              </div>

              <div className="p-6">
                <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-black/30">
                  Focus
                </p>

                <p className="mt-3 text-xl font-bold">
                  Practical
                </p>
              </div>

            </div>


            {/* TEACHERS */}

            {teachers.length > 0 ? (
              <div className="grid gap-px overflow-hidden border-x border-b border-black/10 bg-black/10 md:grid-cols-2 xl:grid-cols-3">

                {teachers.map((teacher, index) => (

                  <article
                    key={teacher.id}
                    className="group flex min-h-[570px] flex-col bg-[#f5f4ef] p-7 transition-colors duration-300 hover:bg-white"
                  >

                    {/* TOP */}

                    <div className="flex items-start justify-between">

                      <span className="font-mono text-[10px] text-black/30">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <span className="flex items-center gap-2 border border-black/10 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-black/45">
                        <span className="h-1.5 w-1.5 bg-emerald-500" />
                        Active
                      </span>

                    </div>


                    {/* TEACHER IDENTITY */}

                    <div className="mt-10">

                      <div className="flex h-20 w-20 items-center justify-center bg-[#1746d1] text-3xl font-bold text-white">
                        {teacher.name.charAt(0).toUpperCase()}
                      </div>

                      <h3 className="mt-7 text-2xl font-bold tracking-[-0.035em]">
                        {teacher.name}
                      </h3>

                      <p className="mt-2 font-mono text-[9px] uppercase tracking-[0.15em] text-[#1746d1]">
                        {teacher.subject}
                      </p>

                    </div>


                    {/* BIO */}

                    <p className="mt-7 text-sm leading-6 text-black/50">
                      {teacher.bio}
                    </p>


                    {/* STATS */}

                    <div className="mt-8 grid grid-cols-2 border-y border-black/10">

                      <div className="border-r border-black/10 py-5">

                        <p className="font-mono text-[9px] uppercase tracking-wider text-black/30">
                          Students
                        </p>

                        <p className="mt-2 text-xl font-bold">
                          {teacher.students}
                        </p>

                      </div>

                      <div className="py-5 pl-5">

                        <p className="font-mono text-[9px] uppercase tracking-wider text-black/30">
                          Rating
                        </p>

                        <div className="mt-2 flex items-center gap-1.5">

                          <Star className="h-3.5 w-3.5 fill-[#e6a817] text-[#e6a817]" />

                          <span className="text-xl font-bold">
                            {teacher.rating}
                          </span>

                        </div>

                      </div>

                    </div>


                    {/* DETAILS */}

                    <div className="mt-7 space-y-3">

                      <div className="flex items-center justify-between text-xs">

                        <span className="text-black/40">
                          Experience
                        </span>

                        <span className="font-semibold">
                          {5 + index} years
                        </span>

                      </div>

                      <div className="flex items-center justify-between text-xs">

                        <span className="text-black/40">
                          Specialization
                        </span>

                        <span className="max-w-[170px] text-right font-semibold">
                          {teacher.subject}
                        </span>

                      </div>

                    </div>


                    {/* ACTIONS */}

                    <div className="mt-auto flex items-center justify-between pt-8">

                      <details className="group/profile">
                        <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 text-xs font-bold uppercase tracking-wider [&::-webkit-details-marker]:hidden">
                          View profile

                          <ArrowUpRight className="h-3.5 w-3.5 text-[#1746d1] transition-transform duration-200 group-open/profile:rotate-45" />
                        </summary>

                        <div className="mt-2 max-w-xs border-l-2 border-[#1746d1] pl-3 text-xs leading-5 text-black/60">
                          <p>{teacher.bio ?? 'This educator is part of the SkillX teaching community.'}</p>
                          <p className="mt-2 font-semibold text-black/75">
                            {teacher.subject ?? 'General'} · {teacher.students} students · {teacher.rating} rating
                          </p>
                        </div>
                      </details>

                      <Button href="/signup">
                        Join class
                      </Button>

                    </div>

                  </article>

                ))}

              </div>
            ) : (
              <div className="border border-dashed border-black/20 py-24 text-center">

                <Users className="mx-auto h-7 w-7 text-black/25" />

                <h3 className="mt-5 text-2xl font-bold">
                  {teachersUnavailable ? 'Teachers are temporarily unavailable.' : 'No teachers yet.'}
                </h3>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-black/45">
                  {teachersUnavailable
                    ? 'We could not load the teacher directory. Please try again in a moment.'
                    : 'Teachers will appear here once educators join and publish their SkillX profiles.'}
                </p>

                {teachersUnavailable && (
                  <a
                    href="/teachers"
                    className="mt-6 inline-flex min-h-11 items-center justify-center bg-[#171717] px-5 text-sm font-bold text-white transition-colors hover:bg-[#1746d1]"
                  >
                    Try again
                  </a>
                )}

              </div>
            )}

          </div>
        </section>


        {/* =====================================================
            WHY TEACH ON SKILLX
        ===================================================== */}

        <section className="border-b border-black/10">
          <div className="mx-auto max-w-[1280px] px-6 py-24 lg:px-10 lg:py-32">

            <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">

              {/* LEFT */}

              <div>

                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-black/35">
                  03 / Teach on SkillX
                </p>

                <h2 className="mt-5 max-w-md text-4xl font-bold leading-[0.95] tracking-[-0.05em] md:text-5xl">
                  Build better classrooms.
                </h2>

                <p className="mt-6 max-w-md text-sm leading-6 text-black/50">
                  Give your students a focused environment
                  for live teaching, collaboration, projects,
                  and long-term learning.
                </p>

              </div>


              {/* RIGHT GRID */}

              <div className="grid gap-px border border-black/10 bg-black/10 sm:grid-cols-2">

                {[
                  {
                    number: '01',
                    icon: Video,
                    title: 'Live classrooms',
                    description:
                      'Run interactive sessions with students in real time.',
                  },
                  {
                    number: '02',
                    icon: BookOpen,
                    title: 'Course management',
                    description:
                      'Organize lessons, resources, assignments, and recordings.',
                  },
                  {
                    number: '03',
                    icon: BarChart3,
                    title: 'Analytics',
                    description:
                      'Understand student engagement and learning activity.',
                  },
                  {
                    number: '04',
                    icon: Users,
                    title: 'Global reach',
                    description:
                      'Teach students beyond the limits of a physical classroom.',
                  },
                ].map((item) => {

                  const Icon = item.icon

                  return (
                    <div
                      key={item.number}
                      className="bg-[#f5f4ef] p-7 transition-colors duration-300 hover:bg-white"
                    >

                      <div className="flex items-start justify-between">

                        <span className="font-mono text-[10px] text-black/30">
                          {item.number}
                        </span>

                        <Icon className="h-5 w-5 text-[#1746d1]" />

                      </div>

                      <h3 className="mt-12 text-lg font-bold">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-black/50">
                        {item.description}
                      </p>

                    </div>
                  )

                })}

              </div>

            </div>

          </div>
        </section>


        {/* =====================================================
            CTA
        ===================================================== */}

        <section className="bg-[#1746d1] text-white">

          <div className="mx-auto max-w-[1280px] px-6 py-24 lg:px-10 lg:py-32">

            <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">

              <div>

                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/50">
                  04 / Become an instructor
                </p>

                <h2 className="mt-5 max-w-3xl text-5xl font-bold leading-[0.9] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
                  Your knowledge.
                  <br />
                  Their next step.
                </h2>

                <p className="mt-8 max-w-xl text-sm leading-6 text-white/60">
                  Bring your expertise to SkillX and create
                  meaningful learning experiences for students
                  everywhere.
                </p>

              </div>

              <div className="lg:pb-2">

                <Button href="/signup">
                  Become an instructor

                  <ArrowUpRight className="h-4 w-4" />
                </Button>

              </div>

            </div>

            <div className="mt-16 flex flex-col justify-between gap-6 border-t border-white/20 pt-6 text-xs text-white/45 sm:flex-row">

              <span>
                SkillX / Educator platform
              </span>

              <span className="font-mono uppercase tracking-[0.12em]">
                Teach. Inspire. Connect.
              </span>

            </div>

          </div>

        </section>

      </main>
    </>
  )
}