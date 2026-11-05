'use client'

import DashboardGuard from '@/features/auth/components/DashboardGuard'

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return <DashboardGuard allowedRole="teacher">{children}</DashboardGuard>
}
