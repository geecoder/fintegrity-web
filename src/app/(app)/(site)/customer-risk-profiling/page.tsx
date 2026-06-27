import type { Metadata } from 'next'
import Link from 'next/link'
import CTABand from '@/components/ui/CTABand'
import RevealInit from '@/components/RevealInit'
import BreadcrumbJsonLd from '@/components/json-ld/BreadcrumbJsonLd'
import RiskStateMachine from '@/components/diagrams/RiskStateMachine'

export const metadata: Metadata = {
  title: 'Customer Risk Profiling — One Authoritative Risk State',
  description:
    'Maintain one authoritative risk state per customer, updated in real time by screening, monitoring and KYC events — with every transition logged and evidenced.',
  alternates: { canonical: 'https://www.getfintegrity.com/customer-risk-profiling' },
  openGraph: {
    title: 'Dynamic Customer Risk Profiling with a single risk state — Fintegrity Technologies Limited',
    description: 'One risk state per customer, event-driven transitions, full audit trail.',
    url: 'https://www.getfintegrity.com/customer-risk-profiling',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
  },
}

// NEEDS COMPLIANCE REVIEW: confirm state names and transition triggers
// match the language counsel wants used externally before publication.
const RISK_STATES = [
  {
    badge: 'KYC_PENDING',
    badgeClass: 'state-badge-review',
    title: 'Onboarding started',
    desc: 'Verification has been initiated but is not yet complete. Transactions may be limited to a minimum tier until verification passes.',
  },
  {
    badge: 'KYC_OK',
    badgeClass: 'state-badge-active',
    title: 'Verified and in good standing',
    desc: 'The customer is fully verified. Transactions proceed through full rule evaluation with no additional restrictions from risk state.',
  },
  {
    badge: 'KYC_REFRESH_DUE',
    badgeClass: 'state-badge-review',
    title: 'Verification due for refresh',
    desc: 'Verification has expired or reached its scheduled refresh date. Elevated monitoring applies until refresh completes.',
  },
  {
    badge: 'RISK_REVIEW_REQUIRED',
    badgeClass: 'state-badge-review',
    title: 'Flagged for compliance review',
    desc: 'Triggered by a screening hit, monitoring alert, or manual escalation. A case is open; an analyst is investigating.',
  },
  {
    badge: 'RESTRICTED',
    badgeClass: 'state-badge-blocked',
    title: 'Limited access pending resolution',
    desc: 'High-risk case outcome. Access is restricted while the investigation or remediation is in progress.',
  },
  {
    badge: 'BLOCKED',
    badgeClass: 'state-badge-blocked',
    title: 'Barred from transacting',
    desc: 'All transactions return BLOCKED before any rules run. No amount or type of transaction can proceed while this state is active.',
  },
]

const TRANSITION_TRIGGERS = [
  { from: 'KYC_PENDING', to: 'KYC_OK', trigger: 'Verification completed and passed' },
  { from: 'KYC_OK', to: 'KYC_REFRESH_DUE', trigger: 'KYC verification period expires' },
  { from: 'KYC_OK', to: 'RISK_REVIEW_REQUIRED', trigger: 'Screening hit or monitoring alert fires' },
  { from: 'RISK_REVIEW_REQUIRED', to: 'KYC_OK', trigger: 'Case outcome: cleared — no adverse finding' },
  { from: 'RISK_REVIEW_REQUIRED', to: 'RESTRICTED', trigger: 'Case outcome: adverse finding requiring restriction' },
  { from: 'RESTRICTED', to: 'BLOCKED', trigger: 'Unresolved escalation or subsequent adverse finding' },
  {
    from: 'Manual override',
    to: 'RESTRICTED / BLOCKED',
    trigger: 'Requires: reason + approver identity + supporting evidence. No silent state changes.',
    manual: true,
  },
]

