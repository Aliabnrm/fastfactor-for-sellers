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
