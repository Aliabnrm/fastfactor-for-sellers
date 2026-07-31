# FastFactor for Sellers

FastFactor is a mobile-first, right-to-left web application designed for
Persian-speaking sellers. After creating an account and completing store setup,
each seller receives a public checkout link. Customers use this link to submit
orders, while sellers manage the order lifecycle from a dedicated dashboard.

This repository contains two independent applications:

- `frontend`: React user interface and Progressive Web App
- `backend`: Express REST API backed by PostgreSQL

## Core Features

- Seller registration, login, session refresh, and logout
- Multi-step store setup covering identity, payment, and shipping information
- A unique public checkout link for every store
- Public customer order form
- Automatic order-total calculation, including shipping cost
- Seller dashboard for viewing and managing order statuses
- Store, payment-card, and shipping settings
- Responsive RTL interface with PWA installation support

## System Architecture

```mermaid
flowchart LR
    U[Customer or Seller Browser]
    F[React SPA / PWA]
    A[Axios REST Client]
    E[Express API /api/v1]
    M[Auth, Store, and Order Modules]
    P[(PostgreSQL 17)]

    U --> F
    F --> A
    A --> E
    E --> M
    M --> P
```

The frontend uses the project's internal REST API for all active application
operations. Data is validated with Zod at the frontend and backend boundaries,
and the database is accessed exclusively through backend repositories.

### Authentication Flow

1. The user authenticates through `/api/v1/auth/login` or
   `/api/v1/auth/register`.
2. The access token is held in frontend memory and sent through the
   `Authorization: Bearer <token>` header.
3. The refresh token is stored in an `HttpOnly` cookie.
4. During session renewal, the previous refresh token is revoked in the
   database and a new token is issued.
5. Protected backend routes are secured by `authMiddleware`.

## Technology Stack

### Frontend

| Area | Technology |
| --- | --- |
| Framework | React 18 + TypeScript |
| Build Tool | Vite 5 + SWC |
| Routing | React Router 6 |
| Server State | TanStack Query 5 |
| HTTP Client | Axios |
| Forms | React Hook Form + Ant Design Form |
| Validation | Zod |
| UI | Tailwind CSS, shadcn/ui, Radix UI, and Ant Design 5 |
| Icons | Lucide React |
| PWA | Vite Plugin PWA + Workbox |
| Code Quality | ESLint + TypeScript |

### Backend

| Area | Technology |
| --- | --- |
| Runtime | Node.js 22 |
| Framework | Express 5 + TypeScript |
| Database | PostgreSQL 17 + `pg` |
| Migrations | node-pg-migrate |
| Authentication | JWT, bcrypt, and HttpOnly cookies |
| Validation | Zod |
| Logging | Pino + pino-pretty |
| Error Handling | Middleware and custom error classes |

### Infrastructure

- pnpm
- Docker
- Docker Compose
- PostgreSQL health check and persistent volume

## Repository Structure

```text
fastfactor-for-sellers/
├── backend/
│   ├── migrations/             # Database schema history
│   ├── docs/                   # PRD and data-model documentation
│   ├── src/
│   │   ├── database/           # PostgreSQL connection
│   │   ├── errors/             # Domain-specific errors
│   │   ├── logger/             # Pino configuration
│   │   ├── middleware/         # Auth, error, not-found, and request ID
│   │   ├── modules/
│   │   │   ├── auth/           # Controllers, services, repositories, routes
│   │   │   ├── orders/
│   │   │   └── stores/
│   │   ├── app.ts              # Express application
│   │   └── server.ts           # Process lifecycle and HTTP listener
│   ├── Dockerfile
│   └── package.json
├── frontend/
│   ├── public/                 # Public assets and PWA icons
│   ├── src/
│   │   ├── components/         # UI primitives and feature components
│   │   ├── config/             # Presentation and order-status configuration
│   │   ├── context/            # Authentication context
│   │   ├── guard/              # Route guards
│   │   ├── hooks/              # React hooks
│   │   ├── pages/              # Route-level pages
│   │   ├── schema/             # Zod contracts and validation
│   │   ├── services/           # REST clients and query hooks
│   │   └── AppRoutes.tsx       # Routes and application providers
│   ├── Dockerfile
│   ├── vite.config.ts
│   └── package.json
├── docker-compose.yml
└── README.md
```

## Prerequisites

The following tools are required to run the complete project:

- Node.js 22
- Corepack
- pnpm
- Docker and Docker Compose for containerized development

Enable pnpm through Corepack:

```bash
corepack enable
```

