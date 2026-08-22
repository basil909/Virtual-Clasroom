# SkillX Backend

Layered Node.js API aligned with the SkillX frontend, including **Microsoft Teams** integration via Microsoft Graph.

See [STRUCTURE.md](./STRUCTURE.md) for the full folder layout.

## Quick start

```bash
npm install
cp .env.example .env
# Add JWT_SECRET and Azure credentials (optional for Teams)
npm run dev
```

API: `http://localhost:4000`

## Demo accounts (auto-seeded)

| Role | Email | Password |
|------|-------|----------|
| Admin | admin@skillx.com | admin123 |
| Teacher | teacher@skillx.com | teacher123 |
| Student | student@skillx.com | student123 |

## Microsoft Teams setup

1. Register an app in [Azure Portal](https://portal.azure.com)
2. Redirect URI: `http://localhost:4000/api/auth/microsoft/callback`
3. Graph delegated permissions: `User.Read`, `OnlineMeetings.ReadWrite`, `offline_access`
4. Set `AZURE_TENANT_ID`, `AZURE_CLIENT_ID`, `AZURE_CLIENT_SECRET` in `.env`

Teachers connect Teams under **Dashboard → My Classes**.

## Main API routes

| Route | Description |
|-------|-------------|
| `POST /api/auth/login` | JWT login |
| `POST /api/auth/register` | Register user |
| `GET /api/auth/me` | Current user (Bearer token) |
| `GET /api/courses` | Course catalog |
| `GET /api/teachers` | Teacher profiles |
| `GET /api/pricing` | Pricing plans |
| `GET/POST /api/sessions` | Class sessions + Teams join URLs |
| `GET /api/auth/microsoft/*` | Teams OAuth |
| `GET /api/admin/*` | Admin stats, users, sessions |
