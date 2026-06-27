import HeroBlock from './Hero'
import FeatureGridBlock from './FeatureGrid'
import LogoStripBlock from './LogoStrip'
import PricingTableBlock from './PricingTable'
import CTASectionBlock from './CTASection'
import FAQBlock from './FAQ'
import RichTextBlock from './RichText'
import StatsBlock from './Stats'

// Union of all block data shapes. Each has a `blockType` discriminant.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Block = { blockType: string; id?: string; [key: string]: any }

export default function RenderBlocks({ blocks }: { blocks: Block[] | null | undefined }) {
  if (!blocks?.length) return null

  return (
    <>
      {blocks.map((block, i) => {
        const key = block.id ?? i

        switch (block.blockType) {
          case 'hero':
            return <HeroBlock key={key} block={block as Parameters<typeof HeroBlock>[0]['block']} />
          case 'featureGrid':
            return <FeatureGridBlock key={key} block={block as Parameters<typeof FeatureGridBlock>[0]['block']} />
          case 'logoStrip':
            return <LogoStripBlock key={key} block={block as Parameters<typeof LogoStripBlock>[0]['block']} />
          case 'pricingTable':
            return <PricingTableBlock key={key} block={block as Parameters<typeof PricingTableBlock>[0]['block']} />
          case 'ctaSection':
            return <CTASectionBlock key={key} block={block as Parameters<typeof CTASectionBlock>[0]['block']} />
          case 'faq':
            return <FAQBlock key={key} block={block as Parameters<typeof FAQBlock>[0]['block']} />
          case 'richText':
            return <RichTextBlock key={key} block={block as Parameters<typeof RichTextBlock>[0]['block']} />
          case 'stats':
            return <StatsBlock key={key} block={block as Parameters<typeof StatsBlock>[0]['block']} />
          default:
            return null
        }
      })}
    </>
  )
}
