/**
 * scripts/migrate-blog-posts.ts
 *
 * Migrates three hardcoded blog-post pages into the Payload CMS blog-posts
 * collection as published documents. Idempotent — safe to re-run; an existing
 * post with the same slug is updated rather than duplicated.
 *
 * NOT RUNNABLE STANDALONE on this stack: tsx chokes on file-type's exports map
 * (ERR_PACKAGE_PATH_NOT_EXPORTED) and `payload run` fails with ERR_REQUIRE_ESM.
 * The actual migration was performed via a temporary Next.js API route
 * (src/app/(payload)/api/migrate-blog/route.ts) instead, which runs inside the
 * Next runtime where module resolution already works. Kept here for reference.
 *
 * Run from the project root (WSL terminal, nvm active):
 *   node --env-file=.env node_modules/.bin/tsx scripts/migrate-blog-posts.ts
 *
 * Requires DATABASE_URI and PAYLOAD_SECRET in .env.
 * Both variables are read by Node before tsx starts (via --env-file).
 */

import { getPayload } from 'payload'
import config from '@payload-config'

// ── Lexical node builders ────────────────────────────────────────────────────
// Produces the JSON structure Payload's Lexical editor stores/reads.

const t = (text: string, format = 0) => ({
  type: 'text' as const, version: 1, text, format,
  mode: 'normal' as const, style: '', detail: 0,
})
const b  = (s: string) => t(s, 1)   // bold
const em = (s: string) => t(s, 2)   // italic
const cd = (s: string) => t(s, 16)  // inline code

const p = (...children: object[]) => ({
  type: 'paragraph', version: 1, children,
  direction: 'ltr' as const, format: '', indent: 0, textFormat: 0, textStyle: '',
})
const h2 = (...children: object[]) => ({
  type: 'heading', version: 1, tag: 'h2', children,
  direction: 'ltr' as const, format: '', indent: 0,
})
const h3 = (...children: object[]) => ({
  type: 'heading', version: 1, tag: 'h3', children,
  direction: 'ltr' as const, format: '', indent: 0,
})
const ul = (...children: object[]) => ({
  type: 'list', version: 1, listType: 'bullet', start: 1, tag: 'ul', children,
  direction: 'ltr' as const, format: '', indent: 0,
})
const ol = (...children: object[]) => ({
  type: 'list', version: 1, listType: 'number', start: 1, tag: 'ol', children,
  direction: 'ltr' as const, format: '', indent: 0,
})
const li = (value: number, ...children: object[]) => ({
  type: 'listitem', version: 1, value, checked: false, children,
  direction: 'ltr' as const, format: '', indent: 0,
})
const q = (...children: object[]) => ({
  type: 'quote', version: 1, children,
  direction: 'ltr' as const, format: '', indent: 0,
})
const lexical = (...children: object[]) => ({
  root: {
    type: 'root', format: '', indent: 0, version: 1,
    direction: 'ltr' as const, children,
  },
})

// ── Post 1: CBN AML/CFT Baseline Standards ───────────────────────────────────

