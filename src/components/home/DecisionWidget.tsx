'use client'

import { useState } from 'react'

type DecisionKey = 'ok' | 'blocked'

interface DecisionState {
  badgeClass: string
  badge: string
  sub: string
  decision: string
  decisionClass: string
  actions: string
  actionsClass: string
  reasons: string
  state: string
}

const DECISIONS: Record<DecisionKey, DecisionState> = {
  ok: {
    badgeClass: 'allow',
    badge: 'CLEAR',
    sub: 'transaction proceeds',
    decision: '"CLEAR"',
    decisionClass: 'allowtext',
    actions: '["PROCEED"]',
    actionsClass: 'v',
    reasons: '[]',
    state: '"KYC_OK"',
  },
  blocked: {
    badgeClass: 'block',
    badge: 'BLOCKED',
    sub: 'declined — funds reversed',
    decision: '"BLOCKED"',
    decisionClass: 'blocktext',
    actions: '["DECLINE_AND_REVERSE"]',
    actionsClass: 'blocktext',
    reasons: '["CUSTOMER_BLOCKED"]',
    state: '"BLOCKED"',
  },
}

export default function DecisionWidget() {
  const [state, setState] = useState<DecisionKey>('ok')
  const d = DECISIONS[state]

  return (
    <div className="decider" aria-label="Interactive decision demonstration">
      <div className="dec-top">
        <span className="dec-title">POST /v1/decide</span>
        <span className="dec-tag">live decision</span>
      </div>
      <div className="req-line">
        <span className="k">amount</span>: ₦5,000&nbsp;&nbsp;&nbsp;
        <span className="k">type</span>: transfer&nbsp;&nbsp;&nbsp;
        <span className="k">tier</span>: T2
      </div>
      <p className="req-sub">Same clean transaction — two customers.</p>
      <div className="toggle" role="group" aria-label="Choose customer state">
        <button
          className={state === 'ok' ? 'on' : ''}
          onClick={() => setState('ok')}
        >
          customer: KYC_OK
        </button>
        <button
          className={state === 'blocked' ? 'on' : ''}
          onClick={() => setState('blocked')}
        >
          customer: BLOCKED
        </button>
      </div>
      <div className="verdict">
        <div className="verdict-head">
          <span className={`badge ${d.badgeClass}`}>{d.badge}</span>
          <span className="verdict-sub">{d.sub}</span>
        </div>
        <div className="kv">
          <div>
            <span className="k">&quot;decision&quot;:</span>{' '}
            <span className={d.decisionClass}>{d.decision}</span>
          </div>
          <div>
            <span className="k">&quot;requiredActions&quot;:</span>{' '}
            <span className={d.actionsClass}>{d.actions}</span>
          </div>
          <div>
            <span className="k">&quot;reasons&quot;:</span>{' '}
            <span className="v">{d.reasons}</span>
          </div>
          <div>
            <span className="k">&quot;customerRiskState&quot;:</span>{' '}
            <span className="v">{d.state}</span>
          </div>
          <div>
            <span className="k">&quot;evidenceRef&quot;:</span>{' '}
            <span className="v">&quot;…a72c&quot;</span>
          </div>
        </div>
      </div>
    </div>
  )
}
