'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import type { BlogPost } from '@/lib/blog'
import { BLOG_CATEGORIES, formatDate } from '@/lib/blog'
import styles from './BlogIndexFilter.module.css'

interface Props {
  posts: BlogPost[]
}

type Filter = 'all' | BlogPost['category']

export default function BlogIndexFilter({ posts }: Props) {
  const [filter, setFilter] = useState<Filter>('all')

  const counts = useMemo(() => {
    const out: Record<Filter, number> = { all: posts.length, Compliance: 0, Product: 0, Regulation: 0, Engineering: 0 }
    for (const p of posts) out[p.category] += 1
    return out
  }, [posts])

  const filtered = filter === 'all' ? posts : posts.filter((p) => p.category === filter)
  const countLabel = `${filtered.length} ${filtered.length === 1 ? 'post' : 'posts'}`

  return (
    <div>
      <div className={styles.filterRow}>
        <div className={styles.pills} role="group" aria-label="Filter posts by category">
          <button
            type="button"
            className={filter === 'all' ? styles.pillActive : styles.pill}
            aria-pressed={filter === 'all'}
            onClick={() => setFilter('all')}
          >
            All posts
          </button>
          {BLOG_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              className={filter === cat ? styles.pillActive : styles.pill}
              aria-pressed={filter === cat}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
        <span className={`${styles.countLabel} fg-num`} aria-live="polite">
          {countLabel}
        </span>
      </div>

      <div className={styles.list}>
        {filtered.map((post) => (
          <Link href={`/blog/${post.slug}`} key={post.slug} className={styles.row}>
            <span className={`${styles.rowDate} fg-num`}>{formatDate(post.publishedAt)}</span>
            <span className={styles.rowCategory}>{post.category}</span>
            <span className={styles.rowMain}>
              <span className={styles.rowTitle}>{post.title}</span>
              <span className={styles.rowDek}>{post.description}</span>
            </span>
            <span className={styles.rowArrow} aria-hidden="true">→</span>
          </Link>
        ))}
      </div>
    </div>
  )
}