The expected package-manager version for each application is declared in that
application's `package.json`.

## Quick Start with Docker

The current Docker Compose configuration is intended for local development. It
provides hot reload for both the frontend and backend.

### 1. Configure Environment Variables

Create `backend/.env.docker`:

```env
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/fastfactor_db
ACCESS_TOKEN_SECRET=replace-with-a-long-random-secret
REFRESH_TOKEN_SECRET=replace-with-another-long-random-secret
NODE_ENV=development
PORT=4000
LOG_LEVEL=info
```

Create `frontend/.env.docker`:

```env
VITE_API_URL=http://localhost:4000
```

> `VITE_API_URL` must contain the backend origin only. Do not append `/api/v1`;
> the frontend adds this prefix internally.

### 2. Build and Start the Services

Run from the repository root:

```bash
docker compose up --build -d
```

### 3. Apply Database Migrations

```bash
docker compose exec backend pnpm db:up
```

### 4. Access the Services

| Service | Address |
| --- | --- |
| Frontend | http://localhost:5173 |
| Backend | http://localhost:4000 |
| PostgreSQL | `localhost:5432` |

Inspect service status and logs:

```bash
docker compose ps
docker compose logs -f
```

Stop the services:

```bash
docker compose down
```

Stop the services and delete the database volume:

```bash
docker compose down -v
```

> The last command permanently removes all PostgreSQL data stored in the Docker
> volume.

## Local Development Without Docker

This approach requires an accessible PostgreSQL instance on the host system.

### Backend

Create `backend/.env`:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/fastfactor_db
ACCESS_TOKEN_SECRET=replace-with-a-long-random-secret
REFRESH_TOKEN_SECRET=replace-with-another-long-random-secret
NODE_ENV=development
PORT=4000
LOG_LEVEL=info
```

Install dependencies, apply migrations, and start the backend:

```bash
cd backend
pnpm install
pnpm db:up
pnpm dev
```

### Frontend

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:4000
```

Open another terminal and run:

```bash
cd frontend
pnpm install
pnpm dev
```

## Environment Variables

### Backend

| Variable | Required | Description |
| --- | --- | --- |
| `DATABASE_URL` | Yes | Complete PostgreSQL connection string |
| `ACCESS_TOKEN_SECRET` | Yes | Secret used to sign access tokens |
| `REFRESH_TOKEN_SECRET` | Yes | Independent secret used to sign refresh tokens |
| `NODE_ENV` | No | `development` or `production` |
| `PORT` | No | HTTP port; defaults to `4000` |
| `LOG_LEVEL` | No | Pino log level; defaults to `info` |

### Frontend

| Variable | Required | Description |
| --- | --- | --- |
| `VITE_API_URL` | Yes | Backend origin, such as `http://localhost:4000` |

Variables prefixed with `VITE_` are embedded in the frontend bundle. Never
store secrets in these variables.

## Application Routes

| Route | Access | Purpose |
| --- | --- | --- |
| `/auth` | Public | Registration and login |
| `/` | Protected | Seller landing page and shortcuts |
| `/onboarding` | Protected | Store setup |
| `/order` | Protected | Order-management dashboard |
| `/profile` | Protected | Store and account settings |
| `/checkout/:slug` | Public | Store-specific checkout form |

## REST API

All API endpoints use the following prefix:

```text
/api/v1
```

### Authentication

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `POST` | `/auth/register` | Public | Create an account and session |
| `POST` | `/auth/login` | Public | Sign in |
| `POST` | `/auth/refresh` | Cookie | Rotate the refresh token |
| `POST` | `/auth/logout` | Cookie | Revoke the current session |
| `GET` | `/auth/me` | Bearer token | Return the current user |

### Stores

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `POST` | `/store/onboarding` | Protected | Create a store |
| `GET` | `/store/me` | Protected | Return the current user's store |
| `PATCH` | `/store/me` | Protected | Update the current store |
| `GET` | `/store/check-slug/:slug` | Public | Check slug availability |
| `GET` | `/store/:slug` | Public | Return public store information |

### Orders

| Method | Endpoint | Access | Description |
| --- | --- | --- | --- |
| `POST` | `/order/:slug` | Public | Create an order for a store |
| `GET` | `/order` | Protected | List the seller's orders |
| `GET` | `/order/:orderId` | Protected | Return one order |
| `PATCH` | `/order/:orderId/status` | Protected | Update an order status |

Valid order statuses:

```text
pending | confirmed | delivered | rejected
```

## Database and Migration Management

