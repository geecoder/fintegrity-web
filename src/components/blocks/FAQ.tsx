'use client'

import { useState } from 'react'
import LexicalRenderer, { type LexicalData } from './LexicalRenderer'

type FAQItem = {
  question: string
  answer?: LexicalData | null
  id?: string
}

type FAQBlockData = {
  blockType: 'faq'
  heading?: string | null
  items?: FAQItem[] | null
  id?: string
}

function FAQAccordion({ items }: { items: FAQItem[] }) {
  const [open, setOpen] = useState<number | null>(null)

  return (
    <div className="accordion">
      {items.map((item, i) => (
        <div key={item.id ?? i} className={`accord-item${open === i ? ' open' : ''}`}>
          <button
            className="accord-trigger"
            aria-expanded={open === i}
            onClick={() => setOpen(open === i ? null : i)}
          >
            <span className="faq-trigger-text">{item.question}</span>
            <span className="accord-icon" aria-hidden>{open === i ? '−' : '+'}</span>
          </button>
          <div className="accord-body" aria-hidden={open !== i}>
            <div className="accord-body-inner">
              {item.answer ? (
                <LexicalRenderer data={item.answer} className="faq-answer" />
              ) : null}
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default function FAQBlock({ block }: { block: FAQBlockData }) {
  if (!block.items?.length) return null

  return (
    <section className="cms-faq">
      <div className="wrap">
        {block.heading && <h2 className="sec-title">{block.heading}</h2>}
        <div style={{ marginTop: block.heading ? '40px' : '0' }}>
          <FAQAccordion items={block.items} />
        </div>
      </div>
    </section>
  )
}
