'use client'

import DashboardGuard from '@/features/auth/components/DashboardGuard'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <DashboardGuard allowedRole="admin">{children}</DashboardGuard>
}
