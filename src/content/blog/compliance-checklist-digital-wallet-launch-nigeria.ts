import type { ArticleContent } from './types'

const content: ArticleContent = {
  cta: {
    title: 'Launch with compliance built in, not bolted on',
    body: 'One integration covering KYC tiers, monitoring, screening, and evidence.',
  },
  blocks: [
    { type: 'h2', id: 'before-you-write-payment-handler-code', text: 'Before you write payment-handler code' },
    {
      type: 'p',
      text:
        'The single most common mistake in wallet launches is treating compliance as a feature to bolt on before the app store submission, rather than infrastructure the payment flow is built around from the start. The decisions below get materially harder to retrofit once your payment handler already exists without them.',
    },

    { type: 'h2', id: 'define-kyc-tiers-and-limits-upfront', text: '1. Define your KYC tiers and limits upfront' },
    {
      type: 'p',
      text:
        "Decide your tier structure — what verification level unlocks what transaction and balance limits — before launch, and enforce it at the transaction decision layer, not scattered across application code. A tier limit that lives only in a mobile app validation check is not a control; it's a suggestion a bug can silently bypass.",
    },

    { type: 'h2', id: 'decide-monitoring-rules-before-your-first-user', text: '2. Decide your monitoring rules before your first user, not your ten-thousandth' },
    {
      type: 'p',
      text:
        "You don't need a mature rule library on day one, but you need the core patterns covered from launch: new-account velocity, rapid in-out, and basic structuring detection at minimum. Mule-account abuse targets new products specifically because early-stage monitoring is often thin — waiting until volume justifies \"proper\" monitoring means the gap is exploited exactly when you're least prepared to investigate it.",
    },

    { type: 'h2', id: 'decide-how-screening-fits-in', text: '3. Decide how screening fits into onboarding and every transaction' },
    {
      type: 'p',
      text:
        'Screening at onboarding (checking the customer against sanctions/PEP lists) and screening at the transaction level (checking counterparties) are both necessary and answer different questions. Decide which provider you\'re using and how screening results feed into your compliance decision before launch — retrofitting screening into an existing transaction flow is a bigger integration project than building it in from the start.',
    },
    {
      type: 'quote',
      text:
        '**The order matters: decision infrastructure before payment-handler integration.** Building your payment flow first and adding compliance afterward means re-engineering a live, revenue-generating system. Building the decision layer first means your payment flow is built around a single API call from day one.',
    },

    { type: 'h2', id: 'case-management-before-your-first-alert', text: '4. Have a case-management workflow before you have your first alert' },
    {
      type: 'p',
      text:
        'Decide, before launch, who investigates an alert, how it\'s prioritised, and what "disposition" options exist — cleared, escalated, account action. A genuine alert arriving with no defined workflow behind it either gets ignored or handled inconsistently, and inconsistent handling is itself a compliance weakness an examiner will notice.',
    },

    { type: 'h2', id: 'evidence-writes-from-day-one', text: '5. Make sure evidence writes from day one, not after your first examiner request' },
    {
      type: 'p',
      text:
        "Every decision — including every CLEAR — should be writing to an immutable evidence record from the moment you launch, not from the moment you decide evidence matters. There's no way to retroactively generate evidence for transactions that already happened without it; the record either exists from day one or it has a gap that can never be filled.",
    },

    { type: 'h2', id: 'the-checklist-in-order', text: 'The checklist, in order' },
    {
      type: 'numbered',
      items: [
        'KYC tiers and limits defined, enforced at the decision layer',
        'Core monitoring rules configured (new-account velocity, rapid in-out, structuring)',
        'Screening provider selected and wired into both onboarding and transaction flow',
        'Case-management workflow defined — assignment, escalation, disposition categories',
        'Evidence architecture writing every decision from the first transaction',
        'One API integration point for your payment handler, not scattered compliance logic across the codebase',
      ],
    },
    {
      type: 'p',
      text:
        'This is exactly the sequence Fintegrity is designed to shortcut — one Compliance Decision API integration covering tier enforcement, monitoring, screening, and evidence together, configured for digital wallet launch from day one rather than retrofitted after.',
    },
  ],
}

export default content
