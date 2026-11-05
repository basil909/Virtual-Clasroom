import { v4 as uuid } from 'uuid'
import { db } from '../db/connection.js'
import type { Assignment } from '../types/index.js'

export const assignmentRepository = {
  create(input: {
    courseId: string
    title: string
    description: string | null
    dueDate: string
    createdBy: string
  }): string {
    const id = uuid()
    db.prepare(
      `INSERT INTO assignments (id, course_id, title, description, due_date, created_by)
       VALUES (?, ?, ?, ?, ?, ?)`
    ).run(id, input.courseId, input.title, input.description, input.dueDate, input.createdBy)
    return id
  },

  findById(id: string): { id: string; courseId: string } | null {
    const row = db
      .prepare('SELECT id, course_id FROM assignments WHERE id = ?')
      .get(id) as { id: string; course_id: string } | undefined
    return row ? { id: row.id, courseId: row.course_id } : null
  },

  submit(assignmentId: string, studentId: string) {
    db.prepare(
      `INSERT INTO assignment_submissions (id, assignment_id, student_id, status, submitted_at)
       VALUES (?, ?, ?, 'submitted', ?)
       ON CONFLICT(assignment_id, student_id) DO UPDATE SET
         status = CASE WHEN status = 'graded' THEN status ELSE 'submitted' END,
         submitted_at = CASE WHEN status = 'graded' THEN submitted_at ELSE excluded.submitted_at END`
    ).run(uuid(), assignmentId, studentId, new Date().toISOString())
  },

  listForStudent(studentId: string): Assignment[] {
    const rows = db
      .prepare(
        `SELECT a.*, c.title as course_title, s.status, s.grade
         FROM assignments a
         JOIN courses c ON c.id = a.course_id
         JOIN enrollments e ON e.course_id = a.course_id AND e.student_id = ?
         LEFT JOIN assignment_submissions s ON s.assignment_id = a.id AND s.student_id = ?
         ORDER BY a.due_date`
      )
      .all(studentId, studentId) as Array<{
      id: string
      course_id: string
      course_title: string
      title: string
      description: string | null
      due_date: string
      created_by: string
      status: string | null
      grade: string | null
    }>

    return rows.map((r) => ({
      id: r.id,
      courseId: r.course_id,
      courseTitle: r.course_title,
      title: r.title,
      description: r.description,
      dueDate: r.due_date,
      createdBy: r.created_by,
      status: (r.status ?? 'pending') as Assignment['status'],
      grade: r.grade,
    }))
  },

  listForTeacher(teacherId: string): Array<Assignment & { submissionCount: number }> {
    const rows = db
      .prepare(
        `SELECT a.*, c.title as course_title,
          (SELECT COUNT(*) FROM assignment_submissions s WHERE s.assignment_id = a.id) as submission_count
         FROM assignments a
         JOIN courses c ON c.id = a.course_id
         WHERE c.instructor_id = ?
         ORDER BY a.due_date`
      )
      .all(teacherId) as Array<{
      id: string
      course_id: string
      course_title: string
      title: string
      description: string | null
      due_date: string
      created_by: string
      submission_count: number
    }>

    return rows.map((r) => ({
      id: r.id,
      courseId: r.course_id,
      courseTitle: r.course_title,
      title: r.title,
      description: r.description,
      dueDate: r.due_date,
      createdBy: r.created_by,
      submissionCount: r.submission_count,
    }))
  },

  listAll(): Assignment[] {
    const rows = db
      .prepare(
        `SELECT a.*, c.title as course_title
         FROM assignments a
         JOIN courses c ON c.id = a.course_id
         ORDER BY a.due_date`
      )
      .all() as Array<{
      id: string
      course_id: string
      course_title: string
      title: string
      description: string | null
      due_date: string
      created_by: string
    }>

    return rows.map((r) => ({
      id: r.id,
      courseId: r.course_id,
      courseTitle: r.course_title,
      title: r.title,
      description: r.description,
      dueDate: r.due_date,
      createdBy: r.created_by,
    }))
  },
}
