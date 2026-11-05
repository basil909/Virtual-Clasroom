import Link from 'next/link'

import Button from '@/components/ui/Button'

export default function ContactPage() {
  return (
    <>
      <main className="bg-[#f5f4ef] text-[#171717]">
        <section className="border-b border-black/10">
          <div className="mx-auto max-w-[1280px] px-6 py-20 lg:px-10 lg:py-28">
            <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div>
                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-[#1746d1]">
                  SkillX / Contact
                </p>

                <h1 className="mt-6 text-[clamp(3rem,7vw,6rem)] font-bold leading-[0.84] tracking-[-0.075em]">
                  Let&apos;s build
                  <br />
                  better learning
                  <br />
                  <span className="text-[#1746d1]">together.</span>
                </h1>

                <p className="mt-8 max-w-xl text-[17px] leading-7 text-black/55">
                  Whether you&apos;re exploring a new class, planning a cohort,
                  or looking for support, we&apos;d love to hear from you.
                </p>

                <div className="mt-10 flex flex-wrap gap-4">
                  <Button href="mailto:hello@skillx.example.com" variant="primary">
                    Email us
                  </Button>

                  <Button href="/signup" variant="secondary">
                    Create account
                  </Button>
                </div>
              </div>

              <div className="rounded-[28px] border border-black/10 bg-white p-8 shadow-[0_20px_60px_rgba(23,23,23,0.06)]">
                <div className="space-y-8">
                  <div>
                    <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-black/35">
                      Contact details
                    </p>

                    <div className="mt-5 space-y-4 text-sm text-black/60">
                      <p>
                        <span className="font-bold text-[#171717]">Email:</span>{' '}
                        <a
                          href="mailto:hello@skillx.example.com"
                          className="text-[#1746d1] transition-colors hover:text-[#171717]"
                        >
                          hello@skillx.example.com
                        </a>
                      </p>

                      <p>
                        <span className="font-bold text-[#171717]">Office hours:</span>{' '}
                        Monday to Friday, 9:00–18:00 UTC
                      </p>

                      <p>
                        <span className="font-bold text-[#171717]">Response time:</span>{' '}
                        Within 1 business day
                      </p>
                    </div>
                  </div>

                  <div className="rounded-2xl bg-[#f5f4ef] p-5">
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-black/35">
                      Quick actions
                    </p>

                    <div className="mt-4 space-y-3 text-sm">
                      <Link
                        href="/courses"
                        className="flex items-center justify-between border-b border-black/10 pb-3 font-medium text-[#171717]"
                      >
                        Explore courses
                        <span aria-hidden="true">→</span>
                      </Link>

                      <Link
                        href="/pricing"
                        className="flex items-center justify-between border-b border-black/10 pb-3 font-medium text-[#171717]"
                      >
                        View pricing
                        <span aria-hidden="true">→</span>
                      </Link>

                      <Link
                        href="/about"
                        className="flex items-center justify-between font-medium text-[#171717]"
                      >
                        Learn about SkillX
                        <span aria-hidden="true">→</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
