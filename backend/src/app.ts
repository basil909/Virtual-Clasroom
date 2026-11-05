import express from 'express'
import cors from 'cors'
import compression from 'compression'
import helmet from 'helmet'

import { env } from './config/env.js'
import { apiRouter } from './routes/index.js'
import { errorHandler } from './middleware/errorHandler.js'

export function createApp() {
  const app = express()

  // =========================================================
  // SECURITY
  // =========================================================

  app.use(helmet())

  // =========================================================
  // RESPONSE COMPRESSION
  // =========================================================

  app.use(compression())

  // =========================================================
  // CORS
  // =========================================================

  app.use(
    cors({
      origin: [
        env.frontendUrl,
        'http://localhost:3000',
        'http://localhost:3001',
      ],
      credentials: true,
    }),
  )

  // =========================================================
  // BODY PARSING
  // =========================================================

  app.use(express.json())

  // =========================================================
  // CACHE CONTROL
  // =========================================================

  app.use((req, res, next) => {
    try {
      if (
        req.method === 'GET' &&
        /^\/api\/(pricing|teachers)\/?$/.test(req.path)
      ) {
        // Public, rarely-changing data
        res.setHeader('Cache-Control', 'public, max-age=60')
      } else if (
        req.method === 'GET' &&
        req.path.startsWith('/api/static')
      ) {
        res.setHeader(
          'Cache-Control',
          'public, max-age=86400, immutable',
        )
      }
    } catch {
      // Ignore cache-control errors
    }

    next()
  })

  // =========================================================
  // ROOT ENDPOINT
  // =========================================================

  app.get('/', (_req, res) => {
    res.status(200).send('SkillX API — visit /api for endpoints')
  })

  // =========================================================
  // API ROUTES
  // =========================================================

  app.get('/api', (_req, res) => {
    res.json({
      name: 'SkillX API',
      endpoints: [
        '/api/health',
        '/api/auth',
        '/api/courses',
        '/api/teachers',
        '/api/assignments',
        '/api/sessions',
        '/api/pricing',
        '/api/admin',
        '/api/teams',
      ],
    })
  })

  app.use('/api', apiRouter)

  app.use((_req, res) => {
    res.status(404).json({ error: 'Route not found.' })
  })

  // =========================================================
  // ERROR HANDLER
  // =========================================================

  app.use(errorHandler)

  return app
}