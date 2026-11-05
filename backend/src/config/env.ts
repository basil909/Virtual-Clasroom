import dotenv from 'dotenv'
import path from 'path'
import { fileURLToPath } from 'url'

dotenv.config()

const __dirname = path.dirname(fileURLToPath(import.meta.url))

function optional(name: string, fallback = ''): string {
  return process.env[name] ?? fallback
}

export const env = {
  port: Number(process.env.PORT ?? 4000),
  nodeEnv: process.env.NODE_ENV ?? 'development',
  frontendUrl: optional('FRONTEND_URL', 'http://localhost:3000'),
  jwtSecret: optional('JWT_SECRET', 'skillx-dev-secret-change-me'),
  jwtExpiresIn: optional('JWT_EXPIRES_IN', '7d'),
  databasePath:
    process.env.DATABASE_PATH ??
    path.resolve(__dirname, '../../data/skillx.db'),
  azure: {
    tenantId: optional('AZURE_TENANT_ID'),
    clientId: optional('AZURE_CLIENT_ID'),
    clientSecret: optional('AZURE_CLIENT_SECRET'),
    redirectUri: optional(
      'AZURE_REDIRECT_URI',
      'http://localhost:4000/api/auth/microsoft/callback'
    ),
    organizerUserId: optional('AZURE_ORGANIZER_USER_ID'),
    authority: () =>
      `https://login.microsoftonline.com/${optional('AZURE_TENANT_ID', 'common')}`,
    graphScopes: [
      'https://graph.microsoft.com/User.Read',
      'https://graph.microsoft.com/OnlineMeetings.ReadWrite',
      'offline_access',
    ],
  },
  isAzureConfigured(): boolean {
    const { tenantId, clientId, clientSecret } = this.azure
    const isReal = (v: string) => Boolean(v) && !v.startsWith('your-')
    return isReal(tenantId) && isReal(clientId) && isReal(clientSecret)
  },
}

export function assertAzureConfigured() {
  if (!env.isAzureConfigured()) {
    throw new Error(
      'Microsoft Teams is not configured. Set AZURE_TENANT_ID, AZURE_CLIENT_ID, and AZURE_CLIENT_SECRET in backend/.env'
    )
  }
}

if (
  env.nodeEnv === 'production' &&
  (env.jwtSecret === 'skillx-dev-secret-change-me' || env.jwtSecret === 'change-this-in-production')
) {
  throw new Error('JWT_SECRET must be set to a strong, unique value in production.')
}
