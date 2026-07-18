import type { Metadata } from 'next'
import Link from 'next/link'
import { formatDate } from '@/lib/blog'
import BreadcrumbJsonLd from '@/components/json-ld/BreadcrumbJsonLd'
import RevealInit from '@/components/RevealInit'

export const metadata: Metadata = {
  title: 'CBN AML/CFT Baseline Standards: A Technical Breakdown',
  description:
    'The CBN\'s AML/CFT Baseline Standards define 12 requirements every regulated Nigerian fintech must meet. A technical breakdown of each standard and how compliance technology addresses it.',
  alternates: { canonical: 'https://www.getfintegrity.com/blog/cbnaml-baseline-standards' },
  openGraph: {
    title: 'CBN AML/CFT Baseline Standards: A Technical Breakdown for Nigerian Fintechs',
    description: '12 compliance standards. What they actually require. How technology helps.',
  },
}

const STANDARDS = [
  {
    num: 'S-01',
    title: 'AML/CFT Programme',
    desc: 'Fintechs must maintain a documented AML/CFT programme covering policies, procedures, and controls. Technology role: provides the controls infrastructure the programme document references.',
  },
  {
    num: 'S-02',
    title: 'Customer Due Diligence (CDD)',
    desc: 'Know your customer — BVN/NIN verification, identity checks, and risk classification at onboarding. Technology role: enforces tier limits based on CDD level at the transaction layer.',
  },
  {
    num: 'S-03',
    title: 'Enhanced Due Diligence (EDD)',
    desc: 'Stricter checks for high-risk customers, PEPs, and high-value relationships. Technology role: flags transactions from EDD-classified customers for elevated monitoring and review.',
  },
  {
    num: 'S-04',
    title: 'Ongoing Monitoring',
    desc: 'Continuous monitoring of customer transactions for suspicious patterns. Technology role: the core function of a transaction monitoring system operating in real time.',
  },
  {
    num: 'S-05',
    title: 'Transaction Monitoring',
    desc: 'Specific requirement for automated monitoring of transactions against configured scenarios. Technology role: automated rule evaluation, pattern detection, and alert generation.',
  },
  {
    num: 'S-06',
    title: 'Suspicious Transaction Reporting (STR)',
    desc: 'Timely filing of STRs/SARs for transactions that raise suspicion. Technology role: case management provides the evidence base for STR documentation.',
  },
  {
    num: 'S-07',
    title: 'Currency Transaction Reporting (CTR)',
    desc: 'Filing reports for cash transactions above NFIU thresholds (₦5M individuals, ₦10M corporates). Technology role: automatic threshold detection and reporting workflow.',
    note: 'NEEDS COMPLIANCE REVIEW — threshold values require verification against current NFIU guidance',
  },
  {
    num: 'S-08',
    title: 'Sanctions Screening',
    desc: 'Screening customers and counterparties against sanctions lists, PEP databases, and watchlists. Technology role: orchestrates screening provider calls and integrates results into the decision.',
  },
  {
    num: 'S-09',
    title: 'Record Keeping',
    desc: 'Retention of transaction records, CDD documentation, and STR/CTR filings for prescribed periods. Technology role: append-only evidence store with configurable retention periods.',
  },
  {
    num: 'S-10',
    title: 'Training',
    desc: 'Regular AML/CFT training for all relevant staff. Technology role: outside the scope of transaction monitoring technology, but case management workflows build analyst capability.',
  },
  {
    num: 'S-11',
    title: 'Risk Assessment',
    desc: 'Institution-level and customer-level risk assessments. Technology role: customer risk profiling and risk state management inform and operationalise the risk assessment.',
  },
  {
    num: 'S-12',
    title: 'Independent Audit',
    desc: 'Periodic independent testing of the AML/CFT programme. Technology role: audit trail, evidence packs, and decision records are the primary evidence for independent audit.',
  },
]

const PUBLISHED = '2026-03-15'

export default function CbnAmlBaselineStandardsPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[
        { name: 'Blog', href: '/blog' },
        { name: 'CBN AML/CFT Baseline Standards', href: '/blog/cbnaml-baseline-standards' },
      ]} />
      <RevealInit />
      {/* ── Article header ───────────────────────────────── */}
      <section className="article-header">
        <div className="wrap">
          <div className="article-header-inner reveal">
            <div className="article-cat">Regulation</div>
            <h1>CBN AML/CFT Baseline Standards: A Technical Breakdown for Nigerian Fintechs</h1>
            <p className="article-header-desc">
              The CBN&apos;s AML/CFT Baseline Standards set 12 mandatory requirements for every
              regulated financial institution. This guide breaks down what each standard actually
              requires and where compliance technology fits — written for engineering and compliance
              teams, not lawyers.
            </p>
            <div className="article-meta">
              <span>Fintegrity Team</span>
              <span>·</span>
              <span>{formatDate(PUBLISHED)}</span>
              <span>·</span>
              <span>12 min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Article body ─────────────────────────────────── */}
      <div className="article-wrap">
        <article className="article-body">
          <div className="article-notice">
            <strong>Disclaimer:</strong> This article is educational and reflects Fintegrity&apos;s
            understanding of publicly available CBN guidance. It is not legal advice. Verify all
            regulatory requirements against official CBN and NFIU circulars and consult a qualified
            compliance professional before making compliance decisions.
          </div>

          <h2>Why this matters now</h2>
          <p>
            The CBN&apos;s AML/CFT Baseline Standards aren&apos;t new — but enforcement has
            shifted. The question regulators are now asking isn&apos;t &ldquo;do you have a policy?&rdquo; It&apos;s
            &ldquo;show me the evidence that this transaction was reviewed before it processed.&rdquo; That
            shift from policy compliance to evidence-based compliance is what makes the technology
            layer so important.
          </p>
          <p>
            For most Nigerian fintechs, the gap between &ldquo;we have an AML programme&rdquo; and
            &ldquo;we can demonstrate every transaction was reviewed according to it&rdquo; is large.
            This guide is about closing that gap — standard by standard.
          </p>

          <div className="article-callout">
            <strong>The key shift:</strong> Regulators have moved from asking &ldquo;do you have a
            policy?&rdquo; to &ldquo;can you prove every transaction was evaluated against it?&rdquo; That
            requires technology, not documentation.
          </div>

          <h2>The 12 standards at a glance</h2>
          <p>
            The CBN&apos;s Baseline Standards cover 12 distinct requirements. They range from
            institutional-level programme requirements (S-01, S-11, S-12) to transaction-level
            controls (S-04, S-05, S-07, S-08) to recordkeeping and reporting requirements
            (S-06, S-07, S-09). Not all of them are technology problems — but most of the
            operational ones are.
          </p>
          <div className="article-standards-grid">
            {STANDARDS.map((s) => (
              <div key={s.num} className="article-std-card">
                <span className="article-std-num">{s.num}</span>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>

          <h2>The technology-addressable standards in depth</h2>

          <h3>S-04 and S-05: Ongoing monitoring and transaction monitoring</h3>
          <p>
            These two standards are where most Nigerian fintechs have the biggest gap. S-04
            requires continuous, ongoing monitoring of customer transactions. S-05 goes further:
            it specifically requires automated transaction monitoring against configured scenarios.
          </p>
          <p>
            &ldquo;Automated&rdquo; is the operative word. A compliance officer manually reviewing
            a daily report is not automated monitoring — and it&apos;s not ongoing. The direction
            of CBN guidance is toward real-time, pre-authorisation controls that evaluate
            transactions before they complete.
            {/* NEEDS COMPLIANCE REVIEW — characterisation of CBN direction toward real-time controls */}
          </p>
          <p>
            What &ldquo;configured scenarios&rdquo; means in practice: velocity rules (too many
            transactions in a rolling window), amount thresholds (absolute or relative), structuring
            patterns (sub-threshold sequences), and account-age rules (new accounts behaving like
            mule accounts). These scenarios should be configured to your specific business model —
            the patterns that matter for a digital wallet are different from those that matter for
            a remittance company.
          </p>

          <div className="article-callout">
            <strong>S-05 requires &ldquo;automated transaction monitoring.&rdquo;</strong> A
            compliance officer reading a spreadsheet is not automated monitoring. Technology that
            evaluates every transaction against configured scenarios before it executes is.
          </div>

          <h3>S-07: Currency Transaction Reporting</h3>
          <p>
            NFIU requires Currency Transaction Reports (CTRs) for cash transactions above ₦5M
            (individuals) and ₦10M (corporates), filed within 7 days.
            {/* NEEDS COMPLIANCE REVIEW — threshold values and filing windows */}
            Structuring to evade these thresholds — breaking transactions into smaller amounts —
            is itself an offence under MLPPA 2022.
          </p>
          <p>
            From a technology perspective, CTR compliance requires three things: threshold detection
            (identifying transactions at or above the reporting threshold), structuring detection
            (identifying patterns designed to stay below it), and a workflow for generating and
            filing the report. All three should be automated, not manual.
          </p>

          <h3>S-08: Sanctions screening</h3>
          <p>
            Every customer and counterparty should be screened against relevant sanctions lists
            (OFAC, UN, EU, NFIU), PEP databases, and adverse media sources. The CBN expects this
            screening to happen at onboarding and at intervals thereafter — and increasingly,
            on every transaction.
          </p>
          <p>
            The compliance technology role here is orchestration: not providing the screening data
            (that&apos;s your screening vendor&apos;s job), but calling the vendor, handling the
            response, integrating the result into the transaction decision, and creating a case when
            a hit is returned. Fintegrity plugs in your existing screening provider and incorporates
            the results into the real-time decision.
          </p>

          <h3>S-09: Record keeping</h3>
          <p>
            CBN requires financial institutions to retain transaction records, CDD documentation,
            STR/CTR filings, and investigation records for prescribed periods. The key word is
            &ldquo;retain&rdquo; — but regulators increasingly expect records that are not just
            retained but retrievable, structured, and verifiable.
          </p>
          <p>
            An append-only evidence store where every decision, state change, and case action is
            written with a server-side timestamp satisfies this requirement in a way that a
            spreadsheet archive does not.
          </p>

          <h2>The standards technology doesn&apos;t address</h2>
          <p>
            S-10 (training) and parts of S-01 (programme documentation) and S-12 (independent
            audit) are not technology problems. They require human expertise, internal governance,
            and qualified compliance professionals.
          </p>
          <p>
            Fintegrity is explicit about this boundary: we provide the controls infrastructure
            that your AML programme references and that your auditors test. We&apos;re not your
            MLRO and we don&apos;t replace your compliance team. We give them better tools and
            better evidence.
          </p>

          <div className="article-callout">
            <strong>The compliance technology boundary:</strong> Technology addresses the
            operational and controls requirements (S-04, S-05, S-07, S-08, S-09). Programme
            documentation, training, and independent audit are governance responsibilities that
            require qualified human expertise.
          </div>

          <h2>A practical implementation roadmap</h2>
          <p>
            If you&apos;re a Nigerian fintech looking to close your compliance gap, the practical
            order of priority is usually:
          </p>
          <ol>
            <li><strong>Get the decision layer in place first.</strong> A real-time decision API (S-04/S-05) gives you the infrastructure everything else plugs into.</li>
            <li><strong>Wire in sanctions screening</strong> via your existing provider (S-08). This can be done alongside or immediately after the decision layer.</li>
            <li><strong>Configure your rule library</strong> to your specific scenarios — velocity, thresholds, structuring patterns (S-05). Start with the highest-risk patterns for your business model.</li>
            <li><strong>Build out case management</strong> for investigation and STR workflow (S-06). This is where your compliance team lives.</li>
            <li><strong>Verify your record-keeping</strong> approach covers the retention periods and retrieval requirements of S-09.</li>
          </ol>

          <div className="article-notice">
            This roadmap reflects Fintegrity&apos;s product architecture and is not a substitute
            for qualified compliance advice. The order and scope of implementation should be
            validated against your specific regulatory classification, licence conditions, and
            MLRO guidance.
          </div>

          <h2>What Fintegrity addresses</h2>
          <p>
            Fintegrity&apos;s platform is designed to address the technology-addressable standards
            directly: real-time decision API and transaction monitoring (S-04, S-05), screening
            orchestration (S-08), automated threshold detection (S-07), case management and STR
            workflow (S-06), and append-only evidence recordkeeping (S-09). The programme
            documentation (S-01), training (S-10), risk assessment (S-11), and independent
            audit (S-12) remain your responsibility — Fintegrity gives your auditors the evidence
            they need to assess the controls.
          </p>
        </article>

        {/* Sidebar */}
        <aside className="article-sidebar">
          <div className="article-toc">
            <span className="article-toc-label">In this article</span>
            <ul className="article-toc-list">
              <li><a href="#why-this-matters-now">Why this matters now</a></li>
              <li><a href="#the-12-standards">The 12 standards at a glance</a></li>
              <li><a href="#s04-s05">S-04 & S-05: Transaction monitoring</a></li>
              <li><a href="#s07">S-07: CTR requirements</a></li>
              <li><a href="#s08">S-08: Sanctions screening</a></li>
              <li><a href="#s09">S-09: Record keeping</a></li>
              <li><a href="#roadmap">Implementation roadmap</a></li>
            </ul>
          </div>
          <div className="article-sidebar-cta">
            <h4>See the platform</h4>
            <p>Explore how Fintegrity addresses S-04 through S-09 in a live demo.</p>
            <Link href="/book-a-demo" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '0.88rem', padding: '10px 16px' }}>
              Book a demo →
            </Link>
          </div>
        </aside>
      </div>
    </>
  )
}
