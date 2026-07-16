import type { Metadata } from 'next'
import Link from 'next/link'
import { formatDate } from '@/lib/blog'
import BreadcrumbJsonLd from '@/components/json-ld/BreadcrumbJsonLd'
import RevealInit from '@/components/RevealInit'

export const metadata: Metadata = {
  title: 'Why Batch AML Monitoring Fails at Nigerian Fintech Scale',
  description:
    'Reviewing transactions after they\'ve already processed isn\'t compliance — it\'s archaeology. Here\'s the case for pre-authorisation AML monitoring and what it means for your compliance architecture.',
  alternates: { canonical: 'https://www.getfintegrity.com/blog/real-time-vs-batch-aml' },
}

const PUBLISHED = '2026-05-10'

export default function RealTimeVsBatchPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Blog', href: '/blog' },
        { name: 'Real-time vs Batch AML', href: '/blog/real-time-vs-batch-aml' },
      ]} />
      <RevealInit />
      <section className="article-header">
        <div className="wrap">
          <div className="article-header-inner reveal">
            <div className="article-cat">Compliance</div>
            <h1>Why Batch AML Monitoring Fails at Nigerian Fintech Scale</h1>
            <p className="article-header-desc">
              Reviewing transactions after they&apos;ve already processed isn&apos;t compliance
              monitoring — it&apos;s forensic accounting. By the time a batch run flags a
              suspicious transaction, the money has moved, the mule has cashed out, and the
              evidence window has narrowed. Here&apos;s why the industry is shifting to
              pre-authorisation monitoring.
            </p>
            <div className="article-meta">
              <span>Fintegrity Team</span>
              <span>·</span>
              <span>{formatDate(PUBLISHED)}</span>
              <span>·</span>
              <span>6 min read</span>
            </div>
          </div>
        </div>
      </section>

      <div className="article-wrap">
        <article className="article-body">
          <h2>The standard approach and why it breaks</h2>
          <p>
            The standard AML monitoring approach at most Nigerian fintechs looks like this:
            transactions are processed in real time, a batch job runs overnight or at intervals
            during the day, the batch job applies rules to the transaction history, and alerts
            are generated for anything suspicious. The compliance team reviews the alerts the
            next morning.
          </p>
          <p>
            This approach made sense when transaction volumes were low and speeds were slow.
            It does not make sense for a digital wallet processing 100,000 transactions a day
            and settling in under a minute.
          </p>
          <p>
            Three specific failure modes emerge at Nigerian fintech scale:
          </p>
          <ul>
            <li>
              <strong>The money has moved by the time you flag it.</strong> Batch monitoring
              reviews completed transactions. If a transaction is suspicious, the funds have
              already settled. You can file an STR, but you cannot stop the transaction or
              reverse the funds without additional action — action that&apos;s now much harder
              to take.
            </li>
            <li>
              <strong>Mule account abuse completes in hours.</strong> A mule account is funded,
              funds are swept to multiple accounts, and the receiving accounts cash out —
              sometimes within two to three hours of the initial deposit. A T+1 batch run
              never catches this pattern while any recovery is possible.
            </li>
            <li>
              <strong>Structuring windows collapse.</strong> Structured transactions — amounts
              broken up to stay below CTR thresholds — can be completed within a single day.
              Batch monitoring that looks at daily aggregates may never aggregate across the
              full pattern.
            </li>
          </ul>

          <div className="article-callout">
            <strong>By the time a batch run flags a mule account, the money is gone.</strong>
            The window between a suspicious transaction and an irreversible one is often hours.
            Batch monitoring misses it every time.
          </div>

          <h2>What &ldquo;real-time&rdquo; actually means</h2>
          <p>
            Real-time monitoring in the context of AML compliance has a specific architectural
            meaning: the evaluation happens <em>before</em> the transaction is authorised, not
            after it completes. This is the pre-authorisation model.
          </p>
          <p>
            The implementation pattern: before your payment handler executes a debit or credit,
            it makes a synchronous call to the compliance decision layer. The compliance layer
            evaluates the transaction — customer state, rules, patterns — and returns a decision.
            The payment handler acts on the decision. If the decision is BLOCK, the transaction
            never executes.
          </p>
          <p>
            The alternative is the post-authorisation model: the transaction executes first, and
            the compliance evaluation happens after. This is where batch monitoring lives, and it&apos;s
            where the failure modes described above live too.
          </p>
          <p>
            Pre-authorisation compliance has several requirements that batch monitoring doesn&apos;t:
          </p>
          <ul>
            <li><strong>Low latency.</strong> A synchronous compliance call that takes 2 seconds adds 2 seconds to your payment flow. Sub-50ms P99 is the minimum viable target.</li>
            <li><strong>High availability.</strong> If your compliance layer is down, your payment flow is blocked. Uptime requirements are at least as strict as your payment infrastructure.</li>
            <li><strong>Stateless evaluation.</strong> Each decision call must be self-contained. The compliance layer looks up state (customer risk state, transaction history) rather than relying on shared session state.</li>
          </ul>

          <h2>The evidence argument for pre-authorisation</h2>
          <p>
            Beyond preventing harm, pre-authorisation monitoring makes a stronger compliance
            argument than post-authorisation monitoring.
          </p>
          <p>
            When a regulator asks &ldquo;how did you handle this transaction?&rdquo;, the best
            answer is: &ldquo;Before it executed, our system evaluated it against our configured
            rules and made a decision. Here is the decision record, timestamped before the
            transaction completed, showing what rules ran and what we decided.&rdquo;
          </p>
          <p>
            The post-authorisation answer is: &ldquo;The transaction processed. Our batch job
            later identified it as suspicious and we filed an STR.&rdquo; The first answer shows
            a control. The second shows a detection — after the fact.
          </p>
          <p>
            CBN guidance is explicit that regulated institutions should have effective transaction
            monitoring controls. Whether &ldquo;effective&rdquo; eventually mandates pre-authorisation
            monitoring explicitly is a question of regulatory interpretation — but the direction
            of travel is clear.
            {/* NEEDS COMPLIANCE REVIEW — characterisation of CBN regulatory direction */}
          </p>

          <div className="article-callout">
            <strong>Pre-authorisation monitoring produces evidence that a control was in place.</strong>
            Post-authorisation monitoring produces evidence that a transaction was reviewed
            retrospectively. For a regulator, these are different things.
          </div>

          <h2>Practical migration path</h2>
          <p>
            If you&apos;re running batch monitoring today, moving to pre-authorisation isn&apos;t
            a one-day migration. The practical path:
          </p>
          <ol>
            <li>
              <strong>Start with the highest-risk transaction types.</strong> Apply pre-authorisation
              monitoring to transfers above a threshold, withdrawals to new counterparties, or
              your highest-fraud-exposure flows first. Keep batch for everything else while you
              build confidence in the synchronous system.
            </li>
            <li>
              <strong>Run both systems in parallel for a period.</strong> Pre-authorisation in
              &ldquo;observe mode&rdquo; (decision is logged but not enforced) gives you a
              comparison baseline and confidence before you switch to enforcement.
            </li>
            <li>
              <strong>Define your response to each decision state upfront.</strong> Before going
              live, your engineering and product teams need clear, agreed behaviour for each
              decision state (ALLOW/REVIEW/BLOCK) in every transaction flow.
            </li>
            <li>
              <strong>Tune, don&apos;t just deploy.</strong> Default rule configurations are a
              starting point. High false-positive rates will undermine both your user experience
              and your compliance team&apos;s capacity. Plan for a tuning period with your
              compliance team.
            </li>
          </ol>

          <h2>What this means for your technology stack</h2>
          <p>
            Pre-authorisation AML monitoring requires an architecture decision: the compliance
            decision layer must be in the critical path of your payment processing. This is a
            meaningful change from batch monitoring, which runs offline.
          </p>
          <p>
            Fintegrity is designed for this architecture. The Decision API is synchronous and
            optimised for P99 latency under 50ms. It maintains the customer risk state and rule
            configuration so your payment handler can call it without session state. It handles
            its own availability so you can treat it like infrastructure, not a feature.
          </p>
          <p>
            The result: your payment handler makes one API call before executing. Everything else
            — rule evaluation, pattern detection, case creation, evidence writing — happens in
            Fintegrity, invisible to your users, before money moves.
          </p>
        </article>

        <aside className="article-sidebar">
          <div className="article-toc">
            <span className="article-toc-label">In this article</span>
            <ul className="article-toc-list">
              <li><a href="#standard-approach">Why batch monitoring breaks</a></li>
              <li><a href="#real-time">What real-time actually means</a></li>
              <li><a href="#evidence">The evidence argument</a></li>
              <li><a href="#migration">Practical migration path</a></li>
              <li><a href="#stack">Technology stack implications</a></li>
            </ul>
          </div>
          <div className="article-sidebar-cta">
            <h4>See pre-auth monitoring in action</h4>
            <p>Fintegrity demonstrates live pre-authorisation monitoring with your transaction patterns.</p>
            <Link href="/transaction-monitoring" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', fontSize: '0.88rem', padding: '10px 16px', marginBottom: '10px' }}>
              Transaction monitoring →
            </Link>
            <Link href="/book-a-demo" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.88rem', padding: '10px 16px' }}>
              Request a demo →
            </Link>
          </div>
        </aside>
      </div>
    </>
  )
}
