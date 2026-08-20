import type { Metadata } from 'next'
import Link from 'next/link'
import { SITE_URL } from '@/lib/config'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Customer Lifecycle Management',
  description:
    'Risk profiling, customer screening, identity verification and address verification — coming soon to the same customer risk state your monitoring and screening already run on.',
  alternates: { canonical: `${SITE_URL}/products/customer-lifecycle` },
}

const CAPABILITIES = [
  {
    title: 'Risk profiling',
    body: "A scored risk profile per customer, updated as their behaviour and exposure change.",
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--fg-green-700)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="10" cy="8" r="3.4" />
        <path d="M4 20c0-3.2 2.7-5.4 6-5.4 1.2 0 2.3.3 3.2.8" />
        <path d="M15 17.5l2 2 3.5-4" />
      </svg>
    ),
  },
  {
    title: 'Customer screening',
    body: 'Sanctions, PEP and adverse media at onboarding, then continuously after it.',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--fg-green-700)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="11" cy="11" r="6.4" />
        <path d="M15.6 15.6L20 20" />
      </svg>
    ),
  },
  {
    title: 'Identity verification',
    body: 'Individuals and businesses — BVN, NIN and CAC records reconciled into one verified identity.',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--fg-green-700)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3.5" y="5" width="17" height="14" rx="1.5" />
        <circle cx="9" cy="11" r="2.2" />
        <path d="M14 10h4M14 13.5h4M5.5 16c.8-1.4 2-2.1 3.5-2.1s2.7.7 3.5 2.1" />
      </svg>
    ),
  },
  {
    title: 'Address verification',
    body: 'Residential and business address checks, evidenced to the same standard as everything else.',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--fg-green-700)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 21s6.5-6.1 6.5-10.5A6.5 6.5 0 0 0 5.5 10.5C5.5 14.9 12 21 12 21Z" />
        <circle cx="12" cy="10.3" r="2.3" />
      </svg>
    ),
  },
  {
    title: 'Risk assessment',
    body: 'Documented, repeatable customer risk assessment your MLRO can hand to an examiner.',
    icon: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--fg-green-700)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 19V9M10 19V5M15 19v-7M20 19v-4" />
      </svg>
    ),
  },
]

const LIFECYCLE_STEPS = [
  { label: 'Onboard', title: 'Verify identity', meta: 'BVN · NIN · CAC', delay: '0s' },
  { label: 'Assess', title: 'Set risk state', meta: 'ACTIVE · tier T2', delay: '1.5s' },
  { label: 'Enforce', title: 'Monitor and screen', meta: 'every transaction', delay: '3s' },
  { label: 'Review', title: 'Re-assess', meta: 'on schedule or trigger', delay: '4.5s' },
]

export default function CustomerLifecyclePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <header className={styles.hero}>
        <div className={styles.heroWash} aria-hidden="true">
          <div className={styles.washBlob1} />
          <div className={styles.washGrid} />
        </div>

        <div className={`fg-container ${styles.heroInner}`}>
          <div className={styles.eyebrow}>Customer Lifecycle Management</div>

          <div className={styles.h1Row}>
            <h1 className={styles.h1}>Know who they are before you watch what they do.</h1>
            <span className={styles.soonChip}>
              <span className={styles.soonDot} aria-hidden="true" />
              Coming soon
            </span>
          </div>

          <p className={styles.lede}>
            Onboarding, verification and risk profiling — feeding the same customer risk state
            your monitoring and screening already run on.
          </p>

          <div className={styles.heroCta}>
            <Link href="/demo" className={styles.btnPrimary}>
              Join the early list <span aria-hidden="true">→</span>
            </Link>
            <span className={styles.heroCtaNote}>Design partners get it first.</span>
          </div>
        </div>
      </header>

      {/* ── Five capabilities ────────────────────────────────────────── */}
      <section className={styles.sectionBone}>
        <div className="fg-container">
          <h2 className={styles.h2}>Five capabilities, one customer record.</h2>

          <div className={styles.cardsGrid}>
            {CAPABILITIES.map((c) => (
              <div key={c.title} className={styles.card}>
                {c.icon}
                <h3 className={styles.cardTitle}>{c.title}</h3>
                <p className={styles.cardBody}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Where it fits ────────────────────────────────────────────── */}
      <section className={styles.sectionPaper}>
        <div className="fg-container">
          <div className={styles.eyebrow}>Where it fits</div>
          <h2 className={styles.h2}>The front of the same lifecycle.</h2>
          <p className={styles.lede2}>
            Verification sets the risk state. Monitoring and screening enforce it. Nothing is
            re-keyed between them.
          </p>

          <div className={styles.stepsGrid}>
            {LIFECYCLE_STEPS.map((s) => (
              <div key={s.label} className={styles.stepCard} style={{ animationDelay: s.delay }}>
                <div className={styles.stepLabel}>{s.label}</div>
                <div className={styles.stepTitle}>{s.title}</div>
                <div className={styles.stepMeta}>{s.meta}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing CTA ───────────────────────────────────────────────── */}
      <section className={styles.sectionNavy}>
        <div className={`fg-container ${styles.ctaGrid}`}>
          <div>
            <h2 className={styles.h2navy}>Shape it before it ships.</h2>
            <p className={styles.ctaBody}>
              Design partners tell us which verification checks matter in their market. That is
              how the roadmap gets ordered.
            </p>
          </div>
          <div className={styles.ctaButtons}>
            <Link href="/demo" className={styles.btnPrimaryOnNavy}>
              Join the early list <span aria-hidden="true">→</span>
            </Link>
            <Link href="/products/transaction-monitoring" className={styles.btnGhostOnNavy}>
              What&rsquo;s live today
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
