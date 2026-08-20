'use client'

import { useId, useState } from 'react'
import styles from './BusinessModelTabs.module.css'

type Model = {
  key: string
  tabLabel: string
  name: string
  summary: string
  risks: string[]
  rules: { name: string; note: string }[]
}

const MODELS: Model[] = [
  {
    key: 'wallets',
    tabLabel: 'Wallets & consumer',
    name: 'Wallets & consumer fintechs',
    summary: 'High volume, high fraud exposure',
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
  },
  {
    key: 'psps',
    tabLabel: 'PSPs & processors',
    name: 'PSPs & payment processors',
    summary: 'Aggregated risk, hidden beneath one merchant of record',
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
  },
  {
    key: 'remittance',
    tabLabel: 'Remittance & cross-border',
    name: 'Remittance & cross-border payments',
    summary: 'Cross-border reach, cross-border risk',
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
  },
  {
    key: 'lenders',
    tabLabel: 'Lenders & BNPL',
    name: 'Lenders & BNPL',
    summary: 'Fast disbursement, slow-to-surface fraud',
    risks: [
      'Synthetic and duplicate identities',
      'Disbursement to unrelated accounts',
      'Repayments cycling third-party funds',
    ],
    rules: [
      { name: 'identity.collision', note: 'Shared BVN, device, account' },
      { name: 'disbursement.mismatch', note: 'Payout not verified to borrower' },
      { name: 'repayment.source_check', note: 'Funded by an unrelated party' },
    ],
  },
]

export default function BusinessModelTabs() {
  const [index, setIndex] = useState(0)
  const model = MODELS[index]
  const tablistId = useId()

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      setIndex((i) => (i + 1) % MODELS.length)
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      setIndex((i) => (i - 1 + MODELS.length) % MODELS.length)
    }
  }

  return (
    <div>
      <div role="tablist" aria-label="Business model" id={tablistId} className={styles.tabs} onKeyDown={onKeyDown}>
        {MODELS.map((m, i) => (
          <button
            key={m.key}
            role="tab"
            type="button"
            id={`${tablistId}-tab-${m.key}`}
            aria-selected={i === index}
            aria-controls={`${tablistId}-panel-${m.key}`}
            tabIndex={i === index ? 0 : -1}
            className={i === index ? styles.tabActive : styles.tab}
            onClick={() => setIndex(i)}
          >
            {m.tabLabel}
          </button>
        ))}
      </div>

      <div
        role="tabpanel"
        id={`${tablistId}-panel-${model.key}`}
        aria-labelledby={`${tablistId}-tab-${model.key}`}
        className={styles.panel}
      >
        <div className={styles.grid}>
          <div>
            <h3 className={styles.modelName}>{model.name}</h3>
            <p className={styles.modelSummary}>{model.summary}</p>
            <ul className={styles.risks}>
              {model.risks.map((r) => (
                <li key={r}><span aria-hidden="true">—</span>{r}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className={styles.rulesLabel}>How Fintegrity handles it</div>
            <div className={styles.rulesStack}>
              {model.rules.map((rule) => (
                <div key={rule.name} className={styles.ruleRow}>
                  <span className="fg-num">{rule.name}</span>
                  <span className={styles.ruleNote}>{rule.note}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
