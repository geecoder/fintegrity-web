import type { Metadata } from 'next'
import Link from 'next/link'
import { BLOG_POSTS, formatDate } from '@/lib/blog'
import RevealInit from '@/components/RevealInit'
import BreadcrumbJsonLd from '@/components/json-ld/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Insights on AML compliance, transaction monitoring, and fintech regulatory infrastructure from the Fintegrity team. Written for compliance professionals and fintech builders in Nigeria.',
  alternates: { canonical: 'https://www.getfintegrity.com/blog' },
}

export default function BlogPage() {
  const featured = BLOG_POSTS.find((p) => p.featured) ?? BLOG_POSTS[0] ?? null
  const rest = BLOG_POSTS.filter((p) => p !== featured)

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Blog', href: '/blog' }]} />
      <RevealInit />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="blog-hero">
        <div className="wrap">
          <div className="reveal">
            <span className="sec-eyebrow">Blog</span>
            <h1 className="sec-title" style={{ maxWidth: 'none' }}>
              Compliance intelligence for African fintechs
            </h1>
            <p className="sec-intro" style={{ marginTop: '14px' }}>
              Technical guides, regulatory breakdowns, and product thinking from the Fintegrity
              team. Written for compliance engineers and fintech founders building in Nigeria.
            </p>
          </div>
        </div>
      </section>

      {/* ── Posts grid ───────────────────────────────────── */}
      <section style={{ padding: '64px 0 100px' }}>
        <div className="wrap">
          {BLOG_POSTS.length === 0 ? (
            <p style={{ color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
              No posts yet. Check back soon.
            </p>
          ) : (
            <div className="blog-index-grid">

              {/* Featured post */}
              {featured && (
                <Link href={`/blog/${featured.slug}`} className="blog-card blog-featured reveal">
                  <div className="blog-featured-body">
                    <div>
                      <div className="blog-card-cat">{featured.category}</div>
                      <h3>{featured.title}</h3>
                      <p className="blog-featured-excerpt">{featured.description}</p>
                    </div>
                    <div className="blog-card-meta">
                      <span>{formatDate(featured.publishedAt)}</span>
                    </div>
                  </div>
                  <div className="blog-featured-visual">
                    <span className="blog-featured-eyebrow">Latest</span>
                    <p>{featured.title}</p>
                  </div>
                </Link>
              )}

              {/* Other posts */}
              {rest.map((post) => (
                <Link href={`/blog/${post.slug}`} key={post.slug} className="blog-card reveal">
                  <div className="blog-card-body">
                    <div className="blog-card-cat">{post.category}</div>
                    <h3>{post.title}</h3>
                    <p className="blog-card-excerpt">{post.description}</p>
                    <div className="blog-card-meta">
                      <span>{formatDate(post.publishedAt)}</span>
                    </div>
                    <span className="blog-card-read">Read article →</span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
