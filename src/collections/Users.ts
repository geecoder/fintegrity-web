import type { CollectionConfig } from 'payload'
import { isAdmin, isAdminOrEditor } from '@/access'

/**
 * Users — Payload auth collection.
 *
 * Access rules:
 * - Only admins can create, update, or delete users (no self-signup).
 * - Admins and editors can read the user list (for author relationships etc).
 * - role is saved to the JWT so it's available in all access-control functions.
 */
const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'User', plural: 'Users' },
  admin: {
    useAsTitle: 'email',
    group: 'System',
    defaultColumns: ['email', 'role', 'updatedAt'],
    description: 'CMS users. Only admins can add or manage accounts.',
  },
  auth: true,
  access: {
    read: isAdminOrEditor,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin — can publish, manage users, edit globals', value: 'admin' },
        { label: 'Editor — can create and edit content (cannot publish)', value: 'editor' },
      ],
      defaultValue: 'editor',
      required: true,
      saveToJWT: true, // available in access-control functions without a DB round-trip
      access: {
        // Only admins may change or assign roles
        update: ({ req: { user } }) => user?.role === 'admin',
      },
    },
  ],
}

export default Users
