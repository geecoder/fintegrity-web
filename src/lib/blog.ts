export type BlogCategory = 'Compliance' | 'Product' | 'Regulation' | 'Engineering'

export interface BlogPost {
  slug: string
  title: string
  /** Shown as the index-row dek and the article-header dek. */
  description: string
  category: BlogCategory
  publishedAt: string
  readTime: string
  featured?: boolean
}

// Order matches CONTENT-COPY-DECK.md "## BLOG INDEX" — oldest first. The
// index page reverses this (newest first) for display; sitemap.ts and the
// "keep reading" picker use this canonical order directly.
export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'cbnaml-baseline-standards',
    title: 'CBN AML/CFT Baseline Standards: A Technical Breakdown for Nigerian Fintechs',
    description:
      "The CBN's AML/CFT Baseline Standards define 12 requirements every regulated fintech must meet. Here's what each standard actually requires — and how compliance technology addresses it.",
    category: 'Regulation',
    publishedAt: '2026-03-15',
    readTime: '12 min',
    featured: true,
  },
  {
    slug: 'allow-review-block-compliance-decisions',
    title: 'CLEAR, FLAGGED, HELD_FOR_REVIEW, BLOCKED: The Architecture of a Defensible Compliance Decision',
    description:
      "Binary pass/fail compliance checks fail at scale and under regulatory scrutiny. Here's why four decision states — with a customer risk lifecycle — is the right model, and how to build it.",
    category: 'Product',
    publishedAt: '2026-04-02',
    readTime: '8 min',
  },
  {
    slug: 'real-time-vs-batch-aml',
    title: 'Why Batch AML Monitoring Fails at Nigerian Fintech Scale',
    description:
      "Reviewing transactions after they've processed isn't compliance — it's archaeology. Here's the case for pre-authorisation AML monitoring and what it means for your compliance architecture.",
    category: 'Compliance',
    publishedAt: '2026-05-10',
    readTime: '6 min',
  },
  {
    slug: 'aml-transaction-monitoring-guide-nigeria',
    title: 'A Practical Guide to AML Transaction Monitoring for Nigerian Fintechs',
    description:
      'What transaction monitoring actually involves for a Nigerian fintech — from rule types to alert workflows to the evidence a regulator expects — laid out practically, not theoretically.',
    category: 'Compliance',
    publishedAt: '2026-05-20',
    readTime: '9 min',
  },
  {
    slug: 'transaction-monitoring-rules-digital-wallets',
    title: 'Transaction-Monitoring Rules Every Digital Wallet Should Consider',
    description:
      'Mule accounts, rapid in-out, structuring, velocity gaming — the specific abuse patterns digital wallets face, and the rule types that actually catch them.',
    category: 'Product',
    publishedAt: '2026-05-27',
    readTime: '7 min',
  },
  {
    slug: 'transaction-screening-vs-monitoring',
    title: "Transaction Screening vs Transaction Monitoring: What's the Difference?",
    description:
      "Two terms that get used interchangeably and shouldn't be. What each one actually does, where they overlap, and why you need both, not one or the other.",
    category: 'Compliance',
    publishedAt: '2026-06-03',
    readTime: '5 min',
  },
  {
    slug: 'reduce-aml-false-positives-nigerian-psps',
    title: 'How Nigerian PSPs Can Reduce AML False Positives',
    description:
      'Alert fatigue is a compliance risk, not just an efficiency problem. Practical rule-tuning approaches PSPs can use to cut false positives without loosening real controls.',
    category: 'Compliance',
    publishedAt: '2026-06-10',
    readTime: '7 min',
  },
  {
    slug: 'regulator-ready-audit-trail-payment-decisions',
    title: 'Building a Regulator-Ready Audit Trail for Payment Decisions',
    description:
      'What actually makes an audit trail defensible to an examiner — and why most transaction logs fall short of it. A technical breakdown of evidence architecture.',
    category: 'Compliance',
    publishedAt: '2026-06-17',
    readTime: '8 min',
  },
  {
    slug: 'aml-case-management-alert-to-disposition',
    title: 'AML Case Management: From Alert Creation to Final Disposition',
    description:
      'What happens to an alert between the moment it fires and the moment a case is closed — and where most case-management workflows lose the evidence trail along the way.',
    category: 'Product',
    publishedAt: '2026-06-24',
    readTime: '7 min',
  },
  {
    slug: 'monitor-cross-border-remittance-transactions',
    title: 'How to Monitor Cross-Border Remittance Transactions',
    description:
      'Corridor risk, dual-jurisdiction exposure, and sanctions reach — the specific monitoring challenges of cross-border remittance, and how to structure rules around them.',
    category: 'Compliance',
    publishedAt: '2026-07-01',
    readTime: '7 min',
  },
  {
    slug: 'build-vs-buy-transaction-monitoring-engine',
    title: 'Build vs Buy: Should Your Fintech Build Its Own Transaction-Monitoring Engine?',
    description:
      'The honest tradeoffs — engineering time, ongoing rule maintenance, evidence architecture, and opportunity cost — before you commit to building AML infrastructure in-house.',
    category: 'Engineering',
    publishedAt: '2026-07-08',
    readTime: '8 min',
  },
  {
    slug: 'how-real-time-transaction-decisioning-works',
    title: 'How Real-Time Transaction Decisioning Works',
    description:
      'What actually happens in the milliseconds between a transaction request and a CLEAR/FLAGGED/HELD_FOR_REVIEW/BLOCKED decision — a technical walkthrough of the decision pipeline.',
    category: 'Product',
    publishedAt: '2026-07-11',
    readTime: '7 min',
  },
  {
    slug: 'compliance-checklist-digital-wallet-launch-nigeria',
    title: 'A Compliance Checklist for Launching a Digital Wallet in Nigeria',
    description:
      'The compliance infrastructure decisions to make before launch, not after — KYC tiering, monitoring, screening, case management, and evidence, in the order they actually matter.',
    category: 'Compliance',
    publishedAt: '2026-07-15',
    readTime: '8 min',
  },
]

export const BLOG_CATEGORIES: BlogCategory[] = ['Compliance', 'Product', 'Regulation', 'Engineering']

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug)
}

/** Newest-first order, for the index page. */
export function getPostsByDateDesc(): BlogPost[] {
  return [...BLOG_POSTS].sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1))
}

export function getFeaturedPost(): BlogPost {
  return BLOG_POSTS.find((p) => p.featured) ?? getPostsByDateDesc()[0]
}

/** Next two posts after `slug` in canonical order, wrapping around — used
 * for the article template's "keep reading" grid. */
export function getRelatedPosts(slug: string, count = 2): BlogPost[] {
  const ordered = getPostsByDateDesc()
  const i = ordered.findIndex((p) => p.slug === slug)
  if (i === -1) return ordered.slice(0, count)
  const out: BlogPost[] = []
  for (let n = 1; out.length < count && n <= ordered.length; n++) {
    const candidate = ordered[(i + n) % ordered.length]
    if (candidate.slug !== slug) out.push(candidate)
  }
  return out
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}
