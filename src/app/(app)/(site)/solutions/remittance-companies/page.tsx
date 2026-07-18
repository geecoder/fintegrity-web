import type { Metadata } from 'next'
import Link from 'next/link'
import CTABand from '@/components/ui/CTABand'
import RevealInit from '@/components/RevealInit'
import BreadcrumbJsonLd from '@/components/json-ld/BreadcrumbJsonLd'
import CorridorFlow from '@/components/diagrams/CorridorFlow'

export const metadata: Metadata = {
  title: 'Compliance for Remittance & Cross-Border Payments',
  description:
    'Sanctions/PEP screening, corridor-risk rules and dual-regime readiness for remittance and cross-border operators — including the UK–Nigeria corridor.',
  alternates: { canonical: 'https://www.getfintegrity.com/solutions/remittance-companies' },
  openGraph: {
    title: 'Compliance infrastructure for remittance & cross-border payments — Fintegrity Technologies Limited',
    description: 'Screening, corridor-risk rules and evidence for cross-border money movement.',
    url: 'https://www.getfintegrity.com/solutions/remittance-companies',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
  },
}

const WHAT_YOU_GET = [
  {
    tag: 'Screening',
    title: 'Sanctions / PEP / adverse-media orchestrated into the decision',
    body: 'Screening is not a separate check — it is an orchestrated layer inside every cross-border decision, with per-check evidence written automatically. Bring your own provider; no vendor lock-in.',
  },
  {
    tag: 'Corridor risk',
    title: 'Corridor-risk rules for high-risk routes',
    body: 'Configure elevated scrutiny for specific corridor combinations. Rules are versioned and simulatable — so you can respond to newly elevated-risk routes in hours, not release cycles.',
  },
  {
    tag: 'Evidence',
    title: 'Cross-jurisdiction-ready evidence structure',
    body: 'Evidence is structured to support documentation requirements on both sides of a cross-border corridor — including the UK–Nigeria corridor.',
    compliance: true,
  },
  {
    tag: 'BYO provider',
    title: 'Keep your existing screening data relationships',
    body: 'Connect ComplyAdvantage, LSEG World-Check or another provider with your own credentials. Two connectors can stay active so a provider change or outage never leaves a coverage gap.',
  },
]

