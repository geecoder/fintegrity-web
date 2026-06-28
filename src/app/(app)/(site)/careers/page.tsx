export const dynamic = 'force-dynamic'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import RevealInit from '@/components/RevealInit'
import BreadcrumbJsonLd from '@/components/json-ld/BreadcrumbJsonLd'

export const metadata: Metadata = {
  title: 'Careers',
  description:
    'Join Fintegrity Technologies Limited. We are building the compliance infrastructure layer for African fintech. Open roles in engineering, compliance, and operations.',
  alternates: { canonical: 'https://www.getfintegrity.com/careers' },
}

const typeLabel: Record<string, string> = {
  'full-time': 'Full-time',
  'part-time': 'Part-time',
  contract: 'Contract',
  internship: 'Internship',
}

export default async function CareersPage() {
  const payload = await getPayload({ config: configPromise })

  // Only isOpen === true jobs are visible publicly (enforced at access layer too)
  const { docs: jobs } = await payload.find({
    collection: 'job-openings',
    where: { isOpen: { equals: true } },
    sort: 'team',
    depth: 0,
    limit: 50,
  })

  return (
    <>
      <BreadcrumbJsonLd items={[{ name: 'Careers', href: '/careers' }]} />
      <RevealInit />

      <section className="careers-hero">
        <div className="wrap">
          <div className="reveal">
            <span className="sec-eyebrow">Careers</span>
            <h1 className="sec-title" style={{ maxWidth: 'none' }}>
              Build the compliance layer for African fintech
            </h1>
            <p className="sec-intro" style={{ marginTop: '14px' }}>
              We are a small, early team solving a real and underserved problem. If you want
              to do meaningful work in African fintech infrastructure, we would like to meet you.
            </p>
          </div>
        </div>
      </section>

      <section style={{ padding: '64px 0 100px' }}>
        <div className="wrap">
          {jobs.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '48px 0', color: 'var(--muted)' }}>
              <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', marginBottom: 16 }}>
                No open roles right now.
              </p>
              <p style={{ fontSize: '0.95rem' }}>
                We hire occasionally and move fast when we do.{' '}
                <a href="mailto:gee@getfintegrity.com" style={{ color: 'var(--indigo)' }}>
                  Send a note
                </a>{' '}
                if you think you can contribute.
              </p>
            </div>
          ) : (
            <div className="careers-grid">
              {jobs.map((job) => (
                <div key={job.id as string} className="job-card reveal">
                  <div className="job-card-info">
                    <p className="job-card-title">{job.title as string}</p>
                    <div className="job-card-meta">
                      <span className="job-card-team">{job.team as string}</span>
                      <span>·</span>
                      <span>{job.location as string}</span>
                      <span>·</span>
                      <span>{typeLabel[job.type as string] ?? (job.type as string)}</span>
                    </div>
                  </div>
                  {job.applyUrl && (
                    <a
                      href={job.applyUrl as string}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary"
                    >
                      Apply →
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
