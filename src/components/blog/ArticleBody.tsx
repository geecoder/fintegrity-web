import type { ReactNode } from 'react'
import type { ArticleBlock, DecisionState } from '@/content/blog/types'
import styles from './ArticleBody.module.css'

interface Props {
  blocks: ArticleBlock[]
}

const STATE_CLASS: Record<DecisionState, string> = {
  CLEAR: styles.stateClear,
  FLAGGED: styles.stateFlagged,
  HELD_FOR_REVIEW: styles.stateHeld,
  BLOCKED: styles.stateBlocked,
}

const ACCENT_CLASS: Record<'clear' | 'flagged' | 'blocked', { card: string; chip: string }> = {
  clear: { card: styles.cardClear, chip: styles.stateClear },
  flagged: { card: styles.cardFlagged, chip: styles.stateFlagged },
  blocked: { card: styles.cardBlocked, chip: styles.stateBlocked },
}

/** Inline markdown-lite: **bold** and `code` only. Everything else is
 * rendered as plain text — the source copy is ported verbatim, so we never
 * reinterpret quotes, dashes, or punctuation. */
function renderInline(text: string): ReactNode {
  const regex = /(\*\*[^*]+\*\*|`[^`]+`)/g
  const parts: ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  let key = 0

  while ((match = regex.exec(text))) {
    if (match.index > lastIndex) parts.push(text.slice(lastIndex, match.index))
    const token = match[0]
    if (token.startsWith('**')) {
      parts.push(<strong key={key++}>{token.slice(2, -2)}</strong>)
    } else {
      parts.push(
        <code key={key++} className={styles.inlineCode}>
          {token.slice(1, -1)}
        </code>,
      )
    }
    lastIndex = match.index + token.length
  }
  if (lastIndex < text.length) parts.push(text.slice(lastIndex))
  return parts
}

/** decision keyword embedded in a handler-path's mono code column, e.g.
 * "decision: HELD_FOR_REVIEW\nrequiredActions: [...]" -> HELD_FOR_REVIEW */
function decisionFromCode(code: string): DecisionState | null {
  const m = /decision:\s*(CLEAR|FLAGGED|HELD_FOR_REVIEW|BLOCKED)/.exec(code)
  return (m?.[1] as DecisionState) ?? null
}

export default function ArticleBody({ blocks }: Props) {
  let quoteIndex = 0

  return (
    <div className={styles.prose}>
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'h2':
            return (
              <h2 key={i} id={block.id} className={styles.h2}>
                {block.text}
              </h2>
            )

          case 'p':
            return (
              <p key={i} className={styles.p}>
                {renderInline(block.text)}
              </p>
            )

          case 'numbered':
            return (
              <div key={i} className={styles.numberedList}>
                {block.items.map((item, j) => (
                  <div key={j} className={styles.numberedRow}>
                    <span className={`${styles.numberedIndex} fg-num`}>{String(j + 1).padStart(2, '0')}</span>
                    <p className={styles.numberedText}>{renderInline(item)}</p>
                  </div>
                ))}
              </div>
            )

          case 'bullets':
            return (
              <ul key={i} className={styles.bulletList}>
                {block.items.map((item, j) => (
                  <li key={j} className={styles.bulletRow}>
                    <span className={styles.bulletMarker} aria-hidden="true" />
                    <p className={styles.bulletText}>{renderInline(item)}</p>
                  </li>
                ))}
              </ul>
            )

          case 'quote': {
            const isNavy = quoteIndex % 2 === 1
            quoteIndex += 1
            return (
              <blockquote key={i} className={isNavy ? styles.quoteNavy : styles.quoteBone}>
                <p>{renderInline(block.text)}</p>
              </blockquote>
            )
          }

          case 'decisionStates':
            return (
              <div key={i} className={styles.tintedStack}>
                {block.items.map((item) => (
                  <div key={item.state} className={styles.tintedRow}>
                    <span className={`${styles.stateChip} ${STATE_CLASS[item.state]}`}>{item.state}</span>
                    <p className={styles.tintedBody}>{renderInline(item.text)}</p>
                  </div>
                ))}
              </div>
            )

          case 'stateCards':
            return (
              <div key={i} className={styles.stateCardsGrid}>
                {block.items.map((item) => (
                  <div key={item.state} className={`${styles.stateCard} ${ACCENT_CLASS[item.accent].card}`}>
                    <div className={`${styles.stateCardBadge} ${ACCENT_CLASS[item.accent].chip}`}>{item.state}</div>
                    <div className={styles.stateCardTitle}>{item.title}</div>
                    <p className={styles.stateCardBody}>{item.body}</p>
                  </div>
                ))}
              </div>
            )

          case 'handlerPaths':
            return (
              <div key={i} className={styles.handlerList}>
                {block.items.map((item, j) => {
                  const decision = decisionFromCode(item.code)
                  return (
                    <div key={j} className={styles.handlerRow}>
                      <div className={`${styles.handlerCode} ${decision ? STATE_CLASS[decision] : ''}`}>
                        {item.code.split('\n').map((line, k) => (
                          <span key={k}>
                            {line}
                            {k < item.code.split('\n').length - 1 && <br />}
                          </span>
                        ))}
                      </div>
                      <p className={styles.handlerText}>{renderInline(item.text)}</p>
                    </div>
                  )
                })}
              </div>
            )

          case 'labeledCards':
            return (
              <div key={i} className={styles.tintedStack}>
                {block.items.map((item, j) => (
                  <div key={j} className={styles.tintedRow}>
                    <div className={styles.labelHeading}>{item.label}</div>
                    <p className={styles.tintedBody}>{renderInline(item.body)}</p>
                  </div>
                ))}
              </div>
            )

          case 'code':
            return (
              <pre key={i} className={styles.codeBlock}>
                <code>{block.text}</code>
              </pre>
            )

          default:
            return null
        }
      })}
    </div>
  )
}
