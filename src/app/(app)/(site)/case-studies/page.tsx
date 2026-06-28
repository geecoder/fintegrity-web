export const dynamic = 'force-dynamic'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import RevealInit from '@/components/RevealInit'
import BreadcrumbJsonLd from '@/components/json-ld/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'Case Studies',
  description:
    'How Nigerian fintechs use Fintegrity to meet CBN AML/CFT requirements and demonstrate compliance in real time.',
  alternates: { canonical: 'https://www.getfintegrity.com/case-studies' },
}

type OutcomeMetric = { value: string; label: string; id?: string }

export default async function CaseStudiesPage() {
  const payload = await getPayload({ config: configPromise })

  const { docs: studies } = await payload.find({
    collection: 'case-studies',
    where: { _status: { equals: 'published' } },
    sort: '-updatedAt',
    depth: 0,
    limit: 20,
  })

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Case Studies', href: '/case-studies' }]} />
      <RevealInit />

      <section className="cs-hero">
        <div className="wrap">
          <div className="reveal">
            <span className="sec-eyebrow">Case Studies</span>
            <h1 className="sec-title" style={{ maxWidth: 'none' }}>
              Compliance infrastructure in the wild
            </h1>
            <p className="sec-intro" style={{ marginTop: '14px' }}>
              How Fintegrity design partners are building defensible compliance infrastructure
              and satisfying CBN AML/CFT requirements in production.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: '64px 0 100px' }}>
        <div className="wrap">
          {studies.length === 0 ? (
            <p style={{ color: 'var(--muted)', fontFamily: 'var(--font-mono)', fontSize: '0.9rem' }}>
              Case studies coming soon as design partnerships develop.
            </p>
          ) : (
            <div className="cs-grid">
              {studies.map((study) => {
                const metrics = (study.outcomeMetrics as OutcomeMetric[] | undefined) ?? []
                return (
                  <div key={study.slug as string} className="cs-card reveal">
                    <p className="cs-card-client">{study.clientName as string}</p>
                    <p className="cs-card-challenge">{study.challenge as string}</p>
                    {metrics.length > 0 && (
                      <div className="cs-metrics">
                        {metrics.slice(0, 3).map((m, i) => (
                          <div key={m.id ?? i} className="cs-metric">
                            <span className="cs-metric-value">{m.value}</span>
                            <span className="cs-metric-label">{m.label}</span>
                          </div>
                        ))}
                      </div>
                    )}
                    <Link href={`/case-studies/${study.slug}`} className="cs-read-link">
                      Read case study →
                    </Link>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
