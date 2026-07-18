import type { Metadata } from 'next'
import Link from 'next/link'
import { formatDate } from '@/lib/blog'
import BreadcrumbJsonLd from '@/components/json-ld/BreadcrumbJsonLd'
import ArticleJsonLd from '@/components/json-ld/ArticleJsonLd'
import RevealInit from '@/components/RevealInit'

export const metadata: Metadata = {
  title: 'How Nigerian PSPs Can Reduce AML False Positives',
  description:
    'Alert fatigue is a compliance risk, not just an efficiency problem. Practical rule-tuning approaches PSPs can use to cut false positives without loosening real controls.',
  alternates: { canonical: 'https://www.getfintegrity.com/blog/reduce-aml-false-positives-nigerian-psps' },
}

const PUBLISHED = '2026-06-10'

export default function ReduceFalsePositivesPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Blog', href: '/blog' },
        { name: 'Reducing AML False Positives', href: '/blog/reduce-aml-false-positives-nigerian-psps' },
      ]} />
      <ArticleJsonLd
        headline="How Nigerian PSPs Can Reduce AML False Positives"
        description="Alert fatigue is a compliance risk, not just an efficiency problem. Practical rule-tuning approaches PSPs can use to cut false positives without loosening real controls."
        slug="reduce-aml-false-positives-nigerian-psps"
        datePublished={PUBLISHED}
      />
      <RevealInit />
      <section className="article-header">
        <div className="wrap">
          <div className="article-header-inner reveal">
            <div className="article-cat">Compliance</div>
            <h1>How Nigerian PSPs Can Reduce AML False Positives</h1>
            <p className="article-header-desc">
              A high false-positive rate isn&apos;t just inefficient — it&apos;s a compliance
              risk. Analysts drowning in noise miss the alerts that actually matter. Here&apos;s
              how to tune rules without loosening real controls.
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
          <h2 id="why-it-matters">Why false positives are a compliance problem, not just an ops one</h2>
          <p>
            It&apos;s tempting to treat a high false-positive rate as a resourcing issue — hire
            more analysts, work through the backlog faster. But alert fatigue has a direct
            compliance consequence: analysts reviewing hundreds of low-quality alerts a day
            develop pattern-matching shortcuts that cause them to miss the genuine positives
            buried in the noise. A monitoring system that generates too many false positives is,
            functionally, a monitoring system that catches less real risk than a well-tuned one
            with a lower alert volume.
          </p>

          <h2 id="root-causes">Where false positives actually come from</h2>
          <p>
            In PSP environments specifically, false positives tend to cluster around a few root
            causes:
          </p>
          <ul>
            <li><strong>Flat thresholds applied to a diverse merchant base.</strong> A velocity rule tuned for a small merchant flags every transaction from a high-volume merchant as anomalous — because the rule has no concept of merchant-specific baselines.</li>
            <li><strong>No behavioural baseline per customer.</strong> Rules that compare against a fixed number rather than the customer&apos;s own transaction history flag routine activity for active customers and miss genuinely anomalous activity for quiet ones.</li>
            <li><strong>Duplicate alerts across disconnected systems.</strong> When screening, monitoring, and fraud tools each generate separate alerts for the same underlying transaction, analysts review the same event three times under three different labels.</li>
            <li><strong>Rules that were never revisited after go-live.</strong> Default configurations are a starting point, not a permanent setting — and most teams don&apos;t have a process for periodically reviewing rule performance.</li>
          </ul>

          <h2 id="tuning-approaches">Tuning approaches that actually work</h2>
          <ol>
            <li>
              <strong>Segment thresholds by merchant/customer profile, not one flat rule.</strong>{' '}
              A rule that scales with the customer or merchant&apos;s own historical volume
              catches genuine anomalies for both high- and low-volume accounts, instead of being
              tuned to the average and missing both extremes.
            </li>
            <li>
              <strong>Simulate before you deploy.</strong> Run a proposed rule change against
              recent historical transactions before it goes live, and look at the actual alert
              volume and estimated false-positive rate it would have produced — not just whether
              it &ldquo;seems reasonable.&rdquo;
            </li>
            <li>
              <strong>Deduplicate at the decision layer.</strong> If screening, monitoring, and
              fraud detection converge into a single decision rather than three separate alert
              streams, analysts see one case with full context instead of three fragments of it.
            </li>
            <li>
              <strong>Review rule performance on a schedule, not reactively.</strong> A quarterly
              review of which rules are firing, at what volume, and with what disposition rate
              tells you which rules need retuning before they become a backlog problem.
            </li>
          </ol>

          <div className="article-callout">
            <strong>Tuning down noise is not the same as loosening controls.</strong> A rule that
            fires on genuine risk with fewer false positives is a better control than a loose
            rule that fires constantly on low-quality signals. The goal is precision, not volume.
          </div>

          <h2 id="how-fintegrity-helps">Where simulation and configuration help</h2>
          <p>
            This is precisely why Fintegrity&apos;s{' '}
            <Link href="/rules-engine">Rules Engine</Link> supports simulating a rule change
            against historical transaction data before it affects a live decision — so tuning is
            evidence-based, not guesswork, and your{' '}
            <Link href="/solutions/payment-service-providers">PSP-specific configuration</Link>{' '}
            can evolve as your merchant base and transaction patterns do.
          </p>
        </article>

        <aside className="article-sidebar">
          <div className="article-toc">
            <span className="article-toc-label">In this article</span>
            <ul className="article-toc-list">
              <li><a href="#why-it-matters">Why this is a compliance issue</a></li>
              <li><a href="#root-causes">Where false positives come from</a></li>
              <li><a href="#tuning-approaches">Tuning approaches that work</a></li>
              <li><a href="#how-fintegrity-helps">Where simulation helps</a></li>
            </ul>
          </div>
          <div className="article-sidebar-cta">
            <h4>Simulate rule changes before deploying</h4>
            <p>Test against real transaction history before a rule ever affects a live decision.</p>
            <Link href="/rules-engine" className="btn btn-ghost" style={{ width: '100%', justifyContent: 'center', fontSize: '0.88rem', padding: '10px 16px', marginBottom: '10px' }}>
              Rules engine →
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
