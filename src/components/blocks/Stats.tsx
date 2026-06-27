type StatItem = {
  value: string
  label: string
  id?: string
}

type StatsBlockData = {
  blockType: 'stats'
  heading?: string | null
  stats?: StatItem[] | null
  id?: string
}

export default function StatsBlock({ block }: { block: StatsBlockData }) {
  if (!block.stats?.length) return null

  return (
    <section className="cms-stats">
      <div className="wrap">
        {block.heading && <h2 className="sec-title">{block.heading}</h2>}
        <div className="cms-stats-grid" style={{ marginTop: block.heading ? '48px' : '0' }}>
          {block.stats.map((stat, i) => (
            <div key={stat.id ?? i} className="cms-stat-item">
              <span className="cms-stat-value grad-text">{stat.value}</span>
              <span className="cms-stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
