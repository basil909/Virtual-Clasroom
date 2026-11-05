
"use client"

import { useEffect, useMemo, useState } from "react"

import { api, type User } from "@/lib/api"

type Role = User["role"]

const getRoleClasses = (role: Role) => {
  switch (String(role).toLowerCase()) {
    case "admin":
      return "bg-violet-50 text-violet-700 ring-violet-600/10"

    case "instructor":
    case "teacher":
      return "bg-blue-50 text-blue-700 ring-blue-600/10"

    case "student":
    case "user":
      return "bg-emerald-50 text-emerald-700 ring-emerald-600/10"

    default:
      return "bg-slate-100 text-slate-600 ring-slate-600/10"
  }
}

const getInitials = (name: string) => {
  const parts = name.trim().split(/\s+/)

  if (parts.length === 1) {
    return parts[0]?.slice(0, 2).toUpperCase() ?? "U"
  }

  return `${parts[0]?.[0] ?? ""}${parts[parts.length - 1]?.[0] ?? ""}`.toUpperCase()
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [search, setSearch] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    let cancelled = false

    const loadUsers = async () => {
      try {
        setLoading(true)
        setError("")

        const response = await api.adminUsers()

        if (!cancelled) {
          setUsers(response.users)
        }
      } catch (err) {
        console.error("Failed to load users:", err)

        if (!cancelled) {
          setError(
            "We couldn't load the users right now. Please try again.",
          )
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    loadUsers()

    return () => {
      cancelled = true
    }
  }, [])

  const roles = useMemo(() => {
    return Array.from(
      new Set(users.map((user) => String(user.role))),
    ).sort()
  }, [users])

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase()

    return users.filter((user) => {
      const matchesSearch =
        !query ||
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query) ||
        String(user.role).toLowerCase().includes(query)

      const matchesRole =
        roleFilter === "all" ||
        String(user.role).toLowerCase() === roleFilter.toLowerCase()

      return matchesSearch && matchesRole
    })
  }, [users, search, roleFilter])

  const roleCount = useMemo(() => {
    return users.reduce<Record<string, number>>((acc, user) => {
      const role = String(user.role).toLowerCase()

      acc[role] = (acc[role] ?? 0) + 1

      return acc
    }, {})
  }, [users])

  const retry = async () => {
    try {
      setLoading(true)
      setError("")

      const response = await api.adminUsers()

      setUsers(response.users)
    } catch (err) {
      console.error("Failed to reload users:", err)

      setError(
        "We couldn't load the users right now. Please try again.",
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f6f6f3] text-[#111216]">
      <div className="mx-auto max-w-[1240px] px-4 py-8 sm:px-6 lg:px-8 lg:py-10">

        {/* =====================================================
            HEADER
        ====================================================== */}

        <div className="border-b border-black/10 pb-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

            <div>
              <div className="mb-3 flex items-center gap-2 text-[11px] font-extrabold uppercase tracking-[0.18em] text-[#5757e8]">
                <span className="h-1.5 w-6 rounded-full bg-current" />
                Admin • Users
              </div>

              <h1 className="text-4xl font-black tracking-[-0.055em] sm:text-5xl">
                User management.
              </h1>

              <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
                View platform users, understand role distribution, and
                quickly find the account you're looking for.
              </p>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white px-5 py-4 shadow-sm">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
                Total users
              </p>

              <p className="mt-1 text-3xl font-black tracking-[-0.06em]">
                {loading ? "—" : users.length}
              </p>
            </div>

          </div>
        </div>

        {/* =====================================================
            SUMMARY
        ====================================================== */}

        {!loading && !error && users.length > 0 && (
          <div className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-4">

            <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-slate-400">
                All users
              </p>

              <p className="mt-2 text-2xl font-black tracking-[-0.05em]">
                {users.length}
              </p>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-slate-400">
                Admins
              </p>

              <p className="mt-2 text-2xl font-black tracking-[-0.05em]">
                {roleCount.admin ?? 0}
              </p>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-slate-400">
                Instructors
              </p>

              <p className="mt-2 text-2xl font-black tracking-[-0.05em]">
                {(roleCount.instructor ?? 0) +
                  (roleCount.teacher ?? 0)}
              </p>
            </div>

            <div className="rounded-2xl border border-black/10 bg-white p-5 shadow-sm">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-slate-400">
                Students
              </p>

              <p className="mt-2 text-2xl font-black tracking-[-0.05em]">
                {(roleCount.student ?? 0) +
                  (roleCount.user ?? 0)}
              </p>
            </div>

          </div>
        )}

        {/* =====================================================
            TOOLBAR
        ====================================================== */}

        <div className="mt-8 flex flex-col gap-3 rounded-2xl border border-black/10 bg-white p-3 shadow-sm sm:flex-row">

          <div className="relative flex-1">
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by name, email or role..."
              aria-label="Search users"
              className="w-full rounded-xl border border-transparent bg-slate-50 px-4 py-3 pl-10 text-sm font-medium outline-none transition placeholder:text-slate-400 focus:border-[#8b8bf1] focus:bg-white focus:ring-4 focus:ring-[#5757e8]/10"
            />

            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-sm text-slate-400">
              ⌕
            </span>
          </div>

          <select
            value={roleFilter}
            onChange={(event) => setRoleFilter(event.target.value)}
            aria-label="Filter users by role"
            className="rounded-xl border border-black/10 bg-white px-4 py-3 text-sm font-bold text-slate-700 outline-none transition focus:border-[#8b8bf1] focus:ring-4 focus:ring-[#5757e8]/10"
          >
            <option value="all">All roles</option>

            {roles.map((role) => (
              <option key={role} value={role}>
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </option>
            ))}
          </select>

          {(search || roleFilter !== "all") && (
            <button
              type="button"
              onClick={() => {
                setSearch("")
                setRoleFilter("all")
              }}
              className="rounded-xl border border-black/10 px-4 py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50"
            >
              Clear
            </button>
          )}
        </div>

        {/* =====================================================
            ERROR
        ====================================================== */}

        {error && (
          <div className="mt-5 flex flex-col gap-4 rounded-2xl border border-red-200 bg-red-50 p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-bold text-red-800">
                Unable to load users
              </p>

              <p className="mt-1 text-sm text-red-600">
                {error}
              </p>
            </div>

            <button
              type="button"
              onClick={retry}
              className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-red-700"
            >
              Try again
            </button>
          </div>
        )}

        {/* =====================================================
            LOADING
        ====================================================== */}

        {loading && (
          <div className="mt-5 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">

            <div className="hidden md:block">
              <div className="grid grid-cols-[1.4fr_1.5fr_.7fr] border-b border-slate-100 bg-slate-50 px-6 py-4">
                <div className="h-3 w-20 animate-pulse rounded bg-slate-200" />
                <div className="h-3 w-20 animate-pulse rounded bg-slate-200" />
                <div className="h-3 w-16 animate-pulse rounded bg-slate-200" />
              </div>

              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="grid grid-cols-[1.4fr_1.5fr_.7fr] items-center gap-4 border-b border-slate-100 px-6 py-5 last:border-0"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 animate-pulse rounded-xl bg-slate-200" />

                    <div className="space-y-2">
                      <div className="h-3 w-28 animate-pulse rounded bg-slate-200" />
                      <div className="h-2.5 w-20 animate-pulse rounded bg-slate-100" />
                    </div>
                  </div>

                  <div className="h-3 w-40 animate-pulse rounded bg-slate-100" />

                  <div className="h-6 w-20 animate-pulse rounded-full bg-slate-100" />
                </div>
              ))}
            </div>

            <div className="space-y-3 p-4 md:hidden">
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="h-24 animate-pulse rounded-xl bg-slate-100"
                />
              ))}
            </div>

          </div>
        )}

        {/* =====================================================
            DESKTOP TABLE
        ====================================================== */}

        {!loading && !error && (
          <div className="mt-5 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-sm">

            {filteredUsers.length === 0 ? (
              <div className="px-6 py-16 text-center">

                <div className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-slate-100 text-lg">
                  {users.length === 0 ? "+" : "⌕"}
                </div>

                <h2 className="mt-4 text-lg font-extrabold tracking-[-0.025em]">
                  {users.length === 0
                    ? "No users found"
                    : "No matching users"}
                </h2>

                <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500">
                  {users.length === 0
                    ? "There are currently no users available."
                    : "Try changing your search or role filter."}
                </p>

                {(search || roleFilter !== "all") && (
                  <button
                    type="button"
                    onClick={() => {
                      setSearch("")
                      setRoleFilter("all")
                    }}
                    className="mt-5 rounded-xl bg-[#111216] px-4 py-2.5 text-sm font-bold text-white transition hover:bg-[#24262d]"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            ) : (
              <>
                {/* Desktop */}
                <div className="hidden md:block">
                  <table className="w-full text-left text-sm">
                    <thead className="border-b border-slate-100 bg-[#fafaf8]">
                      <tr>
                        <th className="px-6 py-4 text-xs font-extrabold uppercase tracking-[0.08em] text-slate-400">
                          User
                        </th>

                        <th className="px-6 py-4 text-xs font-extrabold uppercase tracking-[0.08em] text-slate-400">
                          Email
                        </th>

                        <th className="px-6 py-4 text-xs font-extrabold uppercase tracking-[0.08em] text-slate-400">
                          Role
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      {filteredUsers.map((user) => (
                        <tr
                          key={user.id}
                          className="group border-b border-slate-100 last:border-0 hover:bg-slate-50/70"
                        >
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">

                              <div className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#5757e8] to-[#7c3aed] text-xs font-black text-white">
                                {getInitials(user.name)}
                              </div>

                              <div className="min-w-0">
                                <p className="truncate font-bold text-slate-900">
                                  {user.name}
                                </p>

                                <p className="mt-0.5 text-xs text-slate-400">
                                  ID: {user.id}
                                </p>
                              </div>

                            </div>
                          </td>

                          <td className="px-6 py-4">
                            <a
                              href={`mailto:${user.email}`}
                              className="text-slate-600 transition hover:text-[#5757e8]"
                            >
                              {user.email}
                            </a>
                          </td>

                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex rounded-full px-3 py-1 text-xs font-bold capitalize ring-1 ring-inset ${getRoleClasses(
                                user.role,
                              )}`}
                            >
                              {user.role}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile */}
                <div className="space-y-3 p-3 md:hidden">
                  {filteredUsers.map((user) => (
                    <article
                      key={user.id}
                      className="rounded-xl border border-slate-100 p-4 transition hover:border-slate-200 hover:shadow-sm"
                    >
                      <div className="flex items-start gap-3">

                        <div className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#5757e8] to-[#7c3aed] text-xs font-black text-white">
                          {getInitials(user.name)}
                        </div>

                        <div className="min-w-0 flex-1">
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0">
                              <h3 className="truncate font-bold text-slate-900">
                                {user.name}
                              </h3>

                              <a
                                href={`mailto:${user.email}`}
                                className="mt-1 block truncate text-sm text-slate-500 hover:text-[#5757e8]"
                              >
                                {user.email}
                              </a>
                            </div>

                            <span
                              className={`shrink-0 rounded-full px-2.5 py-1 text-[10px] font-extrabold capitalize ring-1 ring-inset ${getRoleClasses(
                                user.role,
                              )}`}
                            >
                              {user.role}
                            </span>
                          </div>
                        </div>

                      </div>
                    </article>
                  ))}
                </div>
              </>
            )}
          </div>
        )}

        {/* Result count */}
        {!loading && !error && filteredUsers.length > 0 && (
          <p className="mt-4 text-center text-xs font-medium text-slate-400">
            Showing {filteredUsers.length} of {users.length} users
          </p>
        )}

      </div>
    </div>
  )
}

