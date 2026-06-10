import { useState, useEffect, useRef } from 'react'


const DECISIONS = {
  ok: { badgeClass: 'allow', badge: 'ALLOW', sub: 'transaction proceeds', decision: '"ALLOW"', decisionClass: 'allowtext', actions: '["PROCEED"]', actionsClass: 'v', reasons: '[]', state: '"KYC_OK"' },
  blocked: { badgeClass: 'block', badge: 'BLOCK', sub: 'declined — funds reversed', decision: '"BLOCK"', decisionClass: 'blocktext', actions: '["DECLINE_AND_REVERSE"]', actionsClass: 'blocktext', reasons: '["CUSTOMER_BLOCKED"]', state: '"BLOCKED"' },
}

const ICP = {
  wallet: {
    seg: 'Wallets & consumer fintechs', h: 'High volume, high fraud exposure',
    pains: ['Mule accounts and account-takeover at onboarding', 'Bursts of rapid small transfers that slip past static limits', 'KYC tiers collected but not enforced at the transaction'],
    feats: [['New-account velocity rule', 'flags bursts on freshly created accounts — classic mule onboarding'], ['Tier-limit enforcement', 'blocks at the decision layer when a customer exceeds their KYC tier'], ['Rapid in-out detection', 'catches funds received then swept out within minutes']],
  },
  psp: {
    seg: 'PSPs & payment processors', h: 'Merchant risk at scale',
    pains: ['Settlement and payout monitoring across huge volumes', 'Merchant funnels disguised as normal concentration', 'False positives drowning a small compliance team'],
    feats: [['Profile-relative baselining', 'concentration judged against each merchant’s normal pattern, not one global rule'], ['Velocity & amount-velocity', 'spots value spikes per merchant within rolling windows'], ['Evidence packs per merchant', 'one-click audit trail for any settlement query']],
  },
  imto: {
    seg: 'Remittance & cross-border', h: 'Corridor risk and dual compliance',
    pains: ['High-risk corridor exposure and sanctions reach', 'Layering through rapid cross-border pass-through', 'Sponsor banks demanding consistent screening proof'],
    feats: [['Corridor-risk rule', 'flags high-risk jurisdiction combinations on the route'], ['Screening orchestration', 'sanctions / PEP checks wired into the decision (bring your own provider)'], ['Rapid in-out + structuring', 'detects layering and just-under-₦5M structuring patterns']],
  },
  lender: {
    seg: 'Lenders & BNPL', h: 'Identity and repayment integrity',
    pains: ['Synthetic and duplicate identities at application', 'KYC orchestration spread across point tools', 'Case trails that fall apart under audit'],
    feats: [['KYC tier orchestration', 'enforces verification depth before disbursement decisions'], ['State machine per borrower', 'one authoritative risk state, with audited transitions'], ['Immutable case evidence', 'every decision and override attributed and retained']],
  },
}

function useReveal() {
  useEffect(() => {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target) } })
    }, { threshold: 0.12 })
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])
}

