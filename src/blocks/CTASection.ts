import type { Block } from 'payload'

export const CTASectionBlock: Block = {
  slug: 'ctaSection',
  labels: { singular: 'CTA Section', plural: 'CTA Sections' },
  fields: [
    { name: 'headline', type: 'text', required: true },
    { name: 'body', type: 'textarea' },
    {
      name: 'primaryLabel',
      type: 'text',
      defaultValue: 'Request a demo →',
    },
    {
      name: 'primaryUrl',
      type: 'text',
      defaultValue: '/book-a-demo',
    },
    { name: 'secondaryLabel', type: 'text' },
    { name: 'secondaryUrl', type: 'text' },
  ],
}
