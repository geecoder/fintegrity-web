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
      admin: { description: 'Free-form rich text. Supports headings, paragraphs, bold, italic, links, and lists.' },
    },
    {
      name: 'maxWidth',
      type: 'select',
      defaultValue: 'normal',
      admin: { description: 'Controls how wide the text column is. "Normal" suits prose; "Wide" suits feature descriptions.' },
      options: [
        { label: 'Normal (760px — default for prose)', value: 'normal' },
        { label: 'Wide (1140px — full content width)', value: 'wide' },
        { label: 'Narrow (600px — tight reading column)', value: 'narrow' },
      ],
    },
  ],
}
