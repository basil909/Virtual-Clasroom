import Link from 'next/link'

export default function StatsSection() {
  return (
    <section className="px-6 py-28">

      <div className="mx-auto max-w-[1400px] overflow-hidden rounded-[48px] bg-slate-900 px-10 py-20 text-white shadow-[0_30px_80px_rgba(15,23,42,0.25)] lg:px-20">

        <div className="grid items-center gap-20 lg:grid-cols-2">

          {/* LEFT SIDE */}
          <div>

            <p className="text-sm font-bold uppercase tracking-[0.35em] text-sky-400">
              Platform Statistics
            </p>

            <h2 className="mt-8 text-6xl font-black leading-[1.05] tracking-[-3px]">

              Trusted by thousands of students worldwide.

            </h2>

            <p className="mt-8 max-w-xl text-xl leading-9 text-slate-300">

              Our virtual classroom platform helps students,
              teachers, and institutions create immersive online
              learning experiences with modern collaboration tools.

            </p>

            <Link
              href="/signup"
              className="mt-10 inline-block rounded-full bg-white px-8 py-4 text-lg font-bold text-slate-900 transition duration-300 hover:scale-105"
            >
              Explore Platform
            </Link>

          </div>

          {/* RIGHT SIDE */}
          <div className="grid grid-cols-2 gap-8">

            {/* CARD */}
            <div className="rounded-[32px] bg-slate-800 p-8 transition duration-300 hover:-translate-y-2 hover:bg-slate-700">

              <p className="text-sm uppercase tracking-[0.25em] text-sky-400">
                Students
              </p>

              <h3 className="mt-6 text-6xl font-black">
                12K+
              </h3>

              <p className="mt-4 text-lg text-slate-400">
                Active learners using the platform daily.
              </p>

            </div>

            {/* CARD */}
            <div className="rounded-[32px] bg-slate-800 p-8 transition duration-300 hover:-translate-y-2 hover:bg-slate-700">

              <p className="text-sm uppercase tracking-[0.25em] text-sky-400">
                Teachers
              </p>

              <h3 className="mt-6 text-6xl font-black">
                450+
              </h3>

              <p className="mt-4 text-lg text-slate-400">
                Professional educators and mentors.
              </p>

            </div>

            {/* CARD */}
            <div className="rounded-[32px] bg-slate-800 p-8 transition duration-300 hover:-translate-y-2 hover:bg-slate-700">

              <p className="text-sm uppercase tracking-[0.25em] text-sky-400">
                Live Classes
              </p>

              <h3 className="mt-6 text-6xl font-black">
                2.4K
              </h3>

              <p className="mt-4 text-lg text-slate-400">
                Interactive virtual sessions every week.
              </p>

            </div>

            {/* CARD */}
            <div className="rounded-[32px] bg-slate-800 p-8 transition duration-300 hover:-translate-y-2 hover:bg-slate-700">

              <p className="text-sm uppercase tracking-[0.25em] text-sky-400">
                Satisfaction
              </p>

              <h3 className="mt-6 text-6xl font-black">
                98%
              </h3>

              <p className="mt-4 text-lg text-slate-400">
                Student satisfaction and engagement rate.
              </p>

            </div>

          </div>

        </div>

      </div>

    </section>
  )
}