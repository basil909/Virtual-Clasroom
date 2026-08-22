import { Router } from 'express'
import { z } from 'zod'
import {
  createTeamsMeeting,
  deleteTeamsMeeting,
  listTeamsMeetings,
} from '../integrations/microsoft/teamsService.js'
import { authenticate, requireRoles, type AuthRequest } from '../middleware/authenticate.js'

export const teamsRoutes = Router()

const createMeetingSchema = z.object({
  subject: z.string().min(1),
  startDateTime: z.string().datetime(),
  endDateTime: z.string().datetime(),
})

teamsRoutes.get('/meetings', authenticate, requireRoles('teacher', 'admin'), async (req: AuthRequest, res, next) => {
  try {
    const meetings = await listTeamsMeetings(req.user!.sub)
    res.json({ meetings })
  } catch (err) {
    next(err)
  }
})

teamsRoutes.post('/meetings', authenticate, requireRoles('teacher', 'admin'), async (req: AuthRequest, res, next) => {
  try {
    const body = createMeetingSchema.parse(req.body)
    const meeting = await createTeamsMeeting({ ...body, userId: req.user!.sub })
    res.status(201).json({ meeting })
  } catch (err) {
    next(err)
  }
})

teamsRoutes.delete('/meetings/:meetingId', authenticate, requireRoles('teacher', 'admin'), async (req: AuthRequest, res, next) => {
  try {
    await deleteTeamsMeeting(String(req.params.meetingId), req.user!.sub)
    res.json({ success: true })
  } catch (err) {
    next(err)
  }
})
