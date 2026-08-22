import { v4 as uuid } from 'uuid'
import { sessionRepository } from '../repositories/sessionRepository.js'
import { createTeamsMeeting, deleteTeamsMeeting } from '../integrations/microsoft/teamsService.js'
import type { ClassSession } from '../types/index.js'

export const sessionService = {
  list(teacherId?: string) {
    return sessionRepository.list(teacherId)
  },

  getById(id: string) {
    const session = sessionRepository.findById(id)
    if (!session) throw new Error('Session not found.')
    return session
  },

  async create(input: {
    title: string
    description?: string
    teacherId: string
    teacherEmail?: string
    courseId?: string
    startTime: string
    endTime: string
    createTeamsMeeting?: boolean
  }): Promise<ClassSession> {
    let teamsMeetingId: string | null = null
    let joinUrl: string | null = null

    if (input.createTeamsMeeting !== false) {
      const meeting = await createTeamsMeeting({
        subject: input.title,
        startDateTime: input.startTime,
        endDateTime: input.endTime,
        userId: input.teacherId,
      })
      teamsMeetingId = meeting.id
      joinUrl = meeting.joinWebUrl ?? null
    }

    const now = new Date()
    const start = new Date(input.startTime)
    const end = new Date(input.endTime)
    let status: ClassSession['status'] = 'scheduled'
    if (now >= start && now <= end) status = 'live'
    else if (now > end) status = 'ended'

    return sessionRepository.create({
      id: uuid(),
      title: input.title,
      description: input.description ?? null,
      teacherId: input.teacherId,
      teacherEmail: input.teacherEmail ?? null,
      courseId: input.courseId ?? null,
      startTime: input.startTime,
      endTime: input.endTime,
      status,
      teamsMeetingId,
      joinUrl,
    })
  },

  async remove(id: string) {
    const session = sessionRepository.findById(id)
    if (!session) throw new Error('Session not found.')
    if (session.teamsMeetingId) {
      try {
        await deleteTeamsMeeting(session.teamsMeetingId, session.teacherId)
      } catch {
        /* meeting may already be gone */
      }
    }
    sessionRepository.delete(id)
  },
}
