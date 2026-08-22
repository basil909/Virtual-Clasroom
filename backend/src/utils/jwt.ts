import jwt from 'jsonwebtoken'
import { env } from '../config/env.js'
import type { JwtPayload, User, UserRole } from '../types/index.js'

export function signToken(user: Pick<User, 'id' | 'email' | 'role'>): string {
  const payload: JwtPayload = { sub: user.id, email: user.email, role: user.role }
  return jwt.sign(payload, env.jwtSecret, { expiresIn: env.jwtExpiresIn as jwt.SignOptions['expiresIn'] })
}

export function verifyToken(token: string): JwtPayload {
  return jwt.verify(token, env.jwtSecret) as JwtPayload
}

export function requireRole(role: UserRole, allowed: UserRole[]): void {
  if (!allowed.includes(role)) {
    throw new Error('You do not have permission to perform this action.')
  }
}
