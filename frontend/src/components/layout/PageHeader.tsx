type PageHeaderProps = {
  label: string
  title: string
  description: string
}

export default function PageHeader({ label, title, description }: PageHeaderProps) {
  return (
    <div className="relative overflow-hidden bg-white px-6 pb-16 pt-12 md:pb-20 md:pt-16">
      <div className="absolute right-0 top-0 h-[400px] w-[400px] translate-x-1/3 -translate-y-1/4 rounded-full bg-gradient-to-br from-blue-100 via-indigo-50/60 to-violet-50/30 opacity-60 blur-3xl" />
      <div className="relative mx-auto max-w-[1200px]">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-blue-600">{label}</p>
        <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-slate-900 md:text-5xl">
          {title}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-slate-500">{description}</p>
      </div>
    </div>
  )
}
