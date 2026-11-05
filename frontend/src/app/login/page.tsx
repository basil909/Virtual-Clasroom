import { Suspense } from 'react'
import Link from 'next/link'

import AuthForm from '@/features/auth/components/AuthForm'

export default function LoginPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-[#f5f4ef] text-[#171717]">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="border-b border-black/10">
        <div className="mx-auto flex h-[76px] max-w-[1280px] items-center justify-between px-6 lg:px-10">

          <Link
            href="/"
            aria-label="SkillX home"
            className="group flex items-center gap-3"
          >
            <span className="flex h-8 w-8 items-center justify-center bg-[#171717] text-sm font-bold text-white transition-colors duration-200 group-hover:bg-[#1746d1]">
              S
            </span>

            <span className="text-[18px] font-bold tracking-[-0.04em]">
              Skill<span className="text-[#1746d1]">X</span>
            </span>
          </Link>

          <Link
            href="/"
            className="group flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-black/45 transition-colors hover:text-[#171717]"
          >
            <span className="text-[#1746d1] transition-transform duration-200 group-hover:-translate-x-1">
              ←
            </span>

            Back to site
          </Link>

        </div>
      </header>


      {/* =====================================================
          MAIN
      ===================================================== */}

      <section className="mx-auto max-w-[1280px] px-6 lg:px-10">

        <div className="grid min-h-[calc(100vh-77px)] grid-cols-1 lg:grid-cols-2">

          {/* =================================================
              LEFT PANEL
          ================================================= */}

          <div className="flex min-w-0 flex-col justify-center border-b border-black/10 py-20 lg:border-b-0 lg:border-r lg:py-24 lg:pr-16 xl:pr-24">

            <div className="max-w-[620px]">

              <div className="flex items-center gap-3">

                <span className="h-2 w-2 shrink-0 bg-[#1746d1]" />

                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-black/45">
                  SkillX / Account
                </span>

              </div>


              <h1 className="mt-8 max-w-[620px] text-[clamp(4rem,7vw,7rem)] font-bold leading-[0.82] tracking-[-0.075em]">
                Welcome
                <br />
                <span className="text-[#1746d1]">
                  back.
                </span>
              </h1>


              <p className="mt-8 max-w-[520px] text-[16px] leading-7 text-black/55">
                Continue your learning journey, join your
                classroom, and keep building your skills.
              </p>


              <div className="mt-14 max-w-[520px] border-t border-black/10 pt-6">

                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-black/30">
                  SkillX / Virtual Classroom
                </p>

                <p className="mt-3 text-sm font-medium text-black/45">
                  Learn. Build. Connect.
                </p>

              </div>

            </div>

          </div>


          {/* =================================================
              RIGHT PANEL
          ================================================= */}

          <div className="flex min-w-0 items-center justify-center py-16 lg:px-10 xl:px-16">

            <div className="w-full min-w-0 max-w-[560px]">

              {/* SECTION LABEL */}

              <div className="mb-6">

                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-black/35">
                  01 / Sign in
                </p>

              </div>


              {/* =================================================
                  FORM CARD
              ================================================= */}

              <div className="w-full min-w-0 overflow-hidden rounded-[28px] bg-white p-8 shadow-[0_20px_60px_rgba(23,23,23,0.06)] sm:p-10 lg:p-11">

                <div className="min-w-0">

                  <Suspense
                    fallback={
                      <div className="flex min-h-[360px] items-center justify-center">
                        <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-black/35">
                          Loading...
                        </p>
                      </div>
                    }
                  >
                    <AuthForm mode="login" />
                  </Suspense>

                </div>

              </div>


              {/* SIGN UP */}

              <div className="mt-6 flex items-center justify-between gap-4 px-1 text-sm">

                <span className="text-black/40">
                  Don't have an account?
                </span>

                <Link
                  href="/signup"
                  className="font-bold text-[#1746d1] transition-colors hover:text-[#171717]"
                >
                  Sign up →
                </Link>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          MOBILE FOOTER
      ===================================================== */}

      <footer className="border-t border-black/10 lg:hidden">

        <div className="flex items-center justify-between px-6 py-5 font-mono text-[9px] uppercase tracking-[0.14em] text-black/30">

          <span>
            SkillX / Authentication
          </span>

          <span>
            SKX-2026
          </span>

        </div>

      </footer>

    </main>
  )
}