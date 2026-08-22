# SkillX Virtual Classroom — Prototype

A **demonstration prototype** of a virtual learning platform with a Next.js frontend, Express API, SQLite database, and optional **Microsoft Teams** integration.

> This is not production-ready software. It uses seeded demo data, local storage/JWT auth, and simplified flows suitable for demos and coursework.

## What's included

- Marketing site (home, courses, teachers, pricing, about)
- Role-based dashboards (admin, teacher, student)
- JWT authentication with demo accounts
- Class sessions with optional Microsoft Teams meeting links
- SQLite backend with auto-seed on first run

## Quick start

**1. Backend** (terminal 1)

```bash
cd "Virtual Classroom/backend"
npm install
cp .env.example .env
npm run dev
```

API runs at `http://localhost:4000`

**2. Frontend** (terminal 2)

```bash
cd "Virtual Classroom/frontend"
npm install
npm run dev
```

Open `http://localhost:3000` (or 3001 if 3000 is busy).

**3. Frontend env** — `frontend/.env.local`:

```
NEXT_PUBLIC_API_URL=http://localhost:4000
```

## Demo logins

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@skillx.com | admin123 |
| Teacher | teacher@skillx.com | teacher123 |
| Student | student@skillx.com | student123 |

## Microsoft Teams (optional)

1. Register an app in [Azure Portal](https://portal.azure.com)
2. Add redirect URI: `http://localhost:4000/api/auth/microsoft/callback`
3. Grant Graph permissions: `User.Read`, `OnlineMeetings.ReadWrite`, `offline_access`
4. Set `AZURE_*` values in `backend/.env`

Teachers: **Dashboard → My Classes → Connect Microsoft Teams**

Without Azure config, the rest of the prototype still works; Teams scheduling will show a configuration message.

## Project structure

```
Virtual Classroom/
├── frontend/          Next.js UI
├── backend/           Express API + SQLite + Teams
│   └── STRUCTURE.md   Backend layout
└── README.md          This file
```

## Prototype limitations (by design)

- No email verification, password reset, or payment processing
- No file uploads or in-app video (Teams join links only)
- SQLite database (single-machine)
- No automated tests or deployment config
