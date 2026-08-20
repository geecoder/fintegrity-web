'use client'

import { useEffect, useId, useRef, useState } from 'react'
import styles from './ScreeningDemo.module.css'

type FieldState = 'clear' | 'review' | 'hit'

type Field = {
  name: string
  value: string
  state: FieldState
  mono?: boolean
}

type CaseStatus = 'pending' | 'frozen'

type Scenario = {
  key: 'clean' | 'narration' | 'sanctions'
  tabLabel: string
  amount: string
  latency: string
  fields: Field[]
  score: string
  list: string
  action: 'RELEASE' | 'HOLD' | 'REJECT'
  headline: string
  detail: string
  caseId: string | null
  caseStatus: CaseStatus | null
}

const SCENARIOS: Scenario[] = [
  {
    key: 'clean',
    tabLabel: 'Clean payment',
    amount: '₦180,000',
    latency: '22 ms',
    fields: [
      { name: 'Sender', value: 'Adaeze Nwosu', state: 'clear' },
      { name: 'Beneficiary', value: 'Bello Ibrahim', state: 'clear' },
      { name: 'Bank / BIC', value: '058 · GTBNGLA', state: 'clear', mono: true },
      { name: 'Intermediary', value: 'none', state: 'clear' },
      { name: 'Narration', value: 'rent balance', state: 'clear' },
    ],
    score: '0.00',
    list: '—',
    action: 'RELEASE',
    headline: 'No field matched. The payment settles.',
    detail:
      'All five fields were screened against every enabled list. The clear result is written to the evidence trail with the list versions used.',
    caseId: null,
    caseStatus: null,
  },
  {
    key: 'narration',
    tabLabel: 'Narration hit',
    amount: '₦2,400,000',
    latency: '28 ms',
    fields: [
      { name: 'Sender', value: 'Chinedu Okafor', state: 'clear' },
      { name: 'Beneficiary', value: 'Sahel Trading Ltd', state: 'clear' },
      { name: 'Bank / BIC', value: '033 · UBANNGLA', state: 'clear', mono: true },
      { name: 'Intermediary', value: 'none', state: 'clear' },
      { name: 'Narration', value: 'aid transfer Damasak', state: 'review' },
    ],
    score: '0.71',
    list: 'Geo risk terms',
    action: 'HOLD',
    headline: 'The narration triggered a hold, not the names.',
    detail:
      'Reference-text screening matched a geographic risk term. The payment is held for an analyst rather than blocked outright — the pattern most screening tools miss entirely.',
    caseId: 'case_ps_31f8a',
    caseStatus: 'pending',
  },
  {
    key: 'sanctions',
    tabLabel: 'Sanctions match',
    amount: '₦7,850,000',
    latency: '19 ms',
    fields: [
      { name: 'Sender', value: 'Musa Abdullahi', state: 'clear' },
      { name: 'Beneficiary', value: 'M. Abdulahi', state: 'hit' },
      { name: 'Bank / BIC', value: '044 · ACCESSNGLA', state: 'clear', mono: true },
      { name: 'Intermediary', value: 'Bank of Kunlun', state: 'hit' },
      { name: 'Narration', value: 'equipment purchase', state: 'clear' },
    ],
    score: '0.94',
    list: 'OFAC SDN',
    action: 'REJECT',
    headline: 'Beneficiary and intermediary both matched sanctions.',
    detail:
      'A fuzzy match on a transliterated beneficiary name, plus a sanctioned intermediary institution. The payment is declined and the match evidence is frozen at decision time.',
    caseId: 'case_ps_44c02',
    caseStatus: 'frozen',
  },
]

const FIELD_STATE_CLASS: Record<FieldState, string> = {
  clear: styles.fieldStateClear,
  review: styles.fieldStateReview,
  hit: styles.fieldStateHit,
}

const FIELD_STATE_LABEL: Record<FieldState, string> = {
  clear: 'CLEAR',
  review: 'REVIEW',
  hit: 'HIT',
}

const ACTION_CLASS: Record<Scenario['action'], string> = {
  RELEASE: styles.actionRelease,
  HOLD: styles.actionHold,
  REJECT: styles.actionReject,
}

