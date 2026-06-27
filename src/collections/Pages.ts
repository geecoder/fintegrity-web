import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEditor, isPublishedOrAdmin } from '@/access'
import { HeroBlock } from '@/blocks/Hero'
import { FeatureGridBlock } from '@/blocks/FeatureGrid'
import { LogoStripBlock } from '@/blocks/LogoStrip'
import { PricingTableBlock } from '@/blocks/PricingTable'
import { CTASectionBlock } from '@/blocks/CTASection'
import { FAQBlock } from '@/blocks/FAQ'
import { RichTextBlock } from '@/blocks/RichText'
import { StatsBlock } from '@/blocks/Stats'

const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Page', plural: 'Pages' },
  admin: {
    useAsTitle: 'title',
    group: 'Content',
    defaultColumns: ['title', 'slug', '_status', 'updatedAt'],
    description: 'Flexible CMS pages built from blocks. Each page renders at /{slug} on the public site.',
    preview: (doc) => `${process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000'}/${doc.slug}`,
  },
  versions: {
    drafts: {
      autosave: { interval: 60000 }, // autosave every minute
    },
  },
  access: {
    read: isPublishedOrAdmin,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
    // Only admins can publish (change _status to published)
    readVersions: isAdminOrEditor,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'URL path (e.g. "about" → /about). Use lowercase, numbers, hyphens.',
        position: 'sidebar',
      },
      validate: (value: string | null | undefined) => {
        if (!value) return 'Slug is required'
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value))
          return 'Slug must be lowercase letters, numbers and hyphens (no leading/trailing hyphens)'
        return true
      },
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        HeroBlock,
        FeatureGridBlock,
        LogoStripBlock,
        PricingTableBlock,
        CTASectionBlock,
        FAQBlock,
        RichTextBlock,
        StatsBlock,
      ],
      required: true,
      admin: { description: 'Build this page by adding and arranging section blocks.' },
    },
    // ── SEO ──────────────────────────────────────────────────────────────────
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      admin: { position: 'sidebar' },
      fields: [
        {
          name: 'title',
          type: 'text',
          admin: { description: 'Overrides the default page title in <title> and OG.' },
        },
        {
          name: 'description',
          type: 'textarea',
          admin: { description: 'Meta description (150–160 characters ideal).' },
        },
        {
          name: 'ogImage',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Open Graph image (1200×630). Falls back to site default.' },
        },
        {
          name: 'noIndex',
          type: 'checkbox',
          defaultValue: false,
          admin: { description: 'Prevent search engines from indexing this page.' },
        },
      ],
    },
  ],
}

export default Pages
