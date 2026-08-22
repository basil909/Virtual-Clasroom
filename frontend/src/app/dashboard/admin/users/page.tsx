'use client'

import { useEffect, useState } from 'react'
import { api, type User } from '../../../../lib/api'

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])

  useEffect(() => {
    api.adminUsers().then((r) => setUsers(r.users)).catch(() => {})
  }, [])

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-slate-900">User Management</h1>
      <p className="mt-2 text-slate-500">Platform users (prototype seed data).</p>

      <div className="mt-8 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-slate-100 bg-slate-50">
            <tr>
              <th className="px-6 py-4 font-bold text-slate-700">Name</th>
              <th className="px-6 py-4 font-bold text-slate-700">Email</th>
              <th className="px-6 py-4 font-bold text-slate-700">Role</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id} className="border-b border-slate-50 last:border-0">
                <td className="px-6 py-4 font-medium text-slate-900">{user.name}</td>
                <td className="px-6 py-4 text-slate-500">{user.email}</td>
                <td className="px-6 py-4">
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold capitalize text-blue-700">
                    {user.role}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