const CBN_AML_BODY = lexical(
  q(
    b('Disclaimer: '),
    t('This article is educational and reflects Fintegrity’s understanding of publicly available CBN guidance. It is not legal advice. Verify all regulatory requirements against official CBN and NFIU circulars and consult a qualified compliance professional before making compliance decisions.'),
  ),

  h2(t('Why this matters now')),
  p(t('The CBN’s AML/CFT Baseline Standards aren’t new — but enforcement has shifted. The question regulators are now asking isn’t “do you have a policy?” It’s “show me the evidence that this transaction was reviewed before it processed.” That shift from policy compliance to evidence-based compliance is what makes the technology layer so important.')),
  p(t('For most Nigerian fintechs, the gap between “we have an AML programme” and “we can demonstrate every transaction was reviewed according to it” is large. This guide is about closing that gap — standard by standard.')),
  q(
    b('The key shift: '),
    t('Regulators have moved from asking “do you have a policy?” to “can you prove every transaction was evaluated against it?” That requires technology, not documentation.'),
  ),

  h2(t('The 12 standards at a glance')),
  p(t('The CBN’s Baseline Standards cover 12 distinct requirements. They range from institutional-level programme requirements (S-01, S-11, S-12) to transaction-level controls (S-04, S-05, S-07, S-08) to recordkeeping and reporting requirements (S-06, S-07, S-09). Not all of them are technology problems — but most of the operational ones are.')),

  ul(
    li(1,  b('S-01 — AML/CFT Programme: '),                   t('Fintechs must maintain a documented AML/CFT programme covering policies, procedures, and controls. Technology role: provides the controls infrastructure the programme document references.')),
    li(2,  b('S-02 — Customer Due Diligence (CDD): '),         t('Know your customer — BVN/NIN verification, identity checks, and risk classification at onboarding. Technology role: enforces tier limits based on CDD level at the transaction layer.')),
    li(3,  b('S-03 — Enhanced Due Diligence (EDD): '),         t('Stricter checks for high-risk customers, PEPs, and high-value relationships. Technology role: flags transactions from EDD-classified customers for elevated monitoring and review.')),
    li(4,  b('S-04 — Ongoing Monitoring: '),                   t('Continuous monitoring of customer transactions for suspicious patterns. Technology role: the core function of a transaction monitoring system operating in real time.')),
    li(5,  b('S-05 — Transaction Monitoring: '),               t('Specific requirement for automated monitoring of transactions against configured scenarios. Technology role: automated rule evaluation, pattern detection, and alert generation.')),
    li(6,  b('S-06 — Suspicious Transaction Reporting (STR): '), t('Timely filing of STRs/SARs for transactions that raise suspicion. Technology role: case management provides the evidence base for STR documentation.')),
    li(7,  b('S-07 — Currency Transaction Reporting (CTR): '), t('Filing reports for cash transactions above NFIU thresholds (₦5M individuals, ₦10M corporates). Technology role: automatic threshold detection and reporting workflow.')),
    li(8,  b('S-08 — Sanctions Screening: '),                  t('Screening customers and counterparties against sanctions lists, PEP databases, and watchlists. Technology role: orchestrates screening provider calls and integrates results into the decision.')),
    li(9,  b('S-09 — Record Keeping: '),                       t('Retention of transaction records, CDD documentation, and STR/CTR filings for prescribed periods. Technology role: append-only evidence store with configurable retention periods.')),
    li(10, b('S-10 — Training: '),                             t('Regular AML/CFT training for all relevant staff. Technology role: outside the scope of transaction monitoring technology, but case management workflows build analyst capability.')),
    li(11, b('S-11 — Risk Assessment: '),                      t('Institution-level and customer-level risk assessments. Technology role: customer risk profiling and risk state management inform and operationalise the risk assessment.')),
    li(12, b('S-12 — Independent Audit: '),                    t('Periodic independent testing of the AML/CFT programme. Technology role: audit trail, evidence packs, and decision records are the primary evidence for independent audit.')),
  ),

  h2(t('The technology-addressable standards in depth')),

  h3(t('S-04 and S-05: Ongoing monitoring and transaction monitoring')),
  p(t('These two standards are where most Nigerian fintechs have the biggest gap. S-04 requires continuous, ongoing monitoring of customer transactions. S-05 goes further: it specifically requires automated transaction monitoring against configured scenarios.')),
  p(t('“Automated” is the operative word. A compliance officer manually reviewing a daily report is not automated monitoring — and it’s not ongoing. The direction of CBN guidance is toward real-time, pre-authorisation controls that evaluate transactions before they complete.')),
  p(t('What “configured scenarios” means in practice: velocity rules (too many transactions in a rolling window), amount thresholds (absolute or relative), structuring patterns (sub-threshold sequences), and account-age rules (new accounts behaving like mule accounts). These scenarios should be configured to your specific business model — the patterns that matter for a digital wallet are different from those that matter for a remittance company.')),
  q(
    b('S-05 requires “automated transaction monitoring.” '),
    t('A compliance officer reading a spreadsheet is not automated monitoring. Technology that evaluates every transaction against configured scenarios before it executes is.'),
  ),

  h3(t('S-07: Currency Transaction Reporting')),
  p(t('NFIU requires Currency Transaction Reports (CTRs) for cash transactions above ₦5M (individuals) and ₦10M (corporates), filed within 7 days. Structuring to evade these thresholds — breaking transactions into smaller amounts — is itself an offence under MLPPA 2022.')),
  p(t('From a technology perspective, CTR compliance requires three things: threshold detection (identifying transactions at or above the reporting threshold), structuring detection (identifying patterns designed to stay below it), and a workflow for generating and filing the report. All three should be automated, not manual.')),

  h3(t('S-08: Sanctions screening')),
  p(t('Every customer and counterparty should be screened against relevant sanctions lists (OFAC, UN, EU, NFIU), PEP databases, and adverse media sources. The CBN expects this screening to happen at onboarding and at intervals thereafter — and increasingly, on every transaction.')),
  p(t('The compliance technology role here is orchestration: not providing the screening data (that’s your screening vendor’s job), but calling the vendor, handling the response, integrating the result into the transaction decision, and creating a case when a hit is returned. Fintegrity plugs in your existing screening provider and incorporates the results into the real-time decision.')),

  h3(t('S-09: Record keeping')),
  p(t('CBN requires financial institutions to retain transaction records, CDD documentation, STR/CTR filings, and investigation records for prescribed periods. The key word is “retain” — but regulators increasingly expect records that are not just retained but retrievable, structured, and verifiable.')),
  p(t('An append-only evidence store where every decision, state change, and case action is written with a server-side timestamp satisfies this requirement in a way that a spreadsheet archive does not.')),

  h2(t('The standards technology doesn’t address')),
  p(t('S-10 (training) and parts of S-01 (programme documentation) and S-12 (independent audit) are not technology problems. They require human expertise, internal governance, and qualified compliance professionals.')),
  p(t('Fintegrity is explicit about this boundary: we provide the controls infrastructure that your AML programme references and that your auditors test. We’re not your MLRO and we don’t replace your compliance team. We give them better tools and better evidence.')),
  q(
    b('The compliance technology boundary: '),
    t('Technology addresses the operational and controls requirements (S-04, S-05, S-07, S-08, S-09). Programme documentation, training, and independent audit are governance responsibilities that require qualified human expertise.'),
  ),

  h2(t('A practical implementation roadmap')),
  p(t('If you’re a Nigerian fintech looking to close your compliance gap, the practical order of priority is usually:')),
  ol(
    li(1, b('Get the decision layer in place first. '),   t('A real-time decision API (S-04/S-05) gives you the infrastructure everything else plugs into.')),
    li(2, b('Wire in sanctions screening '),              t('via your existing provider (S-08). This can be done alongside or immediately after the decision layer.')),
    li(3, b('Configure your rule library '),              t('to your specific scenarios — velocity, thresholds, structuring patterns (S-05). Start with the highest-risk patterns for your business model.')),
    li(4, b('Build out case management '),                t('for investigation and STR workflow (S-06). This is where your compliance team lives.')),
    li(5, b('Verify your record-keeping approach '),     t('covers the retention periods and retrieval requirements of S-09.')),
  ),
  q(t('This roadmap reflects Fintegrity’s product architecture and is not a substitute for qualified compliance advice. The order and scope of implementation should be validated against your specific regulatory classification, licence conditions, and MLRO guidance.')),

  h2(t('What Fintegrity addresses')),
  p(t('Fintegrity’s platform is designed to address the technology-addressable standards directly: real-time decision API and transaction monitoring (S-04, S-05), screening orchestration (S-08), automated threshold detection (S-07), case management and STR workflow (S-06), and append-only evidence recordkeeping (S-09). The programme documentation (S-01), training (S-10), risk assessment (S-11), and independent audit (S-12) remain your responsibility — Fintegrity gives your auditors the evidence they need to assess the controls.')),
)

