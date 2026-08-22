import MarketingShell from '../../components/layout/MarketingShell'
import Button from '../../components/ui/Button'
import { api } from '../../lib/api'

export default async function TeachersPage() {
  let teachers: Awaited<
    ReturnType<typeof api.teachers>
  >['teachers'] = []

  try {
    teachers = (await api.teachers()).teachers
  } catch {
    teachers = []
  }

  return (
    <MarketingShell>
      {/* HERO SECTION */}

      <section className="relative overflow-hidden bg-gradient-to-br from-[#4f46e5] via-[#5b5fc7] to-[#312e81] px-6 py-28 text-white">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-indigo-300/10 blur-3xl" />

        <div className="relative mx-auto max-w-[1200px]">
          <div className="max-w-3xl">
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-md">
              Expert Educators
            </span>

            <h1 className="mt-8 text-5xl font-black leading-tight md:text-6xl">
              Meet the Teachers
              <span className="block text-indigo-200">
                Behind SkillX
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-indigo-100">
              Our instructors are industry professionals,
              mentors, and experienced educators dedicated
              to creating engaging and impactful learning
              experiences for every student.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/signup">
                Start Learning
              </Button>

              <Button
                href="/signup"
                variant="secondary"
              >
                Become an Instructor
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* TEACHERS SECTION */}

      <section className="bg-slate-50 px-6 py-24">
        <div className="mx-auto max-w-[1200px]">
          {/* HEADER */}

          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#5b5fc7]">
                Our Educators
              </p>

              <h2 className="mt-4 text-4xl font-black text-slate-900">
                Learn From Experienced Mentors
              </h2>

              <p className="mt-4 max-w-3xl text-lg leading-8 text-slate-600">
                SkillX instructors combine academic
                expertise with real-world industry
                experience to provide practical and engaging
                education.
              </p>
            </div>

            {/* STATS */}

            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <h3 className="text-3xl font-black text-[#5b5fc7]">
                  {teachers.length}+
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Active Teachers
                </p>
              </div>

              <div className="rounded-2xl bg-white p-5 shadow-sm">
                <h3 className="text-3xl font-black text-[#5b5fc7]">
                  4.9★
                </h3>

                <p className="mt-2 text-sm text-slate-500">
                  Average Rating
                </p>
              </div>
            </div>
          </div>

          {/* TEACHERS GRID */}

          <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {teachers.map((teacher, index) => (
              <article
                key={teacher.id}
                className="group overflow-hidden rounded-[32px] bg-white shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                {/* TOP SECTION */}

                <div className="relative overflow-hidden bg-gradient-to-br from-[#5b5fc7] to-[#312e81] px-8 py-10 text-white">
                  <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-white/10 blur-3xl" />

                  <div className="relative flex items-center gap-5">
                    {/* AVATAR */}

                    <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-white/20 bg-white/10 text-3xl font-black backdrop-blur-md">
                      {teacher.name.charAt(0)}
                    </div>

                    <div>
                      <h2 className="text-2xl font-black">
                        {teacher.name}
                      </h2>

                      <p className="mt-1 text-sm font-medium text-indigo-100">
                        {teacher.subject}
                      </p>
                    </div>
                  </div>

                  {/* BADGES */}

                  <div className="mt-8 flex flex-wrap gap-2">
                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-md">
                      Live Sessions
                    </span>

                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-md">
                      Mentorship
                    </span>

                    <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-semibold backdrop-blur-md">
                      Certification
                    </span>
                  </div>
                </div>

                {/* CONTENT */}

                <div className="p-8">
                  {/* BIO */}

                  <p className="leading-7 text-slate-600">
                    {teacher.bio}
                  </p>

                  {/* STATS */}

                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="rounded-2xl bg-slate-50 p-4 text-center">
                      <h3 className="text-2xl font-black text-[#5b5fc7]">
                        {teacher.students}
                      </h3>

                      <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">
                        Students
                      </p>
                    </div>

                    <div className="rounded-2xl bg-slate-50 p-4 text-center">
                      <h3 className="text-2xl font-black text-amber-500">
                        ★ {teacher.rating}
                      </h3>

                      <p className="mt-1 text-xs uppercase tracking-wide text-slate-500">
                        Rating
                      </p>
                    </div>
                  </div>

                  {/* EXPERIENCE */}

                  <div className="mt-8 space-y-4">
                    <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                      <span className="text-sm text-slate-500">
                        Experience
                      </span>

                      <span className="font-semibold text-slate-800">
                        {5 + index} Years
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                      <span className="text-sm text-slate-500">
                        Specialization
                      </span>

                      <span className="font-semibold text-slate-800">
                        {teacher.subject}
                      </span>
                    </div>

                    <div className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                      <span className="text-sm text-slate-500">
                        Availability
                      </span>

                      <span className="font-semibold text-emerald-600">
                        Active
                      </span>
                    </div>
                  </div>

                  {/* CTA */}

                  <div className="mt-8 flex items-center justify-between">
                    <button className="text-sm font-bold text-[#5b5fc7] transition hover:text-[#4f52b2]">
                      View Profile →
                    </button>

                    <Button href="/signup">
                      Join Class
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* EMPTY STATE */}

          {teachers.length === 0 && (
            <div className="mt-16 rounded-[32px] border border-dashed border-slate-300 bg-white p-16 text-center">
              <h3 className="text-2xl font-bold text-slate-900">
                No Teachers Available
              </h3>

              <p className="mx-auto mt-4 max-w-xl text-slate-500">
                Teachers and instructors will appear here
                once they join the SkillX platform.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* WHY TEACH WITH US */}

      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#5b5fc7]">
              Teach on SkillX
            </p>

            <h2 className="mt-4 text-4xl font-black text-slate-900">
              Empower Students Worldwide
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              Join a growing network of educators using
              SkillX to deliver interactive and scalable
              online learning experiences.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {[
              {
                icon: '🎥',
                title: 'Virtual Classrooms',
                description:
                  'Conduct immersive live sessions with modern video tools.',
              },
              {
                icon: '📚',
                title: 'Course Management',
                description:
                  'Organize assignments, recordings, and student progress.',
              },
              {
                icon: '📈',
                title: 'Analytics Dashboard',
                description:
                  'Track engagement and classroom performance in real time.',
              },
              {
                icon: '🌍',
                title: 'Global Reach',
                description:
                  'Teach students from anywhere in the world.',
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
            Become a SkillX Educator
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-indigo-100">
            Inspire learners, build impactful courses, and
            teach using modern virtual classroom
            technology.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="/signup">
              Apply as Teacher
            </Button>

            <Button
              href="/contact"
              variant="secondary"
            >
              Contact Our Team
            </Button>
          </div>
        </div>
      </section>
    </MarketingShell>
  )
}