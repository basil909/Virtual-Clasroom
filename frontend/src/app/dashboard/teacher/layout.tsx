'use client'

import DashboardGuard from '../../../components/auth/DashboardGuard'

export default function TeacherLayout({ children }: { children: React.ReactNode }) {
  return <DashboardGuard allowedRole="teacher">{children}</DashboardGuard>
}
