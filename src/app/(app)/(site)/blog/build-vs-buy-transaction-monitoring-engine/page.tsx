import type { Metadata } from 'next'
import Link from 'next/link'
import { formatDate } from '@/lib/blog'
import BreadcrumbJsonLd from '@/components/json-ld/BreadcrumbJsonLd'
import ArticleJsonLd from '@/components/json-ld/ArticleJsonLd'
import RevealInit from '@/components/RevealInit'

export const metadata: Metadata = {
  title: "Build vs Buy: Should Your Fintech Build Its Own Transaction-Monitoring Engine?",
  description:
    'The honest tradeoffs — engineering time, ongoing rule maintenance, evidence architecture, and opportunity cost — before you commit to building AML infrastructure in-house.',
  alternates: { canonical: 'https://www.getfintegrity.com/blog/build-vs-buy-transaction-monitoring-engine' },
}

const PUBLISHED = '2026-07-08'

export default function BuildVsBuyPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Blog', href: '/blog' },
        { name: 'Build vs Buy', href: '/blog/build-vs-buy-transaction-monitoring-engine' },
      ]} />
      <ArticleJsonLd
        headline="Build vs Buy: Should Your Fintech Build Its Own Transaction-Monitoring Engine?"
        description="The honest tradeoffs — engineering time, ongoing rule maintenance, evidence architecture, and opportunity cost — before you commit to building AML infrastructure in-house."
        slug="build-vs-buy-transaction-monitoring-engine"
        datePublished={PUBLISHED}
      />
      <RevealInit />
      <section className="article-header">
        <div className="wrap">
          <div className="article-header-inner reveal">
            <div className="article-cat">Engineering</div>
            <h1>Build vs Buy: Should Your Fintech Build Its Own Transaction-Monitoring Engine?</h1>
            <p className="article-header-desc">
              It&apos;s a reasonable question for any engineering-led fintech to ask. Here&apos;s
              an honest breakdown of what building it yourself actually costs — not just upfront,
              but ongoing.
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
          <h2 id="the-appeal">Why building it yourself is tempting</h2>
          <p>
            A transaction-monitoring engine, at its core, doesn&apos;t sound complicated: evaluate
            a transaction against some rules, return a decision. For an engineering team that
            builds core payment infrastructure already, it can look like a natural extension —
            no vendor dependency, full control over the rule logic, no per-transaction pricing.
          </p>
          <p>
            The initial rule engine is, in fact, usually the easy part. The cost that catches
            teams off guard is everything downstream of it.
          </p>

          <h2 id="hidden-costs">What the initial build doesn&apos;t include</h2>
          <ul>
            <li>
              <strong>Ongoing rule maintenance.</strong> Rules that were correct at launch drift
              out of date as your customer base, transaction volumes, and abuse patterns evolve.
              Someone needs to own tuning them — indefinitely, not once.
            </li>
            <li>
              <strong>Evidence architecture.</strong> A rule engine that makes decisions isn&apos;t
              the same as one that produces regulator-ready evidence — immutable, complete
              (including clean decisions), and queryable on demand. Building that properly is a
              separate, non-trivial engineering effort in itself.
            </li>
            <li>
              <strong>Case management workflow.</strong> Alerts need somewhere to go — a
              structured investigation workflow with assignment, escalation, and disposition
              tracking. This is often underestimated as &ldquo;we&apos;ll just use a spreadsheet
              for now,&rdquo; which rarely ages well.
            </li>
            <li>
              <strong>Simulation and testing infrastructure.</strong> Safely changing a rule in
              production requires the ability to test it against historical data first — its own
              engineering investment, separate from the rule engine itself.
            </li>
            <li>
              <strong>Keeping pace with regulatory change.</strong> Thresholds, reporting
              requirements, and expectations shift over time, and someone needs to track that and
              translate it into configuration changes — an ongoing compliance-plus-engineering
              cost, not a one-time build.
            </li>
          </ul>

          <div className="article-callout">
            <strong>The rule engine is maybe 20% of the actual system.</strong> Evidence
            architecture, case management, simulation, and ongoing tuning are the other 80% — and
            they don&apos;t stop being a cost after go-live.
          </div>

          <h2 id="when-build-makes-sense">When building in-house genuinely makes sense</h2>
          <p>
            Build can be the right call when your transaction patterns are genuinely unusual
            enough that no configurable third-party rules engine fits, when you have sustained
            engineering capacity to dedicate to it indefinitely (not just for the initial build),
            or when compliance technology is itself your core product differentiator rather than
            infrastructure supporting a different core product.
          </p>
          <p>
            For most fintechs — where compliance is necessary infrastructure but not the product
            itself — the ongoing maintenance burden outweighs the control benefit, especially
            once you account for opportunity cost: engineering time spent maintaining a rules
            engine is engineering time not spent on your actual product.
          </p>

          <h2 id="what-buy-should-offer">If you buy, what to actually evaluate</h2>
          <ul>
            <li>Configurable rules with simulation against historical data — not a fixed rule set you can&apos;t adjust.</li>
            <li>An evidence architecture that&apos;s immutable and complete by default, not something you have to build on top of the vendor.</li>
            <li>Case management included, not a separate purchase or a gap you fill with a spreadsheet.</li>
            <li>Sub-100ms decision latency if you need real-time, pre-authorisation monitoring rather than batch.</li>
            <li>Ownership of your own rule configuration — you shouldn&apos;t need to file a support ticket to change a threshold.</li>
          </ul>
          <p>
            That&apos;s the list Fintegrity is built against — see the{' '}
            <Link href="/rules-engine">Rules Engine</Link>,{' '}
            <Link href="/audit-trail-and-reporting">evidence architecture</Link>, and{' '}
            <Link href="/case-management">case management</Link> that come as one platform, not
            three separate purchases.
          </p>
        </article>

        <aside className="article-sidebar">
          <div className="article-toc">
            <span className="article-toc-label">In this article</span>
            <ul className="article-toc-list">
              <li><a href="#the-appeal">Why building is tempting</a></li>
              <li><a href="#hidden-costs">What the initial build misses</a></li>
              <li><a href="#when-build-makes-sense">When build makes sense</a></li>
              <li><a href="#what-buy-should-offer">What to evaluate if you buy</a></li>
            </ul>
          </div>
          <div className="article-sidebar-cta">
            <h4>See the full platform, not just a rules engine</h4>
            <p>Rules, evidence, and case management — one platform, not three purchases.</p>
            <Link href="/compliance-decisioning-api" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', fontSize: '0.88rem', padding: '10px 16px', marginBottom: '10px' }}>
              Compliance Decision API →
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
