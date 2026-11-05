import { Router } from 'express'
import { z } from 'zod'
import { v4 as uuid } from 'uuid'
import { sessionService } from '../services/sessionService.js'
import { sessionRepository } from '../repositories/sessionRepository.js'
import { userRepository } from '../repositories/userRepository.js'
import { db } from '../db/connection.js'
import { authenticate, requireRoles, type AuthRequest } from '../middleware/authenticate.js'
import { HttpError } from '../middleware/errorHandler.js'

export const sessionsRoutes = Router()

const createSchema = z
  .object({
    title: z.string().trim().min(1, 'Title is required.'),
    description: z.string().optional(),
    teacherId: z.string().optional(),
    teacherEmail: z.string().email().optional(),
    courseId: z.string().optional(),
    startTime: z.string().datetime(),
    endTime: z.string().datetime(),
    createTeamsMeeting: z.boolean().default(false),
  })
  .refine((v) => new Date(v.endTime) > new Date(v.startTime), {
    message: 'The end time must be after the start time.',
    path: ['endTime'],
  })

const messageSchema = z.object({
  text: z.string().trim().min(1, 'Message cannot be empty.').max(1000),
})

sessionsRoutes.use(authenticate)

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

sessionsRoutes.post('/', requireRoles('teacher', 'admin'), async (req: AuthRequest, res, next) => {
  try {
    const body = createSchema.parse(req.body)
    // Only admins may schedule on behalf of another teacher.
    const teacherId =
      req.user!.role === 'admin' ? (body.teacherId ?? req.user!.sub) : req.user!.sub
    const session = await sessionService.create({ ...body, teacherId })
    res.status(201).json({ session })
  } catch (err) {
    next(err)
  }
})

sessionsRoutes.delete('/:id', requireRoles('teacher', 'admin'), async (req: AuthRequest, res, next) => {
  try {
    const id = String(req.params.id)
    const session = sessionRepository.findById(id)
    if (!session) throw new HttpError(404, 'Session not found.')
    if (req.user!.role !== 'admin' && session.teacherId !== req.user!.sub) {
      throw new HttpError(403, 'You can only delete your own classes.')
    }
    await sessionService.remove(id)
    res.json({ success: true })
  } catch (err) {
    next(err)
  }
})

// ---------------------------------------------------------------------------
// In-class chat (polled by the classroom UI)
// ---------------------------------------------------------------------------

type MessageRow = {
  id: string
  user_id: string
  user_name: string
  text: string
  created_at: string
}

sessionsRoutes.get('/:id/messages', (req, res, next) => {
  try {
    const id = String(req.params.id)
    if (!sessionRepository.findById(id)) throw new HttpError(404, 'Session not found.')
    const after = req.query.after ? String(req.query.after) : ''
    const rows = db
      .prepare(
        `SELECT id, user_id, user_name, text, created_at FROM session_messages
         WHERE session_id = ? AND created_at > ?
         ORDER BY created_at ASC LIMIT 200`
      )
      .all(id, after) as MessageRow[]
    res.json({
      messages: rows.map((r) => ({
        id: r.id,
        userId: r.user_id,
        user: r.user_name,
        text: r.text,
        createdAt: r.created_at,
      })),
    })
  } catch (err) {
    next(err)
  }
})

sessionsRoutes.post('/:id/messages', (req: AuthRequest, res, next) => {
  try {
    const id = String(req.params.id)
    if (!sessionRepository.findById(id)) throw new HttpError(404, 'Session not found.')
    const { text } = messageSchema.parse(req.body)
    const user = userRepository.findById(req.user!.sub)
    if (!user) throw new HttpError(401, 'Account no longer exists.')

    const messageId = uuid()
    const createdAt = new Date().toISOString()
    db.prepare(
      `INSERT INTO session_messages (id, session_id, user_id, user_name, text, created_at)
       VALUES (?, ?, ?, ?, ?, ?)`
    ).run(messageId, id, user.id, user.name, text, createdAt)

    res.status(201).json({
      message: { id: messageId, userId: user.id, user: user.name, text, createdAt },
    })
  } catch (err) {
    next(err)
  }
})
