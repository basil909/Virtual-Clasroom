import { Router } from 'express'
import { z } from 'zod'
import { assignmentRepository } from '../repositories/assignmentRepository.js'
import { courseRepository } from '../repositories/courseRepository.js'
import { authenticate, requireRoles, type AuthRequest } from '../middleware/authenticate.js'
import { HttpError } from '../middleware/errorHandler.js'

export const assignmentsRoutes = Router()

const createSchema = z.object({
  courseId: z.string().min(1, 'Choose a course.'),
  title: z.string().trim().min(1, 'Title is required.'),
  description: z.string().trim().optional(),
  dueDate: z.string().min(1, 'Due date is required.'),
})

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

assignmentsRoutes.post(
  '/',
  authenticate,
  requireRoles('teacher', 'admin'),
  (req: AuthRequest, res, next) => {
    try {
      const body = createSchema.parse(req.body)
      if (Number.isNaN(new Date(body.dueDate).getTime())) {
        throw new HttpError(400, 'Enter a valid due date.')
      }

      const course = courseRepository.findById(body.courseId)
      if (!course) throw new HttpError(404, 'Course not found.')
      if (req.user!.role !== 'admin' && course.instructorId !== req.user!.sub) {
        throw new HttpError(403, 'You can only add assignments to your own courses.')
      }

      const id = assignmentRepository.create({
        courseId: body.courseId,
        title: body.title,
        description: body.description || null,
        dueDate: body.dueDate,
        createdBy: req.user!.sub,
      })
      res.status(201).json({ id })
    } catch (err) {
      next(err)
    }
  }
)

assignmentsRoutes.post(
  '/:id/submit',
  authenticate,
  requireRoles('student'),
  (req: AuthRequest, res, next) => {
    try {
      const assignment = assignmentRepository.findById(String(req.params.id))
      if (!assignment) throw new HttpError(404, 'Assignment not found.')
      if (!courseRepository.isEnrolled(req.user!.sub, assignment.courseId)) {
        throw new HttpError(403, 'You are not enrolled in this course.')
      }
      assignmentRepository.submit(assignment.id, req.user!.sub)
      res.json({ success: true })
    } catch (err) {
      next(err)
    }
  }
)