export default function RemittancePage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Industries', href: '/solutions/remittance-companies' },
        { name: 'Remittance & Cross-Border Payments', href: '/solutions/remittance-companies' },
      ]} />
      <RevealInit />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="page-hero">
        <div className="wrap">
          <div className="page-hero-inner">
            <span className="sec-eyebrow">Industries</span>
            <h1>Compliance infrastructure for remittance &amp; cross-border payments</h1>
            <p className="page-hero-lead">
              Sanctions and PEP screening, corridor-risk rules and dual-regime readiness —
              built for operators moving money across borders, including the UK–Nigeria corridor.
            </p>
            <div className="page-hero-cta">
              <Link href="/book-a-demo" className="btn btn-primary">
                Book a demo →
              </Link>
              <Link href="/transaction-screening" className="btn btn-ghost">
                See transaction screening
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── The pain ─────────────────────────────────────── */}
      <section className="prod-section prod-section-soft">
        <div className="wrap">
          <div className="reveal">
            <span className="sec-eyebrow">The challenge</span>
            <h2 className="sec-title">The heaviest screening burden and the most jurisdictional complexity</h2>
            {/* NEEDS COMPLIANCE REVIEW: cross-jurisdiction framing — do not assert regulatory compliance; describe capability only */}
            <p className="sec-intro">
              Cross-border operators carry the heaviest screening burden and the most
              jurisdictional complexity. Sanctions and PEP exposure is constant, corridor
              risk varies by route, and operators on the UK–Nigeria corridor answer to two
              regulatory regimes at once — with no single tool built to cover both.
            </p>
          </div>
          <div className="two-col-feature reveal" style={{ marginTop: '40px' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', marginBottom: '14px' }}>Cross-border compliance without orchestration</h3>
              <ul className="feature-list">
                {[
                  'Screening run separately — not wired into the payment decision',
                  'Corridor risk rules set globally, not per-route — high-risk routes get the same treatment as low-risk ones',
                  'Evidence scattered across vendor dashboards, hard to produce for dual-regime queries',
                  'A provider outage or renewal leaves a screening gap',
                  'Dual-jurisdiction reporting built manually, not from a structured evidence store',
                ].map((item) => (
                  <li className="feature-item" key={item}>
                    <span className="feature-check" style={{ background: 'var(--block-bg)', color: 'var(--block)' }}>✗</span>
                    <div className="feature-item-text"><p>{item}</p></div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 style={{ fontSize: '1.05rem', marginBottom: '14px' }}>With Fintegrity</h3>
              <ul className="feature-list">
                {[
                  'Screening orchestrated inside every cross-border decision — consistently applied',
                  'Per-corridor risk rules, versioned and simulatable — respond to newly elevated routes in hours',
                  'Structured evidence for every screening check and corridor decision',
                  'Two provider connectors active at once — no gap from a provider switch or outage',
                  'Evidence structure designed to support documentation requirements on both sides of the corridor',
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

      {/* ── How it fits ──────────────────────────────────── */}
      <section className="prod-section">
        <div className="wrap">
          <div className="reveal">
            <span className="sec-eyebrow">How it fits</span>
            <h2 className="sec-title">Screening and corridor-risk rules at the corridor step</h2>
            {/* NEEDS COMPLIANCE REVIEW: do not assert regulatory compliance; describe capability only — "CBN-aligned / FCA-aligned" labels are capability descriptors, not compliance assertions */}
            <p className="sec-intro">
              Fintegrity orchestrates screening into every cross-border decision, applies
              corridor-specific risk rules, and captures evidence to a standard that holds up
              to scrutiny on either side of the corridor. Its cross-jurisdiction design is a
              core differentiator — built to support CBN and FCA concepts in one platform.
            </p>
          </div>
          <div className="reveal">
            <CorridorFlow />
          </div>
        </div>
      </section>

      {/* ── What you get ─────────────────────────────────── */}
      <section className="prod-section prod-section-soft">
        <div className="wrap">
          <div className="reveal">
            <span className="sec-eyebrow">What you get</span>
            <h2 className="sec-title">Screening, corridor controls and evidence — in one place</h2>
          </div>
          <div className="cap-grid">
            {WHAT_YOU_GET.map((item) => (
              <div className="cap-card reveal" key={item.tag}>
                {item.compliance && (
                  /* NEEDS COMPLIANCE REVIEW: "cross-jurisdiction-ready evidence structure" claim — confirm evidence format meets dual-regime documentation requirements */
                  <></>
                )}
                <div className="cap-card-tag">{item.tag}</div>
                <h3>{item.title}</h3>
                <p>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Related ──────────────────────────────────────── */}
      <section className="prod-section">
        <div className="wrap">
          <div className="reveal">
            <span className="sec-eyebrow">Platform capabilities</span>
            <h2 className="sec-title">Under the hood</h2>
          </div>
          <div className="cap-grid" style={{ marginTop: '36px' }}>
            {[
              { href: '/transaction-screening', label: 'Transaction Screening', desc: 'Sanctions, PEP and adverse-media screening orchestrated into the decision. BYO provider, two connectors active at once.' },
              { href: '/rules-engine', label: 'Rules Engine', desc: 'Author per-corridor risk rules, simulate against real cross-border transaction history, and deploy in hours.' },
              { href: '/compliance-decisioning-api', label: 'Compliance Decision API', desc: 'The synchronous call that returns CLEAR/FLAGGED/HELD_FOR_REVIEW/BLOCKED with full evidence before a cross-border payment executes.' },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="cap-card reveal" style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginBottom: '8px' }}>{link.label} →</div>
                <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.55 }}>{link.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        headline="See how Fintegrity evaluates transactions in real time"
        body="We'll walk through a live cross-border configuration — corridor-risk rules, BYO screening orchestration, and dual-regime evidence — built around your routes."
        primaryLabel="Book a demo →"
        primaryHref="/book-a-demo"
        secondaryLabel="See transaction screening"
        secondaryHref="/transaction-screening"
      />
    </>
  )
}
