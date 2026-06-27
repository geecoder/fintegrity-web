import type { Block } from 'payload'

export const CTASectionBlock: Block = {
  slug: 'ctaSection',
  labels: { singular: 'CTA Section', plural: 'CTA Sections' },
  fields: [
    { name: 'headline', type: 'text', required: true, admin: { description: 'Call-to-action headline, e.g. "Ready to see it in action?"' } },
    { name: 'body', type: 'textarea', admin: { description: 'Optional supporting sentence beneath the headline.' } },
    {
      name: 'primaryLabel',
      type: 'text',
      defaultValue: 'Request a demo →',
      admin: { description: 'Primary button label. Default is "Request a demo →".' },
    },
    {
      name: 'primaryUrl',
      type: 'text',
      defaultValue: '/book-a-demo',
      admin: { description: 'Primary button destination. Default is /book-a-demo.' },
    },
    { name: 'secondaryLabel', type: 'text', admin: { description: 'Optional secondary button label (appears as ghost button).' } },
    { name: 'secondaryUrl', type: 'text', admin: { description: 'Destination for the secondary button.' } },
  ],
}
