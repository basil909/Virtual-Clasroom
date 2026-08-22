import { db } from '../db/connection.js'
import type { ClassSession } from '../types/index.js'

type SessionRow = {
  id: string
  title: string
  description: string | null
  teacher_id: string
  teacher_email: string | null
  course_id: string | null
  start_time: string
  end_time: string
  status: ClassSession['status']
  teams_meeting_id: string | null
  join_url: string | null
  created_at: string
}

function map(row: SessionRow): ClassSession {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    teacherId: row.teacher_id,
    teacherEmail: row.teacher_email,
    courseId: row.course_id,
    startTime: row.start_time,
    endTime: row.end_time,
    status: row.status ?? 'scheduled',
    teamsMeetingId: row.teams_meeting_id,
    joinUrl: row.join_url,
    createdAt: row.created_at,
  }
}

export const sessionRepository = {
  list(teacherId?: string): ClassSession[] {
    if (teacherId) {
      const rows = db
        .prepare('SELECT * FROM class_sessions WHERE teacher_id = ? ORDER BY start_time DESC')
        .all(teacherId) as SessionRow[]
      return rows.map(map)
    }
    const rows = db
      .prepare('SELECT * FROM class_sessions ORDER BY start_time DESC')
      .all() as SessionRow[]
    return rows.map(map)
  },

  findById(id: string): ClassSession | null {
    const row = db.prepare('SELECT * FROM class_sessions WHERE id = ?').get(id) as
      | SessionRow
      | undefined
    return row ? map(row) : null
  },

  create(session: Omit<ClassSession, 'createdAt'>): ClassSession {
    db.prepare(
      `INSERT INTO class_sessions
        (id, title, description, teacher_id, teacher_email, course_id, start_time, end_time, status, teams_meeting_id, join_url)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    ).run(
      session.id,
      session.title,
      session.description,
      session.teacherId,
      session.teacherEmail,
      session.courseId,
      session.startTime,
      session.endTime,
      session.status,
      session.teamsMeetingId,
      session.joinUrl
    )
    return sessionRepository.findById(session.id)!
  },

  delete(id: string): boolean {
    const result = db.prepare('DELETE FROM class_sessions WHERE id = ?').run(id)
    return result.changes > 0
  },

  countLive(): number {
    const row = db
      .prepare(`SELECT COUNT(*) as c FROM class_sessions WHERE status = 'live'`)
      .get() as { c: number }
    return row.c
  },

  countAll(): number {
    const row = db.prepare('SELECT COUNT(*) as c FROM class_sessions').get() as { c: number }
    return row.c
  },
}
