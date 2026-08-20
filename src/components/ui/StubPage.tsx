import Link from 'next/link'
import styles from './StubPage.module.css'

interface StubPageProps {
  title: string
  description: string
  category?: string
}

// Placeholder page shell for genuinely-not-built-yet routes (currently only
// /partners). Replace with real content when it exists.
export default function StubPage({ title, description, category }: StubPageProps) {
  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        {category && <div className={styles.eyebrow}>{category}</div>}
        <h1 className={styles.h1}>{title}</h1>
        <p className={styles.body}>{description}</p>
        <p className={styles.note}>This page is in development. Explore what Fintegrity already offers.</p>
        <div className={styles.actions}>
          <Link href="/products/transaction-monitoring" className={styles.btnPrimary}>
            See the decision API <span aria-hidden="true">→</span>
          </Link>
          <Link href="/" className={styles.btnGhost}>
            Back to home
          </Link>
        </div>
      </div>
    </div>
  )
}
