import { v4 as uuid } from 'uuid'
import { db } from './connection.js'
import { hashPassword } from '../utils/password.js'

const PRICING_PLANS = [
  {
    id: 'free',
    name: 'Starter',
    price: '$0',
    period: '/month',
    description: 'For individual learners exploring the platform.',
    features: ['3 live classes/month', 'Basic recordings', 'Community chat', 'Email support'],
    highlighted: false,
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'For active students and freelance educators.',
    features: [
      'Unlimited live classes',
      'HD recordings',
      'Assignments & quizzes',
      'Priority support',
      'Analytics dashboard',
    ],
    highlighted: true,
  },
  {
    id: 'institution',
    name: 'Institution',
    price: 'Custom',
    period: '',
    description: 'For schools and organizations at scale.',
    features: [
      'Unlimited users',
      'Admin & teacher panels',
      'SSO & custom branding',
      'Dedicated success manager',
      'SLA & compliance',
    ],
    highlighted: false,
  },
]

export { PRICING_PLANS }

async function seed() {
  const count = db.prepare('SELECT COUNT(*) as c FROM users').get() as { c: number }
  if (count.c > 0) {
    console.log('Database already seeded, skipping.')
    return
  }

  const adminId = uuid()
  const teacherId = uuid()
  const teacher2Id = uuid()
  const teacher3Id = uuid()
  const studentId = uuid()

  const insertUser = db.prepare(`
    INSERT INTO users (id, name, email, password_hash, role, subject, bio, rating)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `)

  insertUser.run(
    adminId,
    'Admin User',
    'admin@skillx.com',
    await hashPassword('admin123'),
    'admin',
    null,
    null,
    null
  )
  insertUser.run(
    teacherId,
    'Sarah Teacher',
    'teacher@skillx.com',
    await hashPassword('teacher123'),
    'teacher',
    'Computer Science',
    'Specializes in full-stack development and interactive live coding sessions.',
    4.9
  )
  insertUser.run(
    teacher2Id,
    'Michael Chen',
    'michael@skillx.com',
    await hashPassword('teacher123'),
    'teacher',
    'Mathematics',
    'Makes complex algorithms approachable with visual explanations.',
    4.8
  )
  insertUser.run(
    teacher3Id,
    'Emma Wilson',
    'emma@skillx.com',
    await hashPassword('teacher123'),
    'teacher',
    'Design',
    'Helps students build portfolio-ready design projects in virtual studios.',
    4.7
  )
  insertUser.run(
    studentId,
    'Alex Student',
    'student@skillx.com',
    await hashPassword('student123'),
    'student',
    null,
    null,
    null
  )

  const courses = [
    { title: 'Web Development Bootcamp', level: 'Intermediate', duration: '12 weeks', rating: 4.8, instructorId: teacherId },
    { title: 'Data Structures & Algorithms', level: 'Advanced', duration: '10 weeks', rating: 4.9, instructorId: teacher2Id },
    { title: 'UI/UX Design Fundamentals', level: 'Beginner', duration: '8 weeks', rating: 4.7, instructorId: teacher3Id },
    { title: 'Machine Learning Basics', level: 'Intermediate', duration: '14 weeks', rating: 4.6, instructorId: teacher2Id },
  ]

  const insertCourse = db.prepare(`
    INSERT INTO courses (id, title, description, instructor_id, level, duration, rating)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `)

  const courseIds: string[] = []
  for (const c of courses) {
    const id = uuid()
    courseIds.push(id)
    insertCourse.run(id, c.title, null, c.instructorId, c.level, c.duration, c.rating)
  }

  // Enroll student in all courses
  const insertEnrollment = db.prepare(
    'INSERT INTO enrollments (id, student_id, course_id, progress) VALUES (?, ?, ?, ?)'
  )
  courseIds.forEach((courseId, i) => {
    insertEnrollment.run(uuid(), studentId, courseId, [67, 45, 80, 30][i] ?? 50)
  })

  const insertAssignment = db.prepare(`
    INSERT INTO assignments (id, course_id, title, description, due_date, created_by)
    VALUES (?, ?, ?, ?, ?, ?)
  `)
  const insertSubmission = db.prepare(`
    INSERT INTO assignment_submissions (id, assignment_id, student_id, status, grade, submitted_at)
    VALUES (?, ?, ?, ?, ?, ?)
  `)

  const a1 = uuid()
  const a2 = uuid()
  const a3 = uuid()
  insertAssignment.run(a1, courseIds[0], 'Build a Todo App', 'Create a React todo application', '2026-03-28', teacherId)
  insertAssignment.run(a2, courseIds[1], 'Binary Tree Quiz', 'Complete the DSA quiz', '2026-03-30', teacher2Id)
  insertAssignment.run(a3, courseIds[2], 'Wireframe Portfolio', 'Submit mobile wireframes', '2026-04-02', teacher3Id)

  insertSubmission.run(uuid(), a1, studentId, 'pending', null, null)
  insertSubmission.run(uuid(), a2, studentId, 'submitted', null, new Date().toISOString())
  insertSubmission.run(uuid(), a3, studentId, 'graded', 'A-', new Date().toISOString())

  console.log('Database seeded successfully.')
  console.log('Demo logins: admin@skillx.com / admin123, teacher@skillx.com / teacher123, student@skillx.com / student123')
}

seed().catch(console.error)