export default function CustomerRiskProfilingPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Customer Risk Profiling', href: '/customer-risk-profiling' }]} />
      <RevealInit />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="page-hero">
        <div className="wrap">
          <div className="page-hero-inner">
            <span className="sec-eyebrow">Product</span>
            <h1>Customer Risk Profiling</h1>
            <p className="page-hero-lead">
              One authoritative risk state per customer, updated in real time. Every transition
              is triggered by an event, approved by someone accountable, and written to an
              immutable trail.
            </p>
            <div className="page-hero-cta">
              <Link href="/book-a-demo" className="btn btn-primary">
                Request a demo →
              </Link>
              <a
                href="https://docs.getfintegrity.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-ghost"
              >
                API docs
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── The problem ──────────────────────────────────── */}
      <section className="prod-section prod-section-soft">
        <div className="wrap">
          <div className="reveal">
            <span className="sec-eyebrow">The problem</span>
            <h2 className="sec-title">Risk signals scattered across systems produce contradictions</h2>
            <p className="sec-intro">
              Risk signals are scattered: a screening hit lives in one system, a monitoring
              alert in another, KYC status in a third. Without a single authoritative state,
              two parts of the same fintech can hold contradictory views of the same customer —
              and no one can reconstruct why a customer was treated the way they were.
            </p>
          </div>
          <div className="two-col-feature reveal" style={{ marginTop: '40px' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', marginBottom: '14px' }}>Without a unified risk state</h3>
              <ul className="feature-list">
                {[
                  'Screening result sits in the vendor dashboard, not connected to payment decisions',
                  'Monitoring alert raises a flag, but the payment handler doesn\'t know',
                  'KYC tier stored in onboarding system, not enforced at transaction time',
                  'Two engineers query different systems and get different risk answers for the same customer',
                  'Evidence reconstruction takes days when a regulator asks why a transaction processed',
                ].map((item) => (
                  <li className="feature-item" key={item}>
                    <span className="feature-check" style={{ background: 'var(--block-bg)', color: 'var(--block)' }}>✗</span>
                    <div className="feature-item-text"><p>{item}</p></div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', marginBottom: '14px' }}>With Fintegrity&apos;s unified risk state</h3>
              <ul className="feature-list">
                {[
                  'One state per customer — read by the Decision API before every transaction',
                  'Screening hits, monitoring alerts and KYC events all converge into the same state machine',
                  'Every state transition recorded with its trigger, approver (where required) and evidence',
                  'Any query returns the same answer — the authoritative current state',
                  'Full history of how a customer\'s risk evolved reconstructable on demand',
                ].map((item) => (
                  <li className="feature-item" key={item}>
                    <span className="feature-check">✓</span>
                    <div className="feature-item-text"><p>{item}</p></div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── State machine ─────────────────────────────────── */}
      <section className="prod-section">
        <div className="wrap">
          <div className="reveal">
            <span className="sec-eyebrow">The risk state machine</span>
            <h2 className="sec-title">Six states. Event-driven transitions. Every move evidenced.</h2>
            <p className="sec-intro">
              {/* NEEDS COMPLIANCE REVIEW: confirm state names and transition triggers match the language counsel wants used externally */}
              Fintegrity maintains a single risk state per customer, driven by a compliance
              state machine. The state moves only through defined, event-driven transitions —
              and each transition records what triggered it, who approved it (where approval
              is required), and what evidence was used.
            </p>
          </div>

          {/* State machine diagram */}
          <div className="reveal">
            <RiskStateMachine />
          </div>
        </div>
      </section>

      {/* ── Six states in detail ─────────────────────────── */}
      <section className="prod-section prod-section-soft">
        <div className="wrap">
          <div className="reveal">
            <span className="sec-eyebrow">States in detail</span>
            <h2 className="sec-title">What each state means for a transaction</h2>
            <p className="sec-intro">
              The risk state is read by the Decision API before every transaction. It is not
              a report you look at after the fact — it is enforced at the moment of every call.
            </p>
          </div>
          <div className="state-grid reveal" style={{ marginTop: '32px' }}>
            {RISK_STATES.map((s) => (
              <div className="state-item" key={s.badge}>
                <span className={`state-badge ${s.badgeClass}`}>{s.badge}</span>
                <div className="state-item-text">
                  <h4>{s.title}</h4>
                  <p>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Transition audit ─────────────────────────────── */}
      <section className="prod-section prod-section-dark">
        <div className="wrap">
          <div className="reveal" style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
            <span className="sec-eyebrow">Transition audit</span>
            <h2 className="sec-title">Every state change is an evidence event</h2>
            <p className="sec-intro" style={{ margin: '16px auto 0', maxWidth: '54ch' }}>
              A manual override requires a reason, the approver&apos;s identity, and supporting
              evidence — no silent state changes. Automatic transitions (from screening hits or
              monitoring alerts) record the triggering event directly in the transition record.
              The result is a full chronological history of a customer&apos;s risk lifecycle,
              reconstructable on demand.
            </p>
          </div>
          <div className="cap-grid" style={{ marginTop: '48px' }}>
            {[
              {
                tag: 'Trigger',
                title: 'What caused the change',
                body: 'Every transition records the triggering event — a screening match, a monitoring alert, a case outcome, KYC expiry, or a manual action.',
              },
              {
                tag: 'Approval',
                title: 'Who authorised it',
                body: 'State changes that require manual action are attributed to a named analyst. Automated transitions are attributed to the system event that triggered them.',
              },
              {
                tag: 'Evidence',
                title: 'What supported the decision',
                body: 'Supporting evidence — case reference, screening result, rule that fired — is linked to each transition and retained in the immutable audit ledger.',
              },
            ].map((card) => (
              <div className="cap-card reveal" key={card.tag} style={{ background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.12)', color: '#fff' }}>
                <div className="cap-card-tag" style={{ color: 'var(--cyan)' }}>{card.tag}</div>
                <h3 style={{ color: '#fff' }}>{card.title}</h3>
                <p style={{ color: 'rgba(255,255,255,.7)' }}>{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Why single state matters ─────────────────────── */}
      <section className="prod-section">
        <div className="wrap">
          <div className="two-col-feature">
            <div className="reveal">
              <span className="sec-eyebrow">Enforcement in the decision layer</span>
              <h2 className="sec-title">The profile is enforced, not just recorded</h2>
              <p style={{ color: 'var(--slate)', lineHeight: 1.7, fontSize: '1rem', marginTop: '16px', maxWidth: '50ch' }}>
                Because the risk state is read by the Decision API before money moves, the
                profile isn&apos;t a report you look at after the fact — it&apos;s enforced at
                the moment of every transaction.
              </p>
              <p style={{ color: 'var(--slate)', lineHeight: 1.7, fontSize: '1rem', marginTop: '14px', maxWidth: '50ch' }}>
                A BLOCKED customer gets a hard stop before any rules run. It doesn&apos;t matter
                what device they use, what channel they try, or how small the transaction amount
                is — the state check happens first, and it&apos;s deterministic.
              </p>
              <p style={{ color: 'var(--slate)', lineHeight: 1.7, fontSize: '1rem', marginTop: '14px', maxWidth: '50ch' }}>
                And because every transition is evidenced, the full history of how a
                customer&apos;s risk evolved is reconstructable on demand — for regulators,
                auditors, or your own compliance team.
              </p>
            </div>
            <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                {
                  href: '/compliance-decisioning-api',
                  label: 'Compliance Decision API',
                  desc: 'The risk state is the first check in every decision call. BLOCKED customers get a hard stop before any rule evaluation runs.',
                },
                {
                  href: '/transaction-monitoring',
                  label: 'Transaction Monitoring',
                  desc: 'Monitoring alerts are one of the event triggers that can transition a customer\'s risk state — connecting detection to enforcement automatically.',
                },
                {
                  href: '/case-management',
                  label: 'Case Management',
                  desc: 'Case outcomes (cleared or adverse) are the mechanism by which a RISK_REVIEW_REQUIRED state resolves — back to KYC_OK or forward to RESTRICTED.',
                },
              ].map((link) => (
                <Link key={link.href} href={link.href} className="cap-card" style={{ textDecoration: 'none', display: 'block' }}>
                  <div style={{ fontFamily: 'var(--font-sora)', fontWeight: 700, marginBottom: '6px' }}>{link.label} →</div>
                  <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.55 }}>{link.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABand
        headline="See how Fintegrity evaluates transactions in real time"
        body="We'll walk through the risk state machine live — from a screening hit triggering a state change, to a case outcome resolving it, to the evidence trail that makes every decision defensible."
        primaryLabel="Request a demo →"
        primaryHref="/book-a-demo"
        secondaryLabel="Read the API docs"
        secondaryHref="https://docs.getfintegrity.com"
      />
    </>
  )
}
