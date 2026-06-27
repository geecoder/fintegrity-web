import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import RevealInit from '@/components/RevealInit'
import BreadcrumbJsonLd from '@/components/json-ld/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Insights on AML compliance, transaction monitoring, and fintech regulatory infrastructure from the Fintegrity team. Written for compliance professionals and fintech builders in Nigeria.',
  alternates: { canonical: 'https://www.getfintegrity.com/blog' },
}

function formatDate(iso: string | null | undefined) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function BlogPage() {
  const payload = await getPayload({ config: configPromise })

  // Fetch published posts — the access layer already enforces the regulatory gate,
  // but we also make it explicit in the where clause.
  const { docs: posts } = await payload.find({
    collection: 'blog-posts',
    where: {
      and: [
        { _status: { equals: 'published' } },
        {
          or: [
            { contentType: { not_equals: 'regulatory' } },
            {
              and: [
                { contentType: { equals: 'regulatory' } },
                { reviewStatus: { equals: 'approved' } },
              ],
            },
          ],
        },
      ],
    },
    sort: '-publishedAt',
    depth: 0,
    limit: 20,
  })

  const featured = posts[0] ?? null
  const rest = posts.slice(1)

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
          {posts.length === 0 ? (
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
                      <div className="blog-card-cat">{featured.category as string | undefined}</div>
                      <h3>{featured.title as string}</h3>
                      <p className="blog-featured-excerpt">{featured.excerpt as string | undefined}</p>
                    </div>
                    <div className="blog-card-meta">
                      <span>{formatDate(featured.publishedAt as string | undefined)}</span>
                    </div>
                  </div>
                  <div className="blog-featured-visual">
                    <span className="blog-featured-eyebrow">Latest</span>
                    <p>{featured.title as string}</p>
                  </div>
                </Link>
              )}

              {/* Other posts */}
              {rest.map((post) => (
                <Link href={`/blog/${post.slug}`} key={post.slug as string} className="blog-card reveal">
                  <div className="blog-card-body">
                    <div className="blog-card-cat">{post.category as string | undefined}</div>
                    <h3>{post.title as string}</h3>
                    <p className="blog-card-excerpt">{post.excerpt as string | undefined}</p>
                    <div className="blog-card-meta">
                      <span>{formatDate(post.publishedAt as string | undefined)}</span>
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
