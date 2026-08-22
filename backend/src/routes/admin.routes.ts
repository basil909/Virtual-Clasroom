import { Router } from 'express'
import { adminService } from '../services/adminService.js'
import { sessionRepository } from '../repositories/sessionRepository.js'
import { courseRepository } from '../repositories/courseRepository.js'
import { authenticate, requireRoles } from '../middleware/authenticate.js'

export const adminRoutes = Router()

adminRoutes.use(authenticate, requireRoles('admin'))

adminRoutes.get('/stats', (_req, res) => {
  res.json({ stats: adminService.getStats() })
})

adminRoutes.get('/users', (_req, res) => {
  res.json({ users: adminService.listUsers() })
})

adminRoutes.get('/sessions', (_req, res) => {
  res.json({ sessions: sessionRepository.list() })
})

adminRoutes.get('/courses', (_req, res) => {
  res.json({ courses: courseRepository.list() })
})
