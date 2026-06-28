export const dynamic = 'force-dynamic'
import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import LexicalRenderer from '@/components/blocks/LexicalRenderer'
import RevealInit from '@/components/RevealInit'
import BreadcrumbJsonLd from '@/components/json-ld/BreadcrumbJsonLd'

type Props = { params: Promise<{ slug: string }> }

async function getPost(slug: string, isDraft: boolean) {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'blog-posts',
    where: {
      and: [
        { slug: { equals: slug } },
        // Public compliance gate enforced at the access layer, but also
        // explicit here so draft mode never bypasses regulatory check.
        ...(isDraft
          ? []
          : [
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
            ]),
      ],
    },
    draft: isDraft,
    overrideAccess: isDraft,
    depth: 1,
    limit: 1,
  })
  return docs[0] ?? null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { isEnabled } = await draftMode()
  const post = await getPost(slug, isEnabled)
  if (!post) return {}

  return {
    title: post.seo?.title || post.title,
    description: post.seo?.description || post.excerpt || undefined,
    alternates: { canonical: `https://www.getfintegrity.com/blog/${slug}` },
    openGraph: post.seo?.ogImage
      ? { images: [{ url: (post.seo.ogImage as { url: string }).url }] }
      : undefined,
  }
}

function formatDate(iso: string | null | undefined) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const { isEnabled: isDraft } = await draftMode()

  const post = await getPost(slug, isDraft)
  if (!post) notFound()

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Blog', href: '/blog' },
          { name: post.title as string, href: `/blog/${slug}` },
        ]}
      />
      <RevealInit />

      {isDraft && (
        <div style={{
          position: 'fixed', bottom: 16, right: 16, zIndex: 9999,
          background: '#1a1840', color: '#fff', padding: '8px 14px',
          borderRadius: 8, fontSize: '0.78rem', fontFamily: 'var(--font-mono)',
          display: 'flex', gap: 10, alignItems: 'center'
        }}>
          <span>Draft preview</span>
          <a href={`/api/draft/disable?slug=/blog/${slug}`} style={{ color: 'var(--cyan)', textDecoration: 'underline' }}>Exit</a>
        </div>
      )}

      <article>
        <header className="article-hero">
          <div className="wrap">
            <div className="article-content reveal">
              <div className="article-meta">
                {post.category && <span className="article-cat">{post.category as string}</span>}
                {post.category && post.publishedAt && <span>·</span>}
                {post.publishedAt && <time dateTime={post.publishedAt as string}>{formatDate(post.publishedAt as string)}</time>}
                {post.contentType === 'regulatory' && (
                  <span style={{ color: 'var(--amber)', fontWeight: 600 }}>Regulatory reference [NEEDS COMPLIANCE REVIEW]</span>
                )}
              </div>
              <h1 className="article-h1">{post.title as string}</h1>
              {post.excerpt && (
                <p className="article-excerpt">{post.excerpt as string}</p>
              )}
            </div>
          </div>
        </header>

        <div className="article-body">
          <div className="wrap">
            <div className="article-content cms-richtext reveal">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <LexicalRenderer data={(post as any).body} />
            </div>
          </div>
        </div>
      </article>

      <section style={{ borderTop: '1px solid var(--line)', padding: '48px 0' }}>
        <div className="wrap">
          <Link href="/blog" className="btn btn-ghost">← Back to Blog</Link>
        </div>
      </section>
    </>
  )
}
