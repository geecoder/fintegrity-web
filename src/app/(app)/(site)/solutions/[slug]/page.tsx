export const dynamic = 'force-dynamic'
import { notFound } from 'next/navigation'
import { draftMode } from 'next/headers'
import type { Metadata } from 'next'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import RenderBlocks from '@/components/blocks/RenderBlocks'
import RevealInit from '@/components/RevealInit'

type Props = {
  params: Promise<{ slug: string }>
}

async function getSolutionPage(slug: string, isDraft: boolean) {
  const payload = await getPayload({ config: configPromise })
  const { docs } = await payload.find({
    collection: 'solution-pages',
    where: { slug: { equals: slug } },
    draft: isDraft,
    overrideAccess: isDraft,
    depth: 2,
    limit: 1,
  })
  return docs[0] ?? null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const { isEnabled } = await draftMode()
  const page = await getSolutionPage(slug, isEnabled)
  if (!page) return {}

  return {
    title: page.seo?.title || page.icpName,
    description: page.seo?.description || page.summary || undefined,
    alternates: { canonical: `https://www.getfintegrity.com/solutions/${slug}` },
    openGraph: page.seo?.ogImage
      ? { images: [{ url: (page.seo.ogImage as { url: string }).url }] }
      : undefined,
  }
}

export default async function SolutionPageRoute({ params }: Props) {
  const { slug } = await params
  const { isEnabled: isDraft } = await draftMode()

  const page = await getSolutionPage(slug, isDraft)
  if (!page) notFound()

  return (
    <>
      <RevealInit />
      {isDraft && (
        <div style={{
          position: 'fixed', bottom: 16, right: 16, zIndex: 9999,
          background: '#1a1840', color: '#fff', padding: '8px 14px',
          borderRadius: 8, fontSize: '0.78rem', fontFamily: 'var(--font-mono)',
          display: 'flex', gap: 10, alignItems: 'center'
        }}>
          <span>Draft preview</span>
          <a
            href={`/api/draft/disable?slug=/solutions/${slug}`}
            style={{ color: 'var(--cyan)', textDecoration: 'underline' }}
          >
            Exit
          </a>
        </div>
      )}
      {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
      <RenderBlocks blocks={(page as any).layout} />
    </>
  )
}
