import type { Metadata } from 'next'
import Link from 'next/link'
import PipelineInfographic from '@/components/product/PipelineInfographic'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Transaction monitoring — Fintegrity',
  description:
    'Real-time AML transaction monitoring for financial institutions. Every transaction is evaluated before money moves — with evidence assembled automatically.',
  alternates: { canonical: 'https://www.getfintegrity.com/products/transaction-monitoring' },
}

const STATS = [
  { figure: '<50 ms', label: 'P99 decision latency' },
  { figure: 'Pre-auth', label: 'Before money moves' },
  { figure: 'Real-time', label: 'Not batch, not T+1' },
]

const API_BULLETS = [
  {
    strong: 'Synchronous by design.',
    text: 'Under 50 ms P99, fast enough to sit inside the authorisation path rather than beside it.',
  },
  {
    strong: 'Four states, four handler paths.',
    text: 'CLEAR and FLAGGED proceed, HELD_FOR_REVIEW holds, BLOCKED declines and reverses. Never ambiguous.',
  },
  {
    strong: 'Reasons, not scores.',
    text: 'Every response names the rules that fired, their configured version, and the customer risk state after this transaction.',
  },
  {
    strong: 'Idempotent and fail-safe.',
    text: 'A retry returns the original decision and evidence ref. If a decision cannot be recorded, it is not returned.',
  },
]

const RULE_CARDS = [
  {
    kicker: 'Velocity',
    title: 'Rolling-window velocity rules',
    body: 'Counts and amounts across 5-minute, 1-hour, 24-hour and 7-day windows.',
  },
  {
    kicker: 'Thresholds',
    title: 'Amount and KYC tier enforcement',
    body: "Hard-block anything above a customer's verified tier limit.",
  },
  {
    kicker: 'Patterns',
    title: 'Structuring detection',
    body: 'Sequences of just-below-threshold transfers to the same counterparty.',
  },
  {
    kicker: 'New accounts',
    title: 'New-account risk window',
    body: 'Elevated monitoring on fresh accounts — the mule onboarding signature.',
  },
  {
    kicker: 'Timing',
    title: 'Rapid in-out detection',
    body: 'Funds received and swept out within minutes, across multiple hops.',
  },
  {
    kicker: 'Counterparty',
    title: 'Counterparty concentration',
    body: 'Unusual concentration toward one counterparty, relative to the profile.',
  },
  {
    kicker: 'Behaviour',
    title: 'Profile-relative anomaly',
    body: "Measured against the customer's own 90-day baseline.",
  },
  {
    kicker: 'Corridors',
    title: 'Corridor and channel risk',
    body: 'Elevated scrutiny per corridor, channel and transaction type.',
  },
]

const RULES_ENGINE_BULLETS = [
  {
    strong: 'Tuned per segment.',
    text: 'Thresholds and windows differ by customer segment, channel and product — not one global number.',
  },
  {
    strong: 'Tested before it ships.',
    text: "Replay a changed rule against last month's traffic to see what it would have caught before it goes live.",
  },
  {
    strong: 'Versioned by default.',
    text: 'Every decision records the exact rule version that produced it, so a tuning change never rewrites history.',
  },
  {
    strong: 'Configuration audit trail.',
    text: 'Who changed what, when, and what it replaced — available to your reviewers and your regulator.',
  },
]

const CASE_COLUMNS = [
  {
    title: 'Pre-assembled evidence',
    body: 'Transaction, profile, risk state and triggering rule, all present at open.',
  },
  {
    title: 'Automatic case creation',
    body: 'Alerts create structured cases. No manual ticket raising.',
  },
  {
    title: 'Alert context preserved',
    body: 'The exact state at alert time is frozen in the evidence pack.',
  },
  {
    title: 'Analyst-ready from day one',
    body: 'A structured investigation workflow, not a raw data dump.',
  },
]

