import type { Metadata } from 'next'
import Link from 'next/link'
import { formatDate } from '@/lib/blog'
import BreadcrumbJsonLd from '@/components/json-ld/BreadcrumbJsonLd'
import ArticleJsonLd from '@/components/json-ld/ArticleJsonLd'
import RevealInit from '@/components/RevealInit'

export const metadata: Metadata = {
  title: 'How Real-Time Transaction Decisioning Works',
  description:
    'What actually happens in the milliseconds between a transaction request and a CLEAR/FLAGGED/HELD_FOR_REVIEW/BLOCKED decision — a technical walkthrough of the decision pipeline.',
  alternates: { canonical: 'https://www.getfintegrity.com/blog/how-real-time-transaction-decisioning-works' },
}

const PUBLISHED = '2026-07-11'

export default function DecisioningExplainerPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Blog', href: '/blog' },
        { name: 'How Real-Time Decisioning Works', href: '/blog/how-real-time-transaction-decisioning-works' },
      ]} />
      <ArticleJsonLd
        headline="How Real-Time Transaction Decisioning Works"
        description="What actually happens in the milliseconds between a transaction request and a CLEAR/FLAGGED/HELD_FOR_REVIEW/BLOCKED decision — a technical walkthrough of the decision pipeline."
        slug="how-real-time-transaction-decisioning-works"
        datePublished={PUBLISHED}
      />
      <RevealInit />
      <section className="article-header">
        <div className="wrap">
          <div className="article-header-inner reveal">
            <div className="article-cat">Product</div>
            <h1>How Real-Time Transaction Decisioning Works</h1>
            <p className="article-header-desc">
              &ldquo;Sub-100ms compliance decision&rdquo; is easy to say. Here&apos;s what
              actually has to happen, in what order, to make that real.
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
          <h2 id="the-call">The call that starts it</h2>
          <p>
            Before your payment handler executes a transaction, it makes one synchronous API
            call to the decision layer with the transaction context: customer identifier, amount,
            currency, counterparty, and channel. The payment handler then waits — briefly — for a
            decision before proceeding.
          </p>
          <p>
            Everything described below has to complete within that wait, which is why
            architecture and latency budget matter as much as rule logic.
          </p>

          <h2 id="parallel-evaluation">What runs, in parallel, inside that call</h2>
          <p>
            The evaluation isn&apos;t a single check — it&apos;s several running concurrently:
          </p>
          <ul>
            <li><strong>Customer risk state lookup.</strong> The customer&apos;s current risk state, KYC tier, and any active restrictions are retrieved — this needs to be a fast lookup, not a slow query, since everything else depends on it.</li>
            <li><strong>Rule evaluation.</strong> Every configured rule relevant to this transaction type runs against the transaction and the customer&apos;s recent history — velocity, structuring, behavioural anomaly, and any others configured.</li>
            <li><strong>Screening check.</strong> The counterparty (and sender, if not already verified) is checked against sanctions, PEP, and adverse-media lists.</li>
            <li><strong>Tier/limit enforcement.</strong> The transaction is checked against the customer&apos;s KYC tier limit and any other configured hard limits.</li>
          </ul>
          <p>
            These run in parallel, not sequentially, because running them one after another would
            make the latency budget impossible to hit at any meaningful scale.
          </p>

          <div className="article-callout">
            <strong>Latency budget is an architecture decision, not an afterthought.</strong> A
            synchronous compliance call that takes 2 seconds adds 2 seconds to every payment in
            your product. Sub-100ms is achievable, but only if it&apos;s designed for from the
            start — not bolted onto a system built for batch processing.
          </div>

          <h2 id="the-verdict">Converging on one decision</h2>
          <p>
            Once every check completes, the results converge into a single decision using a
            defined precedence: BLOCKED outranks HELD_FOR_REVIEW, which outranks FLAGGED, which
            outranks CLEAR. If any single check produces a BLOCKED result — a sanctions match, say
            — that&apos;s the final decision regardless of what the other checks returned. This
            &ldquo;most restrictive wins&rdquo; logic is what keeps the combined decision
            defensible: no individual risk signal gets silently overridden by an unrelated clean
            result elsewhere.
          </p>

          <h2 id="acting-on-it">What happens after the decision returns</h2>
          <ul>
            <li><strong>CLEAR</strong> — the payment handler proceeds. No human involvement, but the decision and its full reasoning are still written to the evidence store.</li>
            <li><strong>FLAGGED</strong> — the payment handler proceeds, but a case is opened for review — the transaction isn&apos;t blocked, but it&apos;s not silently ignored either.</li>
            <li><strong>HELD_FOR_REVIEW</strong> — the transaction is held pending review before it&apos;s allowed to proceed.</li>
            <li><strong>BLOCKED</strong> — the transaction is declined (and reversed, if it had already partially executed) and a case is opened automatically.</li>
          </ul>

          <h2 id="writing-evidence">Writing the evidence, without adding to the latency</h2>
          <p>
            Writing the full evidence record — every rule evaluated, the customer state at that
            moment, the final decision — happens asynchronously relative to returning the
            decision to your payment handler, so evidence-writing doesn&apos;t add to the latency
            your users experience, while still completing fast enough that the record exists
            before any follow-up query would reasonably need it.
          </p>
          <p>
            This is the pipeline behind Fintegrity&apos;s{' '}
            <Link href="/compliance-decisioning-api">Compliance Decision API</Link> — parallel
            evaluation, a defined precedence for the final decision, and evidence written
            automatically to the{' '}
            <Link href="/audit-trail-and-reporting">audit trail</Link>, all inside a
            sub-100ms P99 budget.
          </p>
        </article>

        <aside className="article-sidebar">
          <div className="article-toc">
            <span className="article-toc-label">In this article</span>
            <ul className="article-toc-list">
              <li><a href="#the-call">The call that starts it</a></li>
              <li><a href="#parallel-evaluation">What runs in parallel</a></li>
              <li><a href="#the-verdict">Converging on one decision</a></li>
              <li><a href="#acting-on-it">What happens after</a></li>
              <li><a href="#writing-evidence">Writing evidence without adding latency</a></li>
            </ul>
          </div>
          <div className="article-sidebar-cta">
            <h4>See a decision happen live</h4>
            <p>Real transaction patterns, evaluated in real time, in a live walkthrough.</p>
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
