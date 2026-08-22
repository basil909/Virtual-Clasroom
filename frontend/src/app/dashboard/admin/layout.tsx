'use client'

import DashboardGuard from '../../../components/auth/DashboardGuard'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <DashboardGuard allowedRole="admin">{children}</DashboardGuard>
}
