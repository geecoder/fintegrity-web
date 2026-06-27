import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { isAdmin, isAdminOrEditor, isPublishedOrAdmin } from '@/access'

const CaseStudies: CollectionConfig = {
  slug: 'case-studies',
  labels: { singular: 'Case Study', plural: 'Case Studies' },
  admin: {
    useAsTitle: 'clientName',
    group: 'Editorial',
    defaultColumns: ['clientName', 'slug', '_status', 'updatedAt'],
    description: 'Customer success stories with quantified outcome metrics. Renders at /case-studies/{slug}.',
    preview: (doc) =>
      `${process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000'}/case-studies/${doc.slug}`,
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
      name: 'clientName',
      type: 'text',
      required: true,
      admin: { description: 'Client or pilot partner name. May be anonymised ("Leading Nigerian fintech").' },
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { position: 'sidebar' },
      validate: (value: string | null | undefined) => {
        if (!value) return 'Slug is required'
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value))
          return 'Slug must be lowercase letters, numbers and hyphens'
        return true
      },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: { position: 'sidebar', description: 'Client logo (optional; may omit if anonymised).' },
    },
    {
      name: 'challenge',
      type: 'textarea',
      required: true,
      admin: { description: 'The compliance problem the client faced before Fintegrity.' },
    },
    {
      name: 'solution',
      type: 'richText',
      editor: lexicalEditor(),
      required: true,
      admin: { description: 'How Fintegrity addressed the challenge.' },
    },
    {
      name: 'outcomeMetrics',
      type: 'array',
      admin: { description: 'Quantified results (e.g. "<50ms P99 decision latency").' },
      fields: [
        { name: 'value', type: 'text', required: true, admin: { description: 'e.g. "<50ms"' } },
        { name: 'label', type: 'text', required: true, admin: { description: 'e.g. "P99 decision latency"' } },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      admin: { position: 'sidebar' },
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
      ],
    },
  ],
}

export default CaseStudies
