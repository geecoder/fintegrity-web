import type { Block } from 'payload'

export const StatsBlock: Block = {
  slug: 'stats',
  labels: { singular: 'Stats', plural: 'Stats Sections' },
  fields: [
    { name: 'heading', type: 'text', admin: { description: 'Optional section heading above the stats, e.g. "By the numbers"' } },
    {
      name: 'stats',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      admin: { description: 'Up to 6 key metrics displayed prominently. Keep values short and punchy.' },
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          admin: { description: 'The metric value, e.g. "<50ms" or "99.9%". Keep it brief.' },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: { description: 'What the value measures, e.g. "P99 decision latency" or "API uptime".' },
        },
      ],
    },
  ],
}
