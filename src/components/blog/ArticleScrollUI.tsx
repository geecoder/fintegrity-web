'use client'

import { useEffect, useState } from 'react'
import styles from './ArticleScrollUI.module.css'

interface Heading {
  id: string
  label: string
}

interface Props {
  headings: Heading[]
}

/**
 * Client-side scroll behaviour for the article template:
 *  - a 2px scroll-progress bar pinned to the top of the viewport
 *  - the "On this page" TOC's active-section highlight
 *
 * Both are driven by one passive scroll listener, per the brief's rule that
 * the active section is "the last heading whose getBoundingClientRect().top
 * <= 160."  Position: fixed on the progress bar means its place in the DOM
 * (inside the sticky TOC aside) has no effect on where it renders.
 */
export default function ArticleScrollUI({ headings }: Props) {
  const [pct, setPct] = useState(0)
  const [activeId, setActiveId] = useState(headings[0]?.id ?? '')

  useEffect(() => {
    function onScroll() {
      const doc = document.documentElement
      const max = doc.scrollHeight - window.innerHeight
      const nextPct = max > 0 ? Math.min(100, Math.max(0, (window.scrollY / max) * 100)) : 0
      setPct(nextPct)

      let active = headings[0]?.id ?? ''
      for (const h of headings) {
        const el = document.getElementById(h.id)
        if (el && el.getBoundingClientRect().top <= 160) active = h.id
      }
      setActiveId(active)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
    // headings is static for the lifetime of the page
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <div className={styles.progressTrack} aria-hidden="true">
        <div className={styles.progressFill} style={{ width: `${pct.toFixed(1)}%` }} />
      </div>

      <nav className={styles.tocNav} aria-label="On this page">
        {headings.map((h) => (
          <a
            key={h.id}
            href={`#${h.id}`}
            className={h.id === activeId ? styles.tocLinkActive : styles.tocLink}
          >
            {h.label}
          </a>
        ))}
      </nav>
    </>
  )
}
