import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const FAQBlock: Block = {
  slug: 'faq',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  fields: [
    { name: 'heading', type: 'text', admin: { description: 'Optional section heading above the FAQ list, e.g. "Frequently asked questions"' } },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      admin: { description: 'Each item is one expandable Q&A row. Add as many as needed.' },
      fields: [
        { name: 'question', type: 'text', required: true, admin: { description: 'The question text visible in the collapsed row.' } },
        {
          name: 'answer',
          type: 'richText',
          editor: lexicalEditor(),
          required: true,
          admin: { description: 'The full answer, shown when the row is expanded. Supports bold, links, and lists.' },
        },
      ],
    },
  ],
}
