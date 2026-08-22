# SkillX Virtual Classroom

A full-stack virtual learning platform built with Next.js, Express, TypeScript, SQLite, and optional Microsoft Teams integration. The project provides a practical foundation for managing courses, users, assignments, class sessions, and online meetings.

## What The Project Is About

SkillX connects students, teachers, and administrators in one virtual classroom. Students can explore courses and attend scheduled sessions, teachers can manage classes and assignments, and administrators can manage platform data through role-based dashboards.

## Features

- Marketing pages for the home page, courses, teachers, pricing, and about information
- Role-based authentication and dashboards for admins, teachers, and students
- Course browsing and course management APIs
- Assignment creation and submission workflows
- Class session scheduling and session management
- Optional Microsoft Teams meeting creation and join links
- SQLite database with schema and seed data
- REST API built with Express and TypeScript

## Code And Technologies

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express, TypeScript, Zod
- **Database:** SQLite with `better-sqlite3`
- **Authentication:** JWT and bcrypt password hashing
- **Integrations:** Microsoft Graph and Microsoft Teams through MSAL
- **Organization:** reusable React components, route modules, services, repositories, and middleware

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

## Current Scope

- No email verification, password reset, or payment processing
- No file uploads or in-app video (Teams join links only)
- SQLite database (single-machine)
- No automated tests or deployment config