const CASE_STAGES = [
  {
    index: '01',
    chip: 'ALERT',
    chipClass: 'chipAlert',
    title: 'Pattern fires',
    body: 'Velocity threshold exceeded in 24h window.',
  },
  {
    index: '02',
    chip: 'CASE',
    chipClass: 'chipCase',
    title: 'Case auto-created',
    body: 'Evidence assembled, analyst assigned.',
  },
  {
    index: '03',
    chip: 'REVIEW',
    chipClass: 'chipReview',
    title: 'Investigation',
    body: 'Analyst reviews timeline and profile.',
  },
  {
    index: '04',
    chip: 'CLOSED',
    chipClass: 'chipClosed',
    title: 'Disposition',
    body: 'Cleared, escalated, or SAR filed.',
  },
]

const EVIDENCE_BULLETS = [
  {
    strong: 'Recorded before the answer returns.',
    text: 'The decision is evidenced first. No unevidenced approvals, ever.',
  },
  {
    strong: 'Append-only, never edited.',
    text: 'A record that can be altered is a document, not evidence. Ours cannot be altered.',
  },
  {
    strong: 'Complete on its own.',
    text: 'Transaction, customer state, rules and versions, analyst actions and timestamps in WAT — one artefact, no cross-referencing.',
  },
  {
    strong: 'A query, not a project.',
    text: 'Pull the full pack for any customer or transaction on demand, in the format your MLRO hands over.',
  },
]

const EVIDENCE_ROWS = [
  { label: 'Decision and required action', value: 'FLAGGED' },
  { label: 'Rules fired, with version', value: 'velocity@v4' },
  { label: 'Customer risk state at decision', value: 'ACTIVE · T2' },
  { label: 'Case actions and analyst notes', value: '3 entries' },
  { label: 'Server-side timestamps', value: '14:37 WAT' },
]

const HASH_CHAIN = ['…a72c', '…c9a2', '…81ff']

const INTEGRATION_BLOCKS = [
  {
    title: 'One API call',
    body: (
      <>
        <span className={styles.inlineMono}>POST /v1/decide</span> before any debit or credit
        executes. Synchronous response in under 50 ms P99.
      </>
    ),
  },
  {
    title: 'Works with any rails',
    body: 'Mono, Flutterwave, Paystack, NIBSS, in-house ledgers — Fintegrity sits above the rails, not inside them.',
  },
  {
    title: 'No changes to your UX',
    body: 'The monitoring logic is invisible to your customers. Decisions happen at the infrastructure layer.',
  },
  {
    title: 'Connects to Case Management',
    body: 'Alerts automatically create cases. Your compliance team works in Fintegrity’s investigation interface.',
  },
]

const RELATED_LINKS = [
  { href: '/products/payment-screening', label: 'Payment Screening' },
  { href: '/products/transaction-monitoring/decision-api', label: 'Compliance Decision API' },
  { href: '/products/customer-lifecycle', label: 'Customer Lifecycle Management', soon: true },
]

function BulletList({ items }: { items: { strong: string; text: string }[] }) {
  return (
    <div className={styles.bulletList}>
      {items.map((b) => (
        <div key={b.strong} className={styles.bulletRow}>
          <svg
            viewBox="0 0 24 24"
            width="17"
            height="17"
            fill="none"
            stroke="var(--fg-green-700)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={styles.bulletIcon}
            aria-hidden="true"
          >
            <path d="M6 12.5l4 4 8-9" />
          </svg>
          <p className={styles.bulletText}>
            <strong className={styles.bulletStrong}>{b.strong}</strong> {b.text}
          </p>
        </div>
      ))}
    </div>
  )
}

