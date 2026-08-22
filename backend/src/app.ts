import express from 'express'
import cors from 'cors'
import compression from 'compression'
import helmet from 'helmet'
import { env } from './config/env.js'
import { apiRouter } from './routes/index.js'
import { errorHandler } from './middleware/errorHandler.js'

export function createApp() {
  const app = express()

  // Security headers
  app.use(helmet())

  // Gzip/Brotli compression for responses
  app.use(compression())

  app.use(
    cors({
      origin: [env.frontendUrl, 'http://localhost:3000', 'http://localhost:3001'],
      credentials: true,
    })
  )
  app.use(express.json())

  // Small cache control helper for static-like routes
  app.use((req, res, next) => {
    try {
      if (req.method === 'GET' && req.path.startsWith('/api/static')) {
        res.setHeader('Cache-Control', 'public, max-age=86400, immutable')
      }
    } catch (e) {
      /* noop */
    }

    next()
  })

  // Friendly root endpoint for browser
  app.get('/', (_req, res) => {
    res.send('SkillX API — visit /api for endpoints')
  })

  app.use('/api', apiRouter)
  app.use(errorHandler)

  return app
}
