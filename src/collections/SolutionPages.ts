import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEditor, isPublishedOrAdmin } from '@/access'
import { HeroBlock } from '@/blocks/Hero'
import { FeatureGridBlock } from '@/blocks/FeatureGrid'
import { CTASectionBlock } from '@/blocks/CTASection'
import { FAQBlock } from '@/blocks/FAQ'
import { RichTextBlock } from '@/blocks/RichText'
import { StatsBlock } from '@/blocks/Stats'

const SolutionPages: CollectionConfig = {
  slug: 'solution-pages',
  labels: { singular: 'Solution / ICP Page', plural: 'Solution / ICP Pages' },
  admin: {
    useAsTitle: 'icpName',
    group: 'Content',
    defaultColumns: ['icpName', 'slug', '_status', 'updatedAt'],
    description: 'Targeted landing pages per customer segment (ICP). Each renders at /solutions/{slug}.',
    preview: (doc) =>
      `${process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000'}/solutions/${doc.slug}`,
  },
  versions: {
    drafts: { autosave: { interval: 60000 } },
  },
  access: {
    read: isPublishedOrAdmin,
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
    readVersions: isAdminOrEditor,
  },
  fields: [
    {
      name: 'icpName',
      type: 'text',
      required: true,
      admin: { description: 'e.g. "Digital Wallets & Super Apps"' },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: {
        description: 'URL segment under /solutions/ (e.g. "digital-wallets").',
        position: 'sidebar',
      },
      validate: (value: string | null | undefined) => {
        if (!value) return 'Slug is required'
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value))
          return 'Slug must be lowercase letters, numbers and hyphens'
        return true
      },
    },
    {
      name: 'summary',
      type: 'textarea',
      required: true,
      admin: { description: 'Sub-hero paragraph (1–2 sentences).' },
    },
    {
      name: 'layout',
      type: 'blocks',
      blocks: [HeroBlock, FeatureGridBlock, CTASectionBlock, FAQBlock, RichTextBlock, StatsBlock],
      required: true,
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      admin: { position: 'sidebar' },
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}

export default SolutionPages
