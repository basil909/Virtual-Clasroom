import Link from 'next/link'
import { cn } from '../../lib/utils'

type ButtonProps = {
  children: React.ReactNode
  href?: string
  variant?: 'primary' | 'secondary' | 'ghost' | 'white'
  className?: string
  type?: 'button' | 'submit'
  onClick?: () => void
  disabled?: boolean
}

const variants = {
  primary:
    'bg-slate-900 text-white shadow-lg shadow-slate-200 hover:shadow-xl hover:shadow-slate-300 hover:scale-[1.02] active:scale-[0.98]',
  secondary:
    'border-2 border-slate-100 bg-white text-slate-700 shadow-lg shadow-slate-100/50 hover:border-blue-200 hover:text-blue-600 hover:shadow-xl hover:shadow-blue-100/50 active:scale-[0.98]',
  ghost: 'text-slate-600 hover:text-slate-900 bg-transparent shadow-none',
  white:
    'bg-white text-slate-900 shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98]',
}

export default function Button({
  children,
  href,
  variant = 'primary',
  className,
  type = 'button',
  onClick,
  disabled,
}: ButtonProps) {
  const classes = cn(
    'inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50',
    variants[variant],
    className
  )

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  return (
    <button type={type} className={classes} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  )
}
