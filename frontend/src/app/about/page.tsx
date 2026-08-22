import MarketingShell from '../../components/layout/MarketingShell'
import PageHeader from '../../components/layout/PageHeader'
import Button from '../../components/ui/Button'

const values = [
  {
    title: 'Accessible Education',
    description:
      'Deliver high-quality learning experiences to students anywhere through modern virtual classrooms, live interaction, and collaborative learning tools.',
    icon: '🌍',
  },
  {
    title: 'Teacher Empowerment',
    description:
      'Equip educators with intelligent tools for conducting live sessions, managing assignments, tracking student progress, and simplifying classroom management.',
    icon: '🎓',
  },
  {
    title: 'Interactive Learning',
    description:
      'Create engaging online classrooms with live video calls, recordings, real-time chat, quizzes, and collaborative learning experiences.',
    icon: '💬',
  },
  {
    title: 'Performance Analytics',
    description:
      'Provide institutions and educators with powerful dashboards and insights to monitor engagement, attendance, and academic performance.',
    icon: '📊',
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
  'Modern responsive interface',
]

export default function AboutPage() {
  return (
    <MarketingShell>
      {/* HERO */}

      <section className="relative overflow-hidden bg-gradient-to-br from-[#4f46e5] via-[#5b5fc7] to-[#312e81] px-6 py-28 text-white">
        <div className="absolute left-0 top-0 h-96 w-96 rounded-full bg-white/10 blur-3xl" />

        <div className="absolute bottom-0 right-0 h-96 w-96 rounded-full bg-indigo-300/10 blur-3xl" />

        <div className="relative mx-auto max-w-[1200px]">
          <div className="max-w-3xl">
            <span className="rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-semibold backdrop-blur-md">
              About SkillX
            </span>

            <h1 className="mt-8 text-5xl font-black leading-tight md:text-6xl">
              Building the Future of
              <span className="block text-indigo-200">
                Online Education
              </span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-8 text-indigo-100">
              SkillX is a next-generation virtual classroom
              platform designed for schools, universities,
              educators, tutors, and modern learning
              institutions. We combine live learning,
              collaboration, analytics, and classroom
              management into one seamless digital
              ecosystem.
            </p>

            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/signup">
                Get Started
              </Button>

              <Button
                href="/contact"
                variant="secondary"
              >
                Contact Us
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* STORY */}

      <section className="bg-white px-6 py-24">
        <div className="mx-auto grid max-w-[1200px] gap-16 lg:grid-cols-2 lg:items-center">
          {/* LEFT */}

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#5b5fc7]">
              Our Mission
            </p>

            <h2 className="mt-4 text-4xl font-black leading-tight text-slate-900">
              Making Online Learning Feel Human Again
            </h2>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Traditional online education platforms often
              feel disconnected and difficult to manage.
              SkillX was created to bridge the gap between
              physical and virtual classrooms by offering
              immersive, interactive, and easy-to-use
              digital learning experiences.
            </p>

            <p className="mt-6 text-lg leading-8 text-slate-600">
              Our platform enables institutions and
              educators to host live classes, manage
              students, conduct assessments, store
              recordings, and monitor learning progress —
              all within a single modern environment.
            </p>
          </div>

          {/* RIGHT */}

          <div className="rounded-[32px] bg-gradient-to-br from-slate-100 to-slate-200 p-10 shadow-xl">
            <h3 className="text-2xl font-black text-slate-900">
              Why Institutions Choose SkillX
            </h3>

            <div className="mt-8 grid gap-4">
              {features.map((feature) => (
                <div
                  key={feature}
                  className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#5b5fc7] text-white">
                    ✓
                  </div>

                  <p className="font-medium text-slate-700">
                    {feature}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* VALUES */}

      <section className="bg-slate-50 px-6 py-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="text-center">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#5b5fc7]">
              Core Values
            </p>

            <h2 className="mt-4 text-4xl font-black text-slate-900">
              What Drives Us Forward
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600">
              SkillX is built around the idea that learning
              should be accessible, collaborative, engaging,
              and powered by modern technology.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
            {values.map((value) => (
              <div
                key={value.title}
                className="group rounded-[28px] bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
              >
                <div className="text-5xl">
                  {value.icon}
                </div>

                <h3 className="mt-6 text-2xl font-bold text-slate-900">
                  {value.title}
                </h3>

                <p className="mt-4 leading-7 text-slate-600">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PLATFORM STATS */}

      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-[1200px]">
          <div className="grid gap-6 md:grid-cols-4">
            {[
              {
                label: 'Virtual Sessions',
                value: '10K+',
              },
              {
                label: 'Students Connected',
                value: '50K+',
              },
              {
                label: 'Institutions',
                value: '500+',
              },
              {
                label: 'Assignments Submitted',
                value: '120K+',
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-[28px] border border-slate-100 bg-slate-50 p-8 text-center"
              >
                <h3 className="text-5xl font-black text-[#5b5fc7]">
                  {stat.value}
                </h3>

                <p className="mt-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
                  {stat.label}
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
            Ready to Transform Learning?
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-indigo-100">
            Join educators and institutions already using
            SkillX to deliver engaging and scalable digital
            learning experiences.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button href="/signup">
              Start Learning
            </Button>

            <Button
              href="/contact"
              variant="secondary"
            >
              Book a Demo
            </Button>
          </div>
        </div>
      </section>
    </MarketingShell>
  )
}