export default function TransactionMonitoringPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <header className={styles.hero}>
        <div className={styles.heroWash} aria-hidden="true" />
        <div className={styles.heroGrid} aria-hidden="true" />
        <div className={`fg-container ${styles.heroInner}`}>
          <div className={styles.heroEyebrow}>Transaction Monitoring</div>
          <div className={styles.heroTop}>
            <h1 className={styles.h1}>
              Real-time AML transaction monitoring for financial institutions
            </h1>
            <div className={styles.heroSide}>
              <p className={styles.lede}>
                Every transaction is evaluated before money moves. When something warrants
                attention, a case opens automatically — evidence already assembled.
              </p>
              <div className={styles.ctaRow}>
                <Link href="/demo" className={styles.btnPrimary}>
                  Book a demo <span aria-hidden="true">→</span>
                </Link>
                <a href="#pipeline" className={styles.btnSecondary}>
                  How decisions work
                </a>
              </div>
            </div>
          </div>

          <div className={styles.statStrip}>
            {STATS.map((s) => (
              <div key={s.label} className={styles.statCell}>
                <div className={`${styles.statFigure} fg-num`}>{s.figure}</div>
                <div className={styles.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* ── #api — Compliance Decision API ──────────────────────────── */}
      <section id="api" className={styles.sectionBone}>
        <div className={`fg-container ${styles.twoCol}`}>
          <div>
            <div className={styles.eyebrow}>Compliance Decision API</div>
            <h2 className={styles.h2sm}>One call in your payment handler. Four possible answers.</h2>
            <p className={styles.claim}>
              The decision arrives before money moves — with the reasoning already attached.
            </p>

            <BulletList items={API_BULLETS} />

            <Link href="/products/transaction-monitoring/decision-api" className={styles.textLink}>
              Full API reference <span aria-hidden="true">→</span>
            </Link>
          </div>

          {/*
            Reconciled against the real /v1/decide OpenAPI spec (fetched from
            api.dev.getfintegrity.com/docs/openapi.json). Field names, minor-
            unit amounts, and evidenceRef's UUID format are the live shape;
            the decision value ("FLAGGED") and caseId are the approved
            four-state roadmap, not what the API returns today (it currently
            ships ALLOW/REVIEW/BLOCK with no case linkage).
          */}
          <div className={styles.codePanel}>
            <div className={styles.codePanelHeader}>
              <span className={styles.codePanelHeaderLabel}>POST /v1/decide</span>
              <span className={styles.codePanelHeaderMeta}>in your handler</span>
            </div>
            <pre className={styles.codeBlock}>
{'{'}{'\n'}
{'  '}<span className={styles.codeKey}>&quot;customerId&quot;</span>: <span className={styles.codeString}>&quot;cus_8f21a&quot;</span>,{'\n'}
{'  '}<span className={styles.codeKey}>&quot;amount&quot;</span>: <span className={styles.codeString}>45000000</span>,{'\n'}
{'  '}<span className={styles.codeKey}>&quot;currency&quot;</span>: <span className={styles.codeString}>&quot;NGN&quot;</span>,{'\n'}
{'  '}<span className={styles.codeKey}>&quot;kycTier&quot;</span>: <span className={styles.codeString}>&quot;T2&quot;</span>,{'\n'}
{'  '}<span className={styles.codeKey}>&quot;direction&quot;</span>: <span className={styles.codeString}>&quot;OUTBOUND&quot;</span>,{'\n'}
{'  '}<span className={styles.codeKey}>&quot;eventType&quot;</span>: <span className={styles.codeString}>&quot;transfer&quot;</span>{'\n'}
{'}'}
            </pre>
            <div className={styles.statusBar}>
              <span className={styles.statusDot} aria-hidden="true" />
              <span className={styles.statusText}>200 OK</span>
              <span className={styles.statusSep}>&middot;</span>
              <span className={`${styles.statusLatency} fg-num`}>31 ms</span>
            </div>
            <pre className={styles.codeBlock}>
{'{'}{'\n'}
{'  '}<span className={styles.codeKey}>&quot;decision&quot;</span>: <span className={styles.stateFlagged}>&quot;FLAGGED&quot;</span>,{'\n'}
{'  '}<span className={styles.codeKey}>&quot;reasons&quot;</span>: [<span className={styles.codeString}>&quot;VELOCITY_24H_EXCEEDED&quot;</span>],{'\n'}
{'  '}<span className={styles.codeKey}>&quot;ruleIdsFired&quot;</span>: [<span className={styles.codeString}>&quot;velocity.rolling_24h@v4&quot;</span>],{'\n'}
{'  '}<span className={styles.codeKey}>&quot;requiredActions&quot;</span>: [<span className={styles.stateFlagged}>&quot;PROCEED&quot;</span>],{'\n'}
{'  '}<span className={styles.codeKey}>&quot;customerRiskState&quot;</span>: <span className={styles.codeString}>&quot;ACTIVE&quot;</span>,{'\n'}
{'  '}<span className={styles.codeKey}>&quot;caseId&quot;</span>: <span className={styles.codeString}>&quot;case_77e10&quot;</span>,{'\n'}
{'  '}<span className={styles.codeKey}>&quot;evidenceRef&quot;</span>: <span className={styles.codeString}>&quot;b91f4a72-5c1e-4d3a-9f2b-6e0a2c9a5f31&quot;</span>,{'\n'}
{'  '}<span className={styles.codeKey}>&quot;timestamp&quot;</span>: <span className={styles.codeString}>&quot;2026-04-02T14:37:11.000Z&quot;</span>{'\n'}
{'}'}
            </pre>
          </div>
        </div>
      </section>

      {/* ── #pipeline — live infographic ────────────────────────────── */}
      <section id="pipeline" className={styles.sectionBone}>
        <div className="fg-container">
          <PipelineInfographic />
        </div>
      </section>

      {/* ── #rules — rule library + tuning ──────────────────────────── */}
      <section id="rules" className={styles.sectionPaper}>
        <div className="fg-container">
          <div className={styles.eyebrow}>Rule library</div>
          <h2 className={styles.h2}>Eight monitoring capabilities, configurable to your model</h2>
          <p className={styles.sectionLede}>
            Every rule is configurable to your transaction volumes, customer segments, and
            regulatory exposure. Out of the box, Fintegrity ships with CBN and NFIU-aligned
            default thresholds that you tune rather than build from scratch.
          </p>

          <div className={styles.ruleGrid}>
            {RULE_CARDS.map((r) => (
              <div key={r.kicker} className={styles.ruleCard}>
                <div className={styles.ruleKicker}>{r.kicker}</div>
                <h3 className={styles.ruleTitle}>{r.title}</h3>
                <p className={styles.ruleBody}>{r.body}</p>
              </div>
            ))}
          </div>

          <div className={styles.enginePanel}>
            <div>
              <h3 className={styles.h3}>Your rules, your thresholds</h3>
              <p className={styles.claim}>
                Change a threshold as fast as the risk changes — without an engineering release.
              </p>
            </div>
            <BulletList items={RULES_ENGINE_BULLETS} />
          </div>
        </div>
      </section>

      {/* ── #cases — Case Management (navy) ─────────────────────────── */}
      <section id="cases" className={styles.sectionNavy}>
        <div className="fg-container">
          <div className={styles.eyebrowNavy}>Case management</div>
          <h2 className={styles.h2navy}>Case management built for the analyst&rsquo;s screen</h2>
          <p className={styles.sectionLedeNavy}>
            Most tools dump alerts in a queue and leave the analyst to gather the evidence. We
            assemble it first, then open the case.
          </p>

          <div className={styles.caseColumns}>
            {CASE_COLUMNS.map((c) => (
              <div key={c.title} className={styles.caseColumn}>
                <h3 className={styles.caseColumnTitle}>{c.title}</h3>
                <p className={styles.caseColumnBody}>{c.body}</p>
              </div>
            ))}
          </div>

          <div className={styles.caseGrid}>
            {CASE_STAGES.map((c) => (
              <div key={c.index} className={styles.caseCard}>
                <div className={styles.caseCardHead}>
                  <span className={`${styles.caseIndex} fg-num`}>{c.index}</span>
                  <span className={`${styles.caseChip} ${styles[c.chipClass]}`}>{c.chip}</span>
                </div>
                <div className={styles.caseCardTitle}>{c.title}</div>
                <p className={styles.caseCardBody}>{c.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── #evidence — Audit trail & evidence ──────────────────────── */}
      <section id="evidence" className={styles.sectionBone}>
        <div className={`fg-container ${styles.twoCol}`}>
          <div>
            <div className={styles.eyebrow}>Audit trail &amp; evidence</div>
            <h2 className={styles.h2sm}>Evidence that answers the examiner</h2>
            <p className={styles.claim}>
              Written at decision time, not assembled when the enquiry arrives.
            </p>
            <BulletList items={EVIDENCE_BULLETS} />
          </div>

          <div className={styles.evidencePanel}>
            <div className={styles.evidenceHeader}>
              <span className={styles.evidenceHeaderTitle}>Evidence pack</span>
              <span className={`${styles.evidenceHeaderId} fg-num`}>evd_b91f4a72c</span>
            </div>
            <div>
              {EVIDENCE_ROWS.map((row) => (
                <div key={row.label} className={styles.evidenceRow}>
                  <span className={styles.evidenceLabel}>{row.label}</span>
                  <span className={`${styles.evidenceValue} fg-num`}>{row.value}</span>
                </div>
              ))}
            </div>
            <div className={styles.hashChain}>
              {HASH_CHAIN.map((h, idx) => (
                <span key={h} className={styles.hashChainRow}>
                  <span className={`${styles.hashChip} fg-num`}>{h}</span>
                  {idx < HASH_CHAIN.length - 1 && (
                    <span className={styles.hashArrow} aria-hidden="true">→</span>
                  )}
                </span>
              ))}
              <span className={styles.hashLabel}>append-only chain</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Integration ──────────────────────────────────────────────── */}
      <section className={styles.sectionBone}>
        <div className={`fg-container ${styles.twoCol}`}>
          <div>
            <div className={styles.eyebrow}>Integration</div>
            <h2 className={styles.h2sm}>Sits in-line with your existing payment rails</h2>
            <p className={styles.sectionLede}>
              Not a payment processor. The compliance layer between your product and your rails.
            </p>
            <div className={styles.integrationBlocks}>
              {INTEGRATION_BLOCKS.map((b) => (
                <div key={b.title}>
                  <div className={styles.integrationTitle}>{b.title}</div>
                  <p className={styles.integrationBody}>{b.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/*
            Reconciled against the real /v1/decide OpenAPI spec (fetched from
            api.dev.getfintegrity.com/docs/openapi.json): field names, the
            amount-in-minor-units convention, and evidenceRef's UUID format
            are the live API's actual shape. The decision value ("FLAGGED")
            and caseId are the approved four-state product roadmap — the
            live API ships a 3-state ALLOW/REVIEW/BLOCK model with no case
            linkage today. Reconcile again once the API ships the roadmap
            states.
          */}
          <div className={styles.scanPanel}>
            <div className={styles.scanSheen} aria-hidden="true" />
            <pre className={styles.scanCode}>
<span className={styles.codeKeyword}>POST</span> https://api.dev.getfintegrity.com/v1/decide{'\n'}
{'\n'}
{'{'}{'\n'}
{'  '}<span className={styles.codeKey}>&quot;customerId&quot;</span>: <span className={styles.codeString}>&quot;cus_8f21a&quot;</span>,{'\n'}
{'  '}<span className={styles.codeKey}>&quot;amount&quot;</span>: <span className={styles.codeString}>45000000</span>,{'\n'}
{'  '}<span className={styles.codeKey}>&quot;currency&quot;</span>: <span className={styles.codeString}>&quot;NGN&quot;</span>,{'\n'}
{'  '}<span className={styles.codeKey}>&quot;kycTier&quot;</span>: <span className={styles.codeString}>&quot;T2&quot;</span>,{'\n'}
{'  '}<span className={styles.codeKey}>&quot;direction&quot;</span>: <span className={styles.codeString}>&quot;OUTBOUND&quot;</span>,{'\n'}
{'  '}<span className={styles.codeKey}>&quot;eventType&quot;</span>: <span className={styles.codeString}>&quot;transfer&quot;</span>,{'\n'}
{'  '}<span className={styles.codeKey}>&quot;counterpartyId&quot;</span>: <span className={styles.codeString}>&quot;cpt_31b7c&quot;</span>,{'\n'}
{'  '}<span className={styles.codeKey}>&quot;metadata&quot;</span>: {'{ '}<span className={styles.codeKey}>&quot;channel&quot;</span>: <span className={styles.codeString}>&quot;mobile&quot;</span>{' }'}{'\n'}
{'}'}{'\n'}
            </pre>
            <div className={styles.scanStatusBar}>
              <span className={styles.statusDot} aria-hidden="true" />
              <span className={styles.statusText}>200 OK</span>
              <span className={styles.statusSep}>&middot;</span>
              <span className={`${styles.statusLatency} fg-num`}>31 ms</span>
            </div>
            <pre className={styles.scanCode}>
{'{'}{'\n'}
{'  '}<span className={styles.codeKey}>&quot;decision&quot;</span>: <span className={styles.stateFlagged}>&quot;FLAGGED&quot;</span>,{'\n'}
{'  '}<span className={styles.codeKey}>&quot;reasons&quot;</span>: [<span className={styles.codeString}>&quot;VELOCITY_24H_EXCEEDED&quot;</span>],{'\n'}
{'  '}<span className={styles.codeKey}>&quot;ruleIdsFired&quot;</span>: [<span className={styles.codeString}>&quot;velocity.rolling_24h@v4&quot;</span>],{'\n'}
{'  '}<span className={styles.codeKey}>&quot;requiredActions&quot;</span>: [<span className={styles.stateFlagged}>&quot;PROCEED&quot;</span>],{'\n'}
{'  '}<span className={styles.codeKey}>&quot;caseId&quot;</span>: <span className={styles.codeString}>&quot;case_77e10&quot;</span>,{'\n'}
{'  '}<span className={styles.codeKey}>&quot;evidenceRef&quot;</span>: <span className={styles.codeString}>&quot;b91f4a72-5c1e-4d3a-9f2b-6e0a2c9a5f31&quot;</span>{'\n'}
{'}'}
            </pre>
          </div>
        </div>

        <div className="fg-container">
          <div className={styles.relatedGrid}>
            {RELATED_LINKS.map((l) => (
              <Link key={l.href} href={l.href} className={styles.relatedCard}>
                <span className={styles.relatedLabel}>
                  {l.label}
                  {l.soon && <span className={styles.soonChip}>Soon</span>}
                </span>
                <span className={styles.relatedArrow} aria-hidden="true">→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Closing CTA ──────────────────────────────────────────────── */}
      <section className={styles.sectionPaper}>
        <div className={`fg-container ${styles.closingCta}`}>
          <h2 className={styles.h2center}>See Fintegrity monitor transactions in your business</h2>
          <p className={styles.closingLede}>
            We&rsquo;ll walk you through a live configuration tuned to your transaction volumes,
            customer segments, and regulatory exposure.
          </p>
          <div className={styles.closingCtaRow}>
            <Link href="/demo" className={styles.btnPrimaryLg}>
              Book a demo <span aria-hidden="true">→</span>
            </Link>
            <Link href="/pricing" className={styles.btnSecondaryLg}>
              See pricing
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
