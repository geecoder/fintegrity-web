import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { BLOG_POSTS, formatDate, getBlogPost, getRelatedPosts } from '@/lib/blog'
import { getArticleContent } from '@/content/blog'
import { SITE_URL, LINKEDIN_URL, DEVELOPER_DOCS_URL } from '@/lib/config'
import BreadcrumbJsonLd from '@/components/json-ld/BreadcrumbJsonLd'
import BlogPostingJsonLd from '@/components/json-ld/BlogPostingJsonLd'
import ArticleBody from '@/components/blog/ArticleBody'
import ArticleScrollUI from '@/components/blog/ArticleScrollUI'
import styles from './page.module.css'

interface Props {
  params: Promise<{ slug: string }>
}

const DEFAULT_CTA = {
  title: 'See the Decision API',
  body: 'Explore the four-state decision model in a live Fintegrity demo.',
}

export function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getBlogPost(slug)
  if (!post) return {}

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `${SITE_URL}/blog/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishedAt,
      url: `${SITE_URL}/blog/${slug}`,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
    },
  }
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params
  const post = getBlogPost(slug)
  const content = getArticleContent(slug)

  if (!post || !content) notFound()

  const headings = content.blocks
    .filter((b): b is { type: 'h2'; id: string; text: string } => b.type === 'h2')
    .map((b) => ({ id: b.id, label: b.text }))

  const cta = content.cta ?? DEFAULT_CTA
  const related = getRelatedPosts(slug, 2)

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Blog', href: '/blog' },
          { name: post.title, href: `/blog/${slug}` },
        ]}
      />
      <BlogPostingJsonLd
        slug={slug}
        title={post.title}
        description={post.description}
        publishedAt={post.publishedAt}
        category={post.category}
      />

      <article>
        <header className={styles.header}>
          <div className="fg-container">
            <div className={styles.breadcrumb}>
              <Link href="/blog" className={styles.breadcrumbLink}>Blog</Link>
              <span className={styles.breadcrumbSep}>/</span>
              <span className={styles.breadcrumbCategory}>{post.category}</span>
            </div>

            <h1 className={styles.h1}>{post.title}</h1>
            <p className={styles.dek}>{post.description}</p>

            <div className={styles.byline}>
              <span className={styles.avatar} aria-hidden="true">
                <svg viewBox="0 0 96 96" width="16" height="16">
                  <rect x="14" y="10" width="13" height="76" fill="#F7F3EC" />
                  <rect x="14" y="10" width="54" height="13" fill="#F7F3EC" />
                  <path d="M35 57L48 70L76 39" fill="none" stroke="#0E9F6E" strokeWidth="13" />
                </svg>
              </span>
              <span className={styles.bylineName}>Fintegrity Team</span>
              <span className={styles.bylineDot}>·</span>
              <span className={`${styles.bylineMeta} fg-num`}>{formatDate(post.publishedAt)}</span>
              <span className={styles.bylineDot}>·</span>
              <span className={styles.bylineMeta}>{post.readTime} read</span>
            </div>
          </div>
        </header>

        <div className={`fg-container ${styles.layout}`}>
          <aside className={styles.tocAside}>
            <div className={styles.tocLabel}>On this page</div>
            <ArticleScrollUI headings={headings} />
            <div className={styles.tocLinks}>
              <a
                href={LINKEDIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.tocSideLink}
              >
                Share on LinkedIn ↗
              </a>
              <a
                href={DEVELOPER_DOCS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.tocSideLink}
              >
                Read the API reference ↗
              </a>
            </div>
          </aside>

          <div className={styles.bodyCol}>
            <ArticleBody blocks={content.blocks} />

            <div className={styles.ctaCard}>
              <div>
                <h3 className={styles.ctaTitle}>{cta.title}</h3>
                <p className={styles.ctaBody}>{cta.body}</p>
              </div>
              <div className={styles.ctaButtons}>
                <Link href="/products/transaction-monitoring/decision-api" className={styles.btnGhost}>
                  API overview →
                </Link>
                <Link href="/demo" className={styles.btnPrimary}>
                  Book a demo →
                </Link>
              </div>
            </div>

            {related.length > 0 && (
              <div className={styles.keepReading}>
                <div className={styles.keepReadingLabel}>Keep reading</div>
                <div className={styles.keepReadingGrid}>
                  {related.map((r) => (
                    <Link href={`/blog/${r.slug}`} key={r.slug} className={styles.keepReadingCard}>
                      <span className={styles.keepReadingCategory}>{r.category}</span>
                      <span className={styles.keepReadingTitle}>{r.title}</span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </article>
    </>
  )
}
