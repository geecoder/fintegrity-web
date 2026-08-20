'use client'

import { useEffect, useId, useRef, useState } from 'react'
import styles from './DecisionTheatre.module.css'

type RuleState = 'match' | 'dim' | 'skip'

// Request/response envelope reconciled against the real /v1/decide OpenAPI
// spec (fetched from api.dev.getfintegrity.com/docs/openapi.json): field
// names, requiredActions enum values, and evidenceRef's UUID format are the
// live API's actual shape. The decision values themselves (CLEAR/FLAGGED/
// HELD_FOR_REVIEW/BLOCKED), customerRiskState's ACTIVE/UNDER_REVIEW/BLOCKED,
// and caseId are the approved four-state product roadmap — the live API
// currently returns a 3-state ALLOW/REVIEW/BLOCK model with a 6-state
// KYC-centric risk state and no case linkage. Reconcile this file again once
// the API ships the roadmap states.
type Scenario = {
  key: string
  tabLabel: string
  amountDisplay: string
  amountMinor: number
  eventType: string
  meta: string
  rulesEvaluated: number
  rulesMatched: number
  latency: string
  decision: 'CLEAR' | 'FLAGGED' | 'BLOCKED'
  requiredActions: string[]
  reasons: string[]
  customerRiskState: string
  caseId: string | null
  evidenceRef: string
  timestamp: string
  rules: { name: string; state: RuleState }[]
  skipRules: boolean
  note: string
}

const SCENARIOS: Scenario[] = [
  {
    key: 'clean',
    tabLabel: 'Clean transfer',
    amountDisplay: '₦5,000',
    amountMinor: 500000,
    eventType: 'transfer',
    meta: 'transfer · tier T2',
    rulesEvaluated: 34,
    rulesMatched: 0,
    latency: '14 ms',
    decision: 'CLEAR',
    requiredActions: ['PROCEED'],
    reasons: [],
    customerRiskState: 'ACTIVE',
    caseId: null,
    evidenceRef: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    timestamp: '2026-04-02T14:31:02.000Z',
    rules: [
      { name: 'velocity.rolling_24h', state: 'dim' },
      { name: 'tier.limit', state: 'dim' },
      { name: 'customer.state', state: 'match' },
    ],
    skipRules: false,
    note: 'No rule fired — and the CLEAR is still evidenced.',
  },
  {
    key: 'velocity',
    tabLabel: 'Velocity burst',
    amountDisplay: '₦450,000',
    amountMinor: 45000000,
    eventType: 'transfer',
    meta: '9th transfer in 24h',
    rulesEvaluated: 34,
    rulesMatched: 4,
    latency: '31 ms',
    decision: 'FLAGGED',
    requiredActions: ['PROCEED'],
    reasons: ['VELOCITY_24H_EXCEEDED'],
    customerRiskState: 'ACTIVE',
    caseId: 'case_77e10',
    evidenceRef: 'b91f4a72-5c1e-4d3a-9f2b-6e0a2c9a5f31',
    timestamp: '2026-04-02T14:37:11.000Z',
    rules: [
      { name: 'velocity.rolling_24h', state: 'match' },
      { name: 'tier.limit', state: 'dim' },
      { name: 'customer.state', state: 'match' },
    ],
    skipRules: false,
    note: 'Money still moves. A case opens with the evidence already assembled.',
  },
  {
    key: 'blocked',
    tabLabel: 'Blocked customer',
    amountDisplay: '₦120,000',
    amountMinor: 12000000,
    eventType: 'transfer',
    meta: 'new device · new channel',
    rulesEvaluated: 0,
    rulesMatched: 0,
    latency: '6 ms',
    decision: 'BLOCKED',
    requiredActions: ['DECLINE_AND_REVERSE'],
    reasons: ['CUSTOMER_BLOCKED'],
    customerRiskState: 'BLOCKED',
    caseId: 'case_44c02',
    evidenceRef: '4d20c9e8-2a6f-4b71-8c3d-9a0f5e2b81ff',
    timestamp: '2026-04-02T14:41:47.000Z',
    rules: [
      { name: 'velocity.rolling_24h', state: 'skip' },
      { name: 'tier.limit', state: 'skip' },
      { name: 'customer.state', state: 'skip' },
    ],
    skipRules: true,
    note: 'Customer-level block — a hard stop before any rule runs.',
  },
]

