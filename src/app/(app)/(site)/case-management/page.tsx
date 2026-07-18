import type { Metadata } from 'next'
import Link from 'next/link'
import CTABand from '@/components/ui/CTABand'
import RevealInit from '@/components/RevealInit'
import BreadcrumbJsonLd from '@/components/json-ld/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'AML Case Management',
  description:
    'Every Fintegrity alert opens a structured case — with evidence pre-assembled, investigation workflow ready, and an immutable audit trail. Built for compliance teams that need to demonstrate every decision to a regulator.',
  alternates: { canonical: 'https://www.getfintegrity.com/case-management' },
  openGraph: {
    title: 'AML Case Management — Fintegrity Technologies Limited',
    description: 'Investigation-grade case management for fintech compliance teams. Evidence assembled automatically. Immutable audit trail.',
    url: 'https://www.getfintegrity.com/case-management',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
  },
}

const LIFECYCLE = [
  { num: '01', label: 'Alert fires', desc: 'Transaction monitoring detects a pattern or threshold breach and generates a structured alert.' },
  { num: '02', label: 'Case auto-created', desc: 'A case opens automatically with the triggering transaction, customer profile, and risk state already attached.' },
  { num: '03', label: 'Analyst assigned', desc: 'Rule-based routing assigns the case to the right analyst based on type, risk level, or team workload.' },
  { num: '04', label: 'Investigation', desc: 'Analyst reviews transaction history, customer profile, screening results, and adds timestamped notes.' },
  { num: '05', label: 'Disposition', desc: 'Clear, escalate to SAR, freeze account, or close — with required reasoning documented for every outcome.' },
  { num: '06', label: 'Archive', desc: 'The complete case — every action, every note, every decision — is retained in the immutable evidence store.' },
]

