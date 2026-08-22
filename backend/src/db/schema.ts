import type Database from 'better-sqlite3'

export function runSchema(db: Database.Database) {
  db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      role TEXT NOT NULL CHECK(role IN ('admin', 'teacher', 'student')),
      subject TEXT,
      bio TEXT,
      rating REAL,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS courses (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      instructor_id TEXT NOT NULL REFERENCES users(id),
      level TEXT NOT NULL,
      duration TEXT NOT NULL,
      rating REAL DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS enrollments (
      id TEXT PRIMARY KEY,
      student_id TEXT NOT NULL REFERENCES users(id),
      course_id TEXT NOT NULL REFERENCES courses(id),
      progress INTEGER DEFAULT 0,
      enrolled_at TEXT DEFAULT (datetime('now')),
      UNIQUE(student_id, course_id)
    );

    CREATE TABLE IF NOT EXISTS assignments (
      id TEXT PRIMARY KEY,
      course_id TEXT NOT NULL REFERENCES courses(id),
      title TEXT NOT NULL,
      description TEXT,
      due_date TEXT NOT NULL,
      created_by TEXT NOT NULL REFERENCES users(id),
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS assignment_submissions (
      id TEXT PRIMARY KEY,
      assignment_id TEXT NOT NULL REFERENCES assignments(id),
      student_id TEXT NOT NULL REFERENCES users(id),
      status TEXT NOT NULL CHECK(status IN ('pending', 'submitted', 'graded')) DEFAULT 'pending',
      grade TEXT,
      submitted_at TEXT,
      UNIQUE(assignment_id, student_id)
    );

    CREATE TABLE IF NOT EXISTS class_sessions (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      description TEXT,
      teacher_id TEXT NOT NULL REFERENCES users(id),
      teacher_email TEXT,
      course_id TEXT REFERENCES courses(id),
      start_time TEXT NOT NULL,
      end_time TEXT NOT NULL,
      status TEXT NOT NULL CHECK(status IN ('scheduled', 'live', 'ended')) DEFAULT 'scheduled',
      teams_meeting_id TEXT,
      join_url TEXT,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS microsoft_tokens (
      user_id TEXT PRIMARY KEY REFERENCES users(id),
      access_token TEXT NOT NULL,
      token_cache TEXT NOT NULL,
      expires_at INTEGER NOT NULL,
      account_email TEXT,
      account_name TEXT,
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS oauth_states (
      state TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      return_url TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );
  `)

  // Migrate legacy sessions table missing columns
  const sessionCols = db.prepare('PRAGMA table_info(class_sessions)').all() as Array<{ name: string }>
  if (sessionCols.length > 0 && !sessionCols.some((c) => c.name === 'course_id')) {
    db.exec(`ALTER TABLE class_sessions ADD COLUMN course_id TEXT REFERENCES courses(id)`)
  }
  if (sessionCols.length > 0 && !sessionCols.some((c) => c.name === 'status')) {
    db.exec(`ALTER TABLE class_sessions ADD COLUMN status TEXT DEFAULT 'scheduled'`)
  }
}
