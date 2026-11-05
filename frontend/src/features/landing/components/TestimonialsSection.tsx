import { ArrowUpRight, Quote } from 'lucide-react'

const testimonials = [
  {
    number: '01',
    quote:
      'The classroom system is smooth, the recordings are super helpful, and the teachers are amazing.',
    name: 'Alex Johnson',
    role: 'Student',
  },
  {
    number: '02',
    quote:
      'Having everything in one place makes it much easier to stay focused and keep up with the course.',
    name: 'Sarah Williams',
    role: 'Student',
  },
  {
    number: '03',
    quote:
      'The combination of live classes and practical projects makes learning feel much more engaging.',
    name: 'Daniel Thomas',
    role: 'Student',
  },
]

export default function TestimonialsSection() {
  return (
    <section className="border-b border-black/10 bg-[#f5f4ef] text-[#171717]">
      <div className="mx-auto max-w-[1280px] px-6 lg:px-10">
        {/* HEADER */}
        <div className="grid border-b border-black/10 py-16 lg:grid-cols-[0.75fr_1.25fr] lg:py-24">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-2 w-2 bg-[#1746d1]" />

              <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-black/45">
                05 / Student voices
              </span>
            </div>
          </div>

          <div className="mt-8 lg:mt-0">
            <h2 className="max-w-4xl text-[clamp(3rem,6vw,6rem)] font-bold leading-[0.88] tracking-[-0.065em]">
              Learning
              <br />
              <span className="text-[#1746d1]">from their</span>
              <br />
              perspective.
            </h2>

            <p className="mt-8 max-w-xl text-[16px] leading-7 text-black/50">
              Real experiences from students using SkillX to learn,
              collaborate, and build new skills.
            </p>
          </div>
        </div>

        {/* TESTIMONIALS */}
        <div>
          {testimonials.map((testimonial) => (
            <article
              key={testimonial.number}
              className="group grid border-b border-black/10 py-12 lg:grid-cols-[0.2fr_1fr_0.35fr] lg:gap-10 lg:py-16"
            >
              {/* NUMBER */}
              <div className="mb-6 lg:mb-0">
                <span className="font-mono text-[10px] text-black/30">
                  {testimonial.number}
                </span>
              </div>

              {/* QUOTE */}
              <div>
                <Quote className="mb-7 h-6 w-6 text-[#1746d1]" />

                <blockquote className="max-w-4xl text-2xl font-medium leading-[1.3] tracking-[-0.025em] md:text-3xl lg:text-4xl">
                  “{testimonial.quote}”
                </blockquote>
              </div>

              {/* PERSON */}
              <div className="mt-8 flex items-end justify-between lg:mt-0 lg:flex-col lg:items-start lg:justify-end">
                <div>
                  <p className="text-sm font-bold">
                    {testimonial.name}
                  </p>

                  <p className="mt-1 font-mono text-[9px] uppercase tracking-[0.15em] text-black/35">
                    {testimonial.role}
                  </p>
                </div>

                <ArrowUpRight className="h-4 w-4 text-black/20 transition-[opacity,transform,color,background-color,border-color] duration-200 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#1746d1]" />
              </div>
            </article>
          ))}
        </div>

        {/* BOTTOM NOTE */}
        <div className="flex flex-col justify-between gap-5 py-8 text-xs text-black/40 sm:flex-row">
          <span>
            SkillX / Student experience
          </span>

          <span className="font-mono uppercase tracking-[0.12em]">
            Learn from anywhere
          </span>
        </div>
      </div>
    </section>
  )
}