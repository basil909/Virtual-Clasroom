'use client'

import { useSearchParams } from 'next/navigation'
import Link from 'next/link'

import Button from '@/components/ui/Button'
import { api } from '@/lib/api'

import {
  ArrowUpRight,
  BookOpen,
  Clock3,
  GraduationCap,
  Play,
  Star,
  Users,
  Video
} from 'lucide-react'

const courseFilters = [
  { value: 'all', label: 'All courses' },
  { value: 'development', label: 'Development' },
  { value: 'data-ai', label: 'Data & AI' },
  { value: 'design', label: 'Design' },
  { value: 'business', label: 'Business' },
] as const

type CourseFilter = (typeof courseFilters)[number]['value']

const categoryKeywords: Record<Exclude<CourseFilter, 'all'>, string[]> = {
  development: ['development', 'programming', 'software', 'web'],
  'data-ai': ['data', 'algorithm', 'machine learning', 'artificial intelligence'],
  design: ['design', 'user interface', 'user experience'],
  business: ['business', 'management', 'marketing', 'finance'],
}

function isCourseFilter(value: string | undefined): value is CourseFilter {
  return courseFilters.some((filter) => filter.value === value)
}

function matchesCourseFilter(
  course: { title: string; description: string | null },
  filter: Exclude<CourseFilter, 'all'>
) {
  const searchableText = `${course.title} ${course.description ?? ''}`.toLowerCase()
  return categoryKeywords[filter].some((keyword) => searchableText.includes(keyword))
}

type CourseList = Awaited<ReturnType<typeof api.courses>>['courses']

