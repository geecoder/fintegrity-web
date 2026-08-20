import type { ArticleContent } from './types'

const content: ArticleContent = {
  blocks: [
    { type: 'h2', id: 'why-binary-compliance-fails', text: 'Why binary compliance fails' },
    {
      type: 'p',
      text:
        'Most transaction monitoring systems output one of two results: pass or flag. Pass means proceed. Flag means stop — or, in practice, drop the transaction into a queue where a compliance analyst manually reviews it, usually hours after the money has moved.',
    },
    { type: 'p', text: 'This binary model has three fundamental problems:' },
    {
      type: 'numbered',
      items: [
        "**It can't represent risk gradients.** A transaction that's slightly unusual is not the same as a transaction that matches a known fraud pattern. Treating both as \"flagged\" collapses important information.",
        '**It generates alert floods.** Tuning a binary system for sensitivity produces false positives at scale. A wallet processing a million transactions a day with a 0.1% flag rate has 1,000 alerts per day. No compliance team handles that.',
        "**It reviews after the fact.** Batch-mode binary monitoring reviews transactions that have already completed. That's not pre-authorisation compliance — it's archaeology.",
      ],
    },
    {
      type: 'quote',
      text:
        '**The real question isn\'t "did this transaction pass?"** It\'s "what should my system do with this transaction, right now, before money moves?" That question has four meaningful answers.',
    },

    { type: 'h2', id: 'four-decision-states-not-two', text: 'Four decision states, not two' },
    { type: 'p', text: 'The right compliance decision model has four states:' },
    {
      type: 'decisionStates',
      items: [
        {
          state: 'CLEAR',
          text:
            'The transaction matches no suspicious patterns, the customer is in good standing, and all rules pass. The payment handler should proceed. This decision is still evidenced — every CLEAR is logged.',
        },
        {
          state: 'FLAGGED',
          text:
            "Something about this transaction is worth a second look, but not severe enough to stop it. The transaction proceeds, and a case is created automatically so your compliance team can review it after the fact with the evidence already assembled.",
        },
        {
          state: 'HELD_FOR_REVIEW',
          text:
            'Something about this transaction warrants a stop before it completes. The transaction is held while your compliance team investigates. A case is created automatically with the evidence assembled.',
        },
        {
          state: 'BLOCKED',
          text:
            'The transaction meets the criteria for an immediate decline. The customer may be in a BLOCKED state, a rule may have reached a hard threshold, or a sanctions screening hit may have returned. Your payment handler should decline and, where appropriate, reverse any funds.',
        },
      ],
    },
    {
      type: 'p',
      text:
        'This four-state model has a direct mapping to actions your payment handler takes: CLEAR and FLAGGED both → PROCEED (a FLAGGED decision also opens a case, but doesn\'t hold the money), HELD_FOR_REVIEW → HOLD_FOR_REVIEW, BLOCKED → DECLINE_AND_REVERSE. The compliance layer returns a decision; the payment handler executes it. The two responsibilities are cleanly separated.',
    },

    { type: 'h2', id: 'the-customer-risk-lifecycle', text: 'The customer risk lifecycle' },
    {
      type: 'p',
      text:
        "Transaction-level decisions exist within a customer-level risk lifecycle. A customer doesn't just have a history of individual transactions — they have an overall risk state that affects how every subsequent transaction is evaluated.",
    },
    { type: 'p', text: "In Fintegrity's model, every customer is in one of three states at any point in time:" },
    {
      type: 'stateCards',
      items: [
        {
          state: 'ACTIVE',
          accent: 'clear',
          title: 'Normal operating state',
          body:
            'Customer transactions proceed through full rule evaluation. The vast majority of customers are in this state at any given time.',
        },
        {
          state: 'UNDER_REVIEW',
          accent: 'flagged',
          title: 'Flagged for elevated monitoring',
          body:
            'A pattern or investigation has flagged this customer. High-risk transactions are held for review. A case is open. State resolves to ACTIVE on clearance or BLOCKED on escalation.',
        },
        {
          state: 'BLOCKED',
          accent: 'blocked',
          title: 'All transactions declined',
          body:
            'Every transaction for this customer returns a BLOCKED decision before rules run. This prevents compliance bypass through new devices, new channels, or transaction splitting.',
        },
      ],
    },

    { type: 'h2', id: 'why-blocked-must-be-customer-level', text: 'Why BLOCKED must be customer-level, not transaction-level' },
    {
      type: 'p',
      text: "This is one of the more subtle architectural decisions in compliance system design, and it's often missed.",
    },
    {
      type: 'p',
      text:
        'If BLOCKED is only a transaction-level decision, a bad actor can simply try a different channel, a different device, or a slightly different transaction to get a CLEAR result. The block is trivially circumvented by trying again.',
    },
    {
      type: 'p',
      text:
        "Customer-level blocking prevents this. When a customer is BLOCKED, every transaction for that customer ID returns a BLOCKED decision immediately — before any rules run. The pattern can't be gamed by changing the transaction parameters.",
    },
    {
      type: 'p',
      text:
        'The corollary is that transitioning a customer to BLOCKED (or back to ACTIVE) must be a deliberate, audited action — not an automatic rule outcome that can flip back. State transitions are enforced workflow steps, not side effects.',
    },
    {
      type: 'quote',
      text:
        '**If BLOCKED is only transaction-level, it can be circumvented.** A BLOCKED customer must be blocked at the customer-state layer, so every subsequent transaction for that customer ID gets a hard stop before rules even run.',
    },

    { type: 'h2', id: 'what-defensible-means-in-practice', text: 'What "defensible" means in practice' },
    { type: 'p', text: 'A defensible compliance decision has three properties:' },
    {
      type: 'numbered',
      items: [
        "**It was made before money moved.** Post-transaction review is archaeology — you're describing what happened, not demonstrating you controlled it. Pre-authorisation decisions show you had a control in place.",
        "**It was based on explicit criteria.** The reasons for the decision — which rules fired, what the customer's state was, what the transaction parameters were — must be recorded at decision time, not reconstructed later.",
        "**It is immutable.** The record of the decision cannot be altered. A record that can be edited is not evidence — it's a document. An append-only store with server-side timestamps is evidence.",
      ],
    },
    {
      type: 'p',
      text:
        'This is what the `evidenceRef` in a Fintegrity decision response represents: a pointer to an immutable, structured record that satisfies all three properties. The decision was made in real time, with documented criteria, and the record cannot be altered.',
    },

    { type: 'h2', id: 'wiring-into-your-payment-handler', text: 'Wiring compliance decisions into your payment handler' },
    {
      type: 'p',
      text:
        'The integration pattern is simple: before your payment handler executes a debit or credit, it calls `POST /v1/decide` with the transaction context. The decision comes back synchronously. The handler acts on it.',
    },
    { type: 'p', text: 'The handler has four paths:' },
    {
      type: 'handlerPaths',
      items: [
        {
          code: 'decision: CLEAR\nrequiredActions: ["PROCEED"]',
          text: 'Execute the transaction normally.',
        },
        {
          code: 'decision: FLAGGED\nrequiredActions: ["PROCEED"]',
          text: 'Execute the transaction normally; a case opens automatically for your compliance team to review afterward.',
        },
        {
          code: 'decision: HELD_FOR_REVIEW\nrequiredActions: ["HOLD_FOR_REVIEW"]',
          text: 'Hold the transaction, notify the customer if applicable, log the hold for the compliance team to resolve.',
        },
        {
          code: 'decision: BLOCKED\nrequiredActions: ["DECLINE_AND_REVERSE"]',
          text: 'Decline the transaction, reverse any reserved funds, notify the customer per your product policy.',
        },
      ],
    },
    {
      type: 'p',
      text:
        'The key point is that the compliance layer tells your system what to do. Your system does it. The separation of concerns is clean, and the responsibility for the decision is clearly documented.',
    },
    {
      type: 'quote',
      text:
        '**The compliance layer decides. Your rails execute.** That separation is what makes decisions defensible — the control happened before money moved, and the record shows it.',
    },
  ],
}

export default content
