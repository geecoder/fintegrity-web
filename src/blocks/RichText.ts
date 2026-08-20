import type { Block } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'

export const RichTextBlock: Block = {
  slug: 'richText',
  labels: { singular: 'Rich Text', plural: 'Rich Text Sections' },
  fields: [
    {
      name: 'content',
      type: 'richText',
      editor: lexicalEditor(),
      required: true,
    },
    {
      name: 'maxWidth',
      type: 'select',
      defaultValue: 'normal',
      options: [
        { label: 'Normal (760px)', value: 'normal' },
        { label: 'Wide (1140px)', value: 'wide' },
        { label: 'Narrow (600px)', value: 'narrow' },
      ],
    },
  ],
}
