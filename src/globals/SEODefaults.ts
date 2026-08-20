import type { GlobalConfig } from 'payload'
import { isAdmin } from '@/access'

/**
 * SEODefaults — fallback title, description, and OG image used when a
 * page does not specify its own SEO fields. Admin-only edit.
 */
const SEODefaults: GlobalConfig = {
  slug: 'seo-defaults',
  label: 'SEO Defaults',
  admin: {
    description:
      'Fallback SEO values used when individual pages do not set their own title or description.',
  },
  access: {
    read: () => true,
    update: isAdmin,
  },
  fields: [
    {
      name: 'defaultTitle',
      type: 'text',
      required: true,
      defaultValue:
        'Fintegrity Technologies Limited — Embedded compliance decisioning for African fintechs',
      admin: { description: 'Used as the <title> when no page-level title is set.' },
    },
    {
      name: 'titleTemplate',
      type: 'text',
      defaultValue: '%s — Fintegrity Technologies Limited',
      admin: {
        description:
          'Next.js title template. %s is replaced by the page-level title. Do not remove %s.',
      },
    },
    {
      name: 'defaultDescription',
      type: 'textarea',
      required: true,
      defaultValue:
        'Fintegrity Technologies Limited is the compliance brain behind fintech money flows. One API call returns a real-time ALLOW, REVIEW, or BLOCK decision, backed by an immutable, regulator-ready audit trail.',
    },
    {
      name: 'defaultOgImage',
      type: 'upload',
      relationTo: 'media',
      admin: {
        description:
          'Open Graph image used when no page-level OG image is set (1200×630 recommended).',
      },
    },
    {
      name: 'twitterHandle',
      type: 'text',
      admin: { description: 'Twitter/X handle without @, used for twitter:site meta tag.' },
    },
    {
      name: 'locale',
      type: 'text',
      defaultValue: 'en_NG',
      admin: {
        description: 'Open Graph locale (e.g. en_NG, en_GB). Used in og:locale meta tag.',
        readOnly: true,
      },
    },
  ],
}

export default SEODefaults
