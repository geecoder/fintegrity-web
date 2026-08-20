import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { s3Storage } from '@payloadcms/storage-s3'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

// ── Collections ───────────────────────────────────────────────────────────
import Users from './src/collections/Users'
import Media from './src/collections/Media'
import Pages from './src/collections/Pages'
import SolutionPages from './src/collections/SolutionPages'
import BlogPosts from './src/collections/BlogPosts'
import CaseStudies from './src/collections/CaseStudies'
import JobOpenings from './src/collections/JobOpenings'

// ── Globals ───────────────────────────────────────────────────────────────
import SiteSettings from './src/globals/SiteSettings'
import SEODefaults from './src/globals/SEODefaults'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

// R2 storage activates when the bucket env var is present.
// Phase 1–2: absent → media goes to local filesystem (public/media).
// Phase 3: fill .env R2_* vars to activate.
const r2Plugin = process.env.R2_BUCKET
  ? s3Storage({
    collections: {
      media: { prefix: 'media' },
    },
    bucket: process.env.R2_BUCKET,
    config: {
      endpoint: process.env.R2_ENDPOINT,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID ?? '',
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? '',
      },
      region: 'auto',
      forcePathStyle: true, // required for Cloudflare R2
    },
  })
  : null

export default buildConfig({
  // ── Admin UI ─────────────────────────────────────────────────────────────
  admin: {
    user: Users.slug,
    meta: {
      titleSuffix: '— Fintegrity CMS',
    },
    importMap: {
      baseDir: path.resolve(dirname),
      autoGenerate: true,
    },
  },

  // ── Collections ───────────────────────────────────────────────────────────
  sharp,
  collections: [
    Users,       // auth — admin / editor roles
    Media,       // uploads — local dev; R2 in Phase 3
    Pages,       // flexible page builder (Blocks)
    SolutionPages,  // ICP / industry solution pages
    BlogPosts,   // blog + regulatory reference content
    CaseStudies,
    JobOpenings,
  ],

  // ── Globals ───────────────────────────────────────────────────────────────
  globals: [
    SiteSettings,  // nav, footer, social, canonical domain
    SEODefaults,   // fallback title / description / OG image
  ],

  // ── Rich-text editor ──────────────────────────────────────────────────────
  editor: lexicalEditor(),

  // ── Database ──────────────────────────────────────────────────────────────
  // Dev / staging: Neon free tier serverless Postgres
  // Production: AWS Aurora PostgreSQL af-south-1 — swap connection string only
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI ?? '',
    },
  }),

  // ── Plugins ───────────────────────────────────────────────────────────────
  // R2 plugin is activated when R2_BUCKET env var is set (Phase 3)
  plugins: [...(r2Plugin ? [r2Plugin] : [])],

  // ── Security ──────────────────────────────────────────────────────────────
  secret: process.env.PAYLOAD_SECRET ?? '',
  cors: [
    'https://www.getfintegrity.com',
    process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000',
  ].filter(Boolean) as string[],
  csrf: [
    'https://www.getfintegrity.com',
    process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000',
  ].filter(Boolean) as string[],

  // ── TypeScript types output ────────────────────────────────────────────────
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },

  // ── Server URL ────────────────────────────────────────────────────────────
  serverURL: process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000',
})
