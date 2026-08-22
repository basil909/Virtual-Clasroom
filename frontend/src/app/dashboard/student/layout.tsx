'use client'

import DashboardGuard from '../../../components/auth/DashboardGuard'

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return <DashboardGuard allowedRole="student">{children}</DashboardGuard>
}
