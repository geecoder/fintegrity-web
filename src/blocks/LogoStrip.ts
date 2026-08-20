import type { Block } from 'payload'

export const LogoStripBlock: Block = {
  slug: 'logoStrip',
  labels: { singular: 'Logo Strip', plural: 'Logo Strips' },
  fields: [
    { name: 'heading', type: 'text', admin: { description: 'Optional label above the logos' } },
    {
      name: 'logos',
      type: 'array',
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
        { name: 'alt', type: 'text', required: true },
        { name: 'url', type: 'text', admin: { description: 'Optional link target' } },
      ],
    },
  ],
}
