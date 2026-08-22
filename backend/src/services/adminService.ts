import { courseRepository } from '../repositories/courseRepository.js'
import { sessionRepository } from '../repositories/sessionRepository.js'
import { userRepository } from '../repositories/userRepository.js'
import type { AdminStats } from '../types/index.js'

export const adminService = {
  getStats(): AdminStats {
    return {
      students: userRepository.countByRole('student'),
      teachers: userRepository.countByRole('teacher'),
      courses: courseRepository.count(),
      liveSessions: sessionRepository.countLive(),
      recordings: sessionRepository.countAll(),
    }
  },

  listUsers() {
    return userRepository.listAll()
  },
}
