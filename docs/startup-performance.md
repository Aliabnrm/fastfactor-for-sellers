# Startup performance

The November 2026 startup audit found three independent delays:

- Both auth guards returned `null` while the app awaited `/auth/refresh` and then `/auth/me`. The refresh response already includes the user.
- Every page was in a single JavaScript entry (~1,030 kB minified / 328 kB gzip). Pages now load on demand; the entry is ~531 kB / 174 kB gzip. These are bundle sizes, not measured end-to-end load times.
- The render-blocking Google Fonts stylesheet depended on another network origin. Vazirmatn is now served from the frontend with `font-display: swap`.

The HTML contains a styled loading shell before JavaScript runs. Route and data loading use the same RTL, indigo design tokens, announce status to assistive technology, respect reduced motion, and explain longer waits after eight seconds. Errors offer retry. The public checkout does not mount the seller auth provider. A confirmed anonymous session can skip restoration on subsequent visits; only a non-sensitive guest/member hint is stored locally, never a token or user data. Unknown sessions still restore to preserve existing logins.

Transient bootstrap errors keep the session and offer retry instead of treating the user as logged out. Requests time out after 60 seconds. Auth failures (401) clear the session. Seller query data is cleared on account changes, cached for 30 seconds during navigation, and updated immediately after store mutations.

The service worker precaches the entry and its static imports plus styles/fonts. Other route scripts are cached when visited, so installation does not eagerly download every page. Pages not visited online are not guaranteed to work offline. API responses are not cached by the service worker.

## Validation

From `frontend/`:

```sh
corepack pnpm test
corepack pnpm build
corepack pnpm exec tsc -p tsconfig.app.json --noEmit
```

Tests cover restoring from one response, slow requests, confirmed guests, network errors and retry, account cache isolation, failed logout, and late responses after unmount.

## Hosting limitation

During the audit the Vercel HTML responded in approximately 2.24 seconds from this connection. A request to the production Render auth endpoint timed out without receiving a response. That alone cannot distinguish an unavailable network path from a sleeping Render instance. No paid hosting or service settings were changed.

If the backend uses Render's free instance, waking after inactivity can still delay authenticated operations and checkout data. A continuously running Render instance removes that hosting cold-start behavior; confirm the current instance plan and Render logs before attributing remaining delays to it. The loading UI cannot remove server or network latency.
