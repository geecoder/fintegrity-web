import type { Block } from 'payload'

export const PricingTableBlock: Block = {
  slug: 'pricingTable',
  labels: { singular: 'Pricing Table', plural: 'Pricing Tables' },
  fields: [
    { name: 'heading', type: 'text', required: true },
    { name: 'subheading', type: 'textarea' },
    {
      name: 'tiers',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'name', type: 'text', required: true },
        { name: 'headline', type: 'text' },
        { name: 'description', type: 'textarea' },
        {
          name: 'price',
          type: 'text',
          required: true,
          admin: { description: 'e.g. "Custom" or "₦X/month"' },
        },
        { name: 'priceNote', type: 'text', admin: { description: 'e.g. "Based on transaction volume"' } },
        {
          name: 'features',
          type: 'array',
          fields: [{ name: 'feature', type: 'text', required: true }],
        },
        { name: 'ctaLabel', type: 'text', defaultValue: 'Request a quote →' },
        { name: 'ctaUrl', type: 'text', defaultValue: '/book-a-demo' },
        {
          name: 'featured',
          type: 'checkbox',
          defaultValue: false,
          admin: { description: 'Highlights this tier visually' },
        },
      ],
    },
  ],
}