// ── Post 2: Why Batch AML Monitoring Fails ───────────────────────────────────

const REAL_TIME_BODY = lexical(
  h2(t('The standard approach and why it breaks')),
  p(t('The standard AML monitoring approach at most Nigerian fintechs looks like this: transactions are processed in real time, a batch job runs overnight or at intervals during the day, the batch job applies rules to the transaction history, and alerts are generated for anything suspicious. The compliance team reviews the alerts the next morning.')),
  p(t('This approach made sense when transaction volumes were low and speeds were slow. It does not make sense for a digital wallet processing 100,000 transactions a day and settling in under a minute.')),
  p(t('Three specific failure modes emerge at Nigerian fintech scale:')),
  ul(
    li(1, b('The money has moved by the time you flag it. '), t('Batch monitoring reviews completed transactions. If a transaction is suspicious, the funds have already settled. You can file an STR, but you cannot stop the transaction or reverse the funds without additional action — action that’s now much harder to take.')),
    li(2, b('Mule account abuse completes in hours. '),       t('A mule account is funded, funds are swept to multiple accounts, and the receiving accounts cash out — sometimes within two to three hours of the initial deposit. A T+1 batch run never catches this pattern while any recovery is possible.')),
    li(3, b('Structuring windows collapse. '),               t('Structured transactions — amounts broken up to stay below CTR thresholds — can be completed within a single day. Batch monitoring that looks at daily aggregates may never aggregate across the full pattern.')),
  ),
  q(
    b('By the time a batch run flags a mule account, the money is gone. '),
    t('The window between a suspicious transaction and an irreversible one is often hours. Batch monitoring misses it every time.'),
  ),

  h2(t('What “real-time” actually means')),
  p(t('Real-time monitoring in the context of AML compliance has a specific architectural meaning: the evaluation happens '), em('before'), t(' the transaction is authorised, not after it completes. This is the pre-authorisation model.')),
  p(t('The implementation pattern: before your payment handler executes a debit or credit, it makes a synchronous call to the compliance decision layer. The compliance layer evaluates the transaction — customer state, rules, patterns — and returns a decision. The payment handler acts on the decision. If the decision is BLOCK, the transaction never executes.')),
  p(t('The alternative is the post-authorisation model: the transaction executes first, and the compliance evaluation happens after. This is where batch monitoring lives, and it’s where the failure modes described above live too.')),
  p(t('Pre-authorisation compliance has several requirements that batch monitoring doesn’t:')),
  ul(
    li(1, b('Low latency. '),         t('A synchronous compliance call that takes 2 seconds adds 2 seconds to your payment flow. Sub-50ms P99 is the minimum viable target.')),
    li(2, b('High availability. '),   t('If your compliance layer is down, your payment flow is blocked. Uptime requirements are at least as strict as your payment infrastructure.')),
    li(3, b('Stateless evaluation. '), t('Each decision call must be self-contained. The compliance layer looks up state (customer risk state, transaction history) rather than relying on shared session state.')),
  ),

  h2(t('The evidence argument for pre-authorisation')),
  p(t('Beyond preventing harm, pre-authorisation monitoring makes a stronger compliance argument than post-authorisation monitoring.')),
  p(t('When a regulator asks “how did you handle this transaction?”, the best answer is: “Before it executed, our system evaluated it against our configured rules and made a decision. Here is the decision record, timestamped before the transaction completed, showing what rules ran and what we decided.”')),
  p(t('The post-authorisation answer is: “The transaction processed. Our batch job later identified it as suspicious and we filed an STR.” The first answer shows a control. The second shows a detection — after the fact.')),
  p(t('CBN guidance is explicit that regulated institutions should have effective transaction monitoring controls. Whether “effective” eventually mandates pre-authorisation monitoring explicitly is a question of regulatory interpretation — but the direction of travel is clear.')),
  q(
    b('Pre-authorisation monitoring produces evidence that a control was in place. '),
    t('Post-authorisation monitoring produces evidence that a transaction was reviewed retrospectively. For a regulator, these are different things.'),
  ),

  h2(t('Practical migration path')),
  p(t('If you’re running batch monitoring today, moving to pre-authorisation isn’t a one-day migration. The practical path:')),
  ol(
    li(1, b('Start with the highest-risk transaction types. '), t('Apply pre-authorisation monitoring to transfers above a threshold, withdrawals to new counterparties, or your highest-fraud-exposure flows first. Keep batch for everything else while you build confidence in the synchronous system.')),
    li(2, b('Run both systems in parallel for a period. '),     t('Pre-authorisation in “observe mode” (decision is logged but not enforced) gives you a comparison baseline and confidence before you switch to enforcement.')),
    li(3, b('Define your response to each decision state upfront. '), t('Before going live, your engineering and product teams need clear, agreed behaviour for each decision state (ALLOW/REVIEW/BLOCK) in every transaction flow.')),
    li(4, b('Tune, don’t just deploy. '),                  t('Default rule configurations are a starting point. High false-positive rates will undermine both your user experience and your compliance team’s capacity. Plan for a tuning period with your compliance team.')),
  ),

  h2(t('What this means for your technology stack')),
  p(t('Pre-authorisation AML monitoring requires an architecture decision: the compliance decision layer must be in the critical path of your payment processing. This is a meaningful change from batch monitoring, which runs offline.')),
  p(t('Fintegrity is designed for this architecture. The Decision API is synchronous and optimised for P99 latency under 50ms. It maintains the customer risk state and rule configuration so your payment handler can call it without session state. It handles its own availability so you can treat it like infrastructure, not a feature.')),
  p(t('The result: your payment handler makes one API call before executing. Everything else — rule evaluation, pattern detection, case creation, evidence writing — happens in Fintegrity, invisible to your users, before money moves.')),
)

