'use client'

import { useCallback, useEffect, useId, useRef, useState } from 'react'
import styles from './ModelSwitcher.module.css'

type Rule = { name: string; note: string }

type Model = {
  key: string
  navLabel: string
  title: string
  lede: string
  risks: [string, string, string]
  rules: [Rule, Rule, Rule]
  statA: string
  statALabel: string
  statB: string
  statBLabel: string
}

const MODELS: Model[] = [
  {
    key: 'wallets',
    navLabel: 'Digital Wallets & Super Apps',
    title: 'High volume, high fraud exposure',
    lede: 'Mule networks move fast. Your limits are static; the abuse is not.',
    risks: [
      'Mule accounts opened at scale',
      'Small transfer bursts under static limits',
      'KYC tiers collected, never enforced',
    ],
    rules: [
      { name: 'velocity.new_account_24h', note: 'Bursts on fresh accounts' },
      { name: 'tier.limit_exceeded', note: 'Hard stop at the decision layer' },
      { name: 'timing.rapid_in_out', note: 'In and swept out in minutes' },
    ],
    statA: '5 min',
    statALabel: 'shortest velocity window',
    statB: 'T1–T3',
    statBLabel: 'tiers enforced at decision',
  },
  {
    key: 'fintechs',
    navLabel: 'Fintechs & Digital Banks',
    title: 'Multi-product risk, one customer',
    lede: 'One customer, many products. Risk has to travel with them.',
    risks: [
      'Risk siloed per product line',
      'Onboarding fraud resurfacing later',
      'Inconsistent thresholds across teams',
    ],
    rules: [
      { name: 'profile.anomaly_90d', note: 'Measured against a 90-day baseline' },
      { name: 'state.blocked_hard_stop', note: 'Blocked state stops before rules run' },
      { name: 'counterparty.concentration', note: 'Flags concentration across products' },
    ],
    statA: '1',
    statALabel: 'risk state per customer',
    statB: '90 d',
    statBLabel: 'behavioural baseline',
  },
  {
    key: 'psps',
    navLabel: 'PSPs & Processors',
    title: 'Aggregated risk, hidden beneath one merchant of record',
    lede: 'Sub-merchant abuse disappears inside settlement totals.',
    risks: [
      'Sub-merchant abuse inside aggregates',
      'Category mismatch laundering',
      'Refund cycling to move value',
    ],
    rules: [
      { name: 'merchant.category_mismatch', note: 'Settlement vs declared category' },
      { name: 'merchant.refund_cycling', note: 'Paired charge and refund' },
      { name: 'velocity.per_submerchant', note: 'Per-merchant, not portfolio' },
    ],
    statA: 'Per-merchant',
    statALabel: 'risk state, not portfolio',
    statB: '<50 ms',
    statBLabel: 'P99 decision latency',
  },
  {
    key: 'remittance',
    navLabel: 'Remittance & Cross-Border',
    title: 'Cross-border reach, cross-border risk',
    lede: 'Both legs of the corridor carry obligations. Both get screened.',
    risks: [
      'Sanctions reach on both legs',
      'Payouts split across beneficiaries',
      'Value moved via unseen intermediaries',
    ],
    rules: [
      { name: 'corridor.risk_score', note: 'Thresholds per corridor' },
      { name: 'beneficiary.graph_link', note: 'Shared account or device' },
      { name: 'screening.dual_jurisdiction', note: 'Sender and recipient at once' },
    ],
    statA: 'Dual',
    statALabel: 'jurisdiction screening',
    statB: 'Per corridor',
    statBLabel: 'thresholds tuned',
  },
  {
    key: 'banks',
    navLabel: 'Banks & Microfinance',
    title: 'Examiner-grade evidence, fintech speed',
    lede: 'The examiner asks for the record. It has to already exist.',
    risks: [
      'Batch reviews after money moved',
      'Reconstructed narratives as evidence',
      'Manual case files across spreadsheets',
    ],
    rules: [
      { name: 'evidence.append_only_write', note: 'Written at decision time, not after' },
      { name: 'state.transition_audited', note: 'Every risk-state change logged' },
      { name: 'threshold.ctr_reporting', note: 'NFIU filing window enforced' },
    ],
    statA: 'Append-only',
    statALabel: 'evidence store',
    statB: '7 days',
    statBLabel: 'CTR filing window',
  },
  {
    key: 'crypto',
    navLabel: 'Crypto & Digital Assets',
    title: 'Fiat on-ramps under scrutiny',
    lede: 'The on-ramp is where the regulator looks first.',
    risks: [
      'On-ramp exposure to illicit flows',
      'Rapid conversion and withdrawal',
      'Counterparty risk you inherit',
    ],
    rules: [
      { name: 'timing.rapid_in_out', note: 'Deposit to withdrawal in minutes' },
      { name: 'counterparty.risk_list', note: 'Exchange and wallet risk lists' },
      { name: 'velocity.rolling_24h', note: 'Rolling 24h on-ramp volume' },
    ],
    statA: 'Pre-auth',
    statALabel: 'decision point',
    statB: 'Immutable',
    statBLabel: 'decision record',
  },
]

