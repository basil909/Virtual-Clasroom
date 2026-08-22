import type { NextFunction, Request, Response } from 'express'
import { verifyToken } from '../utils/jwt.js'
import type { JwtPayload } from '../types/index.js'

export type AuthRequest = Request & { user?: JwtPayload }

export function authenticate(req: AuthRequest, res: Response, next: NextFunction) {
  const header = req.headers.authorization
  if (!header?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Authentication required.' })
    return
  }
  try {
    req.user = verifyToken(header.slice(7))
    next()
  } catch {
    res.status(401).json({ error: 'Invalid or expired token.' })
  }
}

export function requireRoles(...roles: Array<'admin' | 'teacher' | 'student'>) {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      res.status(403).json({ error: 'Insufficient permissions.' })
      return
    }
    next()
  }
}
