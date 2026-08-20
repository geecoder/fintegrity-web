import type { ArticleContent } from './types'

const content: ArticleContent = {
  blocks: [
    { type: 'h2', id: 'the-gap-between-an-alert-and-a-decision', text: 'The gap between an alert and a decision' },
    {
      type: 'p',
      text:
        'A rule firing is the easy part. What determines whether a compliance programme actually works is what happens next: does the alert become a structured investigation with a documented outcome, or does it become an entry in a shared spreadsheet that someone eventually marks "reviewed" without a clear record of why?',
    },
    {
      type: 'p',
      text:
        'That gap — between alert and defensible disposition — is where most case-management processes lose the evidence trail an examiner would actually want to see.',
    },

    { type: 'h2', id: 'the-case-lifecycle-stage-by-stage', text: 'The case lifecycle, stage by stage' },
    {
      type: 'numbered',
      items: [
        "**Case creation.** A rule fires (or several related rules fire) and a case is created automatically — not manually transcribed by an analyst — with the triggering transaction(s), the rule(s) that fired, and the customer's risk state at that moment already attached.",
        '**Triage and assignment.** The case is prioritised and assigned to an analyst. In a mature workflow, priority reflects the severity of the decision (`BLOCKED` and `HELD_FOR_REVIEW` cases before `FLAGGED` ones) and the customer\'s risk profile, not just a first-in-first-out queue.',
        '**Investigation.** The analyst reviews the evidence already assembled — related transaction history, prior cases for the same customer, the specific rule logic that fired — and documents their reasoning as they go, not just at the end.',
        '**Escalation, if needed.** Some cases need a second reviewer or MLRO sign-off before a final decision — particularly ones that may result in an STR filing or account-level action.',
        '**Disposition.** The case closes with a documented outcome: cleared, escalated to an STR, or resulting in an account action (hold, block, tier downgrade). The disposition itself — and the reasoning behind it — becomes part of the permanent record.',
      ],
    },
    {
      type: 'p',
      text:
        '**The disposition reasoning is the evidence, not just the outcome.** A case marked "cleared" with no documented rationale is barely better than no review at all, from an examiner\'s perspective. Why it was cleared matters as much as that it was.',
    },

    { type: 'h2', id: 'where-case-management-workflows-commonly-break-down', text: 'Where case-management workflows commonly break down' },
    {
      type: 'bullets',
      items: [
        '**Evidence lives in a different system than the case.** An analyst has to manually pull transaction history from one system into a case note in another — slow, and prone to leaving gaps.',
        '**No link between related cases for the same customer.** Each alert is investigated in isolation, missing the pattern across a customer\'s case history.',
        '**Disposition reasoning isn\'t structured.** Free-text notes are better than nothing, but structured disposition categories make cases queryable later — "show me every case closed for this specific reason in the last quarter" becomes possible.',
        "**The case outcome doesn't feed back into the customer's risk state.** A pattern of cleared-but-suspicious cases should influence future risk scoring; if it doesn't, the system doesn't actually learn from its own investigations.",
      ],
    },

    { type: 'h2', id: 'closing-the-loop-from-decision-to-evidence', text: 'Closing the loop from decision to evidence' },
    {
      type: 'p',
      text:
        "The strongest case-management setups treat the case as a continuation of the original compliance decision, not a separate system bolted on afterward — the same evidence architecture that recorded the original `CLEAR`/`FLAGGED`/`HELD_FOR_REVIEW`/`BLOCKED` decision also carries the case investigation and its final disposition, so the whole lifecycle is one queryable record.",
    },
    {
      type: 'p',
      text:
        "That's how Fintegrity's case management is built — every alert becomes a structured case with evidence pre-assembled, and every disposition becomes part of the same immutable audit trail.",
    },
  ],
}

export default content
