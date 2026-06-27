# ── Fintegrity Web — Production Dockerfile ───────────────────────────────────
# Compatible with Railway and Render free-tier hosts.
# Node is pinned to match .nvmrc (20.18.3).
#
# HOW IT WORKS
#  1. deps   — install all npm packages (including devDeps needed for the build)
#  2. builder — run `next build` to compile the app
#  3. runner  — copy only the build output; prune devDeps; start the server
#
# The build step needs PAYLOAD_SECRET and NEXT_PUBLIC_SERVER_URL to be present
# as environment variables in your deployment platform at build time (Railway /
# Render both provide this). Never paste them into this file.

# ── Stage 1: install dependencies ─────────────────────────────────────────────
FROM node:20.18.3-alpine AS deps
WORKDIR /app

COPY package.json package-lock.json ./
# ci installs the exact locked versions; includes devDeps (needed for next build)
RUN npm ci

# ── Stage 2: build ────────────────────────────────────────────────────────────
FROM node:20.18.3-alpine AS builder
WORKDIR /app

# Bring in all installed modules from the deps stage
COPY --from=deps /app/node_modules ./node_modules

# Copy all project files — this includes the committed importMap.ts and
# payload-types.ts which must be present at build time
COPY . .

# `next build` compiles the app. The deployment platform must inject these
# env vars before this step runs:
#   PAYLOAD_SECRET         (required — signs tokens; baked into some server code)
#   NEXT_PUBLIC_SERVER_URL (required — baked into the client bundle)
#   DATABASE_URI           (Payload may probe the DB during build on some versions)
RUN npm run build

# ── Stage 3: production runtime ───────────────────────────────────────────────
FROM node:20.18.3-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

# Copy the Next.js build output and runtime dependencies
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/node_modules ./node_modules

# Payload resolves the config at runtime; copy the source and compiled types
COPY --from=builder /app/payload.config.ts ./payload.config.ts
COPY --from=builder /app/payload-types.ts ./payload-types.ts
COPY --from=builder /app/src ./src

# Prune devDependencies to reduce the final image size
RUN npm prune --omit=dev

EXPOSE 3000
CMD ["npm", "run", "start"]
