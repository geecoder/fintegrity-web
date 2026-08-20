import type { CollectionConfig } from 'payload'
import { isAdminOrEditor } from '@/access'

const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Media', plural: 'Media' },
  admin: { defaultColumns: ['filename', 'alt', 'mimeType', 'updatedAt'] },
  upload: {
    // Static directory for local dev (R2 takes over in Phase 3 via storage-s3 plugin)
    staticDir: 'public/media',
    mimeTypes: [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/svg+xml',
      'image/gif',
      'application/pdf',
    ],
    imageSizes: [
      { name: 'thumbnail', width: 400, height: 300, position: 'centre' },
      { name: 'card', width: 768, height: 512, position: 'centre' },
      { name: 'og', width: 1200, height: 630, position: 'centre' },
    ],
  },
  access: {
    read: () => true,   // public — media URLs must be publicly accessible
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdminOrEditor,
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: { description: 'Describe the image for screen readers and SEO.' },
    },
    {
      name: 'caption',
      type: 'text',
    },
  ],
}

export default Media