// ── Post 3: ALLOW, REVIEW, BLOCK ─────────────────────────────────────────────

const ALLOW_REVIEW_BLOCK_BODY = lexical(
  h2(t('Why binary compliance fails')),
  p(t('Most transaction monitoring systems output one of two results: pass or flag. Pass means proceed. Flag means stop — or, in practice, drop the transaction into a queue where a compliance analyst manually reviews it, usually hours after the money has moved.')),
  p(t('This binary model has three fundamental problems:')),
  ul(
    li(1, b('It can’t represent risk gradients. '), t('A transaction that’s slightly unusual is not the same as a transaction that matches a known fraud pattern. Treating both as “flagged” collapses important information.')),
    li(2, b('It generates alert floods. '),              t('Tuning a binary system for sensitivity produces false positives at scale. A wallet processing a million transactions a day with a 0.1% flag rate has 1,000 alerts per day. No compliance team handles that.')),
    li(3, b('It reviews after the fact. '),              t('Batch-mode binary monitoring reviews transactions that have already completed. That’s not pre-authorisation compliance — it’s archaeology.')),
  ),
  q(
    b('The real question isn’t “did this transaction pass?” '),
    t('It’s “what should my system do with this transaction, right now, before money moves?” That question has three meaningful answers.'),
  ),

  h2(t('Three decision states, not two')),
  p(t('The right compliance decision model has three states:')),
  ul(
    li(1, b('ALLOW: '), t('The transaction matches no suspicious patterns, the customer is in good standing, and all rules pass. The payment handler should proceed. This decision is still evidenced — every ALLOW is logged.')),
    li(2, b('REVIEW: '), t('Something about this transaction warrants a closer look, but not an immediate stop. The transaction can be held for manual review while your compliance team investigates. A case is created automatically with the evidence assembled.')),
    li(3, b('BLOCK: '), t('The transaction meets the criteria for an immediate decline. The customer may be in a BLOCKED state, a rule may have reached a hard threshold, or a sanctions screening hit may have returned. Your payment handler should decline and, where appropriate, reverse any funds.')),
  ),
  p(t('This three-state model has a direct mapping to actions your payment handler takes: ALLOW → PROCEED, REVIEW → HOLD_FOR_REVIEW, BLOCK → DECLINE_AND_REVERSE. The compliance layer returns a decision; the payment handler executes it. The two responsibilities are cleanly separated.')),

  h2(t('The customer risk lifecycle')),
  p(t('Transaction-level decisions exist within a customer-level risk lifecycle. A customer doesn’t just have a history of individual transactions — they have an overall risk state that affects how every subsequent transaction is evaluated.')),
  p(t('In Fintegrity’s model, every customer is in one of three states at any point in time:')),
  ul(
    li(1, b('ACTIVE — Normal operating state: '),            t('Customer transactions proceed through full rule evaluation. The vast majority of customers are in this state at any given time.')),
    li(2, b('UNDER_REVIEW — Flagged for elevated monitoring: '), t('A pattern or investigation has flagged this customer. High-risk transactions are held for review. A case is open. State resolves to ACTIVE on clearance or BLOCKED on escalation.')),
    li(3, b('BLOCKED — All transactions declined: '),        t('Every transaction for this customer returns BLOCK before rules run. This prevents compliance bypass through new devices, new channels, or transaction splitting.')),
  ),

  h2(t('Why BLOCK must be customer-level, not transaction-level')),
  p(t('This is one of the more subtle architectural decisions in compliance system design, and it’s often missed.')),
  p(t('If BLOCK is only a transaction-level decision, a bad actor can simply try a different channel, a different device, or a slightly different transaction to get an ALLOW. The block is trivially circumvented by trying again.')),
  p(t('Customer-level blocking prevents this. When a customer is BLOCKED, every transaction for that customer ID returns BLOCK immediately — before any rules run. The pattern can’t be gamed by changing the transaction parameters.')),
  p(t('The corollary is that transitioning a customer to BLOCKED (or back to ACTIVE) must be a deliberate, audited action — not an automatic rule outcome that can flip back. State transitions are enforced workflow steps, not side effects.')),
  q(
    b('If BLOCK is only transaction-level, it can be circumvented. '),
    t('A BLOCKED customer must be blocked at the customer-state layer, so every subsequent transaction for that customer ID gets a hard stop before rules even run.'),
  ),

  h2(t('What “defensible” means in practice')),
  p(t('A defensible compliance decision has three properties:')),
  ol(
    li(1, b('It was made before money moved. '),         t('Post-transaction review is archaeology — you’re describing what happened, not demonstrating you controlled it. Pre-authorisation decisions show you had a control in place.')),
    li(2, b('It was based on explicit criteria. '),      t('The reasons for the decision — which rules fired, what the customer’s state was, what the transaction parameters were — must be recorded at decision time, not reconstructed later.')),
    li(3, b('It is immutable. '),                        t('The record of the decision cannot be altered. A record that can be edited is not evidence — it’s a document. An append-only store with server-side timestamps is evidence.')),
  ),
  p(
    t('This is what the '),
    b('evidenceRef'),
    t(' in a Fintegrity decision response represents: a pointer to an immutable, structured record that satisfies all three properties. The decision was made in real time, with documented criteria, and the record cannot be altered.'),
  ),

  h2(t('Wiring three-state decisions into your payment handler')),
  p(
    t('The integration pattern is simple: before your payment handler executes a debit or credit, it calls '),
    cd('POST /v1/decide'),
    t(' with the transaction context. The decision comes back synchronously. The handler acts on it.'),
  ),
  p(t('The handler has three paths:')),
  ul(
    li(1, b('decision: ALLOW, requiredActions: [PROCEED]'),           t(' → execute the transaction normally')),
    li(2, b('decision: REVIEW, requiredActions: [HOLD_FOR_REVIEW]'),  t(' → hold the transaction, notify the customer if applicable, log the hold for the compliance team to resolve')),
    li(3, b('decision: BLOCK, requiredActions: [DECLINE_AND_REVERSE]'), t(' → decline the transaction, reverse any reserved funds, notify the customer per your product policy')),
  ),
  p(t('The key point is that the compliance layer tells your system what to do. Your system does it. The separation of concerns is clean, and the responsibility for the decision is clearly documented.')),
  q(
    b('The compliance layer decides. Your rails execute. '),
    t('That separation is what makes decisions defensible — the control happened before money moved, and the record shows it.'),
  ),
)

