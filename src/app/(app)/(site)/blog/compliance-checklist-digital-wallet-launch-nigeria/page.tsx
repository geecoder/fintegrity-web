import type { Metadata } from 'next'
import Link from 'next/link'
import { formatDate } from '@/lib/blog'
import BreadcrumbJsonLd from '@/components/json-ld/BreadcrumbJsonLd'
import ArticleJsonLd from '@/components/json-ld/ArticleJsonLd'
import RevealInit from '@/components/RevealInit'

export const metadata: Metadata = {
  title: 'A Compliance Checklist for Launching a Digital Wallet in Nigeria',
  description:
    'The compliance infrastructure decisions to make before launch, not after — KYC tiering, monitoring, screening, case management, and evidence, in the order they actually matter.',
  alternates: { canonical: 'https://www.getfintegrity.com/blog/compliance-checklist-digital-wallet-launch-nigeria' },
}

const PUBLISHED = '2026-07-15'

export default function LaunchChecklistPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Blog', href: '/blog' },
        { name: 'Digital Wallet Launch Checklist', href: '/blog/compliance-checklist-digital-wallet-launch-nigeria' },
      ]} />
      <ArticleJsonLd
        headline="A Compliance Checklist for Launching a Digital Wallet in Nigeria"
        description="The compliance infrastructure decisions to make before launch, not after — KYC tiering, monitoring, screening, case management, and evidence, in the order they actually matter."
        slug="compliance-checklist-digital-wallet-launch-nigeria"
        datePublished={PUBLISHED}
      />
      <RevealInit />
      <section className="article-header">
        <div className="wrap">
          <div className="article-header-inner reveal">
            <div className="article-cat">Compliance</div>
            <h1>A Compliance Checklist for Launching a Digital Wallet in Nigeria</h1>
            <p className="article-header-desc">
              Compliance infrastructure retrofitted after launch is always harder — and riskier —
              than infrastructure designed in from day one. Here&apos;s the order these decisions
              actually need to happen in.
            </p>
            <div className="article-meta">
              <span>Fintegrity Team</span>
              <span>·</span>
              <span>{formatDate(PUBLISHED)}</span>
              <span>·</span>
              <span>8 min read</span>
            </div>
          </div>
        </div>
      </section>

      <div className="article-wrap">
        <article className="article-body">
          <h2 id="before-you-build">Before you write payment-handler code</h2>
          <p>
            The single most common mistake in wallet launches is treating compliance as a
            feature to bolt on before the app store submission, rather than infrastructure the
            payment flow is built around from the start. The decisions below get materially
            harder to retrofit once your payment handler already exists without them.
          </p>

          <h2 id="kyc-tiers">1. Define your KYC tiers and limits upfront</h2>
          <p>
            {/* NEEDS COMPLIANCE REVIEW — confirm current CBN tiered-KYC verification requirements and account limits before publishing specific figures */}
            Decide your tier structure — what verification level unlocks what transaction and
            balance limits — before launch, and enforce it at the transaction decision layer,
            not scattered across application code. A tier limit that lives only in a mobile app
            validation check is not a control; it&apos;s a suggestion a bug can silently bypass.
          </p>

          <h2 id="monitoring-day-one">2. Decide your monitoring rules before your first user, not your ten-thousandth</h2>
          <p>
            You don&apos;t need a mature rule library on day one, but you need the core patterns
            covered from launch: new-account velocity, rapid in-out, and basic structuring
            detection at minimum. Mule-account abuse targets new products specifically because
            early-stage monitoring is often thin — waiting until volume justifies &ldquo;proper&rdquo;
            monitoring means the gap is exploited exactly when you&apos;re least prepared to
            investigate it.
          </p>

          <h2 id="screening">3. Decide how screening fits into onboarding and every transaction</h2>
          <p>
            Screening at onboarding (checking the customer against sanctions/PEP lists) and
            screening at the transaction level (checking counterparties) are both necessary and
            answer different questions. Decide which provider you&apos;re using and how screening
            results feed into your compliance decision before launch — retrofitting screening
            into an existing transaction flow is a bigger integration project than building it in
            from the start.
          </p>

          <div className="article-callout">
            <strong>The order matters: decision infrastructure before payment-handler
            integration.</strong> Building your payment flow first and adding compliance
            afterward means re-engineering a live, revenue-generating system. Building the
            decision layer first means your payment flow is built around a single API call from
            day one.
          </div>

          <h2 id="case-management">4. Have a case-management workflow before you have your first alert</h2>
          <p>
            Decide, before launch, who investigates an alert, how it&apos;s prioritised, and what
            &ldquo;disposition&rdquo; options exist — cleared, escalated, account action. A
            genuine alert arriving with no defined workflow behind it either gets ignored or
            handled inconsistently, and inconsistent handling is itself a compliance weakness an
            examiner will notice.
          </p>

          <h2 id="evidence">5. Make sure evidence writes from day one, not after your first examiner request</h2>
          <p>
            Every decision — including every CLEAR — should be writing to an immutable evidence
            record from the moment you launch, not from the moment you decide evidence matters.
            There&apos;s no way to retroactively generate evidence for transactions that already
            happened without it; the record either exists from day one or it has a gap that can
            never be filled.
          </p>

          <h2 id="the-checklist">The checklist, in order</h2>
          <ol>
            <li>KYC tiers and limits defined, enforced at the decision layer</li>
            <li>Core monitoring rules configured (new-account velocity, rapid in-out, structuring)</li>
            <li>Screening provider selected and wired into both onboarding and transaction flow</li>
            <li>Case-management workflow defined — assignment, escalation, disposition categories</li>
            <li>Evidence architecture writing every decision from the first transaction</li>
            <li>One API integration point for your payment handler, not scattered compliance logic across the codebase</li>
          </ol>
          <p>
            This is exactly the sequence Fintegrity is designed to shortcut — one{' '}
            <Link href="/compliance-decisioning-api">Compliance Decision API</Link> integration
            covering tier enforcement, monitoring, screening, and evidence together, configured
            for{' '}
            <Link href="/solutions/digital-wallets">digital wallet launch</Link> from day one
            rather than retrofitted after.
          </p>
        </article>

        <aside className="article-sidebar">
          <div className="article-toc">
            <span className="article-toc-label">In this article</span>
            <ul className="article-toc-list">
              <li><a href="#before-you-build">Before you build</a></li>
              <li><a href="#kyc-tiers">1. KYC tiers &amp; limits</a></li>
              <li><a href="#monitoring-day-one">2. Monitoring from day one</a></li>
              <li><a href="#screening">3. Screening integration</a></li>
              <li><a href="#case-management">4. Case-management workflow</a></li>
              <li><a href="#evidence">5. Evidence from day one</a></li>
              <li><a href="#the-checklist">The full checklist</a></li>
            </ul>
          </div>
          <div className="article-sidebar-cta">
            <h4>Launch with compliance built in, not bolted on</h4>
            <p>One integration covering KYC tiers, monitoring, screening, and evidence.</p>
            <Link href="/solutions/digital-wallets" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', fontSize: '0.88rem', padding: '10px 16px', marginBottom: '10px' }}>
              Digital wallet compliance →
            </Link>
            <Link href="/book-a-demo" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.88rem', padding: '10px 16px' }}>
              Book a demo →
            </Link>
          </div>
        </aside>
      </div>
    </>
  )
}
