import type { Metadata } from 'next'
import Link from 'next/link'
import { formatDate, getFeaturedPost, getPostsByDateDesc } from '@/lib/blog'
import BreadcrumbJsonLd from '@/components/json-ld/BreadcrumbJsonLd'
import BlogIndexFilter from '@/components/blog/BlogIndexFilter'
import NewsletterForm from '@/components/blog/NewsletterForm'
import styles from './page.module.css'

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Technical guides, regulatory breakdowns, and product thinking from the Fintegrity team. Written for compliance engineers and fintech founders building in Nigeria.',
  alternates: { canonical: 'https://www.getfintegrity.com/blog' },
}

const featured = getFeaturedPost()
const posts = getPostsByDateDesc()

export default function BlogIndexPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Blog', href: '/blog' }]} />

      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section className={styles.hero}>
        <div className="fg-container">
          <div className={styles.eyebrow}>Blog</div>
          <div className={styles.heroGrid}>
            <h1 className={styles.h1}>Compliance intelligence for African fintechs</h1>
            <p className={styles.lede}>
              Technical guides, regulatory breakdowns, and product thinking from the Fintegrity
              team. Written for compliance engineers and fintech founders building in Nigeria.
            </p>
          </div>
        </div>
      </section>

      {/* ── Featured post ────────────────────────────────────────────── */}
      <section className={styles.featuredSection}>
        <div className="fg-container">
          <Link href={`/blog/${featured.slug}`} className={styles.featuredCard}>
            <div className={styles.featuredBody}>
              <div className={styles.featuredMetaRow}>
                <span className={styles.categoryChip}>{featured.category}</span>
                <span className={`${styles.latestLabel} fg-num`}>Latest</span>
              </div>
              <h2 className={styles.featuredTitle}>{featured.title}</h2>
              <p className={styles.featuredDek}>{featured.description}</p>
              <div className={styles.featuredFooter}>
                <span className={`${styles.featuredDate} fg-num`}>{formatDate(featured.publishedAt)}</span>
                <span className={styles.featuredCta}>Read the breakdown →</span>
              </div>
            </div>
            <div className={styles.featuredVisual} aria-hidden="true">
              <div className={styles.featuredWash} />
              <div className={styles.featuredGrid} />
              <div className={styles.featuredFigureWrap}>
                <div className={styles.featuredFigureLabel}>Standards covered</div>
                <div className={`${styles.featuredFigure} fg-num`}>12</div>
              </div>
            </div>
          </Link>
        </div>
      </section>

      {/* ── Filter + post list ───────────────────────────────────────── */}
      <section className={styles.listSection}>
        <div className="fg-container">
          <BlogIndexFilter posts={posts} />

          {/* ── Subscribe ──────────────────────────────────────────── */}
          <div className={styles.subscribe}>
            <div>
              <h3 className={styles.subscribeTitle}>Compliance thinking, not marketing email.</h3>
              <p className={styles.subscribeBody}>
                New regulatory breakdowns and technical guides as we publish them. No product
                announcements.
              </p>
            </div>
            <NewsletterForm />
          </div>
        </div>
      </section>
    </>
  )
}
