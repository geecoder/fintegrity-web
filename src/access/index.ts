import type { Access } from 'payload'

/** Any authenticated user with the admin role. */
export const isAdmin: Access = ({ req: { user } }) => user?.role === 'admin'

/** Any authenticated user (admin or editor). */
export const isAdminOrEditor: Access = ({ req: { user } }) =>
  user?.role === 'admin' || user?.role === 'editor'

/** Public read — anyone, including unauthenticated visitors. */
export const isPublic: Access = () => true

/** Allow read only when the document is published (for public-facing collections). */
export const isPublishedOrAdmin: Access = ({ req: { user } }) => {
  if (user) return true // authenticated users see all statuses
  return { _status: { equals: 'published' } }
}
