import Link from 'next/link'

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-white px-6 pb-20 pt-16 md:pb-28 md:pt-24 lg:pb-32 lg:pt-28">
      
      {/* Animated background orbs */}
      <div className="absolute right-0 top-0 h-[700px] w-[700px] translate-x-1/3 -translate-y-1/4 rounded-full bg-gradient-to-br from-blue-100 via-indigo-50/60 to-violet-50/30 opacity-60 blur-3xl animate-[float_8s_ease-in-out_infinite]" />
      <div className="absolute left-0 bottom-0 h-[500px] w-[500px] -translate-x-1/4 translate-y-1/4 rounded-full bg-gradient-to-tr from-amber-50 via-orange-50/40 to-rose-50/20 opacity-40 blur-3xl animate-[float_10s_ease-in-out_infinite_2s]" />
      
      {/* Dot pattern overlay */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.015] bg-[radial-gradient(#3b82f6_1.5px,transparent_1.5px)] [background-size:32px_32px]" />
      
      <div className="relative mx-auto max-w-[1200px]">
        
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          
          {/* LEFT SIDE - MAIN CONTENT */}
          <div className="relative z-10">
            
            {/* MAIN HEADING */}
            <h1 className="text-5xl font-extrabold leading-[1.08] tracking-[-1.5px] text-slate-900 md:text-6xl lg:text-7xl lg:leading-[1.02]">
              <span className="block">Modern virtual</span>
              <span className="relative inline-block mt-2">
                <span className="relative z-10 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient_4s_ease_infinite]">
                  classrooms
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
              <span className="block mt-2">for next-gen learning.</span>
            </h1>
            
            {/* DESCRIPTION */}
            <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-500 md:text-xl">
              One platform for immersive live sessions, student management, and premium online education.
            </p>
            
            {/* CTA BUTTONS */}
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/signup"
                className="group relative overflow-hidden rounded-xl bg-slate-900 px-8 py-4 text-base font-bold text-white shadow-xl shadow-slate-200 transition-all duration-300 hover:shadow-2xl hover:shadow-slate-300 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Get Started Free
                  <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </span>
                <div className="absolute inset-0 -z-0 bg-gradient-to-r from-blue-600 to-indigo-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </Link>

              <Link
                href="/courses"
                className="group rounded-xl border-2 border-slate-100 bg-white px-8 py-4 text-base font-bold text-slate-700 shadow-lg shadow-slate-100/50 transition-all duration-300 hover:border-blue-200 hover:text-blue-600 hover:shadow-xl hover:shadow-blue-100/50 active:scale-[0.98]"
              >
                <span className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 transition-colors duration-300 group-hover:bg-blue-100">
                    <svg className="w-3 h-3 text-slate-400 transition-colors duration-300 group-hover:text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                  </span>
                  Browse Courses
                </span>
              </Link>
            </div>
            
          </div>
          
          {/* RIGHT SIDE - VISUAL CARD */}
          <div className="relative flex justify-center lg:justify-end">
            
            <div className="relative w-full max-w-[500px]">
              
              {/* Main Card */}
              <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 p-8 shadow-2xl shadow-slate-900/10 transition-transform duration-500 hover:scale-[1.02] md:p-10 group/card">
                
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-blue-500/10 blur-3xl animate-[pulse_4s_ease-in-out_infinite]" />
                <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-violet-500/10 blur-3xl animate-[pulse_4s_ease-in-out_infinite_1s]" />
                
                <div className="relative flex flex-col gap-8">
                  
                  {/* Live indicator */}
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
                  
                  {/* Icon */}
                  <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 text-3xl backdrop-blur-sm">
                    🎓
                  </div>
                  
                  {/* Content */}
                  <div className="space-y-3">
                    <h3 className="text-3xl font-extrabold leading-tight text-white md:text-4xl">
                      Interactive virtual classroom experience.
                    </h3>
                    
                    <p className="text-base leading-relaxed text-white/65">
                      Live classes, assignments, recordings, and collaboration tools — all in one place.
                    </p>
                  </div>
                  
                  {/* Feature Tags */}
                  <div className="flex flex-wrap gap-2">
                    {[
                      { icon: '📹', label: 'HD Video' },
                      { icon: '💻', label: 'Screen Share' },
                      { icon: '💬', label: 'Live Chat' },
                      { icon: '📝', label: 'Whiteboard' },
                    ].map((feature) => (
                      <span
                        key={feature.label}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-medium text-white/80 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 hover:border-white/20 hover:scale-105"
                      >
                        <span>{feature.icon}</span>
                        {feature.label}
                      </span>
                    ))}
                  </div>
                  
                </div>
              </div>
              
              {/* Floating card 1 - Stats */}
              <div className="absolute -top-12 -right-4 rounded-2xl bg-white p-4 shadow-2xl shadow-slate-200/60 animate-[float_6s_ease-in-out_infinite] md:-right-8">
                <div className="text-center">
                  <div className="text-2xl font-black text-slate-900">10+</div>
                  <div className="text-xs text-slate-500">Years of excellence</div>
                </div>
              </div>
              
              {/* Floating card 2 - Students */}
              <div className="absolute -bottom-19 -left-4 rounded-2xl bg-white p-4 shadow-2xl shadow-slate-200/60 animate-[float_7s_ease-in-out_infinite_1s] md:-left-10">
                <div className="text-center">
                  <div className="text-2xl font-black text-slate-900">250+</div>
                  <div className="text-xs text-slate-500">Premium courses</div>
                </div>
              </div>
              
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