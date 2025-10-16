# Developer Utility Hub

Centralized toolkit and web app for everyday developer workflows, plus a lightweight Node.js webhook server used for Stripe event processing. The repository ships with CI/CD, SEO optimization, and zero-downtime deployment guidance.

## Project Overview
- Frontend: React + Vite single-page app with tools, SEO, and sitemap/robots auto-generation.
- Server: Express.js webhook receiver for Stripe (`checkout.session.completed`) with signature verification.
- CI/CD: GitHub Actions pipelines for build, test, security scan, and deployment orchestration.
- Deployments: Frontend to Vercel, server to Render (or any Node host with a health check).

## Repo Structure
- `app/` — Frontend application (React + Vite).
- `server/` — Express webhook server for Stripe.
- `.github/workflows/ci-cd.yml` — CI/CD pipeline.
- `render.yaml` — Render service configuration (server deployment).
- `LICENSE` — Project license.
- `README.md` — This global repo documentation.

## Prerequisites
- `Node.js` 18+ and `npm` 9+ installed.
- `Git` installed and access to GitHub repository.
- Accounts: GitHub, Vercel (frontend), Render (server), Stripe (webhooks).

## Installation
1. Clone the repository:
   - `git clone https://github.com/<your-username>/Developer-Utility-Hub.git`
   - `cd Developer-Utility-Hub`
2. Install frontend dependencies:
   - `cd app && npm install`
3. Install server dependencies:
   - `cd ../server && npm install`

## Configuration

### Frontend (app)
- `SITE_URL` — Base URL used by the SEO generator to set `sitemap.xml` and `robots.txt` links.
  - Set this during builds: `SITE_URL=https://your-domain.example`.
- Notes:
  - The sitemap and robots files are generated automatically by `npm run prebuild` in `app/`.
  - Avoid committing secrets in `.env`; use `.env.local` for local dev only.

### Server (webhook)
- Environment variables (configure in your hosting provider):
  - `STRIPE_WEBHOOK_SECRET` — The signing secret from your Stripe webhook endpoint.
  - `STRIPE_API_KEY` — Your Stripe API key (set securely in the host’s env settings; do not commit).
  - `PORT` — Service port (Render provides this automatically; you can leave it unset locally to default).
- Local development:
  - Copy `server/.env.example` to `server/.env` and fill with local-safe values.
  - Do not use live keys in local commits; keep secrets out of version control.

## Usage

### Run Frontend Locally
- `cd app`
- `npm run dev`
- Open `http://localhost:5173/`

### Run Server Locally
- `cd server`
- `npm start`
- The server listens on `http://localhost:<PORT>`; set `PORT` in `.env` if needed.

### Build Frontend
- `cd app`
- `npm run build` (runs `prebuild` to generate sitemap/robots, then Vite build)

## CI/CD
- Location: `.github/workflows/ci-cd.yml`.
- Frontend stages:
  - Build, test (if present), security scan, canary deploy to Vercel, health check, atomic alias.
- Server stages:
  - Build, security scan, deploy to Render via webhook/API, wait for health.
- Required GitHub Secrets:
  - Frontend: `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID`.
  - Server: `RENDER_DEPLOY_WEBHOOK_URL` (or `RENDER_API_KEY` + `RENDER_SERVICE_ID`).

## Deployment

### Frontend (Vercel)
- Create a Vercel project and link it to this repo’s `app/` directory.
- Set `SITE_URL` in the Vercel project’s environment settings for production builds.
- Configure your domain; Vercel’s atomic aliasing provides zero-downtime.

### Server (Render)
- Use `render.yaml` to create a free Node service for the webhook.
- Set env vars: `STRIPE_WEBHOOK_SECRET`, `STRIPE_API_KEY`, and confirm `PORT`.
- Ensure health check path matches your service configuration.

### Stripe Webhook
- In Stripe Dashboard, create a webhook endpoint pointing to your deployed server (e.g., `https://your-server.onrender.com/webhook`).
- Select relevant events; the server currently handles `checkout.session.completed`.

## Troubleshooting
- Push blocked by GitHub Push Protection:
  - Do not commit any secret-like strings (e.g., API keys). Use provider env settings.
  - If blocked, remove offending strings from commits and push again.
- Sitemap linking to wrong host:
  - Set `SITE_URL` correctly before build/deploy.
- Stripe signature verification failed:
  - Confirm `STRIPE_WEBHOOK_SECRET` matches the webhook endpoint.
  - Ensure your server receives the raw request body for Stripe signatures (as implemented).
- Server port conflicts locally:
  - Set a local `PORT` in `server/.env`. Render sets this in production.

## Contributing
- Fork the repo, create a feature branch, and open a Pull Request.
- Keep changes focused and documented (tests if applicable).
- Do not commit secrets; use environment settings in hosting providers.

## License
- This project uses a proprietary license. See `LICENSE` for full terms.