'use client'

import { useEffect, useId, useState } from 'react'
import styles from './PipelineInfographic.module.css'

type Stage = {
  step: string
  badge: string
  title: string
  body: string
  chipA: string
  chipB: string
  elapsed: string
  caption: string
  bars: number[]
  accent: string
}

// Stage data and bar-signature arrays are verbatim from CLAUDE-CODE-BRIEF.md
// section 15.2 (the pipeline interactive-state spec table).
const STAGES: Stage[] = [
  {
    step: '01',
    badge: 'Step 01 · pre-authorisation',
    title: 'Transaction received',
    body: 'Your handler calls Fintegrity before it moves money — inside the authorisation path, not after it.',
    chipA: 'POST /v1/decide',
    chipB: '₦450,000 · transfer',
    elapsed: '0 ms',
    caption: 'Request accepted',
    bars: [30, 26, 34, 28, 32, 30, 26, 34, 30, 28, 32, 30],
    accent: 'var(--fg-green-300)',
  },
  {
    step: '02',
    badge: 'Step 02 · customer state',
    title: 'Customer state checked',
    body: 'ACTIVE, UNDER_REVIEW or BLOCKED. A blocked customer stops here, before any rule runs.',
    chipA: 'state: ACTIVE',
    chipB: 'kyc tier: T2',
    elapsed: '2 ms',
    caption: 'Authoritative risk state',
    bars: [22, 22, 22, 96, 22, 22, 22, 22, 22, 22, 22, 22],
    accent: 'var(--fg-green-200)',
  },
  {
    step: '03',
    badge: 'Step 03 · rule library',
    title: 'Rule library evaluated',
    body: 'Velocity, thresholds, timing, counterparty and channel rules all fire in parallel.',
    chipA: '34 rules evaluated',
    chipB: '4 matched',
    elapsed: '9 ms',
    caption: 'Rules firing in parallel',
    bars: [44, 96, 30, 96, 52, 30, 96, 38, 96, 30, 44, 34],
    accent: 'var(--fg-green-300)',
  },
  {
    step: '04',
    badge: 'Step 04 · pattern analysis',
    title: 'Pattern analysis runs',
    body: "The transaction is read against this customer's own baseline, then against cross-customer patterns.",
    chipA: 'baseline: 90 days',
    chipB: '+312% vs usual',
    elapsed: '18 ms',
    caption: 'Deviation from baseline',
    bars: [26, 30, 28, 34, 30, 32, 44, 62, 78, 90, 96, 94],
    accent: 'var(--fg-ochre)',
  },
  {
    step: '05',
    badge: 'Step 05 · decision',
    title: 'Decision issued',
    body: 'One of four states, with the rules that fired and the exact action your system should take.',
    chipA: 'FLAGGED',
    chipB: 'action: PROCEED',
    elapsed: '31 ms',
    caption: 'Decision returned',
    bars: [96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96, 96],
    accent: 'var(--fg-green-300)',
  },
  {
    step: '06',
    badge: 'Step 06 · evidence',
    title: 'Evidence written',
    body: 'Appended to the immutable trail — and a structured case opens if the result warrants one.',
    chipA: 'evd_b91f4a72c',
    chipB: 'case_77e10',
    elapsed: '33 ms',
    caption: 'Written to the append-only trail',
    bars: [96, 88, 80, 72, 64, 56, 48, 40, 32, 26, 22, 20],
    accent: 'var(--fg-green-100)',
  },
]

export default function PipelineInfographic() {
  const [i, setI] = useState(0)
  const [pinned, setPinned] = useState(false)
  const liveRegionId = useId()

  useEffect(() => {
    if (pinned) return
    const timer = setInterval(() => {
      setI((prev) => (prev + 1) % STAGES.length)
    }, 2800)
    return () => clearInterval(timer)
  }, [pinned])

  const pin = (index: number) => {
    setI(index)
    setPinned(true)
  }

  const stage = STAGES[i]
  const dotLeft = `${(8.333 + i * 16.667).toFixed(2)}%`

  return (
    <div>
      <div className={styles.headRow}>
        <div>
          <div className={styles.eyebrow}>How it works</div>
          <h2 className={styles.h2}>From transaction to decision in milliseconds</h2>
        </div>
        <div className={styles.elapsedWrap}>
          <span className={`${styles.elapsedFigure} fg-num`}>{stage.elapsed}</span>
          <span className={styles.elapsedLabel}>elapsed at this step</span>
        </div>
      </div>

      <div className={styles.rail}>
        <div className={styles.track}>
          <div className={styles.fill} style={{ width: dotLeft }} />
          <div className={styles.marker} style={{ left: dotLeft }} />
        </div>
        <div className={styles.stepNumbers}>
          {STAGES.map((s, idx) => (
            <span
              key={s.step}
              className={idx === i ? styles.stepNumActive : styles.stepNum}
            >
              {s.step}
            </span>
          ))}
        </div>
      </div>

      <div className={styles.grid}>
        <div className={styles.stageList}>
          {STAGES.map((s, idx) => {
            const active = idx === i
            const completed = idx < i
            return (
              <button
                key={s.step}
                type="button"
                className={styles.stageButton}
                data-state={active ? 'active' : completed ? 'completed' : 'upcoming'}
                aria-current={active ? 'step' : undefined}
                aria-label={`${s.step} ${s.title}`}
                onClick={() => pin(idx)}
                onMouseEnter={() => pin(idx)}
              >
                <span className={styles.stageIndex}>{s.step}</span>
                <span className={styles.stageLabel}>{s.title}</span>
              </button>
            )
          })}
        </div>

        <div className={styles.detailPanel}>
          <div className={styles.detailHeader}>
            <span className={styles.badgeWrap}>
              <span className={styles.pulseDot} aria-hidden="true" />
              <span className={styles.badgeText}>{stage.badge}</span>
            </span>
            <span className={`${styles.txnId} fg-num`}>txn_9a7f21</span>
          </div>

          <div className={styles.detailBody}>
            <h3 className={styles.detailTitle}>{stage.title}</h3>
            <p className={styles.detailText}>{stage.body}</p>

            <div className={styles.chipRow}>
              <span className={`${styles.chip} fg-num`}>{stage.chipA}</span>
              <span className={`${styles.chip} fg-num`}>{stage.chipB}</span>
            </div>

            <div className={styles.bars} aria-hidden="true">
              {stage.bars.map((h, idx) => (
                <span
                  key={idx}
                  className={styles.bar}
                  style={{
                    height: `${h}%`,
                    background: h > 60 ? stage.accent : 'rgba(247, 243, 236, 0.22)',
                  }}
                />
              ))}
            </div>
            <div className={styles.caption}>{stage.caption}</div>
          </div>
        </div>
      </div>

      <p id={liveRegionId} className={styles.liveRegion} role="status" aria-live="polite">
        {stage.badge}: {stage.title}. {stage.caption}, {stage.elapsed} elapsed.
      </p>
    </div>
  )
}
