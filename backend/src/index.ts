import { createApp } from './app.js'
import { env } from './config/env.js'
import './db/connection.js'
import { db } from './db/connection.js'
import { hashPassword } from './utils/password.js'
import { v4 as uuid } from 'uuid'

async function seedIfEmpty() {
  const count = db.prepare('SELECT COUNT(*) as c FROM users').get() as { c: number }
  if (count.c > 0) return

  const adminId = uuid()
  const teacherId = uuid()
  const teacher2Id = uuid()
  const teacher3Id = uuid()
  const studentId = uuid()

  const insertUser = db.prepare(`
    INSERT INTO users (id, name, email, password_hash, role, subject, bio, rating)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `)

  insertUser.run(adminId, 'Admin User', 'admin@skillx.com', await hashPassword('admin123'), 'admin', null, null, null)
  insertUser.run(teacherId, 'Sarah Teacher', 'teacher@skillx.com', await hashPassword('teacher123'), 'teacher', 'Computer Science', 'Specializes in full-stack development.', 4.9)
  insertUser.run(teacher2Id, 'Michael Chen', 'michael@skillx.com', await hashPassword('teacher123'), 'teacher', 'Mathematics', 'Makes complex algorithms approachable.', 4.8)
  insertUser.run(teacher3Id, 'Emma Wilson', 'emma@skillx.com', await hashPassword('teacher123'), 'teacher', 'Design', 'Portfolio-ready design projects.', 4.7)
  insertUser.run(studentId, 'Alex Student', 'student@skillx.com', await hashPassword('student123'), 'student', null, null, null)

  const insertCourse = db.prepare(`INSERT INTO courses (id, title, instructor_id, level, duration, rating) VALUES (?, ?, ?, ?, ?, ?)`)
  const c1 = uuid()
  const c2 = uuid()
  const c3 = uuid()
  insertCourse.run(c1, 'Web Development Bootcamp', teacherId, 'Intermediate', '12 weeks', 4.8)
  insertCourse.run(c2, 'Data Structures & Algorithms', teacher2Id, 'Advanced', '10 weeks', 4.9)
  insertCourse.run(c3, 'UI/UX Design Fundamentals', teacher3Id, 'Beginner', '8 weeks', 4.7)

  db.prepare('INSERT INTO enrollments (id, student_id, course_id, progress) VALUES (?, ?, ?, ?)').run(uuid(), studentId, c1, 67)
  db.prepare('INSERT INTO enrollments (id, student_id, course_id, progress) VALUES (?, ?, ?, ?)').run(uuid(), studentId, c2, 45)
  db.prepare('INSERT INTO enrollments (id, student_id, course_id, progress) VALUES (?, ?, ?, ?)').run(uuid(), studentId, c3, 80)

  console.log('Database seeded with demo users and courses.')
}

const app = createApp()

seedIfEmpty().then(() => {
  app.listen(env.port, () => {
    console.log(`SkillX API running on http://localhost:${env.port}`)
    console.log(`Teams configured: ${env.isAzureConfigured()}`)
  })
})
