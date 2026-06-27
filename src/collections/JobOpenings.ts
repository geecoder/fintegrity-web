import type { CollectionConfig } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { isAdmin, isAdminOrEditor } from '@/access'

const JobOpenings: CollectionConfig = {
  slug: 'job-openings',
  labels: { singular: 'Job Opening', plural: 'Job Openings' },
  admin: {
    useAsTitle: 'title',
    group: 'Careers',
    defaultColumns: ['title', 'team', 'type', 'isOpen', 'updatedAt'],
    description: 'Open roles. Toggle "Is Open" to show/hide on the careers page. No draft/publish — visibility is controlled by the isOpen field.',
  },
  // No draft/publish versioning — jobs are either open or closed (isOpen toggle)
  access: {
    // Public can read open jobs
    read: ({ req: { user } }) => {
      if (user) return true
      return { isOpen: { equals: true } }
    },
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'team',
      type: 'text',
      required: true,
      admin: { description: 'e.g. "Engineering", "Compliance", "Operations"' },
    },
    {
      name: 'location',
      type: 'text',
      required: true,
      defaultValue: 'Lagos, Nigeria',
    },
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Full-time', value: 'full-time' },
        { label: 'Part-time', value: 'part-time' },
        { label: 'Contract', value: 'contract' },
        { label: 'Internship', value: 'internship' },
      ],
    },
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor(),
      required: true,
    },
    {
      name: 'applyUrl',
      type: 'text',
      required: true,
      admin: { description: 'External application link or mailto:.' },
    },
    {
      name: 'isOpen',
      type: 'checkbox',
      defaultValue: true,
      required: true,
      admin: {
        description: 'Uncheck to hide this role from the public careers page.',
        position: 'sidebar',
      },
    },
  ],
}

export default JobOpenings
