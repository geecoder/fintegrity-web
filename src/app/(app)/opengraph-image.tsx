import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Fintegrity — the compliance decision and evidence layer for African fintechs'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

// Default branded OG image served at /opengraph-image.png.
// Individual routes can override by adding their own opengraph-image.tsx.
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          background: '#0A1F44',
          padding: '60px 64px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Green glow — top right, echoes the hero swirl */}
        <div style={{
          position: 'absolute', top: '-160px', right: '-100px',
          width: '560px', height: '560px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(14,159,110,0.28), transparent 62%)',
          display: 'flex',
        }} />
        {/* Ochre glow — bottom left */}
        <div style={{
          position: 'absolute', bottom: '-120px', left: '-60px',
          width: '420px', height: '420px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(180,138,46,0.16), transparent 62%)',
          display: 'flex',
        }} />

        {/* Body content */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, position: 'relative', zIndex: 1 }}>

          {/* Brand row */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '44px' }}>
            <svg viewBox="0 0 96 96" width="40" height="40" style={{ marginRight: '14px' }}>
              <rect x="14" y="10" width="13" height="76" fill="#F7F3EC" />
              <rect x="14" y="10" width="54" height="13" fill="#F7F3EC" />
              <path d="M35 57L48 70L76 39" fill="none" stroke="#0E9F6E" strokeWidth="13" />
            </svg>
            <span style={{ color: '#F7F3EC', fontSize: '26px', fontWeight: 700, letterSpacing: '-0.02em' }}>
              Fintegrity<span style={{ color: '#0E9F6E' }}>.</span>
            </span>
          </div>

          {/* Main headline */}
          <div style={{
            color: '#F7F3EC', fontSize: '54px', fontWeight: 700,
            lineHeight: 1.08, letterSpacing: '-0.025em',
            maxWidth: '820px', marginBottom: '22px',
          }}>
            One call before money moves. A decision you can prove.
          </div>

          {/* Sub */}
          <div style={{
            color: '#AFB8C6', fontSize: '22px', lineHeight: 1.5,
            maxWidth: '620px', marginBottom: 'auto',
          }}>
            We don&rsquo;t sell checks. We sell defensible compliance decisions.
          </div>

          {/* Bottom row */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            paddingTop: '28px', borderTop: '1px solid rgba(247,243,236,0.14)',
          }}>
            <span style={{
              fontFamily: 'monospace', fontSize: '17px',
              color: '#808EA3', letterSpacing: '0.02em',
            }}>
              www.getfintegrity.com
            </span>
            <div style={{ display: 'flex', gap: '10px' }}>
              {[
                { label: 'CLEAR', bg: 'rgba(14,159,110,0.18)', color: '#7FE3C8' },
                { label: 'FLAGGED', bg: 'rgba(180,138,46,0.2)', color: '#E3C173' },
                { label: 'HELD_FOR_REVIEW', bg: 'rgba(154,58,34,0.22)', color: '#E3947A' },
                { label: 'BLOCKED', bg: 'rgba(155,44,44,0.24)', color: '#E88B8B' },
              ].map((d) => (
                <div key={d.label} style={{
                  padding: '6px 12px', borderRadius: '3px',
                  fontFamily: 'monospace', fontSize: '13px', fontWeight: 700,
                  background: d.bg, color: d.color,
                }}>
                  {d.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    ),
    { ...size },
  )
}
