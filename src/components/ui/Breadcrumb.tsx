import Link from 'next/link'

interface Crumb {
  label: string
  href?: string
}

/**
 * WAI-ARIA breadcrumb. Rules:
 * - Items with href AND not the last item → <Link>
 * - Last item → <span aria-current="page">
 * - Items without href AND not the last item → plain <span> (no aria-current)
 * CSS generates the › separator via li+li::before so no separate list items are needed.
 */
export default function Breadcrumb({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="page-breadcrumb" role="list">
        <li role="listitem">
          <Link href="/">Home</Link>
        </li>
        {items.map((item, i) => {
          const isLast = i === items.length - 1
          return (
            <li key={i} role="listitem">
              {isLast ? (
                <span aria-current="page">{item.label}</span>
              ) : item.href ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span>{item.label}</span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
