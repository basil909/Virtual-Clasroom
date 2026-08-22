import type { Metadata } from 'next'
import { AuthProvider } from '../context/AuthContext'
import PrototypeBanner from '../components/layout/PrototypeBanner'
import '../styles/animations.css'
import './globals.css'

export const metadata: Metadata = {
  title: 'SkillX — Virtual Classroom Prototype',
  description: 'Prototype demo: virtual learning platform with Microsoft Teams integration',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[#f5f7fb] text-slate-900 antialiased">
        <AuthProvider>
          <PrototypeBanner />
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}