export default function ScreeningDemo() {
  const [index, setIndex] = useState(0)
  const [focusPending, setFocusPending] = useState(false)
  const scenario = SCENARIOS[index]
  const tablistId = useId()
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  useEffect(() => {
    if (focusPending) {
      tabRefs.current[index]?.focus()
      setFocusPending(false)
    }
  }, [index, focusPending])

  const onTabKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      setIndex((i) => (i + 1) % SCENARIOS.length)
      setFocusPending(true)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      setIndex((i) => (i - 1 + SCENARIOS.length) % SCENARIOS.length)
      setFocusPending(true)
    }
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Payment screening scenario"
        id={tablistId}
        className={styles.tabs}
        onKeyDown={onTabKeyDown}
      >
        {SCENARIOS.map((s, i) => (
          <button
            key={s.key}
            ref={(el) => { tabRefs.current[i] = el }}
            role="tab"
            type="button"
            id={`${tablistId}-tab-${s.key}`}
            aria-selected={i === index}
            aria-controls={`${tablistId}-panel-${s.key}`}
            tabIndex={i === index ? 0 : -1}
            className={i === index ? styles.tabActive : styles.tab}
            onClick={() => setIndex(i)}
          >
            {s.tabLabel}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`${tablistId}-panel-${scenario.key}`}
        aria-labelledby={`${tablistId}-tab-${scenario.key}`}
        className={styles.panel}
      >
        <div className={styles.grid}>
          <div className={styles.fieldsCard}>
            <div className={styles.fieldsHeader}>
              <span className={`${styles.fieldsHeaderMono} fg-num`}>NIP outbound · {scenario.amount}</span>
              <span className={`${styles.fieldsHeaderMono} fg-num`}>{scenario.latency}</span>
            </div>
            <div className={styles.fieldsBody}>
              {scenario.fields.map((f) => (
                <div key={f.name} className={styles.fieldRow}>
                  <span className={styles.fieldName}>{f.name}</span>
                  <span className={f.mono ? `${styles.fieldValue} ${styles.fieldValueMono} fg-num` : styles.fieldValue}>
                    {f.value}
                  </span>
                  <span className={`${styles.fieldState} ${FIELD_STATE_CLASS[f.state]}`}>
                    {FIELD_STATE_LABEL[f.state]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.resultColumn}>
            <div className={styles.resultCard}>
              <div className={styles.resultHead}>
                <span className={styles.resultLabel}>Screening result</span>
                <span className={`${styles.actionPill} ${ACTION_CLASS[scenario.action]}`}>{scenario.action}</span>
              </div>
              <p className={styles.headline}>{scenario.headline}</p>
              <p className={styles.detail}>{scenario.detail}</p>

              <div className={styles.stats}>
                <div>
                  <div className={styles.statLabel}>Match score</div>
                  <div className={`${styles.statValue} fg-num`}>{scenario.score}</div>
                </div>
                <div>
                  <div className={styles.statLabel}>List</div>
                  <div className={styles.statValue}>{scenario.list}</div>
                </div>
                <div>
                  <div className={styles.statLabel}>Action</div>
                  <div className={`${styles.statValue} ${ACTION_CLASS[scenario.action]}`}>{scenario.action}</div>
                </div>
              </div>
            </div>

            {scenario.caseId && (
              <div className={styles.caseCard}>
                <div className={styles.caseHead}>
                  <span className={`${styles.caseRef} fg-num`}>{scenario.caseId}</span>
                  {scenario.caseStatus === 'pending' ? (
                    <span className={styles.caseStatusPending}>
                      <span className={styles.caseDot} aria-hidden="true" />
                      awaiting analyst
                    </span>
                  ) : (
                    <span className={styles.caseStatusFrozen}>
                      <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="5" y="10.5" width="14" height="9" rx="1.5" />
                        <path d="M8 10.5V7.5a4 4 0 0 1 8 0v3" />
                      </svg>
                      evidence frozen
                    </span>
                  )}
                </div>

                {scenario.caseStatus === 'pending' ? (
                  <>
                    <div className={styles.caseActions}>
                      <span className={styles.caseActionRelease}>Release</span>
                      <span className={styles.caseActionReject}>Reject</span>
                      <span className={styles.caseActionEscalate}>Escalate</span>
                    </div>
                    <p className={styles.caseNote}>
                      Whichever the analyst picks is written to the case with the reason, the user and the timestamp.
                    </p>
                  </>
                ) : (
                  <p className={styles.caseNote}>
                    Declined automatically at decision time. The case stays open for the analyst to review or escalate
                    — the match evidence itself cannot be changed.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <p className={styles.liveRegion} role="status" aria-live="polite">
        {scenario.tabLabel}: score {scenario.score}, {scenario.action}
        {scenario.caseId ? `, case ${scenario.caseId}` : ', no case opened'}.
      </p>
    </div>
  )
}