export default function CoursesView({
  courses,
  coursesUnavailable,
}: {
  courses: CourseList
  coursesUnavailable: boolean
}) {
  const filterParam = useSearchParams().get('filter') ?? undefined
  const selectedFilter = isCourseFilter(filterParam)
    ? filterParam
    : 'all'
  const visibleCourses =
    selectedFilter === 'all'
      ? courses
      : courses.filter((course) => matchesCourseFilter(course, selectedFilter))

  return (
    <>
      <main className="bg-[#f5f4ef] text-[#171717]">

        {/* =====================================================
            HERO
        ====================================================== */}

        <section className="border-b border-black/10">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
            <div className="grid min-h-[680px] grid-cols-1 lg:grid-cols-[1.15fr_0.85fr]">

              {/* LEFT SIDE */}

              <div className="flex flex-col justify-center py-28 pr-0 lg:pr-20">

                <div className="mb-10 flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-[#1746d1]">
                  <span className="h-2 w-2 bg-[#1746d1]" />
                  SkillX / Courses
                </div>

                <h1 className="max-w-[850px] text-[clamp(3.5rem,7vw,7.5rem)] font-bold leading-[0.88] tracking-[-0.07em]">
                  Learn
                  <br />
                  something
                  <br />
                  <span className="text-[#1746d1]">useful.</span>
                </h1>

                <div className="mt-10 grid max-w-2xl grid-cols-1 gap-8 md:grid-cols-[1fr_auto]">

                  <p className="max-w-lg text-[17px] leading-7 text-black/60">
                    Practical courses, live instruction, and
                    projects designed around the skills people
                    actually use.
                  </p>

                  <div className="flex items-start">
                    <a
                      href="#course-catalog"
                      className="group inline-flex items-center gap-3 border-b border-black pb-2 text-sm font-bold"
                    >
                      Browse courses

                      <ArrowUpRight
                        className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1 group-hover:-translate-y-1"
                      />
                    </a>
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE */}

              <div className="relative border-l border-black/10">

                <div className="absolute right-0 top-8 font-mono text-[10px] uppercase tracking-[0.2em] text-black/40">
                  01 / Learn
                </div>

                <div className="flex h-full flex-col justify-end pb-12 pt-32 lg:pl-12">

                  {/* COURSE CATEGORIES */}

                  <div className="border-t border-black/10">

                    <div className="flex items-center justify-between border-b border-black/10 py-5">
                      <span className="text-xs font-bold uppercase tracking-[0.16em]">
                        Available programs
                      </span>

                      <span className="font-mono text-xs text-black/40">
                        {courses.length.toString().padStart(2, '0')}
                      </span>
                    </div>

                    {[
                      'Development',
                      'Data & AI',
                      'Design',
                      'Business',
                    ].map((item, index) => (
                      <div
                        key={item}
                        className="group flex items-center justify-between border-b border-black/10 py-5"
                      >
                        <div className="flex items-center gap-5">
                          <span className="font-mono text-xs text-black/30">
                            0{index + 1}
                          </span>

                          <span className="text-lg font-medium">
                            {item}
                          </span>
                        </div>

                        <ArrowUpRight className="h-4 w-4 text-black/30 transition-[opacity,transform,color,background-color,border-color] duration-200 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#1746d1]" />
                      </div>
                    ))}
                  </div>

                  {/* DESCRIPTION */}

                  <div className="mt-12 max-w-sm">
                    <p className="text-sm leading-6 text-black/50">
                      No endless playlists. No filler.
                      Just focused learning with people,
                      projects, and outcomes.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        {/* =====================================================
            COURSE CATALOG HEADER
        ====================================================== */}

        <section
          id="course-catalog"
          className="border-b border-black/10"
        >
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">

            <div className="flex flex-col justify-between gap-8 py-12 md:flex-row md:items-end">

              <div>
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-black/40">
                  02 / Course catalogue
                </p>

                <h2 className="mt-4 text-4xl font-bold tracking-[-0.045em] md:text-5xl">
                  Choose your direction.
                </h2>
              </div>

              <div className="max-w-md">
                <p className="text-sm leading-6 text-black/50">
                  Explore courses built for beginners,
                  professionals, and anyone who wants to
                  build something new.
                </p>
              </div>
            </div>

            {/* FILTER BAR */}

            <div className="flex flex-wrap border-t border-black/10 py-5">
              {courseFilters.map((filter) => (
                <Link
                  key={filter.value}
                  href={
                    filter.value === 'all'
                      ? '/courses#course-catalog'
                      : `/courses?filter=${filter.value}#course-catalog`
                  }
                  aria-current={selectedFilter === filter.value ? 'page' : undefined}
                  className={`mr-2 mb-2 inline-flex min-h-10 items-center border px-4 py-2 text-xs font-semibold transition-colors ${
                    selectedFilter === filter.value
                      ? 'border-[#171717] bg-[#171717] text-white'
                      : 'border-black/10 bg-transparent text-black/60 hover:border-black/30 hover:text-black'
                  }`}
                >
                  {filter.label}
                </Link>
              ))}
            </div>
          </div>
        </section>


        {/* =====================================================
            COURSE GRID
        ====================================================== */}

        <section className="border-b border-black/10">
          <div className="mx-auto max-w-[1280px] px-6 py-16 lg:px-10 lg:py-20">

            {visibleCourses.length > 0 ? (
              <div className="grid gap-px overflow-hidden border border-black/10 bg-black/10 md:grid-cols-2 xl:grid-cols-3">

                {visibleCourses.map((course, index) => (
                  <article
                    key={course.id}
                    className="group flex min-h-[500px] flex-col bg-[#f5f4ef] p-6 transition-colors duration-300 hover:bg-white md:p-7"
                  >

                    {/* CARD HEADER */}

                    <div className="flex items-start justify-between">

                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/40">
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      <span className="border border-black/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-black/50">
                        {course.level}
                      </span>
                    </div>


                    {/* COURSE VISUAL */}

                    <div className="relative mt-8 flex h-48 items-end overflow-hidden bg-[#172033] p-6">

                      <span className="absolute -right-3 -top-8 text-[150px] font-black leading-none tracking-[-0.1em] text-white/[0.05]">
                        {course.title.charAt(0)}
                      </span>

                      <div className="relative">
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-blue-300">
                          SkillX / Program
                        </span>

                        <div className="mt-3 h-px w-12 bg-blue-400" />
                      </div>

                      <div className="absolute bottom-5 right-5 flex items-center gap-2 border border-white/10 bg-white/5 px-3 py-2 text-[10px] font-medium text-white/70">
                        <Clock3 className="h-3 w-3" />
                        {course.duration}
                      </div>
                    </div>


                    {/* CARD CONTENT */}

                    <div className="flex flex-1 flex-col">

                      <h3 className="mt-7 max-w-sm text-2xl font-bold leading-tight tracking-[-0.035em]">
                        {course.title}
                      </h3>

                      <p className="mt-4 line-clamp-3 text-sm leading-6 text-black/55">
                        {course.description ??
                          'Master practical concepts through hands-on learning, interactive sessions, projects, and guided mentorship.'}
                      </p>


                      {/* INSTRUCTOR */}

                      <div className="mt-7 flex items-center gap-3">

                        <div className="flex h-9 w-9 items-center justify-center bg-[#1746d1] text-xs font-bold text-white">
                          {course.instructorName
                            ?.charAt(0)
                            ?.toUpperCase()}
                        </div>

                        <div>
                          <p className="font-mono text-[9px] uppercase tracking-wider text-black/35">
                            Instructor
                          </p>

                          <p className="text-xs font-semibold">
                            {course.instructorName}
                          </p>
                        </div>
                      </div>


                      {/* COURSE META */}

                      <div className="mt-7 flex items-center gap-5 border-t border-black/10 pt-5">

                        <div className="flex items-center gap-1.5 text-xs text-black/50">
                          <Users className="h-3.5 w-3.5" />
                          {course.studentCount}
                        </div>

                        <div className="flex items-center gap-1.5 text-xs text-black/50">
                          <Star className="h-3.5 w-3.5 fill-[#e6a817] text-[#e6a817]" />
                          {course.rating}
                        </div>

                        <span className="ml-auto text-[10px] uppercase tracking-wider text-black/30">
                          Certificate
                        </span>
                      </div>


                      {/* CARD ACTION */}

                      <div className="mt-auto flex items-center justify-between pt-7">

                        <details className="group/details">
                          <summary className="flex min-h-11 cursor-pointer list-none items-center gap-2 text-xs font-bold uppercase tracking-wider [&::-webkit-details-marker]:hidden">
                            Details

                            <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-open/details:rotate-45" />
                          </summary>

                          <div className="mt-2 max-w-xs border-l-2 border-[#1746d1] pl-3 text-xs leading-5 text-black/60">
                            <p>{course.description ?? 'A practical, instructor-led learning program.'}</p>
                            <p className="mt-2 font-semibold text-black/75">
                              {course.level} · {course.duration}
                            </p>
                          </div>
                        </details>

                        <Button href="/signup">
                          Enroll
                        </Button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (

              /* EMPTY STATE */

              <div className="border border-dashed border-black/20 py-24 text-center">

                <BookOpen className="mx-auto h-7 w-7 text-black/30" />

                <h3 className="mt-5 text-2xl font-bold">
                  {coursesUnavailable
                    ? 'Courses are temporarily unavailable.'
                    : courses.length > 0
                      ? `No ${courseFilters.find((filter) => filter.value === selectedFilter)?.label.toLowerCase()} found.`
                      : 'No courses yet.'}
                </h3>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-black/50">
                  {coursesUnavailable
                    ? 'We could not load the course catalogue. Please try again in a moment.'
                    : courses.length > 0
                      ? 'Try another category or browse all available courses.'
                      : 'Courses will appear here once instructors publish learning programs on SkillX.'}
                </p>

                {coursesUnavailable ? (
                  <a
                    href="/courses"
                    className="mt-6 inline-flex min-h-11 items-center justify-center bg-[#171717] px-5 text-sm font-bold text-white transition-colors hover:bg-[#1746d1]"
                  >
                    Try again
                  </a>
                ) : courses.length > 0 && selectedFilter !== 'all' ? (
                  <Link
                    href="/courses#course-catalog"
                    className="mt-6 inline-flex min-h-11 items-center justify-center bg-[#171717] px-5 text-sm font-bold text-white transition-colors hover:bg-[#1746d1]"
                  >
                    Browse all courses
                  </Link>
                ) : null}
              </div>
            )}
          </div>
        </section>


        {/* =====================================================
            WHY SKILLX
        ====================================================== */}

        <section className="border-b border-black/10">
          <div className="mx-auto max-w-[1280px] px-6 py-24 lg:px-10 lg:py-32">

            <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">

              {/* LEFT */}

              <div>
                <p className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-black/40">
                  03 / Why SkillX
                </p>

                <h2 className="mt-5 max-w-md text-4xl font-bold leading-[0.95] tracking-[-0.05em] md:text-5xl">
                  Learning should lead somewhere.
                </h2>
              </div>


              {/* RIGHT */}

              <div className="grid gap-px border border-black/10 bg-black/10 sm:grid-cols-2">

                {[
                  {
                    number: '01',
                    icon: Video,
                    title: 'Live instruction',
                    text: 'Learn with instructors instead of learning alone.',
                  },
                  {
                    number: '02',
                    icon: GraduationCap,
                    title: 'Real projects',
                    text: 'Turn concepts into work you can actually show.',
                  },
                  {
                    number: '03',
                    icon: Users,
                    title: 'People',
                    text: 'Learn alongside peers and experienced mentors.',
                  },
                  {
                    number: '04',
                    icon: Play,
                    title: 'Learn your way',
                    text: 'Combine live classes with flexible recorded lessons.',
                  },
                ].map((item) => {
                  const Icon = item.icon

                  return (
                    <div
                      key={item.number}
                      className="bg-[#f5f4ef] p-7 transition-colors hover:bg-white"
                    >
                      <div className="flex items-start justify-between">

                        <span className="font-mono text-[10px] text-black/30">
                          {item.number}
                        </span>

                        <Icon className="h-5 w-5 text-[#1746d1]" />
                      </div>

                      <h3 className="mt-12 text-lg font-bold tracking-tight">
                        {item.title}
                      </h3>

                      <p className="mt-3 text-sm leading-6 text-black/50">
                        {item.text}
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
        ====================================================== */}

        <section className="bg-[#1746d1] text-white">
          <div className="mx-auto max-w-[1280px] px-6 py-24 lg:px-10 lg:py-32">

            <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">

              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/50">
                  04 / Get started
                </p>

                <h2 className="mt-5 max-w-3xl text-5xl font-bold leading-[0.92] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
                  Build a skill.
                  <br />
                  Build your future.
                </h2>
              </div>

              <div className="lg:pb-2">
                <Button href="/signup">
                  Start learning
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="mt-16 flex flex-col justify-between gap-6 border-t border-white/20 pt-6 text-xs text-white/50 sm:flex-row">
              <span>
                SkillX / Virtual Classroom
              </span>

              <span>
                Learn. Build. Connect.
              </span>
            </div>
          </div>
        </section>

      </main>
    </>
  )
}