export default function CaseManagementPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Case Management', href: '/case-management' }]} />
      <RevealInit />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="page-hero">
        <div className="wrap">
          <div className="page-hero-inner">
            <span className="sec-eyebrow">Case Management</span>
            <h1>Every compliance alert becomes a structured, auditable case</h1>
            <p className="page-hero-lead">
              When Fintegrity flags a transaction, it doesn&apos;t send an alert and leave the
              rest to your team. It opens a complete case — evidence already assembled, customer
              history already attached, investigation workflow ready to go. No manual ticket
              raising. No evidence gathering. Just investigation.
            </p>
            <div className="page-hero-cta">
              <Link href="/book-a-demo" className="btn btn-primary">
                See a live case →
              </Link>
              <Link href="/transaction-monitoring" className="btn btn-ghost">
                See what creates cases
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── The problem ──────────────────────────────────── */}
      <section className="prod-section prod-section-soft">
        <div className="wrap">
          <div className="two-col-feature">
            <div className="reveal">
              <span className="sec-eyebrow">The compliance operations problem</span>
              <h2 className="sec-title">Spreadsheets and email chains are not case management</h2>
              <p style={{ color: 'var(--slate)', lineHeight: 1.72, fontSize: '1rem', marginTop: '16px', marginBottom: '24px', maxWidth: '52ch' }}>
                Most Nigerian fintech compliance teams manage AML investigations the same way:
                alerts in a spreadsheet, evidence in email threads, decisions in a shared drive.
                When a regulator asks for proof that a transaction was properly reviewed, the
                response is a reconstructed narrative. That&apos;s not evidence. That&apos;s a story.
              </p>
              <p style={{ color: 'var(--slate)', lineHeight: 1.72, fontSize: '1rem', maxWidth: '52ch' }}>
                Fintegrity replaces that with a purpose-built investigation workflow where every
                action is timestamped, attributed, and immutable from the moment the alert fires.
              </p>
            </div>
            <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { icon: '✗', title: 'Without Fintegrity', items: ['Alert received via email or Slack', 'Analyst manually gathers transaction data', 'Investigation notes in a shared spreadsheet', 'Decision communicated verbally or via email', 'Evidence reconstructed on demand — if at all'] },
                { icon: '✓', title: 'With Fintegrity', items: ['Case opens automatically with evidence assembled', 'Full transaction context and customer history in the case', 'Timestamped investigation notes in the case record', 'Disposition logged with reasoning, not just outcome', 'Complete evidence pack generated on demand, any time'] },
              ].map((col) => (
                <div key={col.title} style={{ background: '#fff', border: '1px solid var(--line)', borderRadius: 'var(--r)', padding: '22px' }}>
                  <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, fontSize: '0.88rem', marginBottom: '14px', color: col.icon === '✓' ? 'var(--allow)' : 'var(--block)' }}>
                    {col.icon} {col.title}
                  </div>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {col.items.map((item) => (
                      <li key={item} style={{ fontSize: '0.88rem', color: 'var(--slate)', lineHeight: 1.55 }}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Case lifecycle ───────────────────────────────── */}
      <section className="prod-section">
        <div className="wrap">
          <div className="reveal">
            <span className="sec-eyebrow">Case lifecycle</span>
            <h2 className="sec-title">From alert to archive — every step documented</h2>
            <p className="sec-intro">
              A Fintegrity case follows a structured lifecycle. Nothing is skipped, nothing is
              optional. Every step is timestamped and attributed to a named analyst.
            </p>
          </div>
          <div className="process-steps">
            {LIFECYCLE.map((step) => (
              <div className="process-step reveal" key={step.num}>
                <div className="process-step-left">
                  <div className="process-step-num">{step.num}</div>
                  <div className="process-step-line" />
                </div>
                <div className="process-step-body">
                  <h3>{step.label}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What's in a case ─────────────────────────────── */}
      <section className="prod-section prod-section-soft">
        <div className="wrap">
          <div className="reveal">
            <span className="sec-eyebrow">Case content</span>
            <h2 className="sec-title">Everything a proper investigation needs — pre-assembled</h2>
          </div>
          <div className="two-col-feature" style={{ marginTop: '40px' }}>
            <div className="reveal">
              <h3 style={{ fontSize: '1.1rem', marginBottom: '14px' }}>Evidence assembled automatically</h3>
              <ul className="feature-list">
                {[
                  ['Triggering transaction', 'Full context — amount, counterparties, channel, timestamp, rail — exactly as it was when the alert fired.'],
                  ['Customer risk profile', 'Risk state, KYC tier, and account standing at the exact moment of the alert. Frozen, not updated retrospectively.'],
                  ['Transaction history', 'Rolling view of the customer\'s recent transaction pattern, with the flagged activity highlighted in context.'],
                  ['Previous case history', 'All prior cases for this customer, with their dispositions, visible in one place.'],
                  ['Screening hit details', 'If screening is configured, results from your sanctions/PEP provider are attached automatically.'],
                ].map(([title, body]) => (
                  <li className="feature-item" key={title}>
                    <span className="feature-check">✓</span>
                    <div className="feature-item-text"><h4>{title}</h4><p>{body}</p></div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal">
              <h3 style={{ fontSize: '1.1rem', marginBottom: '14px' }}>Investigation tools for your team</h3>
              <ul className="feature-list">
                {[
                  ['Timeline view', 'Chronological view of all events in the case — transactions, state changes, analyst actions — in a single timeline.'],
                  ['Timestamped notes', 'Analyst notes are attributed to a named team member and cannot be edited after submission.'],
                  ['Structured disposition', 'Every case closure requires a disposition type and documented reasoning — not just a click.'],
                  ['SAR documentation support', 'Case evidence structured to support SAR filing documentation if the case escalates.'],
                  ['Evidence pack export', 'Generate a complete, structured evidence pack for any case on demand — for regulator review or internal audit.'],
                ].map(([title, body]) => (
                  <li className="feature-item" key={title}>
                    <span className="feature-check">✓</span>
                    <div className="feature-item-text"><h4>{title}</h4><p>{body}</p></div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── Audit trail ──────────────────────────────────── */}
      <section className="prod-section prod-section-dark">
        <div className="wrap">
          <div className="reveal" style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
            <span className="sec-eyebrow">Immutability</span>
            <h2 className="sec-title">The audit trail is not a log. It&apos;s a legal record.</h2>
            <p className="sec-intro" style={{ margin: '16px auto 0', maxWidth: '54ch' }}>
              Every action in Fintegrity&apos;s case management is append-only. No edits. No
              deletions. Each entry is timestamped server-side and attributed to a named user.
              When a regulator requests evidence of how a transaction was reviewed and decided,
              you generate a pack — not a reconstruction.
            </p>
          </div>
          <div className="cap-grid" style={{ marginTop: '48px' }}>
            {[
              { tag: 'Append-only', title: 'No edit, no delete', body: 'Notes, state changes, and decisions are written once. The record of what happened cannot be altered after the fact.' },
              { tag: 'Attribution', title: 'Every action has an owner', body: 'Every case action — opening, note, disposition — is attributed to a named analyst and their role at the time.' },
              { tag: 'Timestamp', title: 'Server-side timestamps', body: 'Timestamps are set by Fintegrity servers, not client clocks. The sequence of events is authoritative.' },
              { tag: 'On demand', title: 'Evidence packs generated instantly', body: 'Any case can produce a structured evidence pack at any time — formatted for regulator review or SAR documentation.' },
              { tag: 'Retention', title: 'Configurable retention periods', body: 'Cases and their evidence are retained in line with AML/CFT recordkeeping requirements for your jurisdiction.' },
              { tag: 'Access control', title: 'Role-based access', body: 'Analysts, supervisors, and administrators have differentiated access. All access is logged.' },
            ].map((card) => (
              <div key={card.tag} className="cap-card reveal" style={{ background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.12)', color: '#fff' }}>
                <div className="cap-card-tag" style={{ color: 'var(--cyan)' }}>{card.tag}</div>
                <h3 style={{ color: '#fff' }}>{card.title}</h3>
                <p style={{ color: 'rgba(255,255,255,.7)' }}>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related ──────────────────────────────────────── */}
      <section className="prod-section">
        <div className="wrap">
          <div className="two-col-feature">
            <div className="reveal">
              <span className="sec-eyebrow">Connected capabilities</span>
              <h2 className="sec-title">Case Management is part of an integrated compliance layer</h2>
              <p style={{ color: 'var(--slate)', lineHeight: 1.7, fontSize: '1rem', marginTop: '16px', maxWidth: '50ch' }}>
                Cases don&apos;t exist in isolation. They flow from monitoring alerts and are
                resolved using decisions from the Decision API — all within a single, integrated
                compliance platform.
              </p>
            </div>
            <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <Link href="/transaction-monitoring" className="cap-card" style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '6px' }}>Transaction Monitoring →</div>
                <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.55 }}>Cases start here. Monitoring detects patterns and generates the structured alerts that become cases automatically.</p>
              </Link>
              <Link href="/compliance-decisioning-api" className="cap-card" style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '6px' }}>Compliance Decision API →</div>
                <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.55 }}>Case outcomes update the customer&apos;s risk state in the decision engine. Blocking a customer through a case blocks them in real-time transactions.</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <CTABand
        headline="See what a Fintegrity case actually looks like"
        body="We'll walk you through a live case — from the monitoring alert that created it to the evidence pack your compliance team would present to a regulator."
        primaryLabel="Book a demo →"
        primaryHref="/book-a-demo"
        secondaryLabel="See transaction monitoring"
        secondaryHref="/transaction-monitoring"
      />
    </>
  )
}
