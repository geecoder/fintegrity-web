import type { Metadata } from 'next'
import Link from 'next/link'
import { formatDate } from '@/lib/blog'
import BreadcrumbJsonLd from '@/components/json-ld/BreadcrumbJsonLd'
import ArticleJsonLd from '@/components/json-ld/ArticleJsonLd'
import RevealInit from '@/components/RevealInit'

export const metadata: Metadata = {
  title: 'A Practical Guide to AML Transaction Monitoring for Nigerian Fintechs',
  description:
    'What transaction monitoring actually involves for a Nigerian fintech — from rule types to alert workflows to the evidence a regulator expects — laid out practically, not theoretically.',
  alternates: { canonical: 'https://www.getfintegrity.com/blog/aml-transaction-monitoring-guide-nigeria' },
}

const PUBLISHED = '2026-05-20'

export default function AmlMonitoringGuidePage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Blog', href: '/blog' },
        { name: 'AML Transaction Monitoring Guide', href: '/blog/aml-transaction-monitoring-guide-nigeria' },
      ]} />
      <ArticleJsonLd
        headline="A Practical Guide to AML Transaction Monitoring for Nigerian Fintechs"
        description="What transaction monitoring actually involves for a Nigerian fintech — from rule types to alert workflows to the evidence a regulator expects — laid out practically, not theoretically."
        slug="aml-transaction-monitoring-guide-nigeria"
        datePublished={PUBLISHED}
      />
      <RevealInit />
      <section className="article-header">
        <div className="wrap">
          <div className="article-header-inner reveal">
            <div className="article-cat">Compliance</div>
            <h1>A Practical Guide to AML Transaction Monitoring for Nigerian Fintechs</h1>
            <p className="article-header-desc">
              &ldquo;Transaction monitoring&rdquo; means something different depending on who you
              ask — a rules list, a dashboard, a regulatory checkbox. Here&apos;s what it actually
              involves in practice, for a fintech operating in Nigeria today.
            </p>
            <div className="article-meta">
              <span>Fintegrity Team</span>
              <span>·</span>
              <span>{formatDate(PUBLISHED)}</span>
              <span>·</span>
              <span>9 min read</span>
            </div>
          </div>
        </div>
      </section>

      <div className="article-wrap">
        <article className="article-body">
          <h2 id="what-it-is">What transaction monitoring actually is</h2>
          <p>
            Transaction monitoring is the ongoing evaluation of customer transactions against a
            set of rules designed to surface money-laundering, fraud, or sanctions-evasion
            patterns. It is not the same thing as KYC (which happens at onboarding) or sanctions
            screening (which checks identities against lists) — though all three feed into the
            same overall compliance picture, and a mature setup evaluates them together rather
            than as disconnected systems.
          </p>
          <p>
            In practice, transaction monitoring for a Nigerian fintech has three layers: the
            rules that evaluate each transaction, the customer risk state that contextualises
            the evaluation, and the workflow that turns a rule firing into an investigated,
            documented decision.
          </p>

          <h2 id="rule-types">The rule types that actually matter</h2>
          <p>
            Most monitoring programmes converge on a similar core rule set, tuned to the
            business model:
          </p>
          <ul>
            <li><strong>Velocity rules</strong> — flag an unusual number or value of transactions in a rolling window, relative to the customer&apos;s own baseline, not a flat threshold.</li>
            <li><strong>Structuring detection</strong> — identify sequences of transactions designed to stay under reporting thresholds.
              {/* NEEDS COMPLIANCE REVIEW — confirm current NFIU currency transaction reporting thresholds before citing specific figures */}
            </li>
            <li><strong>New-account monitoring</strong> — apply elevated sensitivity to accounts in their first 30–90 days, where mule-account abuse concentrates.</li>
            <li><strong>Counterparty aggregation</strong> — treat transactions to the same counterparty across a window as one economic event, not isolated data points.</li>
            <li><strong>Behavioural anomaly</strong> — compare a transaction to the customer&apos;s own historical pattern, not just a fixed rule.</li>
          </ul>
          <p>
            None of these rules work well in isolation. A velocity rule without counterparty
            aggregation misses structuring across multiple recipients. New-account monitoring
            without behavioural baselines can&apos;t distinguish a legitimately active new
            customer from an abusive one. The rules need to work as a system.
          </p>

          <div className="article-callout">
            <strong>Rules without a risk-state layer just generate noise.</strong> A ₦200,000
            transfer means something different from a customer with a ₦5,000 average transaction
            size than one who regularly moves ₦300,000. Monitoring that ignores customer context
            drowns your analysts in false positives.
          </div>

          <h2 id="alert-workflow">From alert to decision</h2>
          <p>
            A rule firing is not, by itself, a compliance outcome — it&apos;s the start of a
            workflow. What happens next determines whether monitoring is actually effective:
          </p>
          <ol>
            <li><strong>The rule fires and a decision is returned</strong> — ideally before the transaction settles, not after.</li>
            <li><strong>The decision routes to the right place.</strong> A CLEAR decision needs no human involvement. FLAGGED proceeds but opens a case for review. HELD_FOR_REVIEW or BLOCKED requires action before or instead of execution.</li>
            <li><strong>An analyst investigates</strong> with the evaluation context already attached — which rule fired, the customer&apos;s risk state, related transaction history — rather than starting from a raw transaction log.</li>
            <li><strong>A disposition is recorded</strong> — the case is closed, escalated, or results in an STR filing, and that decision itself becomes part of the evidence record.</li>
          </ol>

          <h2 id="evidence">What a regulator actually expects to see</h2>
          <p>
            When the CBN or NFIU asks about a specific transaction or customer, the answer that
            holds up is a contemporaneous record: what rules evaluated the transaction, what the
            customer&apos;s risk state was at that moment, what decision was made, and when — not
            a narrative reconstructed after the fact from scattered logs and spreadsheets.
          </p>
          <p>
            This means the evidence requirement isn&apos;t just about generating alerts — it&apos;s
            about writing an immutable record of every evaluation, including the CLEAR decisions
            that never became alerts. A regulator asking &ldquo;how was this specific transaction
            handled?&rdquo; deserves an answer for the clean transactions too, not just the
            flagged ones.
          </p>

          <h2 id="getting-started">Where to start if you&apos;re building this today</h2>
          <p>
            If your fintech is still relying on manual review or a basic rules list, the practical
            starting point isn&apos;t a complete rebuild — it&apos;s:
          </p>
          <ul>
            <li>Get a real-time decision in the critical path for your highest-risk transaction types first.</li>
            <li>Establish one authoritative customer risk state, rather than scattered flags across systems.</li>
            <li>Make sure every decision — including CLEAR — writes to an evidence record automatically, not manually.</li>
            <li>Build the case-management workflow before you need it for an examiner request, not during one.</li>
          </ul>
          <p>
            This is exactly the architecture Fintegrity is built around — see{' '}
            <Link href="/transaction-monitoring">how our transaction monitoring works</Link> or
            how it fits{' '}
            <Link href="/nigeria">specifically for the Nigerian market</Link>.
          </p>
        </article>

        <aside className="article-sidebar">
          <div className="article-toc">
            <span className="article-toc-label">In this article</span>
            <ul className="article-toc-list">
              <li><a href="#what-it-is">What transaction monitoring is</a></li>
              <li><a href="#rule-types">Rule types that matter</a></li>
              <li><a href="#alert-workflow">From alert to decision</a></li>
              <li><a href="#evidence">What regulators expect</a></li>
              <li><a href="#getting-started">Where to start</a></li>
            </ul>
          </div>
          <div className="article-sidebar-cta">
            <h4>See transaction monitoring in action</h4>
            <p>Fintegrity evaluates transactions in real time using your own rule configuration.</p>
            <Link href="/transaction-monitoring" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', fontSize: '0.88rem', padding: '10px 16px', marginBottom: '10px' }}>
              Transaction monitoring →
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