// ── Post metadata ─────────────────────────────────────────────────────────────

const POSTS = [
  {
    slug: 'cbnaml-baseline-standards',
    title: 'CBN AML/CFT Baseline Standards: A Technical Breakdown for Nigerian Fintechs',
    excerpt: 'The CBN’s AML/CFT Baseline Standards define 12 requirements every regulated Nigerian fintech must meet. A technical breakdown of each standard and how compliance technology addresses it.',
    contentType: 'blog' as const,
    reviewStatus: 'draft' as const,
    category: 'regulation',
    publishedAt: '2026-03-15T00:00:00.000Z',
    body: CBN_AML_BODY,
  },
  {
    slug: 'real-time-vs-batch-aml',
    title: 'Why Batch AML Monitoring Fails at Nigerian Fintech Scale',
    excerpt: 'Reviewing transactions after they’ve already processed isn’t compliance monitoring — it’s forensic accounting. Here’s why the industry is shifting to pre-authorisation monitoring.',
    contentType: 'blog' as const,
    reviewStatus: 'draft' as const,
    category: 'compliance',
    publishedAt: '2026-05-10T00:00:00.000Z',
    body: REAL_TIME_BODY,
  },
  {
    slug: 'allow-review-block-compliance-decisions',
    title: 'ALLOW, REVIEW, BLOCK: The Architecture of a Defensible Compliance Decision',
    excerpt: 'Binary pass/fail compliance checks fail at scale and under regulatory scrutiny. Here’s why three decision states — with a customer risk lifecycle — is the right model, and how to wire it into your payment flow.',
    contentType: 'blog' as const,
    reviewStatus: 'draft' as const,
    category: 'product',
    publishedAt: '2026-04-02T00:00:00.000Z',
    body: ALLOW_REVIEW_BLOCK_BODY,
  },
]

