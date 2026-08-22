import { Router } from 'express'
import { env } from '../config/env.js'

export const healthRoutes = Router()

healthRoutes.get('/health', (_req, res) => {
  res.json({
    status: 'ok',
    teamsConfigured: env.isAzureConfigured(),
    timestamp: new Date().toISOString(),
  })
})
