import type { Metadata } from 'next'
import Link from 'next/link'
import CTABand from '@/components/ui/CTABand'
import RevealInit from '@/components/RevealInit'
import BreadcrumbJsonLd from '@/components/json-ld/BreadcrumbJsonLd'
import AuditLayers from '@/components/diagrams/AuditLayers'

// This page covers both commercial banks and microfinance banks (MFBs).
// /solutions/microfinance-banks is a legacy stub retained for URL continuity — this page supersedes it.

export const metadata: Metadata = {
  title: 'Compliance Infrastructure for Banks & Microfinance Institutions',
  description:
    'Embedded compliance decisioning and immutable audit evidence for banks and microfinance institutions — enforcement-grade controls, examiner-ready proof.',
  alternates: { canonical: 'https://www.getfintegrity.com/solutions/banks' },
  openGraph: {
    title: 'Compliance infrastructure for banks & microfinance institutions — Fintegrity Technologies Limited',
    description: 'Enforcement-grade decisioning and examiner-ready evidence.',
    url: 'https://www.getfintegrity.com/solutions/banks',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
  },
}

const WHAT_YOU_GET = [
  {
    tag: 'Enforcement',
    title: 'Enforcement at the point of decision',
    body: 'Controls are enforced at the decision layer before every transaction — not documented after the fact. Every outcome is deterministic: the same inputs produce the same decision, every time.',
  },
  {
    tag: 'Audit layers',
    title: 'Three-layer immutable audit architecture',
    body: 'Cryptographically verifiable decision trail, WORM evidence store, and queryable case data — converging into one-click evidence packs. Tamper-evident by construction.',
    compliance: true,
  },
  {
    tag: 'Evidence packs',
    title: 'On-demand evidence packs (PDF / JSON)',
    body: 'Evidence packs for any customer, transaction or case are generated on demand. An examiner request that used to take weeks is answered in minutes from a single query.',
    compliance: true,
  },
  {
    tag: 'Retention',
    title: 'Long-retention configuration',
    body: 'Record-keeping periods are configurable to match your institution\'s regulatory obligations. Evidence and case records are retained in queryable, structured storage.',
    compliance: true,
  },
]

