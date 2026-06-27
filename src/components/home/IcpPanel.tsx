'use client'

import { useState } from 'react'

type IcpKey = 'wallet' | 'psp' | 'imto' | 'lender'

interface IcpSegment {
  seg: string
  h: string
  pains: string[]
  feats: [string, string][]
}

const ICP: Record<IcpKey, IcpSegment> = {
  wallet: {
    seg: 'Wallets & consumer fintechs',
    h: 'High volume, high fraud exposure',
    pains: [
      'Mule accounts and account-takeover at onboarding',
      'Bursts of rapid small transfers that slip past static limits',
      'KYC tiers collected but not enforced at the transaction',
    ],
    feats: [
      ['New-account velocity rule', 'flags bursts on freshly created accounts — classic mule onboarding'],
      ['Tier-limit enforcement', 'blocks at the decision layer when a customer exceeds their KYC tier'],
      ['Rapid in-out detection', 'catches funds received then swept out within minutes'],
    ],
  },
  psp: {
    seg: 'PSPs & payment processors',
    h: 'Merchant risk at scale',
    pains: [
      'Settlement and payout monitoring across huge volumes',
      'Merchant funnels disguised as normal concentration',
      'False positives drowning a small compliance team',
    ],
    feats: [
      ['Profile-relative baselining', "concentration judged against each merchant's normal pattern, not one global rule"],
      ['Velocity & amount-velocity', 'spots value spikes per merchant within rolling windows'],
      ['Evidence packs per merchant', 'one-click audit trail for any settlement query'],
    ],
  },
  imto: {
    seg: 'Remittance & cross-border',
    h: 'Corridor risk and dual compliance',
    pains: [
      'High-risk corridor exposure and sanctions reach',
      'Layering through rapid cross-border pass-through',
      'Sponsor banks demanding consistent screening proof',
    ],
    feats: [
      ['Corridor-risk rule', 'flags high-risk jurisdiction combinations on the route'],
      ['Screening orchestration', 'sanctions / PEP checks wired into the decision (bring your own provider)'],
      // NEEDS COMPLIANCE REVIEW — ₦5M references a specific NFIU CTR reporting threshold
      ['Rapid in-out + structuring', 'detects layering and just-under-₦5M structuring patterns'],
    ],
  },
  lender: {
    seg: 'Lenders & BNPL',
    h: 'Identity and repayment integrity',
    pains: [
      'Synthetic and duplicate identities at application',
      'KYC orchestration spread across point tools',
      'Case trails that fall apart under audit',
    ],
    feats: [
      ['KYC tier orchestration', 'enforces verification depth before disbursement decisions'],
      ['State machine per borrower', 'one authoritative risk state, with audited transitions'],
      ['Immutable case evidence', 'every decision and override attributed and retained'],
    ],
  },
}

const TAB_LABELS: Record<IcpKey, string> = {
  wallet: 'Wallets & consumer',
  psp: 'PSPs & processors',
  imto: 'Remittance & cross-border',
  lender: 'Lenders & BNPL',
}

export default function IcpPanel() {
  const [icp, setIcp] = useState<IcpKey>('wallet')
  const c = ICP[icp]

  return (
    <>
      <div className="tabs reveal" role="tablist">
        {(Object.keys(TAB_LABELS) as IcpKey[]).map((k) => (
          <button
            key={k}
            className={`tab ${icp === k ? 'on' : ''}`}
            role="tab"
            aria-selected={icp === k}
            onClick={() => setIcp(k)}
          >
            {TAB_LABELS[k]}
          </button>
        ))}
      </div>

      <div className="icp-panel reveal">
        <div className="icp-left">
          <div className="icp-seg">{c.seg}</div>
          <h3>{c.h}</h3>
          <div style={{ marginTop: '20px' }}>
            {c.pains.map((p, i) => (
              <div className="pain" key={i}>
                <span className="pi">!</span>
                <p>{p}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="icp-right">
          <div className="rh">How Fintegrity handles it</div>
          {c.feats.map((f, i) => (
            <div className="feat" key={i}>
              <span className="fi">✓</span>
              <p>
                <b>{f[0]}</b> — {f[1]}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
