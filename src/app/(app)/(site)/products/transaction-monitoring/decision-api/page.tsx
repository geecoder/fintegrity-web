import type { Metadata } from 'next'
import Link from 'next/link'
import CodePanel from '@/components/product/CodePanel'
import { DEVELOPER_DOCS_URL } from '@/lib/config'
import TrackedLink from '@/components/analytics/TrackedLink'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Compliance Decision API — Fintegrity',
  description:
    'One call. Four states. A record you can defend. POST /v1/decide returns a synchronous, idempotent compliance decision with the evidence already written.',
  alternates: {
    canonical: 'https://www.getfintegrity.com/products/transaction-monitoring/decision-api',
  },
}

const HERO_STATS = [
  { figure: '<50 ms', label: 'P99 latency' },
  { figure: 'Synchronous', label: 'One request, one decision' },
  { figure: 'Idempotent', label: 'Safe to retry' },
]

const STATE_CARDS = [
  {
    state: 'CLEAR',
    colorClass: 'stateClear',
    body: 'No rule fired and the customer is in good standing. The decision is still evidenced.',
    action: '→ PROCEED',
  },
  {
    state: 'FLAGGED',
    colorClass: 'stateFlagged',
    body: 'Worth a second look, not severe enough to stop. A case opens automatically for later review.',
    action: '→ PROCEED + CASE',
  },
  {
    state: 'HELD_FOR_REVIEW',
    colorClass: 'stateHeld',
    body: 'Stop before completion. The transaction is held while your compliance team investigates.',
    action: '→ HOLD_FOR_REVIEW',
  },
  {
    state: 'BLOCKED',
    colorClass: 'stateBlocked',
    body: 'Immediate decline — customer state, a hard threshold, or a screening hit.',
    action: '→ DECLINE_AND_REVERSE',
  },
]

const RESPONSE_ROWS = [
  { field: 'decision', desc: 'One of the four states.' },
  { field: 'requiredActions', desc: 'What your handler must do. Never ambiguous.' },
  { field: 'reasons', desc: 'Why the decision was reached, in stable machine-readable codes.' },
  { field: 'ruleIdsFired', desc: 'Which rules matched, at which configured version.' },
  { field: 'customerRiskState', desc: "The customer's authoritative state after this transaction." },
  { field: 'caseId', desc: 'Present when a case was opened automatically.' },
  { field: 'evidenceRef', desc: 'UUID pointer to the append-only record. Immutable once written.' },
  { field: 'timestamp', desc: 'Server-side creation time of the audit record, ISO 8601.' },
]

const OPERATIONAL_NOTES = [
  {
    title: 'Idempotent by design',
    body: 'A retried request returns the original decision and evidence ref — never a second record.',
  },
  {
    title: 'Sandbox first',
    body: 'Every state is reproducible with seeded customers before you go live.',
  },
  {
    title: 'Fails safe, loudly',
    body: "If a decision can't be recorded, it isn't returned. No unevidenced approvals.",
  },
  {
    title: 'Webhooks for state changes',
    body: 'State transitions and case dispositions pushed as they happen.',
  },
]

export default function DecisionApiPage() {
  return (
    <>
      {/* ── Hero (navy) ──────────────────────────────────────────────── */}
      <header className={styles.hero}>
        <div className={styles.heroWash} aria-hidden="true" />
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={`fg-container ${styles.heroInner}`}>
          <div>
            <div className={styles.breadcrumb}>
              <Link href="/products/transaction-monitoring" className={styles.breadcrumbLink}>
                Transaction Monitoring
              </Link>
              <span className={styles.breadcrumbSep}>/</span>
              <span className={styles.breadcrumbCurrent}>Compliance Decision API</span>
            </div>

            <h1 className={styles.h1}>One call. Four states. A record you can defend.</h1>

            <p className={styles.lede}>
              Call <span className={styles.inlineMono}>POST /v1/decide</span> before any debit or
              credit. The response tells your handler exactly what to do — and writes the
              evidence at the same instant.
            </p>

            <div className={styles.ctaRow}>
              <TrackedLink
                href={DEVELOPER_DOCS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.btnBone}
                event="API Documentation CTA Clicked"
                eventProps={{ location: 'decision-api-hero' }}
              >
                Read the API docs <span aria-hidden="true">↗</span>
              </TrackedLink>
              <Link href="/demo" className={styles.btnOutline}>
                Book a demo
              </Link>
            </div>

            <div className={styles.statsRow}>
              {HERO_STATS.map((s) => (
                <div key={s.label}>
                  <div className={`${styles.statFigure} fg-num`}>{s.figure}</div>
                  <div className={styles.statLabel}>{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <CodePanel />
          </div>
        </div>
      </header>

      {/* ── Four states → four handler paths ────────────────────────── */}
      <section className={styles.sectionPaper}>
        <div className="fg-container">
          <div className={styles.eyebrow}>Decision states</div>
          <h2 className={styles.h2}>Four states map cleanly to four handler paths</h2>
          <p className={styles.sectionLede}>
            We return the decision. Your handler executes it. Nothing is ambiguous.
          </p>

          <div className={styles.stateGrid}>
            {STATE_CARDS.map((c) => (
              <div key={c.state} className={`${styles.stateCard} ${styles[c.colorClass]}`}>
                <div className={styles.stateName}>{c.state}</div>
                <p className={styles.stateBody}>{c.body}</p>
                <div className={`${styles.stateAction} fg-num`}>{c.action}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Response anatomy ────────────────────────────────────────── */}
      <section className={styles.sectionBone}>
        <div className={`fg-container ${styles.twoCol}`}>
          <div>
            <div className={styles.eyebrow}>Response anatomy</div>
            <h2 className={styles.h2sm}>Every field exists to be defended later</h2>
            <p className={styles.claim}>
              A decision that can&rsquo;t be explained is not a control. Reasoning and rule
              versions are recorded at decision time, not reconstructed later.
            </p>
          </div>

          <div className={styles.anatomyTable} role="table">
            {RESPONSE_ROWS.map((row) => (
              <div key={row.field} className={styles.anatomyRow} role="row">
                <span className={`${styles.anatomyField} fg-num`} role="cell">{row.field}</span>
                <span className={styles.anatomyDesc} role="cell">{row.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Operational notes + closing CTA ─────────────────────────── */}
      <section className={styles.sectionPaper}>
        <div className="fg-container">
          <div className={styles.notesGrid}>
            {OPERATIONAL_NOTES.map((n) => (
              <div key={n.title} className={styles.noteCard}>
                <h3 className={styles.noteTitle}>{n.title}</h3>
                <p className={styles.noteBody}>{n.body}</p>
              </div>
            ))}
          </div>

          <div className={styles.ctaCard}>
            <div>
              <h2 className={styles.h2ctaCard}>Wire it into your handler in an afternoon</h2>
              <p className={styles.ctaCardLede}>
                Sandbox key, the four handler paths, and rules configured against your real
                transaction shapes.
              </p>
            </div>
            <div className={styles.ctaCardActions}>
              <Link href="/demo" className={styles.btnPrimaryLg}>
                Book a demo <span aria-hidden="true">→</span>
              </Link>
              <Link href="/products/transaction-monitoring" className={styles.btnSecondaryLg}>
                Transaction Monitoring
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
