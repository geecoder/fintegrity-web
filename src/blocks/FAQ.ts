import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const FAQBlock: Block = {
  slug: 'faq',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      fields: [
        { name: 'question', type: 'text', required: true },
        {
          name: 'answer',
          type: 'richText',
          editor: lexicalEditor(),
          required: true,
        },
      ],
    },
  ],
}
