import { db } from '../db/connection.js'
import type { Course } from '../types/index.js'

export const courseRepository = {
  list(): Course[] {
    const rows = db
      .prepare(
        `SELECT c.*, u.name as instructor_name,
          (SELECT COUNT(*) FROM enrollments e WHERE e.course_id = c.id) as student_count
         FROM courses c
         JOIN users u ON u.id = c.instructor_id
         ORDER BY c.title`
      )
      .all() as Array<{
      id: string
      title: string
      description: string | null
      instructor_id: string
      instructor_name: string
      level: string
      duration: string
      rating: number
      student_count: number
    }>

    return rows.map((r) => ({
      id: r.id,
      title: r.title,
      description: r.description,
      instructorId: r.instructor_id,
      instructorName: r.instructor_name,
      level: r.level,
      duration: r.duration,
      rating: r.rating,
      studentCount: r.student_count,
    }))
  },

  findById(id: string): Course | null {
    const r = db
      .prepare(
        `SELECT c.*, u.name as instructor_name,
          (SELECT COUNT(*) FROM enrollments e WHERE e.course_id = c.id) as student_count
         FROM courses c
         JOIN users u ON u.id = c.instructor_id
         WHERE c.id = ?`
      )
      .get(id) as
      | {
          id: string
          title: string
          description: string | null
          instructor_id: string
          instructor_name: string
          level: string
          duration: string
          rating: number
          student_count: number
        }
      | undefined
    if (!r) return null
    return {
      id: r.id,
      title: r.title,
      description: r.description,
      instructorId: r.instructor_id,
      instructorName: r.instructor_name,
      level: r.level,
      duration: r.duration,
      rating: r.rating,
      studentCount: r.student_count,
    }
  },

  listByInstructor(instructorId: string): Course[] {
    return courseRepository.list().filter((c) => c.instructorId === instructorId)
  },

  listByStudent(studentId: string): Array<Course & { progress: number }> {
    const rows = db
      .prepare(
        `SELECT c.*, u.name as instructor_name, e.progress,
          (SELECT COUNT(*) FROM enrollments en WHERE en.course_id = c.id) as student_count
         FROM enrollments e
         JOIN courses c ON c.id = e.course_id
         JOIN users u ON u.id = c.instructor_id
         WHERE e.student_id = ?
         ORDER BY c.title`
      )
      .all(studentId) as Array<{
      id: string
      title: string
      description: string | null
      instructor_id: string
      instructor_name: string
      level: string
      duration: string
      rating: number
      student_count: number
      progress: number
    }>

    return rows.map((r) => ({
      id: r.id,
      title: r.title,
      description: r.description,
      instructorId: r.instructor_id,
      instructorName: r.instructor_name,
      level: r.level,
      duration: r.duration,
      rating: r.rating,
      studentCount: r.student_count,
      progress: r.progress,
    }))
  },

  count(): number {
    const row = db.prepare('SELECT COUNT(*) as c FROM courses').get() as { c: number }
    return row.c
  },
}
