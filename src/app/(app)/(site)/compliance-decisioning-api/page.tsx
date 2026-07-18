import type { Metadata } from 'next'
import Link from 'next/link'
import CTABand from '@/components/ui/CTABand'
import RevealInit from '@/components/RevealInit'
import BreadcrumbJsonLd from '@/components/json-ld/BreadcrumbJsonLd'
import SoftwareAppJsonLd from '@/components/json-ld/SoftwareAppJsonLd'

export const metadata: Metadata = {
  title: 'Compliance Decision API',
  description:
    'POST a transaction, get back CLEAR, FLAGGED, HELD_FOR_REVIEW, or BLOCKED — with the customer risk state, rules that fired, required actions, and an immutable evidence reference. One synchronous API call before money moves.',
  alternates: { canonical: 'https://www.getfintegrity.com/compliance-decisioning-api' },
  openGraph: {
    title: 'Compliance Decision API — Fintegrity Technologies Limited',
    description: 'One API call. CLEAR, FLAGGED, HELD_FOR_REVIEW, or BLOCKED. Complete evidence. Under 50ms P99.',
    url: 'https://www.getfintegrity.com/compliance-decisioning-api',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630 }],
  },
}

const REQUEST_CODE = `POST /v1/decide HTTP/1.1
Host: api.getfintegrity.com
Content-Type: application/json
Authorization: Bearer <token>

{
  "amount": 450000,
  "currency": "NGN",
  "type": "transfer",
  "customerId": "cust_b72f14",
  "counterpartyId": "cpty_9a31",
  "channel": "mobile",
  "idempotencyKey": "pay_20260521_001"
}`

const RESPONSE_CODE = `HTTP/1.1 200 OK
X-Fintegrity-Latency: 14ms

{
  "decision": "HELD_FOR_REVIEW",
  "requiredActions": [
    "HOLD_FOR_REVIEW"
  ],
  "reasons": [
    "VELOCITY_24H_EXCEEDED",
    "PROFILE_ANOMALY"
  ],
  "customerRiskState": "UNDER_REVIEW",
  "evidenceRef": "evd_b91f4a72c...",
  "decidedAt": "2026-05-21T09:14:03Z",
  "latencyMs": 14
}`

