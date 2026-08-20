# Fintegrity Web

Marketing site and CMS for [Fintegrity Technologies Limited](https://www.getfintegrity.com) — embedded compliance decisioning for African fintechs.

## Stack

- **Framework:** Next.js 16 (App Router, webpack — not Turbopack)
- **CMS:** Payload CMS 3.x (headless, Postgres adapter)
- **Database:** Neon serverless Postgres (dev/staging) → AWS Aurora PostgreSQL af-south-1 (prod)
- **Media storage:** Local filesystem (dev) → Cloudflare R2 (prod, activated by `R2_BUCKET` env var)
- **Node:** 20.18.3 (pinned via `.nvmrc`)

## Local development

```bash
cp .env.example .env        # fill in DATABASE_URI and PAYLOAD_SECRET
nvm use                      # pin to Node 20.18.3
npm install
npm run dev                  # starts on http://localhost:3000
```

Admin CMS: `http://localhost:3000/admin`

## Important constraints

- **Turbopack is disabled** — run `next dev --webpack` only (the `dev` script already does this). Payload admin breaks under Turbopack.
- **Import map is hand-maintained** — `src/app/(payload)/admin/importMap.ts`. The auto-generation CLI is broken on this stack. Any new admin client component must be added there manually.
- **Regulatory gate** — Blog Posts with `contentType: regulatory` cannot be published without `reviewStatus: approved`. This is a hard block enforced in code and must remain intact.
- **Canonical domain** — always `https://www.getfintegrity.com`.

## Deployment

See [DEPLOY.md](./DEPLOY.md) for the full deployment guide, environment variable reference, and database promotion path.

## Environment variables

See [.env.example](./.env.example) for all required variables and their descriptions. Never commit `.env` to git.
