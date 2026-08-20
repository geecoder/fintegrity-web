'use client'

import { useEffect, useState } from 'react'
import styles from './LiveStrip.module.css'

// HERO-SPEC.md §5.2 — reproduce this behaviour exactly. Start value 128409,
// step every 900ms by 1-4 inclusive, en-US grouping. This is sandbox
// telemetry, never production volume — the caption says so on purpose.
const START = 128409
const INTERVAL_MS = 900

const BARS: { color: string; delayMs: number }[] = [
  { color: '#0E9F6E', delayMs: 0 },
  { color: '#0E9F6E', delayMs: 120 },
  { color: '#0E9F6E', delayMs: 240 },
  { color: '#3DDCA0', delayMs: 360 },
  { color: '#3DDCA0', delayMs: 480 },
  { color: '#7FE3C8', delayMs: 600 },
]

// Fixed site-wide per HERO-SPEC.md §5.2 — HELD's dot here is the brief's
// literal measured value (#B4472B), distinct from the token file's
// --fg-held-fg (#9A3A22, tuned for text/backgrounds elsewhere). Both are
// intentional; don't reconcile them into one value.
const LEGEND: { label: string; dot: string }[] = [
  { label: 'CLEAR', dot: '#0E9F6E' },
  { label: 'FLAGGED', dot: '#B48A2E' },
  { label: 'HELD', dot: '#B4472B' },
  { label: 'BLOCKED', dot: '#9B2C2C' },
]

export default function LiveStrip() {
  const [decided, setDecided] = useState(START)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const timer = setInterval(() => {
      setDecided((n) => n + 1 + Math.floor(Math.random() * 4))
    }, INTERVAL_MS)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className={styles.strip}>
      <div className={styles.cell} aria-label="Decisions evidenced in sandbox, updating live">
        <div className={styles.counterRow}>
          <span className={`${styles.counter} fg-num`} aria-hidden="true">{decided.toLocaleString('en-US')}</span>
          <span className={styles.counterArrow} aria-hidden="true">▲</span>
        </div>
        <div className={styles.caption}>decisions evidenced in sandbox</div>
      </div>

      <div className={styles.divider} />

      <div className={styles.cell}>
        <div className={styles.bars} role="img" aria-label="Latency distribution, P99 under 50 milliseconds">
          {BARS.map((bar, i) => (
            <span
              key={i}
              className={styles.bar}
              style={{ background: bar.color, height: '40%', animationDelay: `${bar.delayMs}ms` }}
            />
          ))}
        </div>
        <div className={styles.caption}>
          P99 under <span className={`${styles.captionFigure} fg-num`}>50 ms</span>
        </div>
      </div>

      <div className={styles.divider} />

      <ul className={styles.legend}>
        {LEGEND.map((item) => (
          <li key={item.label}>
            <span className={styles.legendDot} style={{ background: item.dot }} aria-hidden="true" />
            {item.label}
          </li>
        ))}
      </ul>
    </div>
  )
}
