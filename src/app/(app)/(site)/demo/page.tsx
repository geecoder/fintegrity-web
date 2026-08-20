import type { Metadata } from 'next'
import DemoForm from '@/components/demo/DemoForm'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Book a demo',
  description:
    'See the Fintegrity compliance decision API against your own transaction shapes. 30 minutes, no generic slide deck.',
  alternates: { canonical: 'https://www.getfintegrity.com/demo' },
}

const REASSURANCE = [
  {
    title: 'What happens on the call',
    body: 'We walk through the decision API against transaction shapes like yours, and watch decisions and evidence appear in real time.',
  },
  {
    title: 'How long it takes',
    body: '30 minutes, one call. No slide deck, no multi-stage sales process.',
  },
  {
    title: 'Who you’ll speak to',
    body: 'A founder or senior engineer — not a sales rep.',
  },
]

export default function DemoPage() {
  return (
    <header className={styles.hero}>
      <div className={`fg-container ${styles.heroInner}`}>
        <div className={styles.content}>
          <div className={styles.eyebrow}>Book a demo</div>
          <h1 className={styles.h1}>See a decision on your own transactions.</h1>
          <p className={styles.lede}>
            Tell us about your business and we&rsquo;ll show you how Fintegrity decides,
            enforces, and proves — against shapes of transaction that look like yours.
          </p>

          <dl className={styles.reassuranceList}>
            {REASSURANCE.map((r) => (
              <div key={r.title} className={styles.reassuranceItem}>
                <dt className={styles.reassuranceTitle}>{r.title}</dt>
                <dd className={styles.reassuranceBody}>{r.body}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className={styles.formCol}>
          <DemoForm />
        </div>
      </div>
    </header>
  )
}
