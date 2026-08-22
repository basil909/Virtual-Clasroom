import MarketingShell from '../../components/layout/MarketingShell'
import PageHeader from '../../components/layout/PageHeader'
import Button from '../../components/ui/Button'
import { api } from '../../lib/api'
import { cn } from '../../lib/utils'

export default async function PricingPage() {
  let plans: Awaited<
    ReturnType<typeof api.pricing>
  >['plans'] = []

  try {
    plans = (await api.pricing()).plans
  } catch {
    plans = []
  }

  return (
    <MarketingShell>
      {/* HERO */}

      <PageHeader
        label="Pricing"
        title="Simple pricing for every learner"
        description="Choose a plan that fits your learning journey with live classes, recordings, assignments, and analytics."
      />

      {/* PRICING */}

      <section className="bg-slate-50 px-6 pb-24">
        <div className="mx-auto max-w-[1200px]">
          {/* TOP INFO */}

          <div className="mb-14 text-center">
            <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#5b5fc7]">
              Flexible Plans
            </p>

            <h2 className="mt-4 text-4xl font-black text-slate-900">
              Learn Without Limits
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-600">
              Start for free and upgrade anytime for
              advanced classrooms, recordings, analytics,
              and collaboration tools.
            </p>
          </div>

          {/* PLANS */}

          <div className="grid gap-8 lg:grid-cols-3">
            {plans.map((plan) => (
              <article
                key={plan.id}
                className={cn(
                  'relative overflow-hidden rounded-[32px] border p-8 transition duration-300 hover:-translate-y-2',
                  plan.highlighted
                    ? 'border-indigo-200 bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white shadow-2xl'
                    : 'border-slate-100 bg-white shadow-sm hover:shadow-xl'
                )}
              >
                {/* POPULAR BADGE */}

                {plan.highlighted && (
                  <div className="absolute right-6 top-6 rounded-full bg-white/10 px-4 py-1 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md">
                    Most Popular
                  </div>
                )}

                {/* PLAN NAME */}

                <h2 className="text-2xl font-black">
                  {plan.name}
                </h2>

                <p
                  className={cn(
                    'mt-3 leading-7',
                    plan.highlighted
                      ? 'text-white/70'
                      : 'text-slate-500'
                  )}
                >
                  {plan.description}
                </p>

                {/* PRICE */}

                <div className="mt-8 flex items-end gap-2">
                  <span className="text-5xl font-black">
                    {plan.price}
                  </span>

                  <span
                    className={cn(
                      'mb-1 text-sm',
                      plan.highlighted
                        ? 'text-white/60'
                        : 'text-slate-500'
                    )}
                  >
                    {plan.period}
                  </span>
                </div>

                {/* FEATURES */}

                <ul className="mt-8 space-y-4">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className={cn(
                        'flex items-start gap-3 text-sm',
                        plan.highlighted
                          ? 'text-white/80'
                          : 'text-slate-600'
                      )}
                    >
                      <span className="mt-0.5 text-emerald-400">
                        ✓
                      </span>

                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}

                <div className="mt-10">
                  <Button
                    href="/signup"
                    variant={
                      plan.highlighted
                        ? 'white'
                        : 'primary'
                    }
                    className="w-full"
                  >
                    Get Started
                  </Button>
                </div>
              </article>
            ))}
          </div>

          {/* EXTRA INFO */}

          <div className="mt-16 rounded-[32px] border border-slate-200 bg-white p-8 text-center shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900">
              Need a custom plan for your institution?
            </h3>

            <p className="mx-auto mt-4 max-w-2xl text-slate-600">
              Contact our team for enterprise solutions,
              institution-wide access, advanced analytics,
              and dedicated onboarding support.
            </p>

            <div className="mt-6">
              <Button href="/contact" variant="secondary">
                Contact Sales
              </Button>
            </div>
          </div>
        </div>
      </section>
    </MarketingShell>
  )
}