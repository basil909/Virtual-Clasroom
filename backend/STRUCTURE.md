# Backend Structure

```
backend/
├── src/
│   ├── index.ts                 # Entry point, auto-seed, start server
│   ├── app.ts                   # Express app factory
│   ├── config/
│   │   └── env.ts               # Environment variables
│   ├── data/
│   │   └── pricing.ts           # Static pricing plans (matches frontend)
│   ├── db/
│   │   ├── connection.ts        # SQLite connection + schema init
│   │   ├── schema.ts            # Table definitions
│   │   └── seed.ts              # Full seed script (npm run db:seed)
│   ├── integrations/
│   │   └── microsoft/           # Microsoft Teams / Graph API
│   │       ├── msalClient.ts      # Azure AD auth
│   │       ├── graphClient.ts     # Graph SDK wrapper
│   │       ├── tokenService.ts    # OAuth token storage & refresh
│   │       └── teamsService.ts    # Create/list/delete online meetings
│   ├── middleware/
│   │   ├── authenticate.ts      # JWT auth + role guards
│   │   └── errorHandler.ts
│   ├── repositories/            # Data access layer
│   │   ├── userRepository.ts
│   │   ├── courseRepository.ts
│   │   ├── assignmentRepository.ts
│   │   ├── sessionRepository.ts
│   │   └── microsoftRepository.ts
│   ├── routes/                  # HTTP routes (maps to frontend pages)
│   │   ├── index.ts
│   │   ├── health.routes.ts
│   │   ├── auth.routes.ts         # POST /login, /register, GET /me
│   │   ├── auth.microsoft.routes.ts
│   │   ├── courses.routes.ts      # /courses, /courses/enrolled/me
│   │   ├── teachers.routes.ts
│   │   ├── assignments.routes.ts
│   │   ├── sessions.routes.ts     # Virtual classes + Teams links
│   │   ├── teams.routes.ts
│   │   ├── admin.routes.ts
│   │   └── pricing.routes.ts
│   ├── services/                # Business logic
│   │   ├── authService.ts
│   │   ├── sessionService.ts
│   │   └── adminService.ts
│   ├── types/
│   │   └── index.ts
│   └── utils/
│       ├── jwt.ts
│       └── password.ts
├── data/                        # SQLite database (gitignored)
├── .env.example
└── package.json
```

## Frontend ↔ API mapping

| Frontend page | API |
|---------------|-----|
| Login / Signup | `POST /api/auth/login`, `POST /api/auth/register` |
| Courses | `GET /api/courses` |
| Teachers | `GET /api/teachers` |
| Pricing | `GET /api/pricing` |
| Teacher → My Classes | `GET/POST /api/sessions`, Microsoft OAuth |
| Student dashboard | `GET /api/sessions`, `GET /api/assignments/me` |
| Admin dashboard | `GET /api/admin/stats`, `/users`, `/sessions` |
