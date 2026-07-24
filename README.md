# FastFactor for Sellers

FastFactor is a seller‑focused web app that creates a shareable checkout link, collects order and payment proof, and provides a lightweight dashboard to manage incoming orders. It is optimized for mobile usage and can be installed as a PWA.

## Key Features
- Seller onboarding, authentication, and profile management
- Public checkout form per seller (`/checkout/:sellerSlug`)
- Order capture with customer details and payment proof upload
- Seller dashboard for viewing and updating orders
- PWA support for installable, app‑like experience

## Tech Stack
- React + TypeScript
- Vite
- Tailwind CSS + shadcn-ui
- React Router
- TanStack Query
- Supabase (Auth, Database, Storage)
- Vite PWA Plugin

## Prerequisites
- Node.js 18+ (LTS recommended)
- Yarn (recommended) or npm

## Getting Started
1. Install dependencies:

```bash
yarn
# or
npm install
```

2. Create environment variables:

```bash
cp .env.local.example .env.local
```

3. Start the development server:

```bash
yarn dev
# or
npm run dev
```

## Environment Variables
The app expects these variables at build time:

```env
VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_KEY=YOUR_SUPABASE_ANON_OR_PUBLISHABLE_KEY
```

Notes:
- `src/lib/supabase.ts` uses `VITE_SUPABASE_KEY`.
- The auto‑generated client at `src/integrations/supabase/client.ts` expects `VITE_SUPABASE_PUBLISHABLE_KEY`. If you plan to use that client, align the variable name with the code.

### Example `.env.local`
Create a sample file to avoid committing secrets:

```bash
cat <<'ENV' > .env.local.example
VITE_SUPABASE_URL=YOUR_SUPABASE_URL
VITE_SUPABASE_KEY=YOUR_SUPABASE_ANON_OR_PUBLISHABLE_KEY
ENV
```

## Available Scripts
- `yarn dev`: start dev server
- `yarn build`: production build
- `yarn build:dev`: build with `development` mode
- `yarn preview`: preview production build
- `yarn lint`: run ESLint

## Project Structure
- `src/pages`: top‑level routes (Auth, Home, Checkout, Order, Profile, Onboarding)
- `src/components`: UI and feature components
- `src/services`: Supabase data access layer
- `src/hooks`: custom hooks
- `src/lib`: shared clients and utilities
- `src/integrations`: auto‑generated integrations
- `supabase/`: Supabase project config

## PWA Configuration
`vite.config.ts` includes a Workbox rule for Supabase caching. Replace `YOUR_PROJECT_ID` with your real Supabase project ID to enable API caching.

## Build & Deploy
Create a production build:

```bash
yarn build
```

The output will be in `dist/` and can be deployed to any static host.

## Contributing
- Keep changes focused and small
- Run `yarn lint` before opening a PR

## License
No license file is currently included. Add one if you plan to distribute the project.



### DevOps

- Docker
- Docker Compose
- PostgreSQL 17

---

# Project Structure

```text
fastfactor-for-sellers
│
├── backend
│   ├── src
│   ├── migrations
│   ├── Dockerfile
│   └── .env.docker
│
├── frontend
│   ├── src
│   ├── Dockerfile
│   └── .env.docker
│
├── docker-compose.yml
└── README.md
```

---

# Prerequisites

Install:

- Docker
- Docker Compose

If you're using macOS with Colima:

```bash
brew install colima
colima start
docker context use colima
```

Check Docker:

```bash
docker version
```

---

# Environment Variables

## Backend

Create:

```
backend/.env.docker
```

Example:

```env
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/fastfactor_db

ACCESS_TOKEN_SECRET=123456
REFRESH_TOKEN_SECRET=abcdef

NODE_ENV=development
PORT=4000
```

---

## Frontend

Create:

```
frontend/.env.docker
```

Example:

```env
VITE_API_BASE_URL=http://localhost:4000/api/v1
```

---

# Run Project

From project root:

```bash
docker compose up --build
```

First build may take several minutes.

---

After startup:

Frontend

```
http://localhost:5173
```

Backend

```
http://localhost:4000
```

PostgreSQL

```
localhost:5432
```

---

# Stop Project

```bash
docker compose down
```

---

# Stop and Remove Database

```bash
docker compose down -v
```

> This removes PostgreSQL data volume.

---

# Rebuild Containers

```bash
docker compose up --build
```

---

# View Logs

All services

```bash
docker compose logs -f
```

Backend

```bash
docker compose logs -f backend
```

Frontend

```bash
docker compose logs -f frontend
```

Postgres

```bash
docker compose logs -f postgres
```

---

# Open Shell

Backend

```bash
docker compose exec backend sh
```

Frontend

```bash
docker compose exec frontend sh
```

Postgres

```bash
docker compose exec postgres sh
```

---

# Database Migration

Run migrations

```bash
docker compose exec backend pnpm db:up
```

Rollback

```bash
docker compose exec backend pnpm db:down
```

Status

```bash
docker compose exec backend pnpm db:status
```

Create migration

```bash
docker compose exec backend pnpm db:create migration_name
```

---

# Running Without Docker

## Backend

```bash
cd backend

pnpm install

pnpm dev
```

---

## Frontend

```bash
cd frontend

pnpm install

pnpm dev
```

---

# Docker Images

Build backend

```bash
docker build -t fastfactor-backend ./backend
```

Build frontend

```bash
docker build -t fastfactor-frontend ./frontend
```

---

# Useful Docker Commands

List containers

```bash
docker ps
```

Running containers

```bash
docker compose ps
```

Remove unused resources

```bash
docker system prune
```

Remove everything unused

```bash
docker system prune -a
```

---

# Troubleshooting

## Backend cannot connect to PostgreSQL

Make sure `DATABASE_URL` uses:

```env
postgres
```

instead of

```env
localhost
```

Correct:

```env
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/fastfactor_db
```

---

## Check PostgreSQL

```bash
docker compose exec postgres psql -U postgres -d fastfactor_db
```

---

## Health Check

Verify PostgreSQL is healthy:

```bash
docker compose ps
```

The status should become:

```
healthy
```

---

# Development Workflow

Start project

```bash
docker compose up
```

Modify code

↓

Vite and tsx automatically reload changes.

Run migrations if needed

```bash
docker compose exec backend pnpm db:up
```

Done.