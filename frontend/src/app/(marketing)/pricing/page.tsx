import Button from '@/components/ui/Button'
import { api } from '@/lib/api'

import {
  ArrowUpRight,
  Check,
  Building2,
  Sparkles,
} from 'lucide-react'

export const revalidate = 60

export default async function PricingPage() {
  let plans: Awaited<
    ReturnType<typeof api.pricing>
  >['plans'] = []
  let plansUnavailable = false

  try {
    plans = (await api.pricing()).plans
  } catch {
    plansUnavailable = true
  }

  return (
    <>
      <main className="bg-[#f5f4ef] text-[#171717]">

        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="border-b border-black/10">
          <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
            <div className="grid min-h-[620px] grid-cols-1 lg:grid-cols-[1.15fr_0.85fr]">

              {/* LEFT */}

              <div className="flex flex-col justify-center py-24 lg:border-r lg:border-black/10 lg:pr-20">

                <div className="mb-10 flex items-center gap-3">
                  <span className="h-2 w-2 bg-[#1746d1]" />

                  <span className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-black/45">
                    SkillX / Pricing
                  </span>
                </div>

                <h1 className="max-w-[900px] text-[clamp(4rem,8vw,8rem)] font-bold leading-[0.84] tracking-[-0.075em]">
                  Choose
                  <br />
                  how you
                  <br />
                  <span className="text-[#1746d1]">
                    learn.
                  </span>
                </h1>

                <p className="mt-12 max-w-xl text-[17px] leading-7 text-black/55">
                  Flexible plans for individual learners,
                  educators, and institutions. Start simple
                  and scale when you need more.
                </p>

              </div>

              {/* RIGHT */}

              <div className="flex flex-col justify-between py-12 lg:pl-12">

                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-black/30">
                    01 / Plans
                  </span>

                  <span className="font-mono text-[10px] text-black/30">
                    {String(plans.length).padStart(2, '0')}
                  </span>
                </div>

                <div className="mt-20">

                  <div className="border-t border-black/10">

                    <div className="flex items-center justify-between border-b border-black/10 py-5">
                      <span className="text-xs font-bold uppercase tracking-[0.16em]">
                        Flexible access
                      </span>

                      <Sparkles className="h-4 w-4 text-[#1746d1]" />
                    </div>

                    {[
                      'Start without commitment',
                      'Live classrooms',
                      'Recordings and resources',
                      'Analytics and collaboration',
                    ].map((item, index) => (
                      <div
                        key={item}
                        className="flex items-center gap-5 border-b border-black/10 py-5"
                      >
                        <span className="font-mono text-xs text-black/25">
                          0{index + 1}
                        </span>

                        <span className="text-sm font-medium">
                          {item}
                        </span>
                      </div>
                    ))}

                  </div>

                  <p className="mt-10 max-w-sm text-sm leading-6 text-black/45">
                    Every plan is designed around the same
                    principle: useful tools without unnecessary
                    complexity.
                  </p>

                </div>

              </div>

            </div>
          </div>
        </section>


        {/* =====================================================
            PRICING
        ===================================================== */}

        <section
          id="pricing"
          className="border-b border-black/10"
        >
          <div className="mx-auto max-w-[1280px] px-6 py-16 lg:px-10 lg:py-20">

            {/* HEADER */}

            <div className="flex flex-col justify-between gap-8 border-b border-black/10 pb-12 md:flex-row md:items-end">

              <div>

                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-black/35">
                  02 / Pricing catalogue
                </p>

                <h2 className="mt-4 text-4xl font-bold tracking-[-0.045em] md:text-5xl">
                  Find your plan.
                </h2>

              </div>

              <p className="max-w-md text-sm leading-6 text-black/50">
                Choose the level of access that fits your
                learning or teaching needs. You can change
                plans as your requirements grow.
              </p>

            </div>


            {/* PLANS */}

            {plans.length > 0 ? (
              <div className="grid gap-px overflow-hidden border-x border-b border-black/10 bg-black/10 lg:grid-cols-3">

                {plans.map((plan, index) => (

                  <article
                    key={plan.id}
                    className={`group relative flex min-h-[570px] flex-col p-7 transition-colors duration-300 lg:p-8 ${
                      plan.highlighted
                        ? 'bg-[#1746d1] text-white'
                        : 'bg-[#f5f4ef] hover:bg-white'
                    }`}
                  >

                    {/* TOP */}

                    <div className="flex items-start justify-between">

                      <span
                        className={`font-mono text-[10px] ${
                          plan.highlighted
                            ? 'text-white/45'
                            : 'text-black/30'
                        }`}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>

                      {plan.highlighted && (
                        <span className="flex items-center gap-2 border border-white/20 px-2.5 py-1 font-mono text-[9px] uppercase tracking-wider text-white/80">
                          <span className="h-1.5 w-1.5 bg-white" />
                          Recommended
                        </span>
                      )}

                    </div>


                    {/* PLAN */}

                    <div className="mt-12">

                      <h3 className="text-2xl font-bold tracking-[-0.035em]">
                        {plan.name}
                      </h3>

                      <p
                        className={`mt-4 text-sm leading-6 ${
                          plan.highlighted
                            ? 'text-white/60'
                            : 'text-black/50'
                        }`}
                      >
                        {plan.description}
                      </p>

                    </div>


                    {/* PRICE */}

                    <div
                      className={`mt-10 border-y py-7 ${
                        plan.highlighted
                          ? 'border-white/20'
                          : 'border-black/10'
                      }`}
                    >

                      <div className="flex items-end gap-2">

                        <span className="text-5xl font-bold leading-none tracking-[-0.06em]">
                          {plan.price}
                        </span>

                        <span
                          className={`mb-1 font-mono text-[10px] uppercase tracking-wider ${
                            plan.highlighted
                              ? 'text-white/45'
                              : 'text-black/35'
                          }`}
                        >
                          {plan.period}
                        </span>

                      </div>

                    </div>


                    {/* FEATURES */}

                    <div className="mt-8">

                      <p
                        className={`font-mono text-[9px] uppercase tracking-[0.18em] ${
                          plan.highlighted
                            ? 'text-white/40'
                            : 'text-black/30'
                        }`}
                      >
                        Includes
                      </p>

                      <ul className="mt-5 space-y-4">

                        {plan.features.map((feature) => (

                          <li
                            key={feature}
                            className={`flex items-start gap-3 text-sm ${
                              plan.highlighted
                                ? 'text-white/75'
                                : 'text-black/60'
                            }`}
                          >

                            <Check
                              className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${
                                plan.highlighted
                                  ? 'text-white'
                                  : 'text-[#1746d1]'
                              }`}
                            />

                            <span>{feature}</span>

                          </li>

                        ))}

                      </ul>

                    </div>


                    {/* CTA */}

                    <div className="mt-auto pt-10">

                      <Button
                        href="/signup"
                        variant={
                          plan.highlighted
                            ? 'white'
                            : 'primary'
                        }
                        className="w-full"
                      >
                        Get started

                        <ArrowUpRight className="h-4 w-4" />
                      </Button>

                    </div>

                  </article>

                ))}

              </div>
            ) : (

              /* EMPTY STATE */

              <div className="border border-dashed border-black/20 py-24 text-center">

                <Sparkles className="mx-auto h-7 w-7 text-black/25" />

                <h3 className="mt-5 text-2xl font-bold">
                  {plansUnavailable ? 'Pricing is temporarily unavailable.' : 'Plans are coming soon.'}
                </h3>

                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-black/45">
                  {plansUnavailable
                    ? 'We could not load pricing right now. Please try again in a moment.'
                    : 'Pricing options will appear here once the SkillX plans are available.'}
                </p>

                {plansUnavailable && (
                  <a
                    href="/pricing"
                    className="mt-6 inline-flex min-h-11 items-center justify-center bg-[#171717] px-5 text-sm font-bold text-white transition-colors hover:bg-[#1746d1]"
                  >
                    Try again
                  </a>
                )}

              </div>

            )}

          </div>
        </section>


        {/* =====================================================
            WHAT'S INCLUDED
        ===================================================== */}

        <section className="border-b border-black/10">
          <div className="mx-auto max-w-[1280px] px-6 py-24 lg:px-10 lg:py-32">

            <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">

              {/* LEFT */}

              <div>

                <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-black/35">
                  03 / What's included
                </p>

                <h2 className="mt-5 max-w-md text-4xl font-bold leading-[0.95] tracking-[-0.05em] md:text-5xl">
                  More than a subscription.
                </h2>

                <p className="mt-6 max-w-md text-sm leading-6 text-black/50">
                  SkillX plans are built around the actual
                  classroom experience — not a collection
                  of unnecessary features.
                </p>

              </div>


              {/* FEATURES */}

              <div className="grid gap-px border border-black/10 bg-black/10 sm:grid-cols-2">

                {[
                  {
                    number: '01',
                    title: 'Live classes',
                    description:
                      'Join interactive virtual sessions with instructors and peers.',
                  },
                  {
                    number: '02',
                    title: 'Recordings',
                    description:
                      'Return to previous lessons whenever you need them.',
                  },
                  {
                    number: '03',
                    title: 'Assignments',
                    description:
                      'Practice what you learn through structured coursework.',
                  },
                  {
                    number: '04',
                    title: 'Analytics',
                    description:
                      'Track learning progress and classroom activity.',
                  },
                ].map((item) => (

                  <div
                    key={item.number}
                    className="bg-[#f5f4ef] p-7 transition-colors duration-300 hover:bg-white"
                  >

                    <span className="font-mono text-[10px] text-black/30">
                      {item.number}
                    </span>

                    <h3 className="mt-12 text-lg font-bold">
                      {item.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-black/50">
                      {item.description}
                    </p>

                  </div>

                ))}

              </div>

            </div>

          </div>
        </section>


        {/* =====================================================
            INSTITUTION CTA
        ===================================================== */}

        <section className="bg-[#171717] text-white">

          <div className="mx-auto max-w-[1280px] px-6 py-24 lg:px-10 lg:py-32">

            <div className="grid gap-12 lg:grid-cols-[1fr_auto] lg:items-end">

              <div>

                <div className="flex items-center gap-3">
                  <span className="h-2 w-2 bg-[#4d72ff]" />

                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                    04 / Institutions
                  </span>
                </div>

                <h2 className="mt-6 max-w-3xl text-5xl font-bold leading-[0.9] tracking-[-0.06em] sm:text-6xl lg:text-7xl">
                  Building learning
                  <br />
                  at a larger scale?
                </h2>

                <p className="mt-8 max-w-xl text-sm leading-6 text-white/45">
                  Talk to the SkillX team about institution-wide
                  access, advanced analytics, onboarding, and
                  custom classroom requirements.
                </p>

              </div>

              <div className="lg:pb-2">

                <Button
                  href="/contact"
                  variant="white"
                >
                  Contact sales

                  <ArrowUpRight className="h-4 w-4" />
                </Button>

              </div>

            </div>

            <div className="mt-16 flex flex-col justify-between gap-6 border-t border-white/10 pt-6 text-xs text-white/30 sm:flex-row">

              <span>
                SkillX / Pricing
              </span>

              <span className="font-mono uppercase tracking-[0.12em]">
                Simple. Flexible. Focused.
              </span>

            </div>

          </div>

        </section>

      </main>
    </>
  )
}