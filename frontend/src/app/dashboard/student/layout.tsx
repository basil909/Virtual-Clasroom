'use client'

import DashboardGuard from '@/features/auth/components/DashboardGuard'

export default function StudentLayout({ children }: { children: React.ReactNode }) {
  return <DashboardGuard allowedRole="student">{children}</DashboardGuard>
}
