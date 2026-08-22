const features = [
  {
    title: 'Login System',
    description:
      'Secure authentication and seamless account access for students, teachers, and administrators.',
    icon: '🔐',
    accent: 'from-sky-400 to-blue-500',
  },
  {
    title: 'Admin Dashboard',
    description:
      'Manage classrooms, analytics, users, reports, and platform activity from one place.',
    icon: '📊',
    accent: 'from-indigo-400 to-violet-500',
  },
  {
    title: 'Teacher Panel',
    description:
      'Create lessons, host live classes, upload resources, and track student performance.',
    icon: '👨‍🏫',
    accent: 'from-emerald-400 to-green-500',
  },
  {
    title: 'Student Portal',
    description:
      'Access classes, assignments, recordings, schedules, and progress tracking tools.',
    icon: '🎓',
    accent: 'from-orange-400 to-amber-500',
  },
  {
    title: 'Virtual Classroom',
    description:
      'Interactive online classrooms with collaboration, screen sharing, and live sessions.',
    icon: '💻',
    accent: 'from-pink-400 to-rose-500',
  },
  {
    title: 'Class Recordings',
    description:
      'Watch saved classroom sessions anytime across desktop, tablet, and mobile devices.',
    icon: '🎥',
    accent: 'from-cyan-400 to-sky-500',
  },
]

export default function PlatformFeaturesGrid() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-32">
      
      {/* Animated background orbs */}
      <div className="absolute left-0 top-0 h-[600px] w-[600px] -translate-x-1/4 -translate-y-1/4 rounded-full bg-gradient-to-br from-blue-100 via-indigo-50/60 to-violet-50/30 opacity-50 blur-3xl animate-[float_10s_ease-in-out_infinite]" />
      <div className="absolute right-0 bottom-0 h-[500px] w-[500px] translate-x-1/4 translate-y-1/4 rounded-full bg-gradient-to-tr from-amber-50 via-orange-50/40 to-rose-50/20 opacity-40 blur-3xl animate-[float_8s_ease-in-out_infinite_2s]" />
      
      {/* Dot pattern overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.015] bg-[radial-gradient(#3b82f6_1.5px,transparent_1.5px)] [background-size:32px_32px]" />

      <div className="relative mx-auto max-w-[1200px]">

        {/* TOP CONTENT */}
        <div className="max-w-3xl mx-auto text-center">

          <h2 className="text-5xl font-extrabold leading-[1.08] tracking-[-1.5px] text-slate-900 md:text-6xl">
            Everything needed for
            <span className="relative inline-block ml-3">
              <span className="relative z-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_4s_ease_infinite]">
                premium
              </span>
              <svg 
                className="absolute -bottom-2 left-0 w-full h-3 -z-10" 
                viewBox="0 0 200 12" 
                preserveAspectRatio="none"
              >
                <path 
                  d="M0,6 Q50,0 100,6 Q150,12 200,6" 
                  stroke="#93c5fd" 
                  strokeWidth="4" 
                  fill="none" 
                  strokeLinecap="round"
                  className="opacity-60"
                >
                  <animate 
                    attributeName="d" 
                    values="M0,6 Q50,0 100,6 Q150,12 200,6;M0,6 Q50,12 100,6 Q150,0 200,6;M0,6 Q50,0 100,6 Q150,12 200,6" 
                    dur="3s" 
                    repeatCount="indefinite"
                  />
                </path>
              </svg>
            </span>
            <br />
            virtual learning.
          </h2>

          <p className="mt-6 max-w-2xl mx-auto text-lg leading-relaxed text-slate-500 md:text-xl">
            Designed for modern educational platforms with advanced classroom management, collaboration, recordings, and analytics.
          </p>

        </div>

        {/* GRID */}
        <div className="mt-20 grid gap-8 md:grid-cols-2 xl:grid-cols-3">

          {features.map((feature) => (
            <div
              key={feature.title}
              className="group relative overflow-hidden rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-xl shadow-slate-100/50 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-slate-200/50"
            >

              {/* Icon */}
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 text-2xl shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-md">
                <span>{feature.icon}</span>
              </div>

              {/* Title */}
              <h3 className="mt-6 text-2xl font-bold tracking-[-0.5px] text-slate-900">
                {feature.title}
              </h3>

              {/* Description */}
              <p className="mt-3 text-base leading-relaxed text-slate-500">
                {feature.description}
              </p>

              {/* Arrow */}
              <div className="mt-8 flex items-center">
                <span className="inline-flex items-center text-sm font-bold text-slate-400 transition-all duration-300 group-hover:text-blue-600 group-hover:translate-x-1">
                  Explore
                  <svg className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </span>
              </div>

            </div>
          ))}

        </div>

      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </section>
  )
}