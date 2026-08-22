import MarketingShell from '../../components/layout/MarketingShell'
import PageHeader from '../../components/layout/PageHeader'
import Button from '../../components/ui/Button'
import { api } from '../../lib/api'

export default async function CoursesPage() {
  let courses: Awaited<
    ReturnType<typeof api.courses>
  >['courses'] = []

  try {
    const data = await api.courses()
    courses = data.courses
  } catch {
    courses = []
  }

  return (
    <MarketingShell>
      {/* HERO */}

      <section className="relative overflow-hidden bg-gradient-to-br from-[#4f46e5] via-[#5b5fc7] to-[#312e81] px-6 py-28 text-white">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-indigo-300/10 blur-3xl" />

        <div className="relative mx-auto max-w-[1200px]">
          <div className="max-w-3xl">
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-md">
              SkillX Courses
            </span>

            <h1 className="mt-8 text-5xl font-black leading-tight md:text-6xl">
              Explore Our
              <span className="block text-indigo-200">
                Learning Programs
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-indigo-100">
              Discover industry-focused courses designed
              to help students, professionals, and teams
              build real-world skills through live classes,
              interactive projects, and expert mentorship.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/signup">
                Start Learning
              </Button>

              <Button
                href="/contact"
                variant="secondary"
              >
                Talk to an Advisor
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* COURSE CATALOG */}

      <section className="bg-slate-50 px-6 py-24">
        <div className="mx-auto max-w-[1200px]">
          {/* HEADER */}

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#5b5fc7]">
                Course Catalog
              </p>

              <h2 className="mt-4 text-4xl font-black text-slate-900">
                Learn From Industry Experts
              </h2>

              <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
                Choose from live, instructor-led, and
                self-paced programs covering development,
                design, business, AI, and emerging
                technologies.
              </p>
            </div>

            {/* STATS */}

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <h3 className="text-3xl font-black text-[#5b5fc7]">
                  {courses.length}+
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Available Courses
                </p>
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <h3 className="text-3xl font-black text-[#5b5fc7]">
                  10K+
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Active Learners
                </p>
              </div>
            </div>
          </div>

          {/* COURSES */}

          <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {courses.map((course) => (
              <article
                key={course.id}
                className="group overflow-hidden rounded-[32px] bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* IMAGE */}

                <div className="relative h-52 overflow-hidden bg-gradient-to-br from-[#5b5fc7] to-[#312e81]">
                  <div className="absolute inset-0 bg-black/10" />

                  <div className="absolute bottom-6 left-6">
                    <span className="rounded-full bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md">
                      {course.level}
                    </span>

                    <h2 className="mt-4 text-2xl font-black text-white">
                      {course.title}
                    </h2>
                  </div>
                </div>

                {/* CONTENT */}

                <div className="p-6">
                  {/* INSTRUCTOR */}

                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#5b5fc7] text-lg font-bold text-white">
                      {course.instructorName
                        ?.charAt(0)
                        ?.toUpperCase()}
                    </div>

                    <div>
                      <p className="text-sm text-slate-500">
                        Instructor
                      </p>

                      <h3 className="font-bold text-slate-900">
                        {course.instructorName}
                      </h3>
                    </div>
                  </div>

                  {/* DESCRIPTION */}

                  <p className="mt-6 line-clamp-3 text-sm leading-7 text-slate-600">
                    Master practical concepts with
                    hands-on learning, interactive live
                    sessions, projects, and guided
                    mentorship designed for modern learners.
                  </p>

                  {/* COURSE META */}

                  <div className="mt-6 grid grid-cols-3 gap-3">
                    <div className="rounded-2xl bg-slate-50 p-3 text-center">
                      <p className="text-xs uppercase tracking-wide text-slate-400">
                        Duration
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-800">
                        {course.duration}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-3 text-center">
                      <p className="text-xs uppercase tracking-wide text-slate-400">
                        Students
                      </p>

                      <p className="mt-1 text-sm font-bold text-slate-800">
                        {course.studentCount}
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-3 text-center">
                      <p className="text-xs uppercase tracking-wide text-slate-400">
                        Rating
                      </p>

                      <p className="mt-1 text-sm font-bold text-amber-500">
                        ★ {course.rating}
                      </p>
                    </div>
                  </div>

                  {/* TAGS */}

                  <div className="mt-6 flex flex-wrap gap-2">
                    <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-700">
                      Live Sessions
                    </span>

                    <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                      Certificate
                    </span>

                    <span className="rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold text-orange-700">
                      Projects
                    </span>
                  </div>

                  {/* CTA */}

                  <div className="mt-8 flex items-center justify-between">
                    <button className="text-sm font-bold text-[#5b5fc7] transition hover:text-[#4f52b2]">
                      View Details →
                    </button>

                    <Button href="/signup">
                      Enroll Now
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* EMPTY STATE */}

          {courses.length === 0 && (
            <div className="mt-16 rounded-[32px] border border-dashed border-slate-300 bg-white p-16 text-center">
              <h3 className="text-2xl font-bold text-slate-900">
                No Courses Available
              </h3>

              <p className="mx-auto mt-4 max-w-xl text-slate-500">
                Courses will appear here once instructors
                publish learning programs on the platform.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* BENEFITS */}

      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#5b5fc7]">
              Why Learn With SkillX
            </p>

            <h2 className="mt-4 text-4xl font-black text-slate-900">
              Designed for Modern Learning
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              SkillX combines live collaboration,
              mentorship, and practical learning to create
              immersive digital education experiences.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                icon: '🎥',
                title: 'Live Classes',
                description:
                  'Interactive real-time virtual classrooms.',
              },
              {
                icon: '📚',
                title: 'Recorded Sessions',
                description:
                  'Rewatch lessons anytime after class.',
              },
              {
                icon: '🧠',
                title: 'Expert Mentors',
                description:
                  'Learn directly from experienced educators.',
              },
              {
                icon: '📈',
                title: 'Track Progress',
                description:
                  'Monitor performance and learning growth.',
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-[28px] border border-slate-100 bg-slate-50 p-8 text-center transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="text-5xl">
                  {item.icon}
                </div>

                <h3 className="mt-6 text-xl font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}

      <section className="px-6 pb-28">
        <div className="mx-auto max-w-[1200px] overflow-hidden rounded-[36px] bg-gradient-to-r from-[#5b5fc7] to-[#312e81] px-10 py-20 text-center text-white shadow-2xl">
          <h2 className="text-4xl font-black">
            Start Your Learning Journey Today
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-indigo-100">
            Unlock new opportunities with interactive
            courses, expert mentorship, and immersive
            virtual learning experiences.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="/signup">
              Join SkillX
            </Button>

            <Button
              href="/contact"
              variant="secondary"
            >
              Request a Demo
            </Button>
          </div>
        </div>
      </section>
    </MarketingShell>
  )
}