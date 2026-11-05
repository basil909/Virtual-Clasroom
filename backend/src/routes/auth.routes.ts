import { Router } from 'express'
import { z } from 'zod'
import { authService } from '../services/authService.js'
import { authenticate, type AuthRequest } from '../middleware/authenticate.js'

export const authRoutes = Router()

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
})

const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  // Admin accounts cannot be self-registered.
  role: z.enum(['teacher', 'student']),
})

authRoutes.post('/login', async (req, res, next) => {
  try {
    const body = loginSchema.parse(req.body)
    const result = await authService.login(body.email, body.password)
    res.json(result)
  } catch (err) {
    next(err)
  }
})

authRoutes.post('/register', async (req, res, next) => {
  try {
    const body = registerSchema.parse(req.body)
    const result = await authService.register(body.name, body.email, body.password, body.role)
    res.status(201).json(result)
  } catch (err) {
    next(err)
  }
})

authRoutes.get('/me', authenticate, (req: AuthRequest, res, next) => {
  try {
    const user = authService.getMe(req.user!.sub)
    if (!user) {
      res.status(404).json({ error: 'User not found.' })
      return
    }
    res.json({ user })
  } catch (err) {
    next(err)
  }
})
