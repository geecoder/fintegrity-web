import type { Metadata } from 'next'
import Link from 'next/link'
import { formatDate } from '@/lib/blog'
import BreadcrumbJsonLd from '@/components/json-ld/BreadcrumbJsonLd'
import ArticleJsonLd from '@/components/json-ld/ArticleJsonLd'
import RevealInit from '@/components/RevealInit'

export const metadata: Metadata = {
  title: 'CLEAR, FLAGGED, HELD_FOR_REVIEW, BLOCKED: The Architecture of a Defensible Compliance Decision',
  description:
    'Binary pass/fail compliance checks fail at scale and under regulatory scrutiny. Here\'s why four decision states — with a customer risk lifecycle — is the right model, and how to wire it into your payment flow.',
  alternates: { canonical: 'https://www.getfintegrity.com/blog/allow-review-block-compliance-decisions' },
}

const PUBLISHED = '2026-04-02'

export default function AllowReviewBlockPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Blog', href: '/blog' },
        { name: 'CLEAR, FLAGGED, HELD_FOR_REVIEW, BLOCKED', href: '/blog/allow-review-block-compliance-decisions' },
      ]} />
      <ArticleJsonLd
        headline="CLEAR, FLAGGED, HELD_FOR_REVIEW, BLOCKED: The Architecture of a Defensible Compliance Decision"
        description="Binary pass/fail compliance checks fail at scale and under regulatory scrutiny. Here's why four decision states — with a customer risk lifecycle — is the right model, and how to wire it into your payment flow."
        slug="allow-review-block-compliance-decisions"
        datePublished={PUBLISHED}
      />
      <RevealInit />
      <section className="article-header">
        <div className="wrap">
          <div className="article-header-inner reveal">
            <div className="article-cat">Product</div>
            <h1>CLEAR, FLAGGED, HELD_FOR_REVIEW, BLOCKED: The Architecture of a Defensible Compliance Decision</h1>
            <p className="article-header-desc">
              Most compliance systems make a binary choice: pass or fail, proceed or stop. That
              binary model breaks at fintech scale, produces too many false positives, and can&apos;t
              represent the nuance regulators expect. Here&apos;s the case for four decision states
              and a customer risk lifecycle.
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
          <h2 id="why-binary-fails">Why binary compliance fails</h2>
          <p>
            Most transaction monitoring systems output one of two results: pass or flag. Pass means
            proceed. Flag means stop — or, in practice, drop the transaction into a queue where a
            compliance analyst manually reviews it, usually hours after the money has moved.
          </p>
          <p>
            This binary model has three fundamental problems:
          </p>
          <ul>
            <li><strong>It can&apos;t represent risk gradients.</strong> A transaction that&apos;s slightly unusual is not the same as a transaction that matches a known fraud pattern. Treating both as &ldquo;flagged&rdquo; collapses important information.</li>
            <li><strong>It generates alert floods.</strong> Tuning a binary system for sensitivity produces false positives at scale. A wallet processing a million transactions a day with a 0.1% flag rate has 1,000 alerts per day. No compliance team handles that.</li>
            <li><strong>It reviews after the fact.</strong> Batch-mode binary monitoring reviews transactions that have already completed. That&apos;s not pre-authorisation compliance — it&apos;s archaeology.</li>
          </ul>

          <div className="article-callout">
            <strong>The real question isn&apos;t &ldquo;did this transaction pass?&rdquo;</strong> It&apos;s
            &ldquo;what should my system do with this transaction, right now, before money moves?&rdquo;
            That question has four meaningful answers.
          </div>

          <h2 id="three-states">Four decision states, not two</h2>
          <p>
            The right compliance decision model has four states:
          </p>
          <ul>
            <li><strong>CLEAR:</strong> The transaction matches no suspicious patterns, the customer is in good standing, and all rules pass. The payment handler should proceed. This decision is still evidenced — every CLEAR is logged.</li>
            <li><strong>FLAGGED:</strong> Something about this transaction is worth a second look, but not severe enough to stop it. The transaction proceeds, and a case is created automatically so your compliance team can review it after the fact with the evidence already assembled.</li>
            <li><strong>HELD_FOR_REVIEW:</strong> Something about this transaction warrants a stop before it completes. The transaction is held while your compliance team investigates. A case is created automatically with the evidence assembled.</li>
            <li><strong>BLOCKED:</strong> The transaction meets the criteria for an immediate decline. The customer may be in a BLOCKED state, a rule may have reached a hard threshold, or a sanctions screening hit may have returned. Your payment handler should decline and, where appropriate, reverse any funds.</li>
          </ul>
          <p>
            This four-state model has a direct mapping to actions your payment handler takes:
            CLEAR and FLAGGED both → PROCEED (a FLAGGED decision also opens a case, but doesn&apos;t
            hold the money), HELD_FOR_REVIEW → HOLD_FOR_REVIEW, BLOCKED → DECLINE_AND_REVERSE. The
            compliance layer returns a decision; the payment handler executes it. The two
            responsibilities are cleanly separated.
          </p>

          <h2 id="risk-lifecycle">The customer risk lifecycle</h2>
          <p>
            Transaction-level decisions exist within a customer-level risk lifecycle. A customer
            doesn&apos;t just have a history of individual transactions — they have an overall risk
            state that affects how every subsequent transaction is evaluated.
          </p>
          <p>
            In Fintegrity&apos;s model, every customer is in one of three states at any point in time:
          </p>
          <div style={{ margin: '24px 0', display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {[
              {
                badge: 'ACTIVE',
                color: 'var(--allow)',
                bg: 'var(--allow-bg)',
                title: 'Normal operating state',
                body: 'Customer transactions proceed through full rule evaluation. The vast majority of customers are in this state at any given time.',
              },
              {
                badge: 'UNDER_REVIEW',
                color: '#92400E',
                bg: '#FFF3CD',
                title: 'Flagged for elevated monitoring',
                body: 'A pattern or investigation has flagged this customer. High-risk transactions are held for review. A case is open. State resolves to ACTIVE on clearance or BLOCKED on escalation.',
              },
              {
                badge: 'BLOCKED',
                color: 'var(--block)',
                bg: 'var(--block-bg)',
                title: 'All transactions declined',
                body: 'Every transaction for this customer returns a BLOCKED decision before rules run. This prevents compliance bypass through new devices, new channels, or transaction splitting.',
              },
            ].map((state) => (
              <div key={state.badge} style={{ display: 'flex', gap: '16px', padding: '18px', background: '#fff', border: '1px solid var(--line)', borderRadius: '12px' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', fontWeight: 700, padding: '4px 10px', borderRadius: '6px', background: state.bg, color: state.color, whiteSpace: 'nowrap', alignSelf: 'flex-start' }}>
                  {state.badge}
                </span>
                <div>
                  <strong style={{ display: 'block', marginBottom: '4px', fontSize: '0.97rem' }}>{state.title}</strong>
                  <p style={{ margin: 0 }}>{state.body}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 id="customer-level-block">Why BLOCKED must be customer-level, not transaction-level</h2>
          <p>
            This is one of the more subtle architectural decisions in compliance system design, and
            it&apos;s often missed.
          </p>
          <p>
            If BLOCKED is only a transaction-level decision, a bad actor can simply try a different
            channel, a different device, or a slightly different transaction to get a CLEAR result.
            The block is trivially circumvented by trying again.
          </p>
          <p>
            Customer-level blocking prevents this. When a customer is BLOCKED, every transaction
            for that customer ID returns a BLOCKED decision immediately — before any rules run. The
            pattern can&apos;t be gamed by changing the transaction parameters.
          </p>
          <p>
            The corollary is that transitioning a customer to BLOCKED (or back to ACTIVE) must be
            a deliberate, audited action — not an automatic rule outcome that can flip back. State
            transitions are enforced workflow steps, not side effects.
          </p>

          <div className="article-callout">
            <strong>If BLOCKED is only transaction-level, it can be circumvented.</strong> A BLOCKED
            customer must be blocked at the customer-state layer, so every subsequent transaction
            for that customer ID gets a hard stop before rules even run.
          </div>

          <h2 id="defensible">What &ldquo;defensible&rdquo; means in practice</h2>
          <p>
            A defensible compliance decision has three properties:
          </p>
          <ol>
            <li><strong>It was made before money moved.</strong> Post-transaction review is archaeology — you&apos;re describing what happened, not demonstrating you controlled it. Pre-authorisation decisions show you had a control in place.</li>
            <li><strong>It was based on explicit criteria.</strong> The reasons for the decision — which rules fired, what the customer&apos;s state was, what the transaction parameters were — must be recorded at decision time, not reconstructed later.</li>
            <li><strong>It is immutable.</strong> The record of the decision cannot be altered. A record that can be edited is not evidence — it&apos;s a document. An append-only store with server-side timestamps is evidence.</li>
          </ol>
          <p>
            This is what the <strong>evidenceRef</strong> in a Fintegrity decision response
            represents: a pointer to an immutable, structured record that satisfies all three
            properties. The decision was made in real time, with documented criteria, and the
            record cannot be altered.
          </p>

          <h2 id="integration">Wiring compliance decisions into your payment handler</h2>
          <p>
            The integration pattern is simple: before your payment handler executes a debit or
            credit, it calls <code style={{ fontFamily: 'var(--font-mono)', background: '#EBEEF3', padding: '2px 5px', borderRadius: '3px' }}>POST /v1/decide</code> with
            the transaction context. The decision comes back synchronously. The handler acts on it.
          </p>
          <p>
            The handler has four paths:
          </p>
          <ul>
            <li><strong>decision: CLEAR, requiredActions: [&quot;PROCEED&quot;]</strong> → execute the transaction normally</li>
            <li><strong>decision: FLAGGED, requiredActions: [&quot;PROCEED&quot;]</strong> → execute the transaction normally; a case opens automatically for your compliance team to review afterward</li>
            <li><strong>decision: HELD_FOR_REVIEW, requiredActions: [&quot;HOLD_FOR_REVIEW&quot;]</strong> → hold the transaction, notify the customer if applicable, log the hold for the compliance team to resolve</li>
            <li><strong>decision: BLOCKED, requiredActions: [&quot;DECLINE_AND_REVERSE&quot;]</strong> → decline the transaction, reverse any reserved funds, notify the customer per your product policy</li>
          </ul>
          <p>
            The key point is that the compliance layer tells your system what to do. Your system
            does it. The separation of concerns is clean, and the responsibility for the decision
            is clearly documented.
          </p>

          <div className="article-callout">
            <strong>The compliance layer decides. Your rails execute.</strong> That separation is
            what makes decisions defensible — the control happened before money moved, and the
            record shows it.
          </div>
        </article>

        <aside className="article-sidebar">
          <div className="article-toc">
            <span className="article-toc-label">In this article</span>
            <ul className="article-toc-list">
              <li><a href="#why-binary-fails">Why binary compliance fails</a></li>
              <li><a href="#three-states">Four decision states</a></li>
              <li><a href="#risk-lifecycle">Customer risk lifecycle</a></li>
              <li><a href="#customer-level-block">Customer-level blocking</a></li>
              <li><a href="#defensible">What &ldquo;defensible&rdquo; means</a></li>
              <li><a href="#integration">Wiring into your payment handler</a></li>
            </ul>
          </div>
          <div className="article-sidebar-cta">
            <h4>See the Decision API</h4>
            <p>Explore the four-state decision model in a live Fintegrity demo.</p>
            <Link href="/compliance-decisioning-api" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', fontSize: '0.88rem', padding: '10px 16px', marginBottom: '10px' }}>
              API overview →
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
