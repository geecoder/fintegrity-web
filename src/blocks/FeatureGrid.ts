import type { Block } from 'payload'

export const FeatureGridBlock: Block = {
  slug: 'featureGrid',
  labels: { singular: 'Feature Grid', plural: 'Feature Grids' },
  fields: [
    { name: 'eyebrow', type: 'text', admin: { description: 'Small section label above the heading, e.g. "HOW IT WORKS"' } },
    { name: 'heading', type: 'text', required: true, admin: { description: 'Section headline, e.g. "Three pillars of defensible compliance"' } },
    { name: 'subheading', type: 'textarea', admin: { description: 'Optional sentence below the heading providing more context.' } },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      admin: { description: 'Number of feature cards per row on desktop. 3 is the default and works best for most content.' },
      options: [
        { label: '2 columns', value: '2' },
        { label: '3 columns (default)', value: '3' },
        { label: '4 columns', value: '4' },
      ],
    },
    {
      name: 'features',
      type: 'array',
      minRows: 1,
      admin: { description: 'Each entry becomes one card. Add 3–6 features for best results.' },
      fields: [
        { name: 'tag', type: 'text', admin: { description: 'Small label on the card, e.g. "AML" or "Real-time". Optional.' } },
        { name: 'title', type: 'text', required: true, admin: { description: 'Card headline, e.g. "Pre-authorisation screening"' } },
        { name: 'body', type: 'textarea', required: true, admin: { description: '1–2 sentence description of this feature.' } },
      ],
    },
  ],
}
