import type { Metadata } from 'next'
import Link from 'next/link'
import BreadcrumbJsonLd from '@/components/json-ld/BreadcrumbJsonLd'
import { CONTACT_EMAIL } from '@/lib/config'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Case studies',
  description:
    'How Fintegrity design partners are building defensible compliance infrastructure and satisfying CBN AML/CFT requirements in production.',
  alternates: { canonical: 'https://www.getfintegrity.com/case-studies' },
}

// Verbatim from the live /case-studies page — content is a deliberate
// exception to the rest of this redesign (real client outcomes, kept as-is).
// Only the visual treatment below is new.
const CASE_STUDIES = [
  {
    kicker: 'Banking',
    title: 'A Tier-2 Nigerian commercial bank',
    body:
      'Transaction monitoring ran as an overnight batch job against a legacy core banking system. Suspicious activity was often identified two to three days after a transaction had already settled, leaving the compliance team reconstructing intent after the fact instead of intervening in time. Examiners flagged the lag as a supervisory concern during a routine CBN review.',
    stats: [
      { figure: '<80 ms', label: 'P99 decision latency' },
      { figure: 'Same-day', label: 'Suspicious activity identification (from 2–3 day lag)' },
      { figure: '100%', label: 'Transactions evaluated pre-settlement' },
    ],
  },
  {
    kicker: 'Digital wallets',
    title: 'A consumer digital wallet provider',
    body:
      'A fast-growing wallet product was onboarding tens of thousands of new users a month, but its compliance stack was a set of disconnected scripts stitched together by engineering as needed. There was no consistent tiering between BVN-verified and unverified users, and the team could not produce a clean audit trail when NFIU requested transaction history for a specific case.',
    stats: [
      { figure: '3', label: 'CDD-based risk tiers enforced automatically' },
      { figure: 'Minutes', label: 'To produce a complete audit trail for a customer' },
      { figure: '0', label: 'Disconnected compliance scripts remaining' },
    ],
  },
  {
    kicker: 'Remittance',
    title: 'A cross-border remittance company',
    body:
      'Corridor-specific AML obligations meant the same transaction could carry very different risk depending on the sending and receiving country. The compliance team maintained risk logic in spreadsheets that were manually updated whenever a corridor’s regulatory profile changed, and updates routinely lagged behind the change itself by weeks.',
    stats: [
      { figure: 'Same-day', label: 'Corridor risk profile updates (from weeks)' },
      { figure: '<50 ms', label: 'P99 decision latency at transaction volume' },
      { figure: '1', label: 'Unified review queue across all corridors' },
    ],
  },
]

export default function CaseStudiesPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Case studies', href: '/case-studies' }]} />

      <header className={styles.hero}>
        <div className="fg-container">
          <div className={styles.eyebrow}>Case studies</div>
          <h1 className={styles.h1}>Compliance infrastructure in the wild</h1>
          <p className={styles.lede}>
            How Fintegrity design partners are building defensible compliance infrastructure and satisfying CBN
            AML/CFT requirements in production.
          </p>
        </div>
      </header>

      <section className={styles.section}>
        <div className="fg-container">
          <div className={styles.list}>
            {CASE_STUDIES.map((cs) => (
              <article className={styles.card} key={cs.title}>
                <div>
                  <span className={styles.kicker}>{cs.kicker}</span>
                  <h2 className={styles.cardTitle}>{cs.title}</h2>
                  <p className={styles.cardBody}>{cs.body}</p>
                  <span className={styles.readMore}>
                    Read case study <span aria-hidden="true">→</span>
                  </span>
                </div>

                <div className={styles.stats}>
                  {cs.stats.map((s) => (
                    <div className={styles.stat} key={s.label}>
                      <div className={`${styles.statFigure} fg-num`}>{s.figure}</div>
                      <div className={styles.statLabel}>{s.label}</div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>

          <p className={styles.footnote}>
            Interested in becoming a design partner? <Link href="/demo">Book a demo</Link> or write to{' '}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
          </p>
        </div>
      </section>
    </>
  )
}
