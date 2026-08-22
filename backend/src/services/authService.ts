import { v4 as uuid } from 'uuid'
import { userRepository } from '../repositories/userRepository.js'
import { hashPassword, verifyPassword } from '../utils/password.js'
import { signToken } from '../utils/jwt.js'
import type { User, UserRole } from '../types/index.js'

export const authService = {
  async register(name: string, email: string, password: string, role: UserRole) {
    if (password.length < 6) {
      throw new Error('Password must be at least 6 characters.')
    }
    if (userRepository.findByEmail(email)) {
      throw new Error('An account with this email already exists.')
    }
    const user = userRepository.create({
      id: uuid(),
      name,
      email,
      passwordHash: await hashPassword(password),
      role,
    })
    const token = signToken(user)
    return { user, token }
  },

  async login(email: string, password: string) {
    const record = userRepository.findByEmail(email)
    if (!record || !(await verifyPassword(password, record.passwordHash))) {
      throw new Error('Invalid email or password.')
    }
    const { passwordHash: _, ...user } = record
    const token = signToken(user)
    return { user, token }
  },

  getMe(userId: string): User | null {
    return userRepository.findById(userId)
  },
}
