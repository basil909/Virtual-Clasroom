import { db } from '../db/connection.js'
import type { Assignment } from '../types/index.js'

export const assignmentRepository = {
  listForStudent(studentId: string): Assignment[] {
    const rows = db
      .prepare(
        `SELECT a.*, c.title as course_title, s.status, s.grade
         FROM assignments a
         JOIN courses c ON c.id = a.course_id
         LEFT JOIN assignment_submissions s ON s.assignment_id = a.id AND s.student_id = ?
         ORDER BY a.due_date`
      )
      .all(studentId) as Array<{
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
