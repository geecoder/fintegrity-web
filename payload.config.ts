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

// R2 storage: activates when R2_BUCKET env var is set.
// Absent → media falls back to local filesystem (public/media) so dev works without R2.
// Set all five R2_* vars in .env (or your deployment platform) to enable.
const r2Plugin = process.env.R2_BUCKET
  ? s3Storage({
      collections: {
        media: {
          prefix: 'media',
          // Build the public URL from R2_PUBLIC_URL (required when R2 is active).
          // Files are stored at {prefix}/{filename} in the bucket, so the public URL
          // is ${R2_PUBLIC_URL}/media/{filename}.
          generateFileURL: ({ filename, prefix }: { filename: string; prefix?: string }) => {
            const base = (process.env.R2_PUBLIC_URL ?? '').replace(/\/$/, '')
            const key = prefix ? `${prefix}/${filename}` : filename
            return `${base}/${key}`
          },
        },
      },
      bucket: process.env.R2_BUCKET,
      config: {
        endpoint: process.env.R2_ENDPOINT ?? '',
        region: 'auto',
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.R2_ACCESS_KEY_ID ?? '',
          secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? '',
        },
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
      autoGenerate: false, // broken on this stack (Node/tsx incompatibility) — maintained by hand
    },
    // Live preview: opens an iframe in the admin that shows the draft page,
    // auto-refreshes when the editor saves (via RefreshRouteOnSave in page components).
    livePreview: {
      breakpoints: [
        { label: 'Mobile', name: 'mobile', width: 390, height: 844 },
        { label: 'Tablet', name: 'tablet', width: 768, height: 1024 },
        { label: 'Desktop', name: 'desktop', width: 1440, height: 900 },
      ],
      collections: ['pages', 'solution-pages', 'blog-posts'],
      url: ({ data, collectionConfig }) => {
        const base = process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000'
        const secret = encodeURIComponent(process.env.PAYLOAD_SECRET ?? '')
        const slug = (data.slug as string | undefined) ?? ''
        switch (collectionConfig?.slug) {
          case 'pages':
            return `${base}/api/draft?secret=${secret}&slug=/${slug}`
          case 'solution-pages':
            return `${base}/api/draft?secret=${secret}&slug=/solutions/${slug}`
          case 'blog-posts':
            return `${base}/api/draft?secret=${secret}&slug=/blog/${slug}`
          default:
            return base
        }
      },
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
  // R2 plugin is activated when R2_BUCKET env var is set; otherwise plugins: []
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
