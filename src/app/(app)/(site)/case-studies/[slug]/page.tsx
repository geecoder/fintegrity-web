import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import LexicalRenderer from '@/components/blocks/LexicalRenderer'
import RevealInit from '@/components/RevealInit'
import BreadcrumbJsonLd from '@/components/json-ld/BreadcrumbJsonLd'

type Props = { params: Promise<{ slug: string }> }
type OutcomeMetric = { value: string; label: string; id?: string }

async function getStudy(slug: string) {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'case-studies',
    where: { slug: { equals: slug } },
    depth: 1,
    limit: 1,
  })
  return docs[0] ?? null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const study = await getStudy(slug)
  if (!study) return {}

  return {
    title: study.seo?.title || `${study.clientName} — Case Study`,
    description: study.seo?.description || (study.challenge as string | undefined),
    alternates: { canonical: `https://www.getfintegrity.com/case-studies/${slug}` },
  }
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params
  const study = await getStudy(slug)
  if (!study) notFound()

  const metrics = (study.outcomeMetrics as OutcomeMetric[] | undefined) ?? []

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Case Studies', href: '/case-studies' },
          { name: study.clientName as string, href: `/case-studies/${slug}` },
        ]}
      />
      <RevealInit />

      <article>
        <header className="cs-detail-hero">
          <div className="wrap">
            <div className="reveal" style={{ maxWidth: '760px' }}>
              <span className="sec-eyebrow">Case Study</span>
              <h1 className="article-h1">{study.clientName as string}</h1>
              <p className="sec-intro">{study.challenge as string}</p>
            </div>

            {metrics.length > 0 && (
              <div className="cs-detail-metrics reveal">
                {metrics.map((m, i) => (
                  <div key={m.id ?? i} className="cs-detail-metric">
                    <span className="cs-detail-metric-value">{m.value}</span>
                    <span className="cs-detail-metric-label">{m.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </header>

        <div className="article-body">
          <div className="wrap">
            <div className="article-content cms-richtext reveal">
              {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
              <LexicalRenderer data={(study as any).solution} />
            </div>
          </div>
        </div>
      </article>

      <section style={{ borderTop: '1px solid var(--line)', padding: '48px 0' }}>
        <div className="wrap">
          <Link href="/case-studies" className="btn btn-ghost">← All Case Studies</Link>
        </div>
      </section>
    </>
  )
}
