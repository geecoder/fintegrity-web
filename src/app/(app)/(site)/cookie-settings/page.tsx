import type { Metadata } from 'next'
import Link from 'next/link'
import BreadcrumbJsonLd from '@/components/json-ld/BreadcrumbJsonLd'
import CookieSettingsPanel from './CookieSettingsPanel'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Cookie settings',
  robots: { index: false, follow: true },
  alternates: { canonical: 'https://www.getfintegrity.com/cookie-settings' },
}

export default function CookieSettingsPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Cookie settings', href: '/cookie-settings' }]} />

      <header className={styles.hero}>
        <div className="fg-container">
          <div className={styles.eyebrow}>Legal</div>
          <h1 className={styles.h1}>Cookie settings</h1>
          <p className={styles.lede}>
            Review what you&rsquo;ve consented to and change your choices at any time. Withdrawing consent is as
            easy as giving it — see our <Link href="/cookie-policy">Cookie Policy</Link> for what each category
            covers.
          </p>
        </div>
      </header>

      <section className={styles.section}>
        <div className="fg-container">
          <CookieSettingsPanel />
          <p className={styles.footnote}>
            Need the button above instead of JavaScript-based cookie clearing? You can also block or delete cookies
            directly in your browser&rsquo;s settings — see Section 7 of the{' '}
            <Link href="/cookie-policy">Cookie Policy</Link>.
          </p>
        </div>
      </section>
    </>
  )
}
