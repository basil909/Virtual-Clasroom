import { Router } from 'express'
import { courseRepository } from '../repositories/courseRepository.js'
import { userRepository } from '../repositories/userRepository.js'

export const teachersRoutes = Router()

teachersRoutes.get('/', (_req, res) => {
  const courses = courseRepository.list()
  const teachers = userRepository.listByRole('teacher').map((t) => ({
    id: t.id,
    name: t.name,
    subject: t.subject,
    rating: t.rating ?? 0,
    bio: t.bio,
    students: courses
      .filter((c) => c.instructorId === t.id)
      .reduce((sum, c) => sum + c.studentCount, 0),
  }))
  res.json({ teachers })
})
