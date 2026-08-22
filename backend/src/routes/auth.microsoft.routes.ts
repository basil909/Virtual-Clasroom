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

export const microsoftAuthRoutes = Router()

microsoftAuthRoutes.get('/login', async (req, res, next) => {
  try {
    const userId = String(req.query.userId ?? '')
    const returnUrl = String(
      req.query.returnUrl ?? `${env.frontendUrl}/dashboard/teacher/classes`
    )
    if (!userId) {
      res.status(400).json({ error: 'userId query parameter is required.' })
      return
    }
    if (!env.isAzureConfigured()) {
      res.status(503).json({ error: 'Microsoft Teams integration is not configured.' })
      return
    }
    const state = randomUUID()
    microsoftRepository.saveOAuthState(state, userId, returnUrl)
    res.redirect(await getAuthCodeUrl(state))
  } catch (err) {
    next(err)
  }
})

microsoftAuthRoutes.get('/callback', async (req, res, next) => {
  try {
    const code = String(req.query.code ?? '')
    const state = String(req.query.state ?? '')
    const error = req.query.error_description ?? req.query.error

    if (error) {
      res.redirect(
        `${env.frontendUrl}/dashboard/teacher/classes?teams=error&message=${encodeURIComponent(String(error))}`
      )
      return
    }

    const oauthState = microsoftRepository.consumeOAuthState(state)
    if (!oauthState || !code) {
      res.redirect(
        `${env.frontendUrl}/dashboard/teacher/classes?teams=error&message=${encodeURIComponent('Invalid OAuth state.')}`
      )
      return
    }

    const result = await acquireTokenByCode(code)
    if (!result?.accessToken) {
      res.redirect(
        `${oauthState.returnUrl}?teams=error&message=${encodeURIComponent('Failed to obtain Microsoft tokens.')}`
      )
      return
    }

    saveTokenFromAuthResult(oauthState.userId, result as AuthenticationResult)
    res.redirect(`${oauthState.returnUrl}?teams=connected`)
  } catch (err) {
    next(err)
  }
})

microsoftAuthRoutes.get('/status', (req, res) => {
  const userId = String(req.query.userId ?? '')
  if (!userId) {
    res.status(400).json({ error: 'userId is required.' })
    return
  }
  const record = microsoftRepository.get(userId)
  res.json({
    connected: Boolean(record),
    accountEmail: record?.accountEmail ?? null,
    accountName: record?.accountName ?? null,
    serverConfigured: env.isAzureConfigured(),
  })
})

microsoftAuthRoutes.post('/disconnect', (req, res) => {
  const userId = String(req.body.userId ?? '')
  if (!userId) {
    res.status(400).json({ error: 'userId is required.' })
    return
  }
  microsoftRepository.delete(userId)
  res.json({ success: true })
})
