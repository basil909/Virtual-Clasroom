import type { AuthenticationResult } from '@azure/msal-node'
import { env } from '../../config/env.js'
import { microsoftRepository } from '../../repositories/microsoftRepository.js'
import type { MicrosoftTokenRecord } from '../../types/index.js'
import { acquireTokenByCode, getMsalClient } from './msalClient.js'

const EXPIRY_BUFFER_MS = 60_000

export function saveTokenFromAuthResult(userId: string, result: AuthenticationResult) {
  const tokenCache = getMsalClient().getTokenCache().serialize()
  microsoftRepository.upsert({
    userId,
    accessToken: result.accessToken,
    tokenCache,
    expiresAt: result.expiresOn?.getTime() ?? Date.now() + 3600_000,
    accountEmail: result.account?.username ?? null,
    accountName: result.account?.name ?? null,
  })
}

export async function getValidAccessToken(userId: string): Promise<string | null> {
  const record = microsoftRepository.get(userId)
  if (!record) return null

  if (record.expiresAt - EXPIRY_BUFFER_MS > Date.now()) {
    return record.accessToken
  }

  if (!record.tokenCache) {
    microsoftRepository.delete(userId)
    return null
  }

  try {
    const client = getMsalClient()
    client.getTokenCache().deserialize(record.tokenCache)
    const accounts = await client.getTokenCache().getAllAccounts()
    const account = accounts.find((a) => a.username === record.accountEmail) ?? accounts[0]
    if (!account) {
      microsoftRepository.delete(userId)
      return null
    }

    const refreshed = await client.acquireTokenSilent({
      account,
      scopes: env.azure.graphScopes,
    })
    if (!refreshed?.accessToken) {
      microsoftRepository.delete(userId)
      return null
    }
    saveTokenFromAuthResult(userId, refreshed)
    return refreshed.accessToken
  } catch {
    microsoftRepository.delete(userId)
    return null
  }
}

export { acquireTokenByCode }
