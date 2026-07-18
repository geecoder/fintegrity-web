import type { Metadata } from 'next'
import Link from 'next/link'
import { formatDate } from '@/lib/blog'
import BreadcrumbJsonLd from '@/components/json-ld/BreadcrumbJsonLd'
import ArticleJsonLd from '@/components/json-ld/ArticleJsonLd'
import RevealInit from '@/components/RevealInit'

export const metadata: Metadata = {
  title: "Transaction Screening vs Transaction Monitoring: What's the Difference?",
  description:
    "Two terms that get used interchangeably and shouldn't be. What each one actually does, where they overlap, and why you need both, not one or the other.",
  alternates: { canonical: 'https://www.getfintegrity.com/blog/transaction-screening-vs-monitoring' },
}

const PUBLISHED = '2026-06-03'

export default function ScreeningVsMonitoringPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Blog', href: '/blog' },
        { name: 'Screening vs Monitoring', href: '/blog/transaction-screening-vs-monitoring' },
      ]} />
      <ArticleJsonLd
        headline="Transaction Screening vs Transaction Monitoring: What's the Difference?"
        description="Two terms that get used interchangeably and shouldn't be. What each one actually does, where they overlap, and why you need both, not one or the other."
        slug="transaction-screening-vs-monitoring"
        datePublished={PUBLISHED}
      />
      <RevealInit />
      <section className="article-header">
        <div className="wrap">
          <div className="article-header-inner reveal">
            <div className="article-cat">Compliance</div>
            <h1>Transaction Screening vs Transaction Monitoring: What&apos;s the Difference?</h1>
            <p className="article-header-desc">
              &ldquo;We do transaction screening&rdquo; and &ldquo;we do transaction
              monitoring&rdquo; get used as if they mean the same thing. They don&apos;t — and
              conflating them leaves real gaps in a compliance programme.
            </p>
            <div className="article-meta">
              <span>Fintegrity Team</span>
              <span>·</span>
              <span>{formatDate(PUBLISHED)}</span>
              <span>·</span>
              <span>5 min read</span>
            </div>
          </div>
        </div>
      </section>

      <div className="article-wrap">
        <article className="article-body">
          <h2 id="screening">What transaction screening does</h2>
          <p>
            Transaction screening checks the <em>parties</em> to a transaction — sender,
            recipient, and any intermediaries — against sanctions lists, PEP (politically exposed
            person) lists, and adverse-media sources. It answers one question: is anyone involved
            in this transaction someone we&apos;re prohibited or required to take extra care
            with?
          </p>
          <p>
            Screening is identity-focused and largely binary at the point of decision: a name
            either matches a list entry (or matches closely enough to require review) or it
            doesn&apos;t. It typically runs against every transaction, but it isn&apos;t looking
            at transaction <em>behaviour</em> at all.
          </p>

          <h2 id="monitoring">What transaction monitoring does</h2>
          <p>
            Transaction monitoring evaluates <em>behaviour</em> — the pattern, timing, value, and
            context of transactions over time — looking for signs of money laundering, fraud, or
            structuring that have nothing to do with who the parties are. A monitoring rule
            doesn&apos;t care whether the sender is on a sanctions list; it cares whether this
            transaction is unusual for this customer, or whether it fits a known abuse pattern
            like rapid in-out or velocity gaming.
          </p>
          <p>
            Where screening is a lookup, monitoring is an evaluation against rules, thresholds,
            and behavioural baselines — inherently more complex and more prone to false positives
            if not tuned well.
          </p>

          <div className="article-callout">
            <strong>Screening asks &ldquo;who is this?&rdquo;. Monitoring asks &ldquo;is this
            normal?&rdquo;.</strong> A transaction can pass screening cleanly — no sanctioned
            party involved — and still be exactly the kind of behaviour monitoring exists to
            catch, and vice versa.
          </div>

          <h2 id="why-both">Why you need both, not one</h2>
          <p>
            A fintech that only screens is blind to structuring, mule accounts, and behavioural
            anomalies committed by parties who aren&apos;t on any list — which describes most
            domestic money-laundering activity. A fintech that only monitors misses the specific,
            binary risk of transacting with a sanctioned or high-risk party, which carries its
            own severe regulatory consequences regardless of whether the transaction pattern
            looks otherwise ordinary.
          </p>
          <p>
            The two are complementary layers of the same decision, and the strongest architecture
            treats them that way: screening results and monitoring rule outcomes feeding into one
            compliance decision, rather than two disconnected systems that a compliance analyst
            has to reconcile manually.
          </p>

          <h2 id="in-practice">What this looks like combined</h2>
          <p>
            In a combined architecture, a single transaction evaluation might run: a screening
            check against sanctions/PEP/adverse-media lists, a set of monitoring rules against
            behavioural patterns, and a check against the customer&apos;s KYC tier limit — all in
            parallel, converging into one decision (CLEAR, FLAGGED, HELD_FOR_REVIEW, or BLOCKED)
            with a single evidence record showing exactly which check contributed to the outcome.
          </p>
          <p>
            That&apos;s the model behind both{' '}
            <Link href="/transaction-screening">Fintegrity&apos;s screening</Link> and{' '}
            <Link href="/transaction-monitoring">transaction monitoring</Link> capabilities —
            orchestrated into the same decision rather than run as separate, disconnected
            processes.
          </p>
        </article>

        <aside className="article-sidebar">
          <div className="article-toc">
            <span className="article-toc-label">In this article</span>
            <ul className="article-toc-list">
              <li><a href="#screening">What screening does</a></li>
              <li><a href="#monitoring">What monitoring does</a></li>
              <li><a href="#why-both">Why you need both</a></li>
              <li><a href="#in-practice">What this looks like combined</a></li>
            </ul>
          </div>
          <div className="article-sidebar-cta">
            <h4>See both in one decision</h4>
            <p>Fintegrity orchestrates screening and monitoring into a single compliance decision.</p>
            <Link href="/transaction-screening" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', fontSize: '0.88rem', padding: '10px 16px', marginBottom: '10px' }}>
              Transaction screening →
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
