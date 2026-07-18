import type { Metadata } from 'next'
import Link from 'next/link'
import { formatDate } from '@/lib/blog'
import BreadcrumbJsonLd from '@/components/json-ld/BreadcrumbJsonLd'
import ArticleJsonLd from '@/components/json-ld/ArticleJsonLd'
import RevealInit from '@/components/RevealInit'

export const metadata: Metadata = {
  title: 'How to Monitor Cross-Border Remittance Transactions',
  description:
    'Corridor risk, dual-jurisdiction exposure, and sanctions reach — the specific monitoring challenges of cross-border remittance, and how to structure rules around them.',
  alternates: { canonical: 'https://www.getfintegrity.com/blog/monitor-cross-border-remittance-transactions' },
}

const PUBLISHED = '2026-07-01'

export default function CrossBorderMonitoringPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Blog', href: '/blog' },
        { name: 'Cross-Border Remittance Monitoring', href: '/blog/monitor-cross-border-remittance-transactions' },
      ]} />
      <ArticleJsonLd
        headline="How to Monitor Cross-Border Remittance Transactions"
        description="Corridor risk, dual-jurisdiction exposure, and sanctions reach — the specific monitoring challenges of cross-border remittance, and how to structure rules around them."
        slug="monitor-cross-border-remittance-transactions"
        datePublished={PUBLISHED}
      />
      <RevealInit />
      <section className="article-header">
        <div className="wrap">
          <div className="article-header-inner reveal">
            <div className="article-cat">Compliance</div>
            <h1>How to Monitor Cross-Border Remittance Transactions</h1>
            <p className="article-header-desc">
              Cross-border remittance carries risk domestic transaction monitoring wasn&apos;t
              designed for — two regulatory regimes, currency conversion, and correspondent
              exposure. Here&apos;s how to structure monitoring around it.
            </p>
            <div className="article-meta">
              <span>Fintegrity Team</span>
              <span>·</span>
              <span>{formatDate(PUBLISHED)}</span>
              <span>·</span>
              <span>7 min read</span>
            </div>
          </div>
        </div>
      </section>

      <div className="article-wrap">
        <article className="article-body">
          <h2 id="what-is-different">What makes cross-border different from domestic monitoring</h2>
          <p>
            A domestic transaction has one regulatory regime, one currency, and a counterparty
            you can typically screen against a single set of lists. A cross-border remittance
            transaction has two regulatory regimes (origin and destination), a currency
            conversion that can obscure value-based thresholds, and sanctions/PEP exposure across
            both jurisdictions&apos; relevant lists — plus whatever correspondent banking
            relationships sit between them.
          </p>

          <h2 id="corridor-risk">Corridor-level risk, not just transaction-level</h2>
          <p>
            The single most important shift in mindset for cross-border monitoring is evaluating
            risk at the level of the <em>corridor</em> — the specific origin-destination pair —
            not just the individual transaction. A corridor with historically higher fraud or
            sanctions-evasion activity warrants tighter rules than a lower-risk corridor, even for
            transactions that look identical on paper.
          </p>
          <p>
            In practice, this means your rule configuration needs a corridor dimension: velocity
            and structuring thresholds that can be tuned per corridor, not one flat global rule
            applied uniformly regardless of where the money is going.
          </p>

          <h2 id="dual-regime">Dual-jurisdiction reporting exposure</h2>
          <p>
            {/* NEEDS COMPLIANCE REVIEW — confirm specific reporting-threshold alignment claims for any named jurisdiction pair before publishing */}
            A remittance operator moving funds between, for example, Nigeria and the UK needs to
            be aware of reporting obligations in both jurisdictions, which don&apos;t necessarily
            share the same thresholds, definitions, or filing timelines. Monitoring rules built
            only around one side&apos;s requirements can create a genuine compliance gap on the
            other side.
          </p>

          <div className="article-callout">
            <strong>Sanctions exposure compounds across a corridor.</strong> Screening needs to
            check relevant lists for both the origin and destination jurisdiction — and, where
            correspondent banks are involved, their jurisdiction too — not just the list your own
            institution is directly obligated to check.
          </div>

          <h2 id="specific-patterns">Patterns specific to remittance abuse</h2>
          <ul>
            <li><strong>Structuring across multiple senders to one recipient.</strong> Several unrelated-looking senders funding a single recipient can indicate a collection network rather than genuine independent remittances.</li>
            <li><strong>Rapid re-remittance.</strong> Funds received in the destination country and immediately re-sent onward, often to a third jurisdiction — a layering pattern specific to cross-border flows.</li>
            <li><strong>Round-tripping.</strong> Funds sent out and returned through a different corridor shortly after, a pattern with limited legitimate rationale.</li>
          </ul>

          <h2 id="architecture">Building this into your decision architecture</h2>
          <p>
            None of this requires a separate monitoring system for cross-border flows — it
            requires the same decision layer that handles domestic transactions to carry corridor
            and dual-jurisdiction context as part of its evaluation, rather than treating
            cross-border as an exception handled manually.
          </p>
          <p>
            That&apos;s the model behind{' '}
            <Link href="/solutions/remittance-companies">Fintegrity&apos;s remittance
            configuration</Link> — corridor-level rules, dual-regime screening, and the same{' '}
            <Link href="/audit-trail-and-reporting">immutable evidence architecture</Link> as
            every other transaction type, applied to the specific patterns cross-border
            operators actually face.
          </p>
        </article>

        <aside className="article-sidebar">
          <div className="article-toc">
            <span className="article-toc-label">In this article</span>
            <ul className="article-toc-list">
              <li><a href="#what-is-different">What makes cross-border different</a></li>
              <li><a href="#corridor-risk">Corridor-level risk</a></li>
              <li><a href="#dual-regime">Dual-jurisdiction exposure</a></li>
              <li><a href="#specific-patterns">Remittance-specific abuse patterns</a></li>
              <li><a href="#architecture">Building this into your architecture</a></li>
            </ul>
          </div>
          <div className="article-sidebar-cta">
            <h4>See corridor-level rules configured</h4>
            <p>Built for the specific risk of cross-border and remittance flows.</p>
            <Link href="/solutions/remittance-companies" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', fontSize: '0.88rem', padding: '10px 16px', marginBottom: '10px' }}>
              Remittance compliance →
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
