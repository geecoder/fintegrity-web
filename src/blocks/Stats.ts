import type { Block } from 'payload'

export const StatsBlock: Block = {
  slug: 'stats',
  labels: { singular: 'Stats', plural: 'Stats Sections' },
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'stats',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          name: 'value',
          type: 'text',
          required: true,
          admin: { description: 'e.g. "<50ms" or "100%"' },
        },
        {
          name: 'label',
          type: 'text',
          required: true,
          admin: { description: 'e.g. "P99 decision latency"' },
        },
      ],
    },
  ],
}