export default function ComplianceDecisioningApiPage() {
  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Compliance Decision API', href: '/compliance-decisioning-api' }]} />
      <SoftwareAppJsonLd />
      <RevealInit />

      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="page-hero">
        <div className="wrap">
          <div className="page-hero-inner">
            <span className="sec-eyebrow">Compliance Decision API</span>
            <h1>One API call. A defensible compliance decision.</h1>
            <p className="page-hero-lead">
              POST a transaction to <code style={{ fontFamily: 'var(--font-mono)', background: '#EBEEF3', padding: '2px 6px', borderRadius: '4px', fontSize: '0.9em' }}>/v1/decide</code> before
              money moves. Get back CLEAR, FLAGGED, HELD_FOR_REVIEW, or BLOCKED — with the
              customer risk state, every rule that fired, the required actions for your system,
              and a reference to the immutable evidence. Synchronous. Under 50ms P99.
            </p>
            <div className="page-hero-cta">
              <Link href="/book-a-demo" className="btn btn-primary">
                Book a demo →
              </Link>
              <Link href="/transaction-monitoring" className="btn btn-ghost">
                See what feeds the decision
              </Link>
            </div>
            <div className="page-hero-stat-row">
              <div className="page-hero-stat">
                <big>&lt;50ms</big><span>P99 response latency</span>
              </div>
              <div className="page-hero-stat">
                <big>4 states</big><span>CLEAR · FLAGGED · HELD_FOR_REVIEW · BLOCKED</span>
              </div>
              <div className="page-hero-stat">
                <big>100%</big><span>Decisions evidenced</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── API demo ─────────────────────────────────────── */}
      <section className="prod-section prod-section-soft">
        <div className="wrap">
          <div className="reveal">
            <span className="sec-eyebrow">The API</span>
            <h2 className="sec-title">Request in. Decision out. Evidence stored.</h2>
            <p className="sec-intro">
              Send the transaction context. Receive a structured decision your system can act on
              immediately. Every call is logged to the append-only evidence store — whether the
              decision was CLEAR, FLAGGED, HELD_FOR_REVIEW, or BLOCKED.
            </p>
          </div>
          <div className="api-demo reveal">
            <div className="api-demo-bar">
              <div className="api-demo-dots">
                <span className="api-demo-dot api-dot-r" />
                <span className="api-demo-dot api-dot-y" />
                <span className="api-demo-dot api-dot-g" />
              </div>
              <span className="api-demo-bar-label">POST /v1/decide — live decision</span>
            </div>
            <div className="api-demo-cols">
              <div className="api-demo-pane">
                <div className="api-pane-label">Request</div>
                <pre className="api-code">{REQUEST_CODE
                  .replace('POST', '<span class="ak">POST</span>')
                  .replace('"amount": 450000', `<span class="ak">"amount"</span>: <span class="an">450000</span>`)
                  .replace('"currency": "NGN"', `<span class="ak">"currency"</span>: <span class="as">"NGN"</span>`)
                  .replace('"type": "transfer"', `<span class="ak">"type"</span>: <span class="as">"transfer"</span>`)
                  .replace('"customerId": "cust_b72f14"', `<span class="ak">"customerId"</span>: <span class="as">"cust_b72f14"</span>`)
                  .replace('"counterpartyId": "cpty_9a31"', `<span class="ak">"counterpartyId"</span>: <span class="as">"cpty_9a31"</span>`)
                  .replace('"channel": "mobile"', `<span class="ak">"channel"</span>: <span class="as">"mobile"</span>`)
                  .replace('"idempotencyKey": "pay_20260521_001"', `<span class="ak">"idempotencyKey"</span>: <span class="as">"pay_20260521_001"</span>`)
                }
                </pre>
              </div>
              <div className="api-demo-pane">
                <div className="api-pane-label">Response · 14ms</div>
                <pre className="api-code" dangerouslySetInnerHTML={{
                  __html: RESPONSE_CODE
                    .replace('"HELD_FOR_REVIEW"', '<span class="dec-review">"HELD_FOR_REVIEW"</span>')
                    .replace('"HOLD_FOR_REVIEW"', '<span class="as">"HOLD_FOR_REVIEW"</span>')
                    .replace('"VELOCITY_24H_EXCEEDED"', '<span class="as">"VELOCITY_24H_EXCEEDED"</span>')
                    .replace('"PROFILE_ANOMALY"', '<span class="as">"PROFILE_ANOMALY"</span>')
                    .replace('"UNDER_REVIEW"', '<span class="acm">"UNDER_REVIEW"</span>')
                    .replace('"evd_b91f4a72c..."', '<span class="ac">"evd_b91f4a72c..."</span>')
                    .replace(/"decision":/g, '<span class="ak">"decision"</span>:')
                    .replace(/"requiredActions":/g, '<span class="ak">"requiredActions"</span>:')
                    .replace(/"reasons":/g, '<span class="ak">"reasons"</span>:')
                    .replace(/"customerRiskState":/g, '<span class="ak">"customerRiskState"</span>:')
                    .replace(/"evidenceRef":/g, '<span class="ak">"evidenceRef"</span>:')
                    .replace(/"decidedAt":/g, '<span class="ak">"decidedAt"</span>:')
                    .replace(/"latencyMs":/g, '<span class="ak">"latencyMs"</span>:')
                    .replace(': 14', ': <span class="an">14</span>')
                }} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Decision anatomy ─────────────────────────────── */}
      <section className="prod-section">
        <div className="wrap">
          <div className="two-col-feature">
            <div className="reveal">
              <span className="sec-eyebrow">Response anatomy</span>
              <h2 className="sec-title">Every field tells your system exactly what to do</h2>
              <p style={{ color: 'var(--slate)', lineHeight: 1.7, fontSize: '1rem', marginTop: '16px', marginBottom: '28px', maxWidth: '50ch' }}>
                A Fintegrity decision response isn&apos;t just a verdict. It&apos;s a complete
                instruction set for your payment handler — with the evidence already filed.
              </p>
              <ul className="feature-list">
                {[
                  ['decision', 'CLEAR, FLAGGED, HELD_FOR_REVIEW, or BLOCKED. Always one of these four. No ambiguity.'],
                  ['requiredActions', 'What your system should do: PROCEED, HOLD_FOR_REVIEW, or DECLINE_AND_REVERSE. Maps directly to your payment rail commands.'],
                  ['reasons', 'Which rules fired or patterns matched. Array of typed reason codes, not free text.'],
                  ['customerRiskState', 'The customer\'s risk state after this decision: ACTIVE, UNDER_REVIEW, or BLOCKED.'],
                  ['evidenceRef', 'A pointer to the immutable evidence record for this decision. Survives forever. Present it to a regulator by reference.'],
                  ['latencyMs', 'How long Fintegrity took to decide. Your SLA auditing, not ours.'],
                ].map(([field, desc]) => (
                  <li className="feature-item" key={field}>
                    <span className="feature-check">→</span>
                    <div className="feature-item-text">
                      <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem' }}>{field}</h4>
                      <p>{desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal">
              <span className="sec-eyebrow">How the decision is made</span>
              <h2 className="sec-title" style={{ fontSize: 'clamp(1.3rem,2.4vw,1.7rem)' }}>A composite decision from multiple inputs</h2>
              <div className="process-steps" style={{ marginTop: '28px' }}>
                {[
                  ['Customer state first', 'A BLOCKED customer gets an immediate BLOCKED decision. No rules run. This prevents compliance bypass via new devices or accounts.'],
                  ['Transaction context evaluated', 'Amount, type, channel, counterparty, and timing are all passed to the rule engine.'],
                  ['Rule library fires', 'Your configured rules — velocity, thresholds, structuring, new-account, profile — all evaluate in parallel.'],
                  ['Screening consulted', 'If transaction screening is configured, your sanctions/PEP provider is queried and the result is factored in.'],
                  ['Most restrictive wins', 'The most severe input wins: BLOCKED beats HELD_FOR_REVIEW, which beats FLAGGED, which beats CLEAR. If any input returns BLOCKED, the decision is BLOCKED.'],
                ].map(([title, body], i) => (
                  <div className="process-step" key={i}>
                    <div className="process-step-left">
                      <div className="process-step-num">0{i + 1}</div>
                      <div className="process-step-line" />
                    </div>
                    <div className="process-step-body">
                      <h3>{title}</h3>
                      <p>{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Customer risk states ─────────────────────────── */}
      <section className="prod-section prod-section-soft">
        <div className="wrap">
          <div className="reveal">
            <span className="sec-eyebrow">Customer risk lifecycle</span>
            <h2 className="sec-title">One authoritative risk state per customer</h2>
            <p className="sec-intro">
              Every customer has exactly one risk state at any point in time. State transitions
              are enforced, audited, and reflected immediately in every subsequent decision call.
            </p>
          </div>
          <div className="state-grid reveal" style={{ marginTop: '36px' }}>
            <div className="state-item">
              <span className="state-badge state-badge-active">ACTIVE</span>
              <div className="state-item-text">
                <h4>Normal operating state</h4>
                <p>Customer is in good standing. Transactions proceed through the full rule evaluation. Monitoring continues in the background. The majority of customers are in this state.</p>
              </div>
            </div>
            <div className="state-item">
              <span className="state-badge state-badge-review">UNDER_REVIEW</span>
              <div className="state-item-text">
                <h4>Flagged for closer monitoring</h4>
                <p>A pattern or case has flagged this customer for elevated scrutiny. High-risk transactions may be held for manual review. A case is open and under investigation. State resolves back to ACTIVE on clearance or forward to BLOCKED on escalation.</p>
              </div>
            </div>
            <div className="state-item">
              <span className="state-badge state-badge-blocked">BLOCKED</span>
              <div className="state-item-text">
                <h4>All transactions declined</h4>
                <p>Every transaction for this customer returns a BLOCKED decision before any rules run. Account is frozen pending investigation resolution. State is set by a compliance case disposition or by a rule that reaches a hard-block threshold.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Integration ──────────────────────────────────── */}
      <section className="prod-section">
        <div className="wrap">
          <div className="two-col-feature">
            <div className="reveal">
              <span className="sec-eyebrow">Integration</span>
              <h2 className="sec-title">Designed for pre-authorisation hooks</h2>
              <p style={{ color: 'var(--slate)', lineHeight: 1.7, fontSize: '1rem', marginTop: '16px', maxWidth: '50ch' }}>
                Call <code style={{ fontFamily: 'var(--font-mono)', background: '#EBEEF3', padding: '2px 5px', borderRadius: '4px' }}>/v1/decide</code> at
                the point in your payment handler where you would normally execute the debit or
                credit. Act on the decision. Your rails execute — or don&apos;t — based on
                Fintegrity&apos;s response.
              </p>
              <ul className="feature-list" style={{ marginTop: '20px' }}>
                {[
                  ['RESTful JSON', 'Standard HTTP + JSON. No proprietary SDKs required. Works with any stack that can make an HTTP request.'],
                  ['Synchronous', 'The decision is in the response body. No webhooks required for the primary flow. Sub-50ms P99 means no user-visible latency.'],
                  ['Idempotent', 'Pass an idempotencyKey to guarantee exactly-once decision processing, even across retries.'],
                  ['Webhooks for async events', 'Customer state changes, case updates, and FLAGGED or HELD_FOR_REVIEW resolutions can optionally be pushed to your endpoint.'],
                ].map(([title, body]) => (
                  <li className="feature-item" key={title}>
                    <span className="feature-check">✓</span>
                    <div className="feature-item-text"><h4>{title}</h4><p>{body}</p></div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="reveal" style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ background: 'var(--bg-soft)', borderRadius: 'var(--r)', padding: '24px', border: '1px solid var(--line)' }}>
                <div className="sec-eyebrow" style={{ marginBottom: '14px' }}>Explore further</div>
                {[
                  { href: '/transaction-monitoring', label: 'Transaction Monitoring', desc: 'The rule engine and pattern detection that feeds decisions.' },
                  { href: '/case-management', label: 'Case Management', desc: 'Every FLAGGED or HELD_FOR_REVIEW result opens a structured case for your compliance team.' },
                  { href: '/developer-api', label: 'Developer API docs', desc: 'Full endpoint reference, auth guide, error codes, and SDKs.' },
                ].map((link) => (
                  <Link key={link.href} href={link.href} style={{ display: 'flex', flexDirection: 'column', padding: '14px 0', borderBottom: '1px solid var(--line-2)', textDecoration: 'none', color: 'inherit', transition: 'color .14s' }} className="blog-card" /* borrowing hover */>
                    <span style={{ fontWeight: 600, fontSize: '0.93rem', color: 'var(--ink)', marginBottom: '4px' }}>{link.label} →</span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--muted)', lineHeight: 1.5 }}>{link.desc}</span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTABand
        headline="See a live decision in your context"
        body="We'll demonstrate a decision call using transaction patterns from your business model — with real rules, real states, and real evidence."
        primaryLabel="Book a demo →"
        primaryHref="/book-a-demo"
        secondaryLabel="Explore the Developer API"
        secondaryHref="/developer-api"
      />
    </>
  )
}
