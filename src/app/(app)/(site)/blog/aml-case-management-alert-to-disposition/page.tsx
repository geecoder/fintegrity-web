import type { Metadata } from 'next'
import Link from 'next/link'
import { formatDate } from '@/lib/blog'
import BreadcrumbJsonLd from '@/components/json-ld/BreadcrumbJsonLd'
import ArticleJsonLd from '@/components/json-ld/ArticleJsonLd'
import RevealInit from '@/components/RevealInit'

export const metadata: Metadata = {
  title: 'AML Case Management: From Alert Creation to Final Disposition',
  description:
    'What happens to an alert between the moment it fires and the moment a case is closed — and where most case-management workflows lose the evidence trail along the way.',
  alternates: { canonical: 'https://www.getfintegrity.com/blog/aml-case-management-alert-to-disposition' },
}

const PUBLISHED = '2026-06-24'

export default function CaseManagementPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Blog', href: '/blog' },
        { name: 'AML Case Management', href: '/blog/aml-case-management-alert-to-disposition' },
      ]} />
      <ArticleJsonLd
        headline="AML Case Management: From Alert Creation to Final Disposition"
        description="What happens to an alert between the moment it fires and the moment a case is closed — and where most case-management workflows lose the evidence trail along the way."
        slug="aml-case-management-alert-to-disposition"
        datePublished={PUBLISHED}
      />
      <RevealInit />
      <section className="article-header">
        <div className="wrap">
          <div className="article-header-inner reveal">
            <div className="article-cat">Product</div>
            <h1>AML Case Management: From Alert Creation to Final Disposition</h1>
            <p className="article-header-desc">
              An alert that fires and disappears into a spreadsheet is a compliance liability, not
              a control. Here&apos;s what a defensible case lifecycle actually looks like.
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
          <h2 id="the-gap">The gap between an alert and a decision</h2>
          <p>
            A rule firing is the easy part. What determines whether a compliance programme
            actually works is what happens next: does the alert become a structured
            investigation with a documented outcome, or does it become an entry in a shared
            spreadsheet that someone eventually marks &ldquo;reviewed&rdquo; without a clear
            record of why?
          </p>
          <p>
            That gap — between alert and defensible disposition — is where most case-management
            processes lose the evidence trail an examiner would actually want to see.
          </p>

          <h2 id="lifecycle">The case lifecycle, stage by stage</h2>
          <ol>
            <li>
              <strong>Case creation.</strong> A rule fires (or several related rules fire) and a
              case is created automatically — not manually transcribed by an analyst — with the
              triggering transaction(s), the rule(s) that fired, and the customer&apos;s risk
              state at that moment already attached.
            </li>
            <li>
              <strong>Triage and assignment.</strong> The case is prioritised and assigned to an
              analyst. In a mature workflow, priority reflects the severity of the decision
              (BLOCKED and HELD_FOR_REVIEW cases before FLAGGED ones) and the customer&apos;s risk
              profile, not just a first-in-first-out queue.
            </li>
            <li>
              <strong>Investigation.</strong> The analyst reviews the evidence already assembled —
              related transaction history, prior cases for the same customer, the specific rule
              logic that fired — and documents their reasoning as they go, not just at the end.
            </li>
            <li>
              <strong>Escalation, if needed.</strong> Some cases need a second reviewer or MLRO
              sign-off before a final decision — particularly ones that may result in an STR
              filing or account-level action.
            </li>
            <li>
              <strong>Disposition.</strong> The case closes with a documented outcome: cleared,
              escalated to an STR, or resulting in an account action (hold, block, tier
              downgrade). The disposition itself — and the reasoning behind it — becomes part of
              the permanent record.
            </li>
          </ol>

          <div className="article-callout">
            <strong>The disposition reasoning is the evidence, not just the outcome.</strong> A
            case marked &ldquo;cleared&rdquo; with no documented rationale is barely better than
            no review at all, from an examiner&apos;s perspective. Why it was cleared matters as
            much as that it was.
          </div>

          <h2 id="common-failures">Where case-management workflows commonly break down</h2>
          <ul>
            <li><strong>Evidence lives in a different system than the case.</strong> An analyst has to manually pull transaction history from one system into a case note in another — slow, and prone to leaving gaps.</li>
            <li><strong>No link between related cases for the same customer.</strong> Each alert is investigated in isolation, missing the pattern across a customer&apos;s case history.</li>
            <li><strong>Disposition reasoning isn&apos;t structured.</strong> Free-text notes are better than nothing, but structured disposition categories make cases queryable later — &ldquo;show me every case closed for this specific reason in the last quarter&rdquo; becomes possible.</li>
            <li><strong>The case outcome doesn&apos;t feed back into the customer&apos;s risk state.</strong> A pattern of cleared-but-suspicious cases should influence future risk scoring; if it doesn&apos;t, the system doesn&apos;t actually learn from its own investigations.</li>
          </ul>

          <h2 id="closing-the-loop">Closing the loop from decision to evidence</h2>
          <p>
            The strongest case-management setups treat the case as a continuation of the original
            compliance decision, not a separate system bolted on afterward — the same evidence
            architecture that recorded the original CLEAR/FLAGGED/HELD_FOR_REVIEW/BLOCKED decision
            also carries the case investigation and its final disposition, so the whole lifecycle
            is one queryable record.
          </p>
          <p>
            That&apos;s how{' '}
            <Link href="/case-management">Fintegrity&apos;s case management</Link> is built —
            every alert becomes a structured case with evidence pre-assembled, and every
            disposition becomes part of the same immutable{' '}
            <Link href="/audit-trail-and-reporting">audit trail</Link>.
          </p>
        </article>

        <aside className="article-sidebar">
          <div className="article-toc">
            <span className="article-toc-label">In this article</span>
            <ul className="article-toc-list">
              <li><a href="#the-gap">The gap between alert and decision</a></li>
              <li><a href="#lifecycle">The case lifecycle</a></li>
              <li><a href="#common-failures">Where workflows break down</a></li>
              <li><a href="#closing-the-loop">Closing the loop</a></li>
            </ul>
          </div>
          <div className="article-sidebar-cta">
            <h4>See structured cases in action</h4>
            <p>Every alert becomes a case with evidence pre-assembled, not a spreadsheet row.</p>
            <Link href="/case-management" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', fontSize: '0.88rem', padding: '10px 16px', marginBottom: '10px' }}>
              Case management →
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
