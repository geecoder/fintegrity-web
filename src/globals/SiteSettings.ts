import type { GlobalConfig } from 'payload'
import { isAdmin } from '@/access'

/**
 * SiteSettings — site-wide nav, footer, social links, canonical domain.
 * Only admins can edit globals.
 */
const SiteSettings: GlobalConfig = {
  slug: 'site-settings',
  label: 'Site Settings',
  admin: {
    description:
      'Global nav links, footer columns, social links, and canonical domain. Admin-only.',
  },
  access: {
    read: () => true,  // readable by any server component via Local API
    update: isAdmin,
  },
  fields: [
    {
      name: 'canonicalDomain',
      type: 'text',
      defaultValue: 'https://www.getfintegrity.com',
      required: true,
      admin: {
        description:
          'The canonical public domain for this site. Never change this to fintegrity.io, fintegrity.ng, or fintegrity.com — only getfintegrity.com is canonical.',
        readOnly: true, // prevent accidental edits in the admin UI
      },
    },
    {
      name: 'siteName',
      type: 'text',
      defaultValue: 'Fintegrity Technologies Limited',
      required: true,
    },
    // ── Navigation ────────────────────────────────────────────────────────
    {
      name: 'navLinks',
      type: 'array',
      label: 'Primary Nav Links',
      admin: { description: 'Top-level navigation items. Dropdowns are hardcoded in the Nav component.' },
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'url', type: 'text', required: true },
        {
          name: 'openInNewTab',
          type: 'checkbox',
          defaultValue: false,
        },
      ],
    },
    // ── Footer ────────────────────────────────────────────────────────────
    {
      name: 'footerColumns',
      type: 'array',
      label: 'Footer Link Columns',
      fields: [
        { name: 'heading', type: 'text', required: true },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'url', type: 'text', required: true },
          ],
        },
      ],
    },
    {
      name: 'footerTagline',
      type: 'text',
      defaultValue: "We don't sell checks. We sell defensible compliance decisions.",
    },
    {
      name: 'footerLegalNote',
      type: 'textarea',
      defaultValue:
        'Registered in Nigeria. Lagos, Nigeria. Regulatory references are not legal advice.',
    },
    // ── Social links ──────────────────────────────────────────────────────
    {
      name: 'social',
      type: 'group',
      label: 'Social Links',
      fields: [
        { name: 'twitter', type: 'text', admin: { description: 'Full URL' } },
        { name: 'linkedin', type: 'text', admin: { description: 'Full URL' } },
        { name: 'github', type: 'text', admin: { description: 'Full URL (if public)' } },
      ],
    },
    // ── Contact ───────────────────────────────────────────────────────────
    {
      name: 'contactEmail',
      type: 'email',
      defaultValue: 'gee@getfintegrity.com',
    },
    {
      name: 'bookingUrl',
      type: 'text',
      defaultValue: 'https://calendar.app.google/LFgyb9Bj2fe5VqJw8',
      admin: { description: 'Google Calendar booking link for demo requests.' },
    },
  ],
}

export default SiteSettings
