# Dev Util Hub

Modern React + Vite application bundling ten essential developer tools, plus an optional Express webhook server for Stripe. The project includes a cost-effective CI/CD pipeline, SEO automation, and zero-downtime deployments.

## 1. Project Overview
- Objective: Provide fast, accessible utilities for everyday development, with optional Pro features and monetization.
- Core Functionality: JSON, JWT, Base64, Regex, Timestamp, URL, Code Formatter, Color, Diff, Hash.
- Key Features and Benefits:
  - Runs offline by default; Firebase enables Pro persistence.
  - SEO-ready: sitemap/robots auto-generated during build.
  - CI/CD: GitHub Actions for build/test/security; canary deploy with health-check gating.
  - Zero downtime: alias promotion only after healthy preview.
  - Accessible theming and responsive UI.

## 2. Prerequisites
1. Software
   - Node.js ≥ 18 (recommended 20)
   - npm ≥ 9
   - Git ≥ 2.40
   - Optional: Vercel account + CLI for frontend deployment
   - Optional: Render account for server deployment
   - Optional: Stripe account and Webhooks (for Pro purchases)
2. System Requirements
   - OS: Windows, macOS, or Linux
   - Network access to Vercel/Render/Stripe if using integrations
3. Dependencies
   - Frontend: React 19, Vite 5, Vitest, js-beautify, color-convert, jose, crypto-js
   - Server: Express 4, Stripe SDK, dotenv

## 3. Installation
1. Clone the repository
```bash
git clone <your-repo-url>
cd Developer\ Utility\ Hub
```
2. Install and run the frontend
```bash
cd app
npm install
npm run dev
# Expected: Vite dev server on http://localhost:5173/
```
3. Install and run the server (optional)
```bash
cd server
cp .env.example .env
# Fill STRIPE_WEBHOOK_SECRET and STRIPE_API_KEY in .env
npm install
npm start
# Expected: "Webhook server listening on http://localhost:4242"
```
4. Build the frontend
```bash
cd app
npm run build
npm run preview
# Expected: Local preview at http://localhost:4173/
```

## 4. Configuration
1. Frontend environment variables (`app/.env`)
```env
# Firebase (optional)
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=

# AdSense (optional; shown for Free users)
VITE_ADSENSE_CLIENT=ca-pub-xxxxxxxxxxxxxxxx
VITE_ADSENSE_SLOT=xxxxxxxxx

# Stripe Payment Link (optional for Pro purchases)
# e.g.: https://buy.stripe.com/test_XXXXXXXXXXXX
VITE_STRIPE_PAYMENT_LINK=

# Sitemap base URL (used by build script if set in CI)
SITE_URL=https://dev-util-hub.vercel.app
```
2. Server environment variables (`server/.env`)
```env
STRIPE_WEBHOOK_SECRET=whsec_XXXXXXXXXXXXXXXXXXXXXXXX
STRIPE_API_KEY=<your_stripe_api_key>
PORT=4242
```
3. Required settings files
   - `app/index.html`: Meta tags (description, canonical, OG/Twitter)
   - `app/scripts/generate-sitemap.mjs`: Generates `public/sitemap.xml` + `robots.txt`
   - `render.yaml`: Render service definition for webhook server
4. Security considerations
   - Do not commit `.env` files; store secrets in GitHub Actions / Render.
   - Use least-privilege tokens; rotate and revoke on compromise.
   - Never expose server secrets in frontend code.
   - Stripe webhooks require raw request body; keep `express.raw` on `/webhook/stripe` and avoid `express.json()` interception for that route.

## 5. Usage
1. Frontend development
```bash
cd app
npm run dev
# Open http://localhost:5173/
```
2. Frontend build and preview
```bash
cd app
npm run build
npm run preview
```
3. Testing
```bash
cd app
npm run test
npm run test:coverage
```
4. Server
```bash
cd server
npm start
# Webhook endpoint: POST /webhook/stripe
```
5. Operational parameters
   - `SITE_URL`: Sets base URL in sitemap/robots during build.
   - Firebase vars: Enable real auth/pro persistence (otherwise app runs offline).
   - Pro toggle: Demo mode stored in LocalStorage; Stripe link opens purchase.
6. Example use cases
   - JSON Formatter: Paste JSON → format/validate.
   - JWT Tool: Paste token, set secret → verify HS256.
   - Code Formatter: Paste HTML/CSS/JS → beautify.

## 6. Troubleshooting
1. Vite dev server port in use
   - Resolution: Stop other processes or set `--port` flag.
2. Stripe signature verification failed
   - Resolution: Ensure `STRIPE_WEBHOOK_SECRET` is correct; webhook is set to `POST /webhook/stripe`; keep raw body handling.
3. Build fails on sitemap generation
   - Resolution: Ensure `src/App.jsx` routes parse correctly; set `SITE_URL`; run `npm run seo` to debug.
4. Vercel alias promotion fails
   - Resolution: Check GitHub Actions logs; ensure `VERCEL_*` secrets and `PROD_DOMAIN` are set; verify canary URL is healthy.
5. Render health check fails
   - Resolution: Inspect Render logs; confirm `SERVER_HEALTH_URL`; validate server starts and `/` returns 200.
6. Security scans show vulnerabilities
   - Resolution: Review `npm-audit` artifacts; update dependencies; consider `npm audit fix` locally.
7. Diagnostic steps
   - Check CI artifacts (audit reports, preview metadata).
   - Run tests locally and fix failures.
   - Use browser devtools for network/console errors.
8. Support resources
   - Vite: https://vitejs.dev/guide/
   - React Router: https://reactrouter.com/
   - Vercel: https://vercel.com/docs
   - Render: https://render.com/docs
   - Stripe Webhooks: https://stripe.com/docs/webhooks

## 7. Contributing
1. Code submission
   - Fork and create feature branches; open PRs against `main`.
2. Branch naming conventions
   - `feature/<short-desc>`
   - `fix/<short-desc>`
   - `chore/<short-desc>`
   - `docs/<short-desc>`
3. Testing requirements
   - Add unit tests for new tools/utilities.
   - Keep `npm run test` and `npm run build` passing.
   - Maintain consistent formatting and linting.

## 8. License
- Proprietary. All rights reserved. See `LICENSE` for full terms.
- Usage restricted to authorized users; redistribution prohibited.
