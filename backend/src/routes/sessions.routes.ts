import { Router } from 'express'
import { z } from 'zod'
import { sessionService } from '../services/sessionService.js'
import { authenticate, requireRoles, type AuthRequest } from '../middleware/authenticate.js'

export const sessionsRoutes = Router()

const createSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  teacherId: z.string().optional(),
  teacherEmail: z.string().email().optional(),
  courseId: z.string().optional(),
  startTime: z.string().datetime(),
  endTime: z.string().datetime(),
  createTeamsMeeting: z.boolean().default(true),
})

sessionsRoutes.get('/', (req, res) => {
  const teacherId = req.query.teacherId ? String(req.query.teacherId) : undefined
  res.json({ sessions: sessionService.list(teacherId) })
})

sessionsRoutes.get('/:id', (req, res, next) => {
  try {
    res.json({ session: sessionService.getById(req.params.id) })
  } catch (err) {
    next(err)
  }
})

sessionsRoutes.post('/', authenticate, requireRoles('teacher', 'admin'), async (req: AuthRequest, res, next) => {
  try {
    const body = createSchema.parse(req.body)
    const teacherId = body.teacherId ?? req.user!.sub
    const session = await sessionService.create({
      ...body,
      teacherId,
    })
    res.status(201).json({ session })
  } catch (err) {
    next(err)
  }
})

sessionsRoutes.delete('/:id', authenticate, requireRoles('teacher', 'admin'), async (req, res, next) => {
  try {
    await sessionService.remove(String(req.params.id))
    res.json({ success: true })
  } catch (err) {
    next(err)
  }
})