export default function BanksPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Industries', href: '/solutions/banks' },
        { name: 'Banks & Microfinance Institutions', href: '/solutions/banks' },
      ]} />
      <RevealInit />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="page-hero">
        <div className="wrap">
          <div className="page-hero-inner">
            <span className="sec-eyebrow">Industries</span>
            <h1>Compliance infrastructure for banks &amp; microfinance institutions</h1>
            <p className="page-hero-lead">
              {/* NEEDS COMPLIANCE REVIEW: "examiner-ready" framing — confirm this is appropriate product-capability language */}
              Enforcement-grade compliance decisioning with immutable, examiner-ready evidence —
              for institutions where control effectiveness has to be proven, not just documented.
            </p>
            <div className="page-hero-cta">
              <Link href="/book-a-demo" className="btn btn-primary">
                Request a demo →
              </Link>
              <Link href="/audit-trail-and-reporting" className="btn btn-ghost">
                See audit trail &amp; reporting
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
            <h2 className="sec-title">Examiners want proof of controls, not policy documents</h2>
            <p className="sec-intro">
              Banks and microfinance institutions are held to the highest bar: examiners want
              proof that controls were enforced transaction-by-transaction, not just that a
              policy exists. Legacy systems produce documents, not defensible evidence — and
              reconstructing why a specific decision was made can take weeks.
            </p>
          </div>
          <div className="two-col-feature reveal" style={{ marginTop: '40px' }}>
            <div>
              <h3 style={{ fontSize: '1.05rem', marginBottom: '14px' }}>Where legacy systems fall short</h3>
              <ul className="feature-list">
                {[
                  'Policy exists in documents; evidence of enforcement must be reconstructed manually',
                  'Reconstructing why a specific transaction was processed can take days to weeks',
                  'Different systems hold screening, monitoring and case data — no single query answers an examiner request',
                  'Audit trail is a log, not a legally defensible evidence record',
                  'MFBs held to the same CBN evidence bar as larger banks, with smaller compliance teams',
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
                  'Controls enforced at the decision layer on every transaction — proven, not just documented',
                  'Why any decision was made is reconstructable in seconds from the immutable ledger',
                  'Three-layer audit architecture: verifiable trail, WORM storage, and queryable case data',
                  'Evidence packs generated on demand — PDF or JSON — for any customer, transaction or case',
                  'Scales from MFB volumes to full commercial bank transaction throughput on one platform',
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

      {/* ── Three-layer audit architecture ───────────────── */}
      <section className="prod-section">
        <div className="wrap">
          <div className="reveal">
            <span className="sec-eyebrow">The audit architecture</span>
            <h2 className="sec-title">Three immutable layers. One evidence pack. On demand.</h2>
            {/* NEEDS COMPLIANCE REVIEW: "examiner-ready" framing throughout this section — confirm appropriate product-capability language before publication */}
            <p className="sec-intro">
              Fintegrity enforces controls at the decision layer and captures every decision,
              rule fired, and state change in an append-only, cryptographically verifiable
              ledger. Evidence packs for any customer, transaction or case are generated on
              demand — turning an examiner request from a fire drill into a query.
            </p>
          </div>
          <div className="reveal">
            <AuditLayers />
          </div>
        </div>
      </section>

      {/* ── What you get ─────────────────────────────────── */}
      <section className="prod-section prod-section-soft">
        <div className="wrap">
          <div className="reveal">
            <span className="sec-eyebrow">What you get</span>
            <h2 className="sec-title">Enforcement-grade controls. Examiner-grade evidence.</h2>
          </div>
          <div className="cap-grid">
            {WHAT_YOU_GET.map((item) => (
              <div className="cap-card reveal" key={item.tag}>
                {item.compliance && (
                  /* NEEDS COMPLIANCE REVIEW: claims about retention configuration, "examiner-ready" evidence packs, and WORM storage assertions — confirm wording is appropriate product-capability language */
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

      {/* ── Why this matters for MFBs specifically ───────── */}
      <section className="prod-section prod-section-dark">
        <div className="wrap">
          <div className="reveal" style={{ maxWidth: '720px', margin: '0 auto', textAlign: 'center' }}>
            <span className="sec-eyebrow">Microfinance institutions</span>
            <h2 className="sec-title">The same bar. A fraction of the team.</h2>
            <p className="sec-intro" style={{ margin: '16px auto 0', maxWidth: '56ch' }}>
              Microfinance banks (MFBs) operate under the same CBN AML/CFT evidence requirements
              as commercial banks — but with compliance teams that may be one or two people.
              Fintegrity gives MFBs automated enforcement and evidence generation that a small
              team can operate, at a scale that fits MFB transaction volumes and budgets.
            </p>
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
              { href: '/audit-trail-and-reporting', label: 'Audit Trail & Reporting', desc: 'The three-layer immutable architecture: cryptographically verifiable trail, WORM evidence store, queryable case data.' },
              { href: '/case-management', label: 'Case Management', desc: 'Every alert becomes a structured case with evidence pre-assembled. Case outcomes are part of the immutable audit record.' },
              { href: '/compliance-decisioning-api', label: 'Compliance Decision API', desc: 'Enforcement at the decision layer — controls applied before every transaction, outcomes recorded automatically.' },
            ].map((link) => (
              <Link key={link.href} href={link.href} className="cap-card reveal" style={{ textDecoration: 'none', display: 'block' }}>
                <div style={{ fontFamily: 'var(--font-sora)', fontWeight: 700, marginBottom: '8px' }}>{link.label} →</div>
                <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--muted)', lineHeight: 1.55 }}>{link.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        headline="See how Fintegrity evaluates transactions in real time"
        body="We'll show you the three-layer audit architecture live — from a decision firing to the evidence pack that answers an examiner request in minutes."
        primaryLabel="Request a demo →"
        primaryHref="/book-a-demo"
        secondaryLabel="See audit trail & reporting"
        secondaryHref="/audit-trail-and-reporting"
      />
    </>
  )
}
