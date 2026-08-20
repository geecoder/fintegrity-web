import type { CollectionConfig, Where } from 'payload'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { isAdmin, isAdminOrEditor } from '@/access'

/**
 * BlogPosts — blog articles and regulatory reference content.
 *
 * Access rules (enforced in code, not just convention):
 * - Public visitors see only published posts.
 * - Regulatory posts (contentType === 'regulatory') additionally require
 *   reviewStatus === 'approved' before they can be published at all.
 *   A beforeChange hook throws if someone tries to publish without approval.
 * - Only admins can delete.
 */
const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  labels: { singular: 'Blog Post', plural: 'Blog Posts' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'contentType', 'reviewStatus', '_status', 'publishedAt'],
    preview: (doc) =>
      `${process.env.NEXT_PUBLIC_SERVER_URL ?? 'http://localhost:3000'}/blog/${doc.slug}`,
  },
  versions: {
    drafts: { autosave: { interval: 60000 } },
  },
  access: {
    read: ({ req: { user } }) => {
      if (user) return true
      // Public: published only; regulatory must also be approved
      return {
        and: [
          { _status: { equals: 'published' } } as Where,
          {
            or: [
              { contentType: { not_equals: 'regulatory' } },
              {
                and: [
                  { contentType: { equals: 'regulatory' } },
                  { reviewStatus: { equals: 'approved' } },
                ],
              },
            ],
          } as Where,
        ],
      }
    },
    create: isAdminOrEditor,
    update: isAdminOrEditor,
    delete: isAdmin,
    readVersions: isAdminOrEditor,
  },
  hooks: {
    beforeChange: [
      // Enforce: regulatory posts cannot reach 'published' without reviewStatus === 'approved'
      async ({ data, originalDoc, operation }) => {
        const isPublishing = data._status === 'published'
        const isRegulatory =
          data.contentType === 'regulatory' ||
          (operation === 'update' && originalDoc?.contentType === 'regulatory')

        if (isPublishing && isRegulatory) {
          const reviewStatus = data.reviewStatus ?? originalDoc?.reviewStatus
          if (reviewStatus !== 'approved') {
            throw new Error(
              'Regulatory content cannot be published until reviewStatus is set to "approved". ' +
                'Have a qualified compliance professional review the content first.',
            )
          }
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { position: 'sidebar' },
      validate: (value: string | null | undefined) => {
        if (!value) return 'Slug is required'
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value))
          return 'Slug must be lowercase letters, numbers and hyphens'
        return true
      },
    },
    {
      name: 'contentType',
      type: 'select',
      required: true,
      defaultValue: 'blog',
      options: [
        { label: 'Blog / Thought leadership', value: 'blog' },
        { label: 'Regulatory reference', value: 'regulatory' },
      ],
      admin: {
        position: 'sidebar',
        description: 'Regulatory content requires legal review before publishing.',
      },
    },
    {
      // Only visible/relevant when contentType === 'regulatory'
      name: 'reviewStatus',
      type: 'select',
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'In legal review', value: 'legal_review' },
        { label: 'Approved — may publish', value: 'approved' },
      ],
      admin: {
        position: 'sidebar',
        description:
          'Regulatory posts only. Must be "Approved" before the post can be published.',
        condition: (data) => data.contentType === 'regulatory',
      },
      // Access: only admins can mark as 'approved'
      access: {
        update: ({ req: { user }, data }) => {
          if (data?.reviewStatus === 'approved') return user?.role === 'admin'
          return true
        },
      },
    },
    {
      name: 'excerpt',
      type: 'textarea',
      required: true,
      admin: { description: '1–2 sentence summary used in blog index cards.' },
    },
    {
      name: 'body',
      type: 'richText',
      editor: lexicalEditor(),
      required: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      relationTo: 'media',
      admin: { position: 'sidebar' },
    },
    {
      name: 'author',
      type: 'relationship',
      relationTo: 'users',
      admin: { position: 'sidebar' },
    },
    {
      name: 'category',
      type: 'select',
      options: [
        { label: 'Regulation', value: 'regulation' },
        { label: 'Product', value: 'product' },
        { label: 'Compliance', value: 'compliance' },
        { label: 'Engineering', value: 'engineering' },
        { label: 'Company', value: 'company' },
      ],
      admin: { position: 'sidebar' },
    },
    {
      name: 'publishedAt',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
        description: 'Controls sort order in the blog index.',
      },
    },
    // ── SEO ──────────────────────────────────────────────────────────────────
    {
      name: 'seo',
      type: 'group',
      label: 'SEO',
      admin: { position: 'sidebar' },
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}

export default BlogPosts
