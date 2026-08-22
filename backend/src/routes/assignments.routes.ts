import { Router } from 'express'
import { assignmentRepository } from '../repositories/assignmentRepository.js'
import { authenticate, requireRoles, type AuthRequest } from '../middleware/authenticate.js'

export const assignmentsRoutes = Router()

assignmentsRoutes.get(
  '/me',
  authenticate,
  requireRoles('student'),
  (req: AuthRequest, res) => {
    res.json({ assignments: assignmentRepository.listForStudent(req.user!.sub) })
  }
)

assignmentsRoutes.get(
  '/teacher',
  authenticate,
  requireRoles('teacher'),
  (req: AuthRequest, res) => {
    res.json({ assignments: assignmentRepository.listForTeacher(req.user!.sub) })
  }
)

assignmentsRoutes.get(
  '/',
  authenticate,
  requireRoles('admin'),
  (_req, res) => {
    res.json({ assignments: assignmentRepository.listAll() })
  }
)
