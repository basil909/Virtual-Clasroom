import Database from 'better-sqlite3'
import fs from 'fs'
import path from 'path'
import { env } from '../config/env.js'
import { runSchema } from './schema.js'

const dbDir = path.dirname(env.databasePath)
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true })
}

export const db = new Database(env.databasePath)
db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')

runSchema(db)
