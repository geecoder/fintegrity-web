# Deploying Fintegrity Web

This document covers everything needed to deploy the app to a free-tier cloud host
(Railway or Render). **Do not deploy until you have all the env vars ready.**

---

## Required environment variables

Set every variable below in your deployment platform's dashboard before you deploy.
Never put real values in code or commit them to the repo.

### Always required (build + runtime)

| Variable | Example / Notes |
|---|---|
| `PAYLOAD_SECRET` | Long random string — signs auth tokens. Generate with `openssl rand -hex 32`. Keep it secret. |
| `NEXT_PUBLIC_SERVER_URL` | The full URL your app will be served from, e.g. `https://fintegrity-web.railway.app`. Must be set **before** the build runs because it gets baked into the browser bundle. |
| `DATABASE_URI` | Neon serverless Postgres connection string, e.g. `postgresql://user:pass@host/dbname?sslmode=require`. |

### R2 media storage (required when R2_BUCKET is set)

All five must be set together. If `R2_BUCKET` is absent, the app falls back to local filesystem storage (fine for testing, not for production because uploads are lost on restart).

| Variable | Notes |
|---|---|
| `R2_BUCKET` | Name of the Cloudflare R2 bucket, e.g. `fintegrity-media`. |
| `R2_ENDPOINT` | R2 S3-compatible endpoint, e.g. `https://<account-id>.r2.cloudflarestorage.com`. |
| `R2_ACCESS_KEY_ID` | R2 API token → Access Key ID. |
| `R2_SECRET_ACCESS_KEY` | R2 API token → Secret Access Key. |
| `R2_PUBLIC_URL` | Public base URL for served files, e.g. `https://pub-xxxxx.r2.dev` or a custom domain like `https://media.getfintegrity.com`. Files are served at `{R2_PUBLIC_URL}/media/{filename}`. |

---

## Deployment steps (Railway — recommended)

Railway auto-detects Next.js and can deploy without the Dockerfile using Nixpacks.

1. Create a new Railway project → **Deploy from GitHub repo**.
2. In the Railway dashboard, go to **Variables** and add every env var from the table above.
3. Set the **Build Command** to `npm run build` and **Start Command** to `npm run start` (Railway may detect these automatically).
4. Click **Deploy**. Railway will:
   - Install npm packages (`npm ci`)
   - Run `next build` (compiles the app; needs the env vars set in step 2)
   - Start `next start` on the assigned port
5. Once deployed, open the provided Railway URL and load `/admin` to confirm the CMS is running.
6. Upload a test image in `/admin → Media` and confirm it appears in your R2 bucket.

### Using the Dockerfile on Railway

If Railway's auto-detection doesn't work correctly, you can force it to use the included `Dockerfile`:

1. In Railway project settings → **Builder** → choose **Dockerfile**.
2. Ensure env vars from step 2 above are set — they are injected into the Docker build context.

---

## Deployment steps (Render)

1. Create a new Render **Web Service** → connect your GitHub repo.
2. Set **Environment** to `Node`.
3. Build Command: `npm ci && npm run build`
4. Start Command: `npm run start`
5. Add all env vars under **Environment** → **Add Environment Variable**.
6. Click **Create Web Service**.

Render free-tier instances spin down after inactivity. The first request after a sleep takes ~30 seconds. Upgrade to a paid plan to avoid this for production.

---

## Database promotion path

| Stage | Database | How to switch |
|---|---|---|
| Dev / staging | Neon free tier (serverless Postgres) | Already configured via `DATABASE_URI`. |
| Production | AWS Aurora PostgreSQL in `af-south-1` | Swap `DATABASE_URI` to the Aurora connection string. No code changes needed — Payload's Postgres adapter works identically with both. |

Run `npx payload migrate` after switching to Aurora to apply any pending migrations.

---

## Media storage notes

- **Without R2_BUCKET** set: uploaded files go to `public/media/` on the server's local disk. Files are lost when the container restarts. Fine for dev; not for production.
- **With R2_BUCKET** set: all uploads go to Cloudflare R2. Files persist across deployments. Served from your `R2_PUBLIC_URL`.
- R2 stays as-is regardless of which database you use. If you later add a custom domain to the R2 bucket, update `R2_PUBLIC_URL` in the deployment env vars.

---

## What's committed to the repo (and must stay committed)

- `src/app/(payload)/admin/importMap.ts` — hand-maintained; auto-generation is broken on this stack. If you ever add a new admin component, add it here manually.
- `payload-types.ts` — generated TypeScript types. Regenerate with `npx payload generate:types` after schema changes.
- `Dockerfile` — used if Railway/Render's auto-detection is insufficient.

---

## Canonical domain

The site's canonical URL is always `https://www.getfintegrity.com`. Set `NEXT_PUBLIC_SERVER_URL` to the live URL when deploying to production. The admin CORS and CSRF settings already include `https://www.getfintegrity.com`.