// ── Migration runner ──────────────────────────────────────────────────────────

async function main() {
  // Verify essential env vars are present before touching the DB
  if (!process.env.DATABASE_URI) throw new Error('DATABASE_URI is not set. Run with: node --env-file=.env ...')
  if (!process.env.PAYLOAD_SECRET) throw new Error('PAYLOAD_SECRET is not set. Run with: node --env-file=.env ...')

  console.log('Connecting to Payload / Neon DB...')
  const payload = await getPayload({ config })

  console.log(`Migrating ${POSTS.length} posts...\n`)

  for (const post of POSTS) {
    process.stdout.write(`  ${post.slug} ... `)

    // Idempotency: look for an existing document by slug
    const existing = await payload.find({
      collection: 'blog-posts',
      where: { slug: { equals: post.slug } },
      limit: 1,
      overrideAccess: true,  // bypass public access restrictions in a script context
    })

    const data = {
      title:        post.title,
      slug:         post.slug,
      excerpt:      post.excerpt,
      contentType:  post.contentType,
      reviewStatus: post.reviewStatus,
      category:     post.category,
      publishedAt:  post.publishedAt,
      body:         post.body,
      _status:      'published' as const,
    }

    if (existing.docs.length > 0) {
      const id = existing.docs[0].id as string
      await payload.update({
        collection: 'blog-posts',
        id,
        data,
        overrideAccess: true,
      })
      console.log(`updated (id: ${id})`)
    } else {
      const created = await payload.create({
        collection: 'blog-posts',
        data,
        overrideAccess: true,
      })
      console.log(`created  (id: ${created.id})`)
    }
  }

  console.log('\nAll done. Check /admin → Blog Posts to verify.')
  process.exit(0)
}

main().catch((err) => {
  console.error('\nMigration failed:', err?.message ?? err)
  process.exit(1)
})