const DECISION_CLASS: Record<Scenario['decision'], string> = {
  CLEAR: styles.pillClear,
  FLAGGED: styles.pillFlagged,
  BLOCKED: styles.pillBlocked,
}

export default function DecisionTheatre() {
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
      <div role="tablist" aria-label="Decision scenario" id={tablistId} className={styles.tabs} onKeyDown={onTabKeyDown}>
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
          <div className={styles.code}>
            <div className={styles.codeLabel}>Request</div>
            <pre className={styles.codeBlock}>
{`POST /v1/decide
{
  "customerId": "cus_8f21a",
  "amount": ${scenario.amountMinor},
  "currency": "NGN",
  "kycTier": "T2",
  "direction": "OUTBOUND",
  "eventType": "${scenario.eventType}"
}`}
            </pre>

            <div className={styles.statusLine}>
              <span className={styles.statusDot} aria-hidden="true" />
              <span className={`${styles.mono} fg-num`}>200 OK · {scenario.latency}</span>
            </div>

            <div className={styles.codeLabel}>Response</div>
            <pre className={styles.codeBlock}>
{'{'}
{'\n  '}<span className={styles.codeKey}>&quot;decision&quot;</span>: <span className={DECISION_CLASS[scenario.decision]}>&quot;{scenario.decision}&quot;</span>,
{'\n  '}<span className={styles.codeKey}>&quot;reasons&quot;</span>: [{scenario.reasons.map((r) => `"${r}"`).join(', ')}],
{'\n  '}<span className={styles.codeKey}>&quot;requiredActions&quot;</span>: [<span className={styles.codeString}>{scenario.requiredActions.map((a) => `"${a}"`).join(', ')}</span>],
{'\n  '}<span className={styles.codeKey}>&quot;customerRiskState&quot;</span>: <span className={styles.codeString}>&quot;{scenario.customerRiskState}&quot;</span>,
{'\n  '}<span className={styles.codeKey}>&quot;caseId&quot;</span>: {scenario.caseId ? <span className={styles.codeString}>&quot;{scenario.caseId}&quot;</span> : 'null'},
{'\n  '}<span className={styles.codeKey}>&quot;evidenceRef&quot;</span>: <span className={styles.codeString}>&quot;{scenario.evidenceRef}&quot;</span>,
{'\n  '}<span className={styles.codeKey}>&quot;timestamp&quot;</span>: <span className={styles.codeString}>&quot;{scenario.timestamp}&quot;</span>
{'\n}'}
            </pre>
          </div>

          <div className={styles.summary}>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Amount</span>
              <span className={`${styles.summaryValue} fg-num`}>
                {scenario.amountDisplay} <span className={styles.mono}>({scenario.amountMinor.toLocaleString('en-US')} kobo)</span>
              </span>
            </div>
            <p className={styles.context}>{scenario.meta}</p>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Rules evaluated / matched</span>
              <span className={`${styles.summaryValue} fg-num`}>
                {scenario.skipRules ? '0 (state stop)' : `${scenario.rulesEvaluated} / ${scenario.rulesMatched}`}
              </span>
            </div>

            <div className={styles.traceLabel}>Rule trace</div>
            <ul className={styles.trace}>
              {scenario.rules.map((r) => (
                <li key={r.name} className={r.state === 'match' ? styles.traceMatch : styles.traceDim}>
                  {r.state === 'match' ? (
                    <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M4 12l5 5L20 6" />
                    </svg>
                  ) : (
                    <span className={styles.traceDash} aria-hidden="true" />
                  )}
                  <span className="fg-num">{r.name}</span>
                </li>
              ))}
            </ul>
            {scenario.skipRules && <p className={styles.skipNote}>Rules skipped — customer-level block happens before rule evaluation.</p>}

            <p className={styles.note}>{scenario.note}</p>
          </div>
        </div>
      </div>

      <p className={styles.liveRegion} role="status" aria-live="polite">
        {scenario.tabLabel}: {scenario.decision}, {scenario.latency}, evidence {scenario.evidenceRef}
      </p>
    </div>
  )
}
