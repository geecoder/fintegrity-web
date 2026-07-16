import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Link from 'next/link'
import { CASE_STUDIES, getCaseStudy } from '@/lib/case-studies'
import RevealInit from '@/components/RevealInit'
import BreadcrumbJsonLd from '@/components/json-ld/BreadcrumbJsonLd'

type Props = { params: Promise<{ slug: string }> }

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) return {}

  return {
    title: study.seoTitle || `${study.clientName} — Case Study`,
    description: study.seoDescription || study.challenge,
    alternates: { canonical: `https://www.getfintegrity.com/case-studies/${slug}` },
  }
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params
  const study = getCaseStudy(slug)
  if (!study) notFound()

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Case Studies', href: '/case-studies' },
          { name: study.clientName, href: `/case-studies/${slug}` },
        ]}
      />
      <RevealInit />

      <article>
        <header className="cs-detail-hero">
          <div className="wrap">
            <div className="reveal" style={{ maxWidth: '760px' }}>
              <span className="sec-eyebrow">Case Study</span>
              <h1 className="article-h1">{study.clientName}</h1>
              <p className="sec-intro">{study.challenge}</p>
            </div>

            {study.metrics.length > 0 && (
              <div className="cs-detail-metrics reveal">
                {study.metrics.map((m) => (
                  <div key={m.label} className="cs-detail-metric">
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
              {study.solution.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
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
