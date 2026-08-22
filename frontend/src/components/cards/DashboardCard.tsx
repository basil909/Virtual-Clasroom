import React from 'react'

export default function DashboardCard({ children }: { children?: React.ReactNode }) {
  return <div className="card">{children}</div>
}
