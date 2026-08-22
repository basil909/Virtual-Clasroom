import { Router } from 'express'
import { healthRoutes } from './health.routes.js'
import { authRoutes } from './auth.routes.js'
import { microsoftAuthRoutes } from './auth.microsoft.routes.js'
import { coursesRoutes } from './courses.routes.js'
import { teachersRoutes } from './teachers.routes.js'
import { assignmentsRoutes } from './assignments.routes.js'
import { sessionsRoutes } from './sessions.routes.js'
import { teamsRoutes } from './teams.routes.js'
import { adminRoutes } from './admin.routes.js'
import { pricingRoutes } from './pricing.routes.js'

export const apiRouter = Router()

apiRouter.use(healthRoutes)
apiRouter.use('/auth', authRoutes)
apiRouter.use('/auth/microsoft', microsoftAuthRoutes)
apiRouter.use('/courses', coursesRoutes)
apiRouter.use('/teachers', teachersRoutes)
apiRouter.use('/assignments', assignmentsRoutes)
apiRouter.use('/sessions', sessionsRoutes)
apiRouter.use('/teams', teamsRoutes)
apiRouter.use('/admin', adminRoutes)
apiRouter.use('/pricing', pricingRoutes)
