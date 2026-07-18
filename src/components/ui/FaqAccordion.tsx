'use client'

import { useState } from 'react'

export interface FaqItem {
  question: string
  answer: string
}

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <div className="accordion">
      {items.map((item, i) => {
        const open = openIndex === i
        return (
          <div className={`accord-item${open ? ' open' : ''}`} key={item.question}>
            <button
              type="button"
              className="accord-trigger"
              aria-expanded={open}
              onClick={() => setOpenIndex(open ? null : i)}
            >
              <span className="faq-trigger-text">{item.question}</span>
              <span className="accord-icon" aria-hidden="true">{open ? '−' : '+'}</span>
            </button>
            <div className="accord-body">
              <div className="accord-body-inner">
                <p className="faq-answer">{item.answer}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
