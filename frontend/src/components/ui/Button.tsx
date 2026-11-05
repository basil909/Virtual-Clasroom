import Link from 'next/link'
import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/utils'

type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'white'
  | 'danger'

type ButtonSize = 'sm' | 'md' | 'lg'

type BaseProps = {
  children: ReactNode
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
  loading?: boolean
}

type ButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'className' | 'children'> & {
    href?: never
  }

type ButtonLinkProps = BaseProps & {
  href: string
  target?: string
  rel?: string
}

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-slate-900 text-white shadow-sm hover:bg-slate-800 hover:shadow-md active:scale-[0.98]',

  secondary:
    'border border-slate-200 bg-white text-slate-700 shadow-sm hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98]',

  outline:
    'border border-slate-300 bg-transparent text-slate-700 hover:border-slate-400 hover:bg-slate-50 hover:text-slate-900 active:scale-[0.98]',

  ghost:
    'bg-transparent text-slate-600 hover:bg-slate-100 hover:text-slate-900 active:scale-[0.98]',

  white:
    'bg-white text-slate-900 shadow-sm hover:bg-slate-50 hover:shadow-md active:scale-[0.98]',

  danger:
    'bg-red-600 text-white shadow-sm hover:bg-red-700 active:scale-[0.98]',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'min-h-9 rounded-lg px-4 text-xs',
  md: 'min-h-11 rounded-xl px-5 text-sm',
  lg: 'min-h-12 rounded-xl px-6 text-sm',
}

function Spinner() {
  return (
    <span
      aria-hidden="true"
      className="h-4 w-4 animate-spin rounded-full border-2 border-current border-r-transparent"
    />
  )
}

function isLinkProps(props: ButtonProps | ButtonLinkProps): props is ButtonLinkProps {
  return typeof (props as ButtonLinkProps).href === 'string'
}

export default function Button(props: ButtonProps | ButtonLinkProps) {
  const {
    children,
    variant = 'primary',
    size = 'md',
    className,
    loading = false,
  } = props

  const classes = cn(
    'inline-flex items-center justify-center gap-2 font-semibold',
    'transition-[background-color,border-color,color,box-shadow,transform]',
    'duration-200 ease-out',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
    sizes[size],
    variants[variant],
    className
  )

  if (isLinkProps(props)) {
    return (
      <Link
        href={props.href}
        target={props.target}
        rel={props.rel}
        className={cn(classes, loading && 'pointer-events-none')}
        aria-disabled={loading}
        aria-busy={loading}
      >
        {loading && <Spinner />}
        {children}
      </Link>
    )
  }

  const {
    href: _href,
    loading: _loading,
    variant: _variant,
    size: _size,
    className: _className,
    ...buttonProps
  } = props

  return (
    <button
      {...buttonProps}
      className={classes}
      disabled={props.disabled || loading}
      aria-busy={loading}
    >
      {loading && <Spinner />}
      {children}
    </button>
  )
}