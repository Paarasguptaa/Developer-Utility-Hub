# Third-Party Tools Guide

This document explains the purpose, usage, and configuration for the third‑party tools and services used in this project. It covers CI/CD, hosting, payments, testing, build tooling, linting, security analysis, and utility libraries.

## CI/CD & Hosting

### GitHub Actions
- Purpose:
  - Automates build, test, security checks, and deployments for frontend and server.
- Integration:
  - Workflow file at `.github/workflows/ci-cd.yml`.
  - Jobs: `frontend-ci`, `server-ci`, `codeql`, `deploy`, `server-deploy`.
- Key steps:
  - Node setup with caching using `cache-dependency-path: '**/package-lock.json'`.
  - Tests run via `npm run test:ci` (Vitest non‑watch mode).
  - Security scan uploads `npm-audit.json` as an artifact.
  - Frontend deploy uses Vercel CLI with canary + health check + alias promotion.
  - Server deploy triggers Render Deploy Hook and polls health URL.
- Required GitHub Secrets:
  - Frontend/Vercel: `VERCEL_TOKEN`, `VERCEL_ORG_ID` (team slug), `VERCEL_PROJECT_ID`, `PROD_DOMAIN`.
  - Server/Render: `RENDER_DEPLOY_HOOK`, `SERVER_HEALTH_URL`.
- Notes:
  - Vercel telemetry is disabled in CI via `VERCEL_TELEMETRY_DISABLED=1`.

### Vercel (Frontend)
- Purpose:
  - Hosts the React/Vite app, provides previews and production aliases with zero downtime.
- Integration:
  - CLI commands in the workflow: `vercel deploy` and `vercel alias`.
  - Canary deployment + health check, then atomic alias switch to `PROD_DOMAIN`.
- Configuration:
  - Secrets: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, `PROD_DOMAIN`.
  - Optional: link project locally with `vercel link` and commit `.vercel/project.json`.
- Telemetry:
  - Disabled via env `VERCEL_TELEMETRY_DISABLED=1` (see Vercel docs).

### Render (Server)
- Purpose:
  - Hosts the Express webhook server with Stripe integration.
- Integration:
  - Declarative config in `render.yaml`.
  - CI triggers deployments via the Render Deploy Hook URL.
- Configuration:
  - `render.yaml` service:
    - `rootDir: server`
    - `buildCommand: npm ci`
    - `startCommand: npm start`
    - `healthCheckPath: /`
  - Env vars on Render:
    - `STRIPE_WEBHOOK_SECRET` (Stripe signing secret)
    - `STRIPE_API_KEY` (Stripe API key)
    - `PORT` (Render sets this automatically; server uses `process.env.PORT`)
  - GitHub Secrets:
    - `RENDER_DEPLOY_HOOK` (Render service → Settings → Deploy Hooks)
    - `SERVER_HEALTH_URL` (e.g., `https://<service>.onrender.com/`)

## Payments

### Stripe
- Purpose:
  - Processes payments and sends webhook events to the server.
- Integration:
  - Server: `server/index.js` handles `POST /webhook/stripe`.
  - Uses raw body and Stripe signature verification (`Stripe.webhooks.constructEvent`).
  - Handles `checkout.session.completed` and logs unhandled event types.
- Configuration:
  - Env vars (configured in Render):
    - `STRIPE_WEBHOOK_SECRET` (required for signature verification)
    - `STRIPE_API_KEY` (required to initialize the Stripe SDK)
  - Stripe Dashboard:
    - Create a webhook endpoint pointing to your Render service URL + `/webhook/stripe`.
    - Select events you require (e.g., `checkout.session.completed`).

## Frontend Build & Framework

### Vite
- Purpose:
  - Fast dev server and build tool for the React app.
- Integration:
  - Config file: `app/vite.config.js`.
  - Scripts:
    - `npm run dev` (start dev server)
    - `npm run build` (build for production)
    - `npm run preview` (serve built assets locally)

### React & React DOM
- Purpose:
  - UI framework for building the frontend.
- Integration:
  - Entry: `app/src/main.jsx` and `app/src/App.jsx`.
  - Standard React component structure.

### React Router DOM
- Purpose:
  - Client‑side routing.
- Integration:
  - Static routes in `App.jsx`.
  - Sitemap generation parses `<Route path="...">` from `App.jsx` (non‑param routes).

## Testing

### Vitest
- Purpose:
  - Unit testing framework compatible with Vite.
- Integration:
  - Scripts:
    - `npm run test` (default)
    - `npm run test:ci` → `vitest run` (CI‑friendly, non‑watch)
    - `npm run test:coverage` → `vitest run --coverage`
  - Test files under `app/src/tools/__tests__/`.

### JSDOM
- Purpose:
  - Simulated DOM environment for browser‑like tests.
- Integration:
  - Included as dev dependency; Vitest uses it for DOM APIs in tests where needed.

## Linting

### ESLint (+ React Hooks, React Refresh plugins)
- Purpose:
  - Static analysis and linting for consistent code quality.
- Integration:
  - Config: `app/eslint.config.js`.
  - Script: `npm run lint`.

## Security & Analysis

### npm audit
- Purpose:
  - Scans dependencies for known vulnerabilities.
- Integration:
  - Runs in CI and uploads `npm-audit.json` as an artifact.

### CodeQL
- Purpose:
  - Static analysis for security issues.
- Integration:
  - Configured in the `codeql` job of `.github/workflows/ci-cd.yml`.
  - Language: JavaScript.

## Utility Libraries (Frontend)

- `firebase`: Optional client integrations; present but not required. Configure your Firebase project if used.
- `jose`: JWT handling utilities.
- `crypto-js`: Hashing/encryption utilities.
- `dayjs`: Date/time utilities.
- `diff`: Text difference utilities.
- `js-beautify`: Code formatting utility used by tools.
- `color-convert`: Color conversions for color tools.

## Project Scripts & SEO

### Sitemap & Robots
- Purpose:
  - Generate `sitemap.xml` and `robots.txt` based on static routes.
- Integration:
  - Script: `app/scripts/generate-sitemap.mjs`.
  - Runs via `npm run seo` or automatically in `prebuild` before frontend builds.
- Configuration:
  - Env var: `SITE_URL` (base URL used to build full sitemap links and robots sitemap hint).

## Configuration Reference

- Frontend (App):
  - `SITE_URL`: Base URL for sitemap/robots generation.
- CI (Frontend):
  - `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`, `PROD_DOMAIN`.
- CI (Server):
  - `RENDER_DEPLOY_HOOK`, `SERVER_HEALTH_URL`.
- Server (Render env):
  - `STRIPE_WEBHOOK_SECRET`, `STRIPE_API_KEY`, `PORT` (provided by Render).

## Maintenance Tips

- Keep secrets only in GitHub/Render and `.env` files; never commit real keys.
- Use `npm ci` when lockfiles are present for reproducible installs.
- Prefer preview deploy + health checks, then alias to production for zero downtime.
- Update this document when adding or replacing tools to keep onboarding smooth.