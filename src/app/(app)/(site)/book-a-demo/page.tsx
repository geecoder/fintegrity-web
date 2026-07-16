import type { Metadata } from 'next'
import BookADemoForm from '@/components/home/BookADemoForm'
import BreadcrumbJsonLd from '@/components/json-ld/BreadcrumbJsonLd'
import RevealInit from '@/components/RevealInit'

export const metadata: Metadata = {
  title: 'Book a Demo',
  description:
    'See Fintegrity in action. We\'ll walk you through the platform using transaction patterns and compliance scenarios from your business model.',
  alternates: { canonical: 'https://www.getfintegrity.com/book-a-demo' },
}

const TRUST_ITEMS = [
  'Live platform demo — not slides',
  'Tuned to your transaction volumes and model',
  'Honest conversation about fit — we won\'t oversell',
  '30 minutes. No sales pressure.',
]

export default function BookADemoPage() {
  return (
    <>
    <BreadcrumbJsonLd items={[{ name: 'Book a Demo', href: '/book-a-demo' }]} />
    <RevealInit />
    <div className="demo-page">
      {/* Left panel — static, server-rendered */}
      <div className="demo-page-left">
        <div className="reveal">
          <span className="sec-eyebrow">Book a demo</span>
          <h1>Let&apos;s show you Fintegrity</h1>
          <p>
            We&apos;ll walk you through the platform using transaction patterns and compliance
            scenarios from your specific business model — not a generic slide deck.
          </p>
          <div className="demo-trust">
            {TRUST_ITEMS.map((item) => (
              <div className="demo-trust-item" key={item}>
                <span className="demo-trust-icon">✓</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel — interactive form, client component */}
      <div className="demo-page-right">
        <BookADemoForm />
      </div>
    </div>
    </>
  )
}
