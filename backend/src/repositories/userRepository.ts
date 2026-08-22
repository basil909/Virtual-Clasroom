import { db } from '../db/connection.js'
import type { User, UserRole, UserWithPassword } from '../types/index.js'

type UserRow = {
  id: string
  name: string
  email: string
  password_hash: string
  role: UserRole
  subject: string | null
  bio: string | null
  rating: number | null
  created_at: string
}

function toUser(row: UserRow): User {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role,
    subject: row.subject,
    bio: row.bio,
    rating: row.rating,
    createdAt: row.created_at,
  }
}

export const userRepository = {
  findByEmail(email: string): UserWithPassword | null {
    const row = db
      .prepare('SELECT * FROM users WHERE lower(email) = lower(?)')
      .get(email) as UserRow | undefined
    if (!row) return null
    return { ...toUser(row), passwordHash: row.password_hash }
  },

  findById(id: string): User | null {
    const row = db.prepare('SELECT * FROM users WHERE id = ?').get(id) as UserRow | undefined
    return row ? toUser(row) : null
  },

  create(data: {
    id: string
    name: string
    email: string
    passwordHash: string
    role: UserRole
    subject?: string | null
    bio?: string | null
  }): User {
    db.prepare(
      `INSERT INTO users (id, name, email, password_hash, role, subject, bio)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).run(
      data.id,
      data.name,
      data.email,
      data.passwordHash,
      data.role,
      data.subject ?? null,
      data.bio ?? null
    )
    return userRepository.findById(data.id)!
  },

  listByRole(role: UserRole): User[] {
    const rows = db
      .prepare('SELECT * FROM users WHERE role = ? ORDER BY name')
      .all(role) as UserRow[]
    return rows.map(toUser)
  },

  countByRole(role: UserRole): number {
    const row = db
      .prepare('SELECT COUNT(*) as c FROM users WHERE role = ?')
      .get(role) as { c: number }
    return row.c
  },

  listAll(): User[] {
    const rows = db.prepare('SELECT * FROM users ORDER BY role, name').all() as UserRow[]
    return rows.map(toUser)
  },
}
