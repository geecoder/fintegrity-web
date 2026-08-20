import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      admin: { description: 'Small caps label above the heading (e.g. "PRODUCT")' },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
    },
    {
      name: 'subheading',
      type: 'textarea',
      admin: { description: 'One or two sentence sub-hero paragraph' },
    },
    {
      name: 'primaryCtaLabel',
      type: 'text',
    },
    {
      name: 'primaryCtaUrl',
      type: 'text',
    },
    {
      name: 'secondaryCtaLabel',
      type: 'text',
    },
    {
      name: 'secondaryCtaUrl',
      type: 'text',
    },
    {
      name: 'backgroundStyle',
      type: 'select',
      defaultValue: 'gradient',
      options: [
        { label: 'Gradient (indigo)', value: 'gradient' },
        { label: 'Dark', value: 'dark' },
        { label: 'Light', value: 'light' },
      ],
    },
  ],
}
