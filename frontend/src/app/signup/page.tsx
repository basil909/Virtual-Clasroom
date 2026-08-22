import { Suspense } from 'react'
import Link from 'next/link'
import AuthForm from '../../components/auth/AuthForm'

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-[#f5f7fb] px-6 py-12">
      <div className="mb-8 text-center">
        <Link href="/" className="text-xl font-bold text-slate-900">
          Skill<span className="text-blue-600">X</span>
        </Link>
      </div>
      <Suspense fallback={<p className="text-center text-sm text-slate-500">Loading...</p>}>
        <AuthForm mode="signup" />
      </Suspense>
    </div>
  )
}
