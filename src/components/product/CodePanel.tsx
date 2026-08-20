'use client'

import { useId, useRef, useState } from 'react'
import { DEVELOPER_DOCS_URL } from '@/lib/config'
import { trackMarketingEvent } from '@/lib/analytics'
import styles from './CodePanel.module.css'

type Lang = 'curl' | 'node' | 'python'

const LANGS: { key: Lang; label: string }[] = [
  { key: 'curl', label: 'cURL' },
  { key: 'node', label: 'Node' },
  { key: 'python', label: 'Python' },
]

// Reconciled against the real /v1/decide OpenAPI spec (fetched from
// api.dev.getfintegrity.com/docs/openapi.json — the docs page itself is a
// client-rendered Scalar app, but the spec is inlined as YAML in its script
// tag). Request field names, the amount-in-minor-units convention, the
// requiredActions enum, and evidenceRef's UUID format below are the live
// API's actual shape.
//
// The decision value ("FLAGGED"), customerRiskState's "ACTIVE", and the
// caseId field are the approved four-state product roadmap, not what the
// live API returns today — it currently ships a 3-state ALLOW/REVIEW/BLOCK
// model with a 6-state KYC-centric risk state and no case linkage.
// Reconcile this file again once the API ships the roadmap states.

export default function CodePanel() {
  const [lang, setLang] = useState<Lang>('curl')
  const tablistId = useId()
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([])

  const onKeyDown = (e: React.KeyboardEvent) => {
    const idx = LANGS.findIndex((l) => l.key === lang)
    if (e.key === 'ArrowRight') {
      e.preventDefault()
      const next = LANGS[(idx + 1) % LANGS.length]
      setLang(next.key)
      tabRefs.current[(idx + 1) % LANGS.length]?.focus()
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault()
      const prevIndex = (idx - 1 + LANGS.length) % LANGS.length
      setLang(LANGS[prevIndex].key)
      tabRefs.current[prevIndex]?.focus()
    }
  }

  return (
    <div>
      <div
        role="tablist"
        aria-label="Code sample language"
        id={tablistId}
        className={styles.tabs}
        onKeyDown={onKeyDown}
      >
        {LANGS.map((l, idx) => (
          <button
            key={l.key}
            ref={(el) => { tabRefs.current[idx] = el }}
            role="tab"
            type="button"
            id={`${tablistId}-tab-${l.key}`}
            aria-selected={lang === l.key}
            aria-controls={`${tablistId}-panel-${l.key}`}
            tabIndex={lang === l.key ? 0 : -1}
            className={lang === l.key ? styles.tabActive : styles.tab}
            onClick={() => setLang(l.key)}
          >
            {l.label}
          </button>
        ))}
      </div>

      <div className={styles.panel}>
        <div className={styles.panelHeader}>
          <a
            href={DEVELOPER_DOCS_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.panelHeaderLink}
            onClick={() => trackMarketingEvent('API Documentation CTA Clicked', { location: 'decision-api-code-panel' })}
          >
            Request &middot; open in developer portal <span aria-hidden="true">↗</span>
          </a>
          <span className={styles.panelHeaderMeta}>v1</span>
        </div>

        {LANGS.map((l) => (
          <div
            key={l.key}
            role="tabpanel"
            id={`${tablistId}-panel-${l.key}`}
            aria-labelledby={`${tablistId}-tab-${l.key}`}
            hidden={lang !== l.key}
          >
            {l.key === 'curl' && (
              <pre className={styles.codeBlock}>
<span className={styles.codeKey}>curl</span> -X POST https://api.dev.getfintegrity.com/v1/decide \{'\n'}
{'  '}-H <span className={styles.codeString}>&quot;Authorization: Bearer $FG_KEY&quot;</span> \{'\n'}
{'  '}-H <span className={styles.codeString}>&quot;Idempotency-Key: txn_9a7f21&quot;</span> \{'\n'}
{'  '}-H <span className={styles.codeString}>&quot;Content-Type: application/json&quot;</span> \{'\n'}
{'  '}-d <span className={styles.codeString}>{"'{"}</span>{'\n'}
{'    '}<span className={styles.codeString}>&quot;customerId&quot;: &quot;cus_8f21a&quot;,</span>{'\n'}
{'    '}<span className={styles.codeString}>&quot;amount&quot;: 45000000,</span>{'\n'}
{'    '}<span className={styles.codeString}>&quot;currency&quot;: &quot;NGN&quot;,</span>{'\n'}
{'    '}<span className={styles.codeString}>&quot;kycTier&quot;: &quot;T2&quot;,</span>{'\n'}
{'    '}<span className={styles.codeString}>&quot;direction&quot;: &quot;OUTBOUND&quot;,</span>{'\n'}
{'    '}<span className={styles.codeString}>&quot;eventType&quot;: &quot;transfer&quot;,</span>{'\n'}
{'    '}<span className={styles.codeString}>{'"metadata": { "channel": "mobile" }'}</span>{'\n'}
{'  '}<span className={styles.codeString}>{"}'"}</span>
              </pre>
            )}
            {l.key === 'node' && (
              <pre className={styles.codeBlock}>
<span className={styles.codeKey}>const</span> decision = <span className={styles.codeKey}>await</span> fintegrity.decide({'{'}{'\n'}
{'  '}customerId: <span className={styles.codeString}>&quot;cus_8f21a&quot;</span>,{'\n'}
{'  '}amount: <span className={styles.codeString}>45000000</span>,{'\n'}
{'  '}currency: <span className={styles.codeString}>&quot;NGN&quot;</span>,{'\n'}
{'  '}kycTier: <span className={styles.codeString}>&quot;T2&quot;</span>,{'\n'}
{'  '}direction: <span className={styles.codeString}>&quot;OUTBOUND&quot;</span>,{'\n'}
{'  '}eventType: <span className={styles.codeString}>&quot;transfer&quot;</span>,{'\n'}
{'  '}metadata: {'{ channel: '}<span className={styles.codeString}>&quot;mobile&quot;</span>{' }'}{'\n'}
{'}, { idempotencyKey: '}<span className={styles.codeString}>&quot;txn_9a7f21&quot;</span>{' });'}{'\n'}
{'\n'}
<span className={styles.codeKey}>if</span> (decision.requiredActions.includes(<span className={styles.codeString}>&quot;PROCEED&quot;</span>)) {'{'}{'\n'}
{'  '}<span className={styles.codeKey}>await</span> rails.execute(transfer);{'\n'}
{'}'}
              </pre>
            )}
            {l.key === 'python' && (
              <pre className={styles.codeBlock}>
decision = fintegrity.decide({'\n'}
{'    '}customer_id=<span className={styles.codeString}>&quot;cus_8f21a&quot;</span>,{'\n'}
{'    '}amount=<span className={styles.codeString}>45000000</span>,{'\n'}
{'    '}currency=<span className={styles.codeString}>&quot;NGN&quot;</span>,{'\n'}
{'    '}kyc_tier=<span className={styles.codeString}>&quot;T2&quot;</span>,{'\n'}
{'    '}direction=<span className={styles.codeString}>&quot;OUTBOUND&quot;</span>,{'\n'}
{'    '}event_type=<span className={styles.codeString}>&quot;transfer&quot;</span>,{'\n'}
{'    '}metadata={'{ '}<span className={styles.codeString}>&quot;channel&quot;: &quot;mobile&quot;</span>{' }'},{'\n'}
{'    '}idempotency_key=<span className={styles.codeString}>&quot;txn_9a7f21&quot;</span>,{'\n'}
{')'}{'\n'}
{'\n'}
<span className={styles.codeKey}>if</span> <span className={styles.codeString}>&quot;PROCEED&quot;</span> <span className={styles.codeKey}>in</span> decision.required_actions:{'\n'}
{'    '}rails.execute(transfer)
              </pre>
            )}
          </div>
        ))}

        <div className={styles.statusBar}>
          <span className={styles.statusDot} aria-hidden="true" />
          <span className={styles.statusText}>200 OK</span>
          <span className={styles.statusSep}>&middot;</span>
          <span className={`${styles.statusLatency} fg-num`}>31 ms</span>
        </div>

        <pre className={styles.codeBlock}>
{'{'}{'\n'}
{'  '}<span className={styles.codeKeyDim}>&quot;decision&quot;</span>: <span className={styles.stateFlagged}>&quot;FLAGGED&quot;</span>,{'\n'}
{'  '}<span className={styles.codeKeyDim}>&quot;reasons&quot;</span>: [<span className={styles.codeString}>&quot;VELOCITY_24H_EXCEEDED&quot;</span>],{'\n'}
{'  '}<span className={styles.codeKeyDim}>&quot;ruleIdsFired&quot;</span>: [<span className={styles.codeString}>&quot;velocity.rolling_24h@v4&quot;</span>],{'\n'}
{'  '}<span className={styles.codeKeyDim}>&quot;requiredActions&quot;</span>: [<span className={styles.stateFlagged}>&quot;PROCEED&quot;</span>],{'\n'}
{'  '}<span className={styles.codeKeyDim}>&quot;customerRiskState&quot;</span>: <span className={styles.codeString}>&quot;ACTIVE&quot;</span>,{'\n'}
{'  '}<span className={styles.codeKeyDim}>&quot;caseId&quot;</span>: <span className={styles.codeString}>&quot;case_77e10&quot;</span>,{'\n'}
{'  '}<span className={styles.codeKeyDim}>&quot;evidenceRef&quot;</span>: <span className={styles.codeString}>&quot;b91f4a72-5c1e-4d3a-9f2b-6e0a2c9a5f31&quot;</span>,{'\n'}
{'  '}<span className={styles.codeKeyDim}>&quot;timestamp&quot;</span>: <span className={styles.codeString}>&quot;2026-04-02T14:37:11.000Z&quot;</span>{'\n'}
{'}'}
        </pre>
      </div>
    </div>
  )
}
