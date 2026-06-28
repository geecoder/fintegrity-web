import { ImageResponse } from 'next/og'

export const runtime = 'edge'
export const alt = 'Fintegrity Technologies Limited — Embedded compliance decisioning for African fintechs'
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
          background: 'linear-gradient(135deg, #1a1840 0%, #2a2270 60%, #1e1650 100%)',
          padding: '60px 64px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Cyan glow — top right */}
        <div style={{
          position: 'absolute', top: '-140px', right: '-80px',
          width: '520px', height: '520px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(62,207,224,0.18), transparent 62%)',
          display: 'flex',
        }} />
        {/* Indigo glow — bottom left */}
        <div style={{
          position: 'absolute', bottom: '-120px', left: '-60px',
          width: '420px', height: '420px', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99,91,255,0.22), transparent 62%)',
          display: 'flex',
        }} />

        {/* Body content */}
        <div style={{ display: 'flex', flexDirection: 'column', flex: 1, position: 'relative', zIndex: 1 }}>

          {/* Brand row */}
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '44px' }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '12px',
              background: 'linear-gradient(135deg, #635BFF, #9E7CFF)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              marginRight: '16px', fontSize: '22px', fontWeight: 800, color: '#fff',
            }}>
              F
            </div>
            <span style={{ color: '#fff', fontSize: '26px', fontWeight: 700, letterSpacing: '-0.02em' }}>
              Fintegrity
            </span>
            <span style={{
              marginLeft: '14px', padding: '4px 12px', borderRadius: '100px',
              border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.55)',
              fontSize: '13px', letterSpacing: '0.03em',
            }}>
              Technologies Limited
            </span>
          </div>

          {/* Main headline */}
          <div style={{
            color: '#fff', fontSize: '58px', fontWeight: 700,
            lineHeight: 1.08, letterSpacing: '-0.025em',
            maxWidth: '760px', marginBottom: '22px',
          }}>
            The compliance brain behind your money flows.
          </div>

          {/* Sub */}
          <div style={{
            color: 'rgba(255,255,255,0.68)', fontSize: '24px', lineHeight: 1.5,
            maxWidth: '580px', marginBottom: 'auto',
          }}>
            Embedded AML decisioning for Nigerian fintechs.
            Real-time. Evidence-based. Regulator-ready.
          </div>

          {/* Bottom row */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            paddingTop: '28px', borderTop: '1px solid rgba(255,255,255,0.12)',
          }}>
            <span style={{
              fontFamily: 'monospace', fontSize: '17px',
              color: 'rgba(255,255,255,0.38)', letterSpacing: '0.02em',
            }}>
              www.getfintegrity.com
            </span>
            <div style={{ display: 'flex', gap: '10px' }}>
              {[
                { label: 'ALLOW', bg: 'rgba(31,174,111,0.22)', color: '#4ADE80' },
                { label: 'REVIEW', bg: 'rgba(245,158,11,0.22)', color: '#FBBF24' },
                { label: 'BLOCK', bg: 'rgba(229,72,77,0.22)', color: '#F87171' },
              ].map((d) => (
                <div key={d.label} style={{
                  padding: '6px 14px', borderRadius: '7px',
                  fontFamily: 'monospace', fontSize: '14px', fontWeight: 700,
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
