import type { Block } from 'payload'

export const HeroBlock: Block = {
  slug: 'hero',
  labels: { singular: 'Hero', plural: 'Heroes' },
  fields: [
    {
      name: 'eyebrow',
      type: 'text',
      admin: { description: 'Small label above the headline — e.g. "Transaction Monitoring". Displays in caps.' },
    },
    {
      name: 'heading',
      type: 'text',
      required: true,
      admin: { description: 'Main page headline. Aim for under 10 words. This becomes the <h1> on the page.' },
    },
    {
      name: 'subheading',
      type: 'textarea',
      admin: { description: 'One or two sentences beneath the headline. Keep under 25 words.' },
    },
    {
      name: 'primaryCtaLabel',
      type: 'text',
      admin: { description: 'Label for the main call-to-action button, e.g. "Request a demo →"' },
    },
    {
      name: 'primaryCtaUrl',
      type: 'text',
      admin: { description: 'URL for the primary button. Use a relative path (e.g. "/book-a-demo") or full URL.' },
    },
    {
      name: 'secondaryCtaLabel',
      type: 'text',
      admin: { description: 'Optional second button label (appears as a ghost/outline button).' },
    },
    {
      name: 'secondaryCtaUrl',
      type: 'text',
      admin: { description: 'URL for the secondary button.' },
    },
    {
      name: 'backgroundStyle',
      type: 'select',
      defaultValue: 'gradient',
      admin: { description: 'Visual style of the hero background. "Gradient" is the default brand look.' },
      options: [
        { label: 'Gradient (indigo — default)', value: 'gradient' },
        { label: 'Dark (navy background)', value: 'dark' },
        { label: 'Light (white background)', value: 'light' },
      ],
    },
  ],
}
