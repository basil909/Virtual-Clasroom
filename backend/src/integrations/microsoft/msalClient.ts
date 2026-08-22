import {
  ConfidentialClientApplication,
  type AuthenticationResult,
} from '@azure/msal-node'
import { assertAzureConfigured, env } from '../../config/env.js'

let msalClient: ConfidentialClientApplication | null = null

export function getMsalClient(): ConfidentialClientApplication {
  assertAzureConfigured()
  if (!msalClient) {
    msalClient = new ConfidentialClientApplication({
      auth: {
        clientId: env.azure.clientId,
        authority: env.azure.authority(),
        clientSecret: env.azure.clientSecret,
      },
    })
  }
  return msalClient
}

export function getAuthCodeUrl(state: string): Promise<string> {
  return getMsalClient().getAuthCodeUrl({
    scopes: env.azure.graphScopes,
    redirectUri: env.azure.redirectUri,
    state,
    prompt: 'consent',
  })
}

export function acquireTokenByCode(code: string): Promise<AuthenticationResult | null> {
  return getMsalClient().acquireTokenByCode({
    code,
    scopes: env.azure.graphScopes,
    redirectUri: env.azure.redirectUri,
  })
}

export async function acquireAppOnlyToken(): Promise<string> {
  const result = await getMsalClient().acquireTokenByClientCredential({
    scopes: ['https://graph.microsoft.com/.default'],
  })
  if (!result?.accessToken) {
    throw new Error('Failed to acquire application access token for Microsoft Graph.')
  }
  return result.accessToken
}
