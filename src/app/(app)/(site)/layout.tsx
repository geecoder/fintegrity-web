import type { ReactNode } from 'react'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'

/**
 * Marketing site shell — wraps every public-facing page with the
 * site navigation and footer. Lives in the (site) route group so
 * Payload's admin UI (in the (payload) group) never inherits it.
 */
export default function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Nav />
      <main>{children}</main>
      <Footer />
    </>
  )
}
