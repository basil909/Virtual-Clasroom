import Link from 'next/link'

export default function DashboardPreview() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-28">
      
      {/* Animated background orbs */}
      <div className="absolute right-0 top-0 h-[600px] w-[600px] translate-x-1/3 -translate-y-1/4 rounded-full bg-gradient-to-br from-blue-100 via-indigo-50/60 to-violet-50/30 opacity-50 blur-3xl animate-[float_8s_ease-in-out_infinite]" />
      <div className="absolute left-0 bottom-0 h-[500px] w-[500px] -translate-x-1/4 translate-y-1/4 rounded-full bg-gradient-to-tr from-amber-50 via-orange-50/40 to-rose-50/20 opacity-40 blur-3xl animate-[float_10s_ease-in-out_infinite_2s]" />
      
      {/* Dot pattern overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.015] bg-[radial-gradient(#3b82f6_1.5px,transparent_1.5px)] [background-size:32px_32px]" />

      <div className="relative mx-auto grid max-w-[1200px] items-center gap-20 lg:grid-cols-2">

        {/* LEFT */}
        <div className="relative z-10">

          <h2 className="text-5xl font-extrabold leading-[1.08] tracking-[-1.5px] text-slate-900 md:text-6xl">
            Powerful dashboards
            <br />
            for every
            <span className="relative inline-block ml-3">
              <span className="relative z-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_4s_ease_infinite]">
                role.
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
          </h2>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-500 md:text-xl">
            Separate dashboards for admins, teachers, and students with real-time classroom management, analytics, assignments, and recordings.
          </p>

          <Link
            href="/login"
            className="group relative mt-10 inline-flex overflow-hidden rounded-xl bg-slate-900 px-8 py-4 text-base font-bold text-white shadow-xl shadow-slate-200 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-300 hover:scale-[1.02] active:scale-[0.98]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Explore Dashboard
              <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <div className="absolute inset-0 -z-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          </Link>

        </div>

        {/* RIGHT */}
        <div className="relative h-[650px] flex justify-center lg:justify-end">

          {/* MAIN CARD */}
          <div className="absolute right-0 top-0 w-full max-w-[520px] overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-8 shadow-2xl shadow-slate-900/10 transition-transform duration-500 hover:scale-[1.02] md:p-10 group/card">
            
            <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl animate-[pulse_4s_ease-in-out_infinite]" />
            <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl animate-[pulse_4s_ease-in-out_infinite_1s]" />

            <div className="relative flex flex-col gap-8">

              {/* Top bar */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="relative flex h-3 w-3">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400"></span>
                  </span>
                  <span className="text-sm font-semibold text-white/90 tracking-wide uppercase">Live Now</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="h-2 w-2 rounded-full bg-amber-400/80"></div>
                  <div className="h-2 w-2 rounded-full bg-emerald-400/80"></div>
                  <div className="h-2 w-2 rounded-full bg-rose-400/80"></div>
                </div>
              </div>

              {/* Title */}
              <h3 className="text-3xl font-extrabold leading-tight text-white">
                Admin Dashboard
              </h3>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5 p-5 transition-all duration-300 hover:bg-white/10">
                  <p className="text-sm text-white/50">Students</p>
                  <h4 className="mt-2 text-3xl font-black text-white">12K</h4>
                </div>
                <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5 p-5 transition-all duration-300 hover:bg-white/10">
                  <p className="text-sm text-white/50">Teachers</p>
                  <h4 className="mt-2 text-3xl font-black text-white">450</h4>
                </div>
                <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5 p-5 transition-all duration-300 hover:bg-white/10">
                  <p className="text-sm text-white/50">Live Classes</p>
                  <h4 className="mt-2 text-3xl font-black text-white">84</h4>
                </div>
                <div className="rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5 p-5 transition-all duration-300 hover:bg-white/10">
                  <p className="text-sm text-white/50">Recordings</p>
                  <h4 className="mt-2 text-3xl font-black text-white">1.2K</h4>
                </div>
              </div>

            </div>
          </div>

          {/* FLOAT CARD */}
          <div className="absolute -bottom-1 -left-4 rounded-2xl bg-white p-6 shadow-2xl shadow-slate-200/60 animate-[float_7s_ease-in-out_infinite_1s] md:-left-10">
            <div className="text-center">
              <div className="text-3xl font-black text-slate-900">+92%</div>
              <div className="mt-2 text-sm text-slate-500">Increased engagement in<br />online classrooms.</div>
            </div>
          </div>

        </div>

      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 0.8; }
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