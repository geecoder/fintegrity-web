import Image from 'next/image'

type LogoItem = {
  image?: {
    url?: string | null
    alt?: string | null
    width?: number | null
    height?: number | null
    filename?: string | null
  } | null
  alt: string
  url?: string | null
  id?: string
}

type LogoStripBlockData = {
  blockType: 'logoStrip'
  heading?: string | null
  logos?: LogoItem[] | null
  id?: string
}

export default function LogoStripBlock({ block }: { block: LogoStripBlockData }) {
  if (!block.logos?.length) return null

  return (
    <section className="cms-logo-strip">
      <div className="wrap">
        {block.heading && (
          <p className="cms-logo-strip-label">{block.heading}</p>
        )}
        <div className="cms-logo-strip-row">
          {block.logos.map((logo, i) => {
            const imgUrl = logo.image?.url
            if (!imgUrl) return null

            const inner = (
              <Image
                src={imgUrl}
                alt={logo.alt || logo.image?.alt || ''}
                width={logo.image?.width ?? 120}
                height={logo.image?.height ?? 48}
                className="cms-logo-img"
              />
            )

            return logo.url ? (
              <a
                key={logo.id ?? i}
                href={logo.url}
                target="_blank"
                rel="noopener noreferrer"
                className="cms-logo-link"
              >
                {inner}
              </a>
            ) : (
              <div key={logo.id ?? i} className="cms-logo-link">
                {inner}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
