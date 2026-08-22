import { db } from '../db/connection.js'
import type { MicrosoftTokenRecord } from '../types/index.js'

export const microsoftRepository = {
  get(userId: string): MicrosoftTokenRecord | null {
    const row = db
      .prepare('SELECT * FROM microsoft_tokens WHERE user_id = ?')
      .get(userId) as
      | {
          user_id: string
          access_token: string
          token_cache: string
          expires_at: number
          account_email: string | null
          account_name: string | null
        }
      | undefined
    if (!row) return null
    return {
      userId: row.user_id,
      accessToken: row.access_token,
      tokenCache: row.token_cache,
      expiresAt: row.expires_at,
      accountEmail: row.account_email,
      accountName: row.account_name,
    }
  },

  upsert(record: MicrosoftTokenRecord) {
    db.prepare(
      `INSERT INTO microsoft_tokens (user_id, access_token, token_cache, expires_at, account_email, account_name, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, datetime('now'))
       ON CONFLICT(user_id) DO UPDATE SET
         access_token = excluded.access_token,
         token_cache = excluded.token_cache,
         expires_at = excluded.expires_at,
         account_email = excluded.account_email,
         account_name = excluded.account_name,
         updated_at = datetime('now')`
    ).run(
      record.userId,
      record.accessToken,
      record.tokenCache,
      record.expiresAt,
      record.accountEmail,
      record.accountName
    )
  },

  delete(userId: string) {
    db.prepare('DELETE FROM microsoft_tokens WHERE user_id = ?').run(userId)
  },

  saveOAuthState(state: string, userId: string, returnUrl: string) {
    db.prepare(
      'INSERT INTO oauth_states (state, user_id, return_url) VALUES (?, ?, ?)'
    ).run(state, userId, returnUrl)
  },

  consumeOAuthState(state: string): { userId: string; returnUrl: string } | null {
    const row = db
      .prepare('SELECT user_id, return_url FROM oauth_states WHERE state = ?')
      .get(state) as { user_id: string; return_url: string } | undefined
    if (!row) return null
    db.prepare('DELETE FROM oauth_states WHERE state = ?').run(state)
    return { userId: row.user_id, returnUrl: row.return_url }
  },
}
