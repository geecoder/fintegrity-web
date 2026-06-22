import type { Metadata } from 'next'
import Link from 'next/link'
import Breadcrumb from '@/components/ui/Breadcrumb'
import CTABand from '@/components/ui/CTABand'
import RevealInit from '@/components/RevealInit'
import BreadcrumbJsonLd from '@/components/json-ld/BreadcrumbJsonLd'
import ScreeningFlow from '@/components/diagrams/ScreeningFlow'

export const metadata: Metadata = {
  title: 'Transaction Screening API — Sanctions, PEP & Watchlist',
  description:
    'Screen every transaction against sanctions, PEP and adverse-media lists in real time, inside the compliance decision. Bring your own data provider — no lock-in.',
  alternates: { canonical: 'https://www.getfintegrity.com/transaction-screening' },
  openGraph: {
    title: 'Real-time Transaction Screening for African fintechs — Fintegrity Technologies Limited',
    description: 'Sanctions, PEP and watchlist screening orchestrated into one decision, with immutable match evidence.',
    url: 'https://www.getfintegrity.com/transaction-screening',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
  },
}

const THREE_THINGS = [
  {
    title: 'Orchestrated into the decision.',
    body: 'Screening is one input to a deterministic decision, not a separate workflow your team has to reconcile.',
  },
  {
    title: 'Bring your own provider.',
    body: 'Connect ComplyAdvantage, LSEG World-Check, or another provider with your own credentials — or use a bundled option. No vendor lock-in; you keep your data relationship and your pricing.',
    note: 'At least two screening connectors can stay active so a provider change or outage never leaves you uncovered.',
  },
  {
    title: 'Evidence by default.',
    body: 'Each screening result is captured as defensible evidence, so "was screening applied to this transfer?" is answered in seconds, not days.',
  },
]

const CAPTURED_FIELDS = [
  'List / provider name and its version at time of check',
  'Timestamp of the check (server-side, immutable)',
  'Match score returned by the provider',
  'Matched entity detail (name, list, category)',
  'Action your policy took as a result',
]

