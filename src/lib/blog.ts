export interface BlogPost {
  slug: string
  title: string
  description: string
  category: string
  publishedAt: string
  readTime: string
  featured?: boolean
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'cbnaml-baseline-standards',
    title: 'CBN AML/CFT Baseline Standards: A Technical Breakdown for Nigerian Fintechs',
    description:
      'The CBN\'s AML/CFT Baseline Standards define 12 requirements every regulated fintech must meet. Here\'s what each standard actually requires — and how compliance technology addresses it.',
    category: 'Regulation',
    publishedAt: '2026-03-15',
    readTime: '12 min',
    featured: true,
  },
  {
    slug: 'allow-review-block-compliance-decisions',
    title: 'ALLOW, REVIEW, BLOCK: The Architecture of a Defensible Compliance Decision',
    description:
      'Binary pass/fail compliance checks fail at scale and under regulatory scrutiny. Here\'s why three decision states — with a customer risk lifecycle — is the right model, and how to build it.',
    category: 'Product',
    publishedAt: '2026-04-02',
    readTime: '8 min',
  },
  {
    slug: 'real-time-vs-batch-aml',
    title: 'Why Batch AML Monitoring Fails at Nigerian Fintech Scale',
    description:
      'Reviewing transactions after they\'ve processed isn\'t compliance — it\'s archaeology. Here\'s the case for pre-authorisation AML monitoring and what it means for your compliance architecture.',
    category: 'Compliance',
    publishedAt: '2026-05-10',
    readTime: '6 min',
  },
]

export function getBlogPost(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug)
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}
