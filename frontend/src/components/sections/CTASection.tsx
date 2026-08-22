import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-28">
      
      {/* Animated background orbs */}
      <div className="absolute right-0 top-0 h-[600px] w-[600px] translate-x-1/3 -translate-y-1/4 rounded-full bg-gradient-to-br from-blue-100 via-indigo-50/60 to-violet-50/30 opacity-50 blur-3xl animate-[float_8s_ease-in-out_infinite]" />
      <div className="absolute left-0 bottom-0 h-[500px] w-[500px] -translate-x-1/4 translate-y-1/4 rounded-full bg-gradient-to-tr from-amber-50 via-orange-50/40 to-rose-50/20 opacity-40 blur-3xl animate-[float_10s_ease-in-out_infinite_2s]" />
      
      {/* Dot pattern overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.015] bg-[radial-gradient(#3b82f6_1.5px,transparent_1.5px)] [background-size:32px_32px]" />

      <div className="relative mx-auto max-w-[1200px]">

        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 px-8 py-24 text-center shadow-2xl shadow-slate-900/10 md:px-20 group/card">
          
          {/* Glow effects */}
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl animate-[pulse_4s_ease-in-out_infinite]" />
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl animate-[pulse_4s_ease-in-out_infinite_1s]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-60 w-60 rounded-full bg-indigo-500/5 blur-3xl animate-[pulse_4s_ease-in-out_infinite_2s]" />

          {/* CONTENT */}
          <div className="relative z-10 mx-auto max-w-3xl">

            {/* Live indicator */}
            <div className="inline-flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-400"></span>
              </span>
              <span className="text-sm font-semibold text-white/90 tracking-wide uppercase">Virtual Learning Platform</span>
            </div>

            {/* TITLE */}
            <h2 className="mt-8 text-5xl font-extrabold leading-[1.08] tracking-[-1.5px] text-white md:text-6xl">
              Learn smarter.
              <br />
              <span className="relative inline-block mt-2">
                <span className="relative z-10 bg-gradient-to-r from-blue-400 via-indigo-400 to-violet-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_4s_ease_infinite]">
                  Teach better.
                </span>
                <svg 
                  className="absolute -bottom-2 left-0 w-full h-3 -z-10" 
                  viewBox="0 0 200 12" 
                  preserveAspectRatio="none"
                >
                  <path 
                    d="M0,6 Q50,0 100,6 Q150,12 200,6" 
                    stroke="#818cf8" 
                    strokeWidth="4" 
                    fill="none" 
                    strokeLinecap="round"
                    className="opacity-40"
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

            {/* DESCRIPTION */}
            <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/65 md:text-xl">
              Create immersive classrooms, collaborate in real-time, and deliver modern online education experiences.
            </p>

            {/* BUTTONS */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">

              {/* PRIMARY */}
              <Link
                href="/signup"
                className="group relative overflow-hidden rounded-xl bg-white px-8 py-4 text-base font-bold text-slate-900 shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
              </Link>

              <Link
                href="/about"
                className="group rounded-xl border border-white/10 bg-white/5 px-8 py-4 text-base font-bold text-white backdrop-blur-sm transition-all duration-300 hover:border-white/20 hover:bg-white/10 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="flex items-center gap-2">Explore Platform</span>
              </Link>

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