const KEYS = MODELS.map((m) => m.key)

export default function ModelSwitcher() {
  const [index, setIndex] = useState(0)
  const tablistId = useId()
  const hydrated = useRef(false)

  // Deep-link: honour location.hash on mount.
  useEffect(() => {
    const hash = window.location.hash.replace('#', '')
    const i = KEYS.indexOf(hash)
    if (i !== -1) setIndex(i)
    hydrated.current = true
  }, [])

  const select = useCallback((i: number) => {
    setIndex(i)
    const key = MODELS[i].key
    if (typeof window !== 'undefined' && hydrated.current) {
      window.history.replaceState(null, '', `#${key}`)
    }
  }, [])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      select((index + 1) % MODELS.length)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      select((index - 1 + MODELS.length) % MODELS.length)
    } else if (e.key === 'Home') {
      e.preventDefault()
      select(0)
    } else if (e.key === 'End') {
      e.preventDefault()
      select(MODELS.length - 1)
    }
  }

  const model = MODELS[index]

  return (
    <div>
      <div
        role="tablist"
        aria-label="Business model"
        id={tablistId}
        className={styles.tabs}
        onKeyDown={onKeyDown}
      >
        {MODELS.map((m, i) => (
          <button
            key={m.key}
            type="button"
            role="tab"
            id={`${tablistId}-tab-${m.key}`}
            aria-selected={i === index}
            aria-controls={`${tablistId}-panel-${m.key}`}
            tabIndex={i === index ? 0 : -1}
            className={i === index ? styles.tabActive : styles.tab}
            onClick={() => select(i)}
          >
            {m.navLabel}
          </button>
        ))}
      </div>

      <span className={styles.srOnly} role="status" aria-live="polite">
        {model.navLabel} selected
      </span>

      <div
        role="tabpanel"
        id={`${tablistId}-panel-${model.key}`}
        aria-labelledby={`${tablistId}-tab-${model.key}`}
        className={styles.panel}
        key={model.key}
      >
        <div className={styles.grid}>
          <div className={styles.leftCard}>
            <div className={styles.kickerRow}>
              <span className={styles.pulseDot} aria-hidden="true" />
              <span className={styles.kicker}>{model.navLabel}</span>
            </div>
            <h2 className={styles.title}>{model.title}</h2>
            <p className={styles.lede}>{model.lede}</p>

            <div className={styles.risksBlock}>
              <div className={styles.risksLabel}>What goes wrong</div>
              <ul className={styles.risks}>
                {model.risks.map((r) => (
                  <li key={r}>
                    <span aria-hidden="true">—</span>
                    {r}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className={styles.rightCol}>
            <div className={styles.rulesPanel}>
              <div className={styles.rulesPanelHead}>
                <span className={styles.rulesPanelLabel}>Rules that fire</span>
                <span className={styles.liveTag}>
                  <span className={styles.liveDot} aria-hidden="true" />
                  live
                </span>
              </div>
              <div className={styles.rulesStack}>
                {model.rules.map((rule) => (
                  <div key={rule.name} className={styles.ruleRow}>
                    <span className="fg-num">{rule.name}</span>
                    <span className={styles.ruleNote}>{rule.note}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.statsRow}>
              <div className={styles.statCard}>
                <div className={`${styles.statFigure} fg-num`}>{model.statA}</div>
                <div className={styles.statLabel}>{model.statALabel}</div>
              </div>
              <div className={styles.statCard}>
                <div className={`${styles.statFigure} fg-num`}>{model.statB}</div>
                <div className={styles.statLabel}>{model.statBLabel}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
