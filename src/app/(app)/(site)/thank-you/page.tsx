import type { Metadata } from 'next'
import Link from 'next/link'
import { BOOKING_URL } from '@/lib/config'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Thank you — demo request received',
  robots: { index: false, follow: false },
}

const WHILE_YOU_WAIT = [
  { href: '/products/transaction-monitoring/decision-api', label: 'See the compliance decision API' },
  { href: '/products/transaction-monitoring', label: 'Explore transaction monitoring' },
  { href: '/blog', label: 'Read the Fintegrity blog' },
]

export default function ThankYouPage() {
  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        <div className={styles.icon} aria-hidden="true">✓</div>
        <h1 className={styles.h1}>Demo request received</h1>
        <p className={styles.body}>
          Thanks for getting in touch. We&rsquo;ll review your request and follow up within one business day to
          confirm a time that works.
        </p>
        <p className={styles.note}>
          If you&rsquo;d rather pick a time right now, you can book directly using the calendar below.
        </p>
        <div className={styles.actions}>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className={styles.btnPrimary}>
            Pick a time now <span aria-hidden="true">→</span>
          </a>
          <Link href="/" className={styles.btnGhost}>
            Back to home
          </Link>
        </div>

        <div className={styles.whileCard}>
          <div className={styles.whileLabel}>While you wait</div>
          <div className={styles.whileLinks}>
            {WHILE_YOU_WAIT.map((link) => (
              <Link key={link.href} href={link.href}>
                {link.label} →
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