export default function App() {
  const [state, setState] = useState('ok')
  const [icp, setIcp] = useState('wallet')
  useReveal()
  const d = DECISIONS[state]
  const c = ICP[icp]

  return (
    <>
      <nav>
        <div className="wrap nav-in">
          <a className="brand" href="#top"><img src="/fintegrity_wm_indigo_mono.png" alt="Fintegrity" className="brand-logo" /></a>
          <div className="nav-links">
            <a href="#why">Why now</a>
            <a href="#product">Product</a>
            <a href="#usecases">Use cases</a>
            <a className="btn btn-primary" href="#demo">Request a demo</a>
          </div>
        </div>
      </nav>

      <div id="top" />

      <header className="hero">
        <div className="hero-wash" />
        <div className="wrap hero-grid">
          <div>
            <span className="eyebrow"><span className="dot" />Embedded compliance · built for CBN &amp; NFIU</span>
            <h1>The compliance brain <span className="grad-text">behind your money flows.</span></h1>
            <p className="lead">One API call before money moves returns a real-time decision — backed by an immutable, regulator-ready audit trail.</p>
            <div className="hero-cta">
              <a className="btn btn-primary" href="#demo">Request a demo →</a>
              <a className="btn btn-ghost" href="#product">See how it works</a>
            </div>
            <p className="hero-note">decide · enforce · prove</p>
          </div>

          <div className="decider" aria-label="Interactive decision demonstration">
            <div className="dec-top"><span className="dec-title">POST /v1/decide</span><span className="dec-tag">live decision</span></div>
            <div className="req-line"><span className="k">amount</span>: ₦5,000   <span className="k">type</span>: transfer   <span className="k">tier</span>: T2</div>
            <p className="req-sub">Same clean transaction — two customers.</p>
            <div className="toggle" role="group" aria-label="Choose customer state">
              <button className={state === 'ok' ? 'on' : ''} onClick={() => setState('ok')}>customer: KYC_OK</button>
              <button className={state === 'blocked' ? 'on' : ''} onClick={() => setState('blocked')}>customer: BLOCKED</button>
            </div>
            <div className="verdict">
              <div className="verdict-head"><span className={`badge ${d.badgeClass}`}>{d.badge}</span><span className="verdict-sub">{d.sub}</span></div>
              <div className="kv">
                <div><span className="k">"decision":</span> <span className={d.decisionClass}>{d.decision}</span></div>
                <div><span className="k">"requiredActions":</span> <span className={d.actionsClass}>{d.actions}</span></div>
                <div><span className="k">"reasons":</span> <span className="v">{d.reasons}</span></div>
                <div><span className="k">"customerRiskState":</span> <span className="v">{d.state}</span></div>
                <div><span className="k">"evidenceRef":</span> <span className="v">"…a72c"</span></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="strip">
        <div className="wrap strip-in">
          <span><b>KYC tier enforcement</b></span>
          <span><b>AML transaction monitoring</b></span>
          <span><b>Immutable evidence packs</b></span>
          <span><b>CBN / NFIU aligned</b></span>
        </div>
      </div>

      <section className="why" id="why">
        <div className="wrap">
          <div className="reveal">
            <div className="sec-eyebrow">Why now</div>
            <h2 className="sec-title">Compliance in Nigeria just became non-negotiable.</h2>
            <p className="sec-intro">Enforcement has shifted from “do you have a policy” to “prove every transaction was checked.” Fintechs now have to demonstrate control — transaction by transaction.</p>
          </div>
          <div className="why-grid">
            <div className="why-card reveal"><div className="num">01</div><h3>Tighter KYC, by mandate</h3><p>The CBN’s 2024 directive made BVN and NIN mandatory across account tiers, with limits enforced at every transaction.</p></div>
            <div className="why-card reveal"><div className="num">02</div><h3>Real reporting thresholds</h3><p>NFIU requires currency transaction reports at ₦5M (individuals) and ₦10M (corporates), filed within 7 days — and structuring to evade them is an offence.</p></div>
            <div className="why-card reveal"><div className="num">03</div><h3>Automated monitoring expected</h3><p>Regulatory direction is moving toward mandatory, real-time automated AML/CFT monitoring — exactly the layer Fintegrity provides.</p></div>
          </div>
          <p className="why-foot">Regulatory figures reflect current CBN / NFIU / MLPPA 2022 guidance and inform how Fintegrity is built.</p>
        </div>
      </section>

      <section id="product">
        <div className="wrap">
          <div className="reveal">
            <div className="sec-eyebrow">The platform</div>
            <h2 className="sec-title">Decide. Enforce. Prove.</h2>
            <p className="sec-intro">Three capabilities, one API. Fintegrity plugs into your existing money flows and returns decisions your systems act on — and your regulators can audit.</p>
          </div>
          <div className="pillars-grid">
            <div className="pillar reveal">
              <div className="picon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M12 2L3 7v6c0 5 3.5 8 9 9 5.5-1 9-4 9-9V7l-9-5z" stroke="#635BFF" strokeWidth="1.8" strokeLinejoin="round" /><path d="M9 12l2 2 4-4.5" stroke="#3ECFE0" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
              <div className="plabel">Decide</div><h3>Real-time decision API</h3>
              <p>One synchronous call before money moves returns ALLOW, REVIEW, or BLOCK — with the reasons, the rules that fired, and the exact action your system should take.</p>
            </div>
            <div className="pillar reveal">
              <div className="picon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#635BFF" strokeWidth="1.8" /><path d="M12 7v5l3 2" stroke="#3ECFE0" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" /></svg></div>
              <div className="plabel">Enforce</div><h3>One risk state per customer</h3>
              <p>A single authoritative risk status per customer, with enforced, audited transitions. KYC tiers, screening hits, and monitoring alerts converge into one lifecycle.</p>
            </div>
            <div className="pillar reveal">
              <div className="picon"><svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="4" y="3" width="16" height="18" rx="2" stroke="#635BFF" strokeWidth="1.8" /><path d="M8 8h8M8 12h8M8 16h5" stroke="#3ECFE0" strokeWidth="1.9" strokeLinecap="round" /></svg></div>
              <div className="plabel">Prove</div><h3>Regulator-ready evidence</h3>
              <p>Every decision, state change, and alert is written to an append-only audit trail. Generate a complete evidence pack for any customer or transaction on demand.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="icp" id="usecases">
        <div className="wrap">
          <div className="reveal">
            <div className="sec-eyebrow">Built for your model</div>
            <h2 className="sec-title">Compliance tuned to how <em>you</em> move money.</h2>
            <p className="sec-intro">Generic AML tools treat every fintech the same. Fintegrity’s rules and risk logic are shaped to the specific patterns — and specific abuse — of your business model.</p>
          </div>
          <div className="tabs reveal" role="tablist">
            {Object.entries({ wallet: 'Wallets & consumer', psp: 'PSPs & processors', imto: 'Remittance & cross-border', lender: 'Lenders & BNPL' }).map(([k, label]) => (
              <button key={k} className={`tab ${icp === k ? 'on' : ''}`} role="tab" aria-selected={icp === k} onClick={() => setIcp(k)}>{label}</button>
            ))}
          </div>
          <div className="icp-panel reveal">
            <div className="icp-left">
              <div className="icp-seg">{c.seg}</div>
              <h3>{c.h}</h3>
              <div style={{ marginTop: '20px' }}>
                {c.pains.map((p, i) => (<div className="pain" key={i}><span className="pi">!</span><p>{p}</p></div>))}
              </div>
            </div>
            <div className="icp-right">
              <div className="rh">How Fintegrity handles it</div>
              {c.feats.map((f, i) => (<div className="feat" key={i}><span className="fi">✓</span><p><b>{f[0]}</b> — {f[1]}</p></div>))}
            </div>
          </div>
          <div className="boundary reveal">
            <h3>We decide. Your system moves the money.</h3>
            <p>Fintegrity is the <span className="hl">compliance decision and evidence layer</span> — not a payment processor. When a transaction must be declined and reversed, Fintegrity says so and records why. Your rails execute it. That separation keeps you in control and keeps Fintegrity focused on one job: defensible compliance.</p>
          </div>
        </div>
      </section>

      <section className="cta" id="demo">
        <div className="wrap reveal">
          <div className="cta-card">
            <h2>Become a Fintegrity design partner.</h2>
            <p>We’re working hands-on with a small group of Nigerian fintechs to shape the platform. Early access, direct influence on the roadmap, and regulator-ready infrastructure ahead of the curve.</p>
            <div className="cta-row">
              <a className="btn btn-white" href="mailto:hello@fintegrity.africa?subject=Fintegrity%20design%20partner">Request a demo →</a>
              <a className="btn btn-outline-w" href="mailto:hello@fintegrity.africa?subject=Fintegrity%20—%20tell%20me%20more">Talk to the founder</a>
            </div>
            <p className="cta-note">Design partnerships are free. Limited spots.</p>
          </div>
        </div>
      </section>

      <footer>
        <div className="wrap foot-in">
          <a className="brand" href="#top"><img src="/fintegrity_wm_indigo_mono.png" alt="Fintegrity" className="brand-logo" /></a>
          <p>Embedded compliance decisioning for African fintechs.</p>
          <div className="foot-links">
            <a href="#why">Why now</a><a href="#product">Product</a><a href="#usecases">Use cases</a><a href="#demo">Demo</a>
          </div>
        </div>
        <div className="wrap"><p className="fine">© 2026 Fintegrity. Early-stage platform in active development with design partners. Regulatory references reflect current CBN / NFIU guidance and are not legal advice.</p></div>
      </footer>
    </>
  )
}
