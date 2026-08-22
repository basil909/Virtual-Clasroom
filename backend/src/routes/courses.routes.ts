import { Router } from 'express'
import { courseRepository } from '../repositories/courseRepository.js'
import { authenticate, requireRoles, type AuthRequest } from '../middleware/authenticate.js'

export const coursesRoutes = Router()

coursesRoutes.get('/enrolled/me', authenticate, requireRoles('student'), (req: AuthRequest, res) => {
  res.json({ courses: courseRepository.listByStudent(req.user!.sub) })
})

coursesRoutes.get('/instructor/me', authenticate, requireRoles('teacher'), (req: AuthRequest, res) => {
  res.json({ courses: courseRepository.listByInstructor(req.user!.sub) })
})

coursesRoutes.get('/', (_req, res) => {
  res.json({ courses: courseRepository.list() })
})

coursesRoutes.get('/:id', (req, res) => {
  const course = courseRepository.findById(req.params.id)
  if (!course) {
    res.status(404).json({ error: 'Course not found.' })
    return
  }
  res.json({ course })
})