Migrations are stored in `backend/migrations` and currently define:

- `users`
- `refresh_tokens`
- `stores`
- `orders`
- The order-status enum

Run these commands from the `backend` directory:

```bash
pnpm db:up
pnpm db:down
pnpm db:status
pnpm db:create descriptive_migration_name
```

Equivalent Docker commands:

```bash
docker compose exec backend pnpm db:up
docker compose exec backend pnpm db:down
docker compose exec backend pnpm db:status
docker compose exec backend pnpm db:create descriptive_migration_name
```

Every new migration should support rollback and include the corresponding
repository, type, and schema changes where required.

## Available Scripts

### Frontend

```bash
pnpm dev          # Start the Vite development server
pnpm lint         # Run ESLint
pnpm build        # Run lint and create a production bundle
pnpm build:dev    # Create a bundle in development mode
pnpm preview      # Preview the production build
```

### Backend

```bash
pnpm dev          # Start the server in watch mode
pnpm build        # Compile TypeScript into dist
pnpm start        # Run the compiled output
pnpm db:up        # Apply pending migrations
pnpm db:down      # Roll back the latest migration
pnpm db:status    # Show migration status
pnpm db:create    # Create a new migration
```

## Progressive Web App

The frontend uses `vite-plugin-pwa` and Workbox. During a production build:

- A Web App Manifest is generated.
- A Service Worker is registered in `autoUpdate` mode.
- Required installable-app assets are added to the precache.

The build output is written to `frontend/dist`.

## Engineering Conventions

- Controllers translate HTTP requests and responses.
- Domain logic belongs in services.
- PostgreSQL queries belong exclusively in repositories.
- Input and output contracts are validated with Zod.
- Operational errors flow through dedicated error classes.
- Frontend server state is managed with TanStack Query.
- UI components must not depend directly on the database or transport details.
- Database schema changes must be introduced through migrations.

## Security Considerations

- Never commit `.env` files containing real secrets.
- Use separate, cryptographically random secrets for access and refresh tokens.
- Refresh tokens are persisted in the database and rotated during session
  renewal.
- Cookies currently use `secure: false` for local development. Production must
  use `secure: true`, HTTPS, and appropriate reverse-proxy settings.
- CORS currently allows `http://localhost:5173`. Production deployments should
  manage the allowed origin through environment-specific configuration.
- Always validate API input on the backend, even when the frontend performs its
  own validation.

## Build and Deployment

### Frontend

```bash
cd frontend
pnpm install --frozen-lockfile
pnpm build
```

The contents of `frontend/dist` can be deployed to any static host that
supports single-page applications. The host must rewrite unknown routes to
`index.html`.

### Backend

```bash
cd backend
pnpm install --frozen-lockfile
pnpm build
pnpm start
```

Apply approved database migrations before starting a new release. The current
Dockerfiles and Compose configuration target development. A production setup
should use multi-stage builds, a non-root user, a health endpoint, and managed
secrets.

## Troubleshooting

### The frontend sends requests to `undefined/api/v1`

`VITE_API_URL` is missing. Check `frontend/.env` and restart the Vite
development server.

### The backend cannot connect to PostgreSQL from Docker

Containers must use the Compose service name as the database hostname:

```env
DATABASE_URL=postgresql://postgres:postgres@postgres:5432/fastfactor_db
```

When running outside Docker, the hostname is typically `localhost`.

### A database table or type does not exist

Inspect and apply pending migrations:

```bash
docker compose exec backend pnpm db:status
docker compose exec backend pnpm db:up
```

### Authentication requests return `401`

- Verify the configured `ACCESS_TOKEN_SECRET` and `REFRESH_TOKEN_SECRET`.
- Confirm that cookies and `withCredentials` are enabled.
- Ensure that the frontend origin matches the backend CORS configuration.
- Confirm that the corresponding `refresh_tokens` record exists and has not
  been revoked.

### Connect Directly to PostgreSQL

```bash
docker compose exec postgres psql -U postgres -d fastfactor_db
```

## Recommended Development Workflow

1. Create a clearly named branch.
2. Apply the change in the appropriate architectural layer.
3. Add a migration when the database schema changes.
4. Lint and build the frontend.
5. Build the backend.
6. Verify the affected paths manually or through automated tests.
7. Keep changes in small, reviewable commits.

Minimum checks before opening a pull request:

```bash
cd frontend
pnpm lint
pnpm build

cd ../backend
pnpm build
```

## License

This repository does not currently include a license. Add a `LICENSE` file and
select an appropriate license before public distribution.
