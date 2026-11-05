import { Router } from 'express'
import { randomUUID } from 'crypto'
import type { AuthenticationResult } from '@azure/msal-node'
import { env } from '../config/env.js'
import { microsoftRepository } from '../repositories/microsoftRepository.js'
import { getAuthCodeUrl } from '../integrations/microsoft/msalClient.js'
import {
  acquireTokenByCode,
  saveTokenFromAuthResult,
} from '../integrations/microsoft/tokenService.js'
import { authenticate, requireRoles, type AuthRequest } from '../middleware/authenticate.js'
import { HttpError } from '../middleware/errorHandler.js'

export const microsoftAuthRoutes = Router()

const DEFAULT_RETURN = `${env.frontendUrl}/dashboard/teacher/classes`

/** Only allow redirects back to our own frontend (prevents open redirects). */
function safeReturnUrl(value: unknown): string {
  if (typeof value !== 'string' || !value) return DEFAULT_RETURN
  try {
    const url = new URL(value, env.frontendUrl)
    if (url.origin === new URL(env.frontendUrl).origin) {
      return `${url.origin}${url.pathname}`
    }
  } catch {
    /* fall through */
  }
  return DEFAULT_RETURN
}

/**
 * Starts the Microsoft sign-in flow. This is a POST so the caller's JWT can be
 * sent in the Authorization header; the response contains the Microsoft URL the
 * browser should navigate to.
 */
microsoftAuthRoutes.post(
  '/connect',
  authenticate,
  requireRoles('teacher', 'admin'),
  async (req: AuthRequest, res, next) => {
    try {
      if (!env.isAzureConfigured()) {
        throw new HttpError(503, 'Microsoft Teams integration is not configured.')
      }
      const state = randomUUID()
      microsoftRepository.saveOAuthState(
        state,
        req.user!.sub,
        safeReturnUrl(req.body?.returnUrl),
      )
      res.json({ url: await getAuthCodeUrl(state) })
    } catch (err) {
      next(err)
    }
  },
)

microsoftAuthRoutes.get('/callback', async (req, res, next) => {
  try {
    const code = String(req.query.code ?? '')
    const state = String(req.query.state ?? '')
    const error = req.query.error_description ?? req.query.error

    const fail = (returnUrl: string, message: string) =>
      res.redirect(`${returnUrl}?teams=error&message=${encodeURIComponent(message)}`)

    if (error) {
      fail(DEFAULT_RETURN, String(error))
      return
    }

    const oauthState = microsoftRepository.consumeOAuthState(state)
    if (!oauthState || !code) {
      fail(DEFAULT_RETURN, 'Invalid OAuth state.')
      return
    }

    const returnUrl = safeReturnUrl(oauthState.returnUrl)
    const result = await acquireTokenByCode(code)
    if (!result?.accessToken) {
      fail(returnUrl, 'Failed to obtain Microsoft tokens.')
      return
    }

    saveTokenFromAuthResult(oauthState.userId, result as AuthenticationResult)
    res.redirect(`${returnUrl}?teams=connected`)
  } catch (err) {
    next(err)
  }
})

microsoftAuthRoutes.get('/status', authenticate, (req: AuthRequest, res) => {
  const record = microsoftRepository.get(req.user!.sub)
  res.json({
    connected: Boolean(record),
    accountEmail: record?.accountEmail ?? null,
    accountName: record?.accountName ?? null,
    serverConfigured: env.isAzureConfigured(),
  })
})

microsoftAuthRoutes.post('/disconnect', authenticate, (req: AuthRequest, res) => {
  microsoftRepository.delete(req.user!.sub)
  res.json({ success: true })
})
