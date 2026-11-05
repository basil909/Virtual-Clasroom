'use client'

import { FormEvent, useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'

import { useAuth } from '@/providers/AuthProvider'
import { getDashboardPath } from '@/lib/routes'
import type { UserRole } from '@/types'

import Button from '@/components/ui/Button'

type AuthFormProps = {
  mode: 'login' | 'signup'
}

export default function AuthForm({ mode }: AuthFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const { login, signup } = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState<UserRole>('student')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    setError('')
    setSubmitting(true)

    try {
      const user =
        mode === 'login'
          ? await login(email, password)
          : await signup(name, email, password, role)

      // Only follow same-site redirects (e.g. "/video-room/abc").
      const redirect = searchParams.get('redirect')
      const safeRedirect =
        redirect && redirect.startsWith('/') && !redirect.startsWith('//')
          ? redirect
          : null

      router.push(
        safeRedirect || getDashboardPath(user.role)
      )
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="w-full min-w-0 max-w-full">

      {/* =====================================================
          HEADING
      ===================================================== */}

      <div className="min-w-0">

        <h1
          className="
            max-w-full
            overflow-hidden
            break-words
            text-[clamp(3rem,6vw,4.5rem)]
            font-bold
            leading-[0.82]
            tracking-[-0.07em]
            text-[#171717]
          "
        >
          {mode === 'login' ? (
            <>
              Welcome
              <br />
              <span className="text-[#1746d1]">
                back.
              </span>
            </>
          ) : (
            <>
              Create
              <br />
              <span className="text-[#1746d1]">
                your account.
              </span>
            </>
          )}
        </h1>

        <p className="mt-5 max-w-md text-sm leading-6 text-black/50">
          {mode === 'login'
            ? 'Sign in to access your dashboard.'
            : 'Join SkillX and start learning today.'}
        </p>

      </div>


      {/* =====================================================
          DEMO ACCOUNTS
      ===================================================== */}

      {mode === 'login' && (
        <div className="mt-7 w-full max-w-full bg-[#f7f8fa] p-4">

          <p className="text-xs font-bold text-[#171717]">
            Demo accounts
          </p>

          <div className="mt-2 space-y-0.5 font-mono text-[10px] leading-5 text-black/50 sm:text-[11px]">
            <p>
              admin@skillx.com / admin123
            </p>

            <p>
              teacher@skillx.com / teacher123
            </p>

            <p>
              student@skillx.com / student123
            </p>
          </div>

        </div>
      )}


      {/* =====================================================
          FORM
      ===================================================== */}

      <form
        onSubmit={handleSubmit}
        className="mt-7 w-full min-w-0 space-y-5"
      >

        {/* NAME */}

        {mode === 'signup' && (
          <div className="min-w-0">

            <label
              htmlFor="name"
              className="text-xs font-bold text-black/60"
            >
              Full name
            </label>

            <input
              id="name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="
                mt-2
                block
                w-full
                min-w-0
                border
                border-black/10
                bg-[#fafafa]
                px-4
                py-3.5
                text-sm
                text-[#171717]
                outline-none
                transition-colors
                placeholder:text-black/25
                focus:border-[#1746d1]
                focus:bg-white
              "
              placeholder="Alex Johnson"
            />

          </div>
        )}


        {/* EMAIL */}

        <div className="min-w-0">

          <label
            htmlFor="email"
            className="text-xs font-bold text-black/60"
          >
            Email
          </label>

          <input
            id="email"
            required
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="
              mt-2
              block
              w-full
              min-w-0
              border
              border-black/10
              bg-[#fafafa]
              px-4
              py-3.5
              text-sm
              text-[#171717]
              outline-none
              transition-colors
              placeholder:text-black/25
              focus:border-[#1746d1]
              focus:bg-white
            "
            placeholder="you@example.com"
          />

        </div>


        {/* PASSWORD */}

        <div className="min-w-0">

          <label
            htmlFor="password"
            className="text-xs font-bold text-black/60"
          >
            Password
          </label>

          <input
            id="password"
            required
            type="password"
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="
              mt-2
              block
              w-full
              min-w-0
              border
              border-black/10
              bg-[#fafafa]
              px-4
              py-3.5
              text-sm
              text-[#171717]
              outline-none
              transition-colors
              placeholder:text-black/25
              focus:border-[#1746d1]
              focus:bg-white
            "
            placeholder="••••••••"
          />

        </div>


        {/* ROLE */}

        {mode === 'signup' && (
          <div className="min-w-0">

            <label
              htmlFor="role"
              className="text-xs font-bold text-black/60"
            >
              I am a
            </label>

            <select
              id="role"
              value={role}
              onChange={(e) =>
                setRole(e.target.value as UserRole)
              }
              className="
                mt-2
                block
                w-full
                min-w-0
                border
                border-black/10
                bg-[#fafafa]
                px-4
                py-3.5
                text-sm
                text-[#171717]
                outline-none
                transition-colors
                focus:border-[#1746d1]
                focus:bg-white
              "
            >
              <option value="student">
                Student
              </option>

              <option value="teacher">
                Teacher
              </option>

            </select>

          </div>
        )}


        {/* ERROR */}

        {error && (
          <div
            role="alert"
            className="border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-600"
          >
            {error}
          </div>
        )}


        {/* SUBMIT */}

        <Button
          type="submit"
          className="w-full"
          disabled={submitting}
        >
          {submitting
            ? 'Please wait...'
            : mode === 'login'
              ? 'Sign in'
              : 'Create account'}
        </Button>

      </form>


      {/* =====================================================
          ACCOUNT LINK
      ===================================================== */}

      <p className="mt-6 text-center text-sm text-black/45">

        {mode === 'login' ? (
          <>
            No account?{' '}

            <Link
              href="/signup"
              className="font-bold text-[#1746d1] transition-colors hover:text-[#171717]"
            >
              Sign up
            </Link>
          </>
        ) : (
          <>
            Already have an account?{' '}

            <Link
              href="/login"
              className="font-bold text-[#1746d1] transition-colors hover:text-[#171717]"
            >
              Sign in
            </Link>
          </>
        )}

      </p>

    </div>
  )
}