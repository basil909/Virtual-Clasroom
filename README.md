# SkillX Virtual Classroom

A full-stack virtual learning platform built with Next.js, Express, TypeScript, and SQLite. The project provides a practical foundation for managing courses, users, assignments, and class sessions.

## What The Project Is About

SkillX connects students, teachers, and administrators in one virtual classroom. Students can explore courses and attend scheduled sessions, teachers can manage classes and assignments, and administrators can manage platform data through role-based dashboards.

## Features

- Marketing pages for the home page, courses, teachers, pricing, and about information
- Role-based authentication and dashboards for admins, teachers, and students
- Course browsing and course management APIs
- Assignment creation and submission workflows
- Class session scheduling and session management
- SQLite database with schema and seed data
- REST API built with Express and TypeScript

## Code And Technologies

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Backend:** Node.js, Express, TypeScript, Zod
- **Database:** SQLite with `better-sqlite3`
- **Authentication:** JWT and bcrypt password hashing
- **Organization:** reusable React components, route modules, services, repositories, and middleware

## Planned For The Next Update

- Microsoft Teams integration for creating online class meetings and sharing join links
- Microsoft Graph authentication through MSAL

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

## Project structure

```
Virtual Classroom/
├── frontend/          Next.js UI
├── backend/           Express API + SQLite
│   └── STRUCTURE.md   Backend layout
└── README.md          This file
```

## Current Scope

- No email verification, password reset, or payment processing
- No file uploads or in-app video (Teams join links only)
- SQLite database (single-machine)
- No automated tests or deployment config
