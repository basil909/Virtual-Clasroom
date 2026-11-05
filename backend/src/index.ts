import { createApp } from './app.js'
import { env } from './config/env.js'
import './db/connection.js'
import { db } from './db/connection.js'
import { hashPassword } from './utils/password.js'
import { v4 as uuid } from 'uuid'

async function ensureDemoUsers() {
  const demoUsers = [
    {
      name: 'Admin User',
      email: 'admin@skillx.com',
      password: 'admin123',
      role: 'admin',
      subject: null,
      bio: null,
      rating: null,
    },
    {
      name: 'Sarah Teacher',
      email: 'teacher@skillx.com',
      password: 'teacher123',
      role: 'teacher',
      subject: 'Computer Science',
      bio: 'Specializes in full-stack development and interactive live coding sessions.',
      rating: 4.9,
    },
    {
      name: 'Alex Student',
      email: 'student@skillx.com',
      password: 'student123',
      role: 'student',
      subject: null,
      bio: null,
      rating: null,
    },
  ]

  const findUser = db.prepare(
    'SELECT id FROM users WHERE email = ?',
  )

  const insertUser = db.prepare(`
    INSERT INTO users (
      id,
      name,
      email,
      password_hash,
      role,
      subject,
      bio,
      rating
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `)

  const updateUser = db.prepare(`
    UPDATE users
    SET
      name = ?,
      password_hash = ?,
      role = ?,
      subject = ?,
      bio = ?,
      rating = ?
    WHERE email = ?
  `)

  for (const user of demoUsers) {
    const existing = findUser.get(user.email) as
      | { id: string }
      | undefined

    const passwordHash = await hashPassword(user.password)

    if (existing) {
      updateUser.run(
        user.name,
        passwordHash,
        user.role,
        user.subject,
        user.bio,
        user.rating,
        user.email,
      )

      console.log(`Updated demo user: ${user.email}`)
    } else {
      insertUser.run(
        uuid(),
        user.name,
        user.email,
        passwordHash,
        user.role,
        user.subject,
        user.bio,
        user.rating,
      )

      console.log(`Created demo user: ${user.email}`)
    }
  }
}

async function startServer() {
  try {
    await ensureDemoUsers()

    const app = createApp()

    app.listen(env.port, () => {
      console.log(
        `SkillX API running on http://localhost:${env.port}`,
      )

      console.log(
        `Teams configured: ${env.isAzureConfigured()}`,
      )

      console.log('')
      console.log('Demo accounts:')
      console.log('admin@skillx.com / admin123')
      console.log('teacher@skillx.com / teacher123')
      console.log('student@skillx.com / student123')
    })
  } catch (error) {
    console.error('Failed to start SkillX API:')
    console.error(error)
    process.exit(1)
  }
}

startServer()