export default function TransactionScreeningPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Transaction Screening', href: '/transaction-screening' }]} />
      <RevealInit />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="page-hero">
        <div className="wrap">
          <Breadcrumb items={[{ label: 'Transaction Screening' }]} />
          <div className="page-hero-inner">
            <span className="sec-eyebrow">Product</span>
            <h1>Transaction Screening</h1>
            <p className="page-hero-lead">
              Sanctions, PEP and adverse-media screening, orchestrated into a single real-time
              compliance decision — with every match and its evidence written to an immutable
              audit trail.
            </p>
            <div className="page-hero-cta">
              <Link href="/book-a-demo" className="btn btn-primary">
                See how Fintegrity evaluates transactions →
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
            <h2 className="sec-title">Unorchestrated screening is screening you can&apos;t defend</h2>
            <p className="sec-intro">
              Most fintechs bolt screening on as a separate check. The result is coverage gaps
              no one can prove are closed: some transfers get screened, some don&apos;t, and when
              a sponsor bank or regulator asks for evidence that screening was applied
              consistently, the answer lives across vendor dashboards, spreadsheets and developer
              logs. Screening that isn&apos;t orchestrated into the decision — and isn&apos;t
              evidenced — is screening you can&apos;t defend.
            </p>
          </div>
        </div>
      </section>

      {/* ── How it works ─────────────────────────────────── */}
      <section className="prod-section">
        <div className="wrap">
          <div className="reveal">
            <span className="sec-eyebrow">How it works</span>
            <h2 className="sec-title">Screening as an orchestrated layer inside the decision</h2>
            <p className="sec-intro">
              Fintegrity treats screening as an orchestrated layer inside the decision, not a
              side call. When a transaction or onboarding event hits the Decision API, Fintegrity
              routes the relevant parties through your configured screening provider, interprets
              the result against your policy, and folds it into a single decision. Every check
              writes its evidence to the immutable audit ledger.
            </p>
          </div>

          {/* Diagram */}
          <div className="reveal">
            <ScreeningFlow />
          </div>

          {/* Three differentiators */}
          <div className="cap-grid" style={{ marginTop: '48px' }}>
            {THREE_THINGS.map((item) => (
              <div className="cap-card reveal" key={item.title}>
                <h3 style={{ fontSize: '1rem', marginBottom: '10px' }}>{item.title}</h3>
                <p style={{ fontSize: '0.92rem', color: 'var(--slate)', lineHeight: 1.65 }}>
                  {item.body}
                </p>
                {item.note && (
                  <p
                    style={{
                      marginTop: '10px',
                      fontSize: '0.82rem',
                      color: 'var(--muted)',
                      fontStyle: 'italic',
                    }}
                  >
                    {item.note}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── What gets captured ───────────────────────────── */}
      <section className="prod-section prod-section-soft">
        <div className="wrap">
          <div className="two-col-feature">
            <div className="reveal">
              <span className="sec-eyebrow">Evidence by default</span>
              <h2 className="sec-title">What gets captured per check</h2>
              <p style={{ color: 'var(--slate)', lineHeight: 1.7, fontSize: '1rem', marginTop: '16px', maxWidth: '50ch' }}>
                For every screening check, Fintegrity records the following fields as an
                append-only entry on the audit ledger. The record is exportable as part of any
                evidence pack.
              </p>
              {/* NEEDS COMPLIANCE REVIEW: confirm captured fields meet the evidence expectations counsel wants to assert */}
            </div>
            <div className="reveal">
              <ul className="feature-list">
                {CAPTURED_FIELDS.map((field) => (
                  <li className="feature-item" key={field}>
                    <span className="feature-check">✓</span>
                    <div className="feature-item-text">
                      <p>{field}</p>
                    </div>
                  </li>
                ))}
              </ul>
              <div
                style={{
                  marginTop: '20px',
                  padding: '14px 18px',
                  background: '#F4F3FF',
                  border: '1px solid #DDD9FF',
                  borderRadius: '10px',
                  fontSize: '0.86rem',
                  color: 'var(--slate)',
                  lineHeight: 1.6,
                }}
              >
                Every record is append-only and cannot be altered after writing. Evidence packs
                for any transaction or onboarding event are generated on demand.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related pages ────────────────────────────────── */}
      <section className="prod-section">
        <div className="wrap">
          <div className="reveal">
            <span className="sec-eyebrow">Connected capabilities</span>
            <h2 className="sec-title">Screening is one layer in the compliance decision</h2>
          </div>
          <div className="cap-grid" style={{ marginTop: '36px' }}>
            {[
              {
                href: '/compliance-decisioning-api',
                label: 'Compliance Decision API',
                desc: 'Screening results feed directly into the synchronous decision — CLEAR, FLAGGED, HELD_FOR_REVIEW, or BLOCKED in one call.',
              },
              {
                href: '/transaction-monitoring',
                label: 'Transaction Monitoring',
                desc: 'Velocity, structuring and pattern rules run alongside screening in the same decision.',
              },
              {
                href: '/case-management',
                label: 'Case Management',
                desc: 'A FLAGGED or HELD_FOR_REVIEW result opens a structured case with screening evidence pre-assembled.',
              },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="cap-card reveal" style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{ fontFamily: 'var(--font-sora)', fontWeight: 700, marginBottom: '8px' }}>
                  {link.label} →
                </div>
                <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.55 }}>
                  {link.desc}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        headline="See how Fintegrity evaluates transactions in real time"
        body="We&apos;ll walk through a live screening configuration using transaction patterns from your business — orchestrated into the decision, evidence written by default."
        primaryLabel="Request a demo →"
        primaryHref="/book-a-demo"
        secondaryLabel="Read the API docs"
        secondaryHref="https://docs.getfintegrity.com"
      />
    </>
  )
}
