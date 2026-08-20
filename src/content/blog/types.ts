/**
 * Structured-content block model for blog article bodies.
 *
 * We store each of the 13 articles as an array of typed blocks rather than
 * MDX — the brief allows either approach ("MDX ... or a structured block
 * array ... either is acceptable, prioritize correctness and shipping all
 * 13"), and no MDX renderer is installed in this project yet, so this avoids
 * adding a new dependency for 13 static articles.
 *
 * Inline markdown (within `text` fields) supports two tokens only:
 *   **bold**   -> <strong>
 *   `code`     -> <code> (bone chip, hairline border)
 * See renderInline() in ArticleBody.tsx.
 *
 * Headings (`h2`) carry a stable `id` — the article template derives its
 * "On this page" scroll-spy TOC directly from these, per the brief's
 * instruction that the TOC be "computed from actual headings."
 */

export type DecisionState = 'CLEAR' | 'FLAGGED' | 'HELD_FOR_REVIEW' | 'BLOCKED'

export type ArticleBlock =
  | { type: 'p'; text: string }
  | { type: 'h2'; id: string; text: string }
  | { type: 'numbered'; items: string[] }
  | { type: 'bullets'; items: string[] }
  | { type: 'quote'; text: string }
  | { type: 'decisionStates'; items: { state: DecisionState; text: string }[] }
  | {
      type: 'stateCards'
      items: { state: string; accent: 'clear' | 'flagged' | 'blocked'; title: string; body: string }[]
    }
  | { type: 'handlerPaths'; items: { code: string; text: string }[] }
  | { type: 'labeledCards'; items: { label: string; body: string }[] }
  | { type: 'code'; text: string }

export interface ArticleCta {
  title: string
  body: string
}

export interface ArticleContent {
  blocks: ArticleBlock[]
  /** Overrides the default "See the Decision API" aside card when the
   * source article has its own closing CTA copy. */
  cta?: ArticleCta
}
