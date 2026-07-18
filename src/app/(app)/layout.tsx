import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { Suspense } from 'react'
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google'
import ConsentBanner from '@/components/consent/ConsentBanner'
import PageViewTracker from '@/components/analytics/PageViewTracker'
import './globals.css'

// ── Fonts ──────────────────────────────────────────────────────────────────
// Self-hosted via next/font — no external CDN request, no FOUT.
// CSS variables --font-display, --font-inter, --font-mono are set on <html>.
// Display (headlines) is deliberately distinct from Inter (body) — a single
// typeface everywhere is a common "AI-built" tell.
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], variable: '--font-display', display: 'swap', weight: ['400', '500', '600', '700'] })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap', weight: ['400', '500', '600'] })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap', weight: ['400', '500'] })

// ── GTM ────────────────────────────────────────────────────────────────────
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

const CONSENT_DEFAULTS_SCRIPT = `
window.dataLayer=window.dataLayer||[];
function gtag(){dataLayer.push(arguments);}
gtag('consent','default',{
  analytics_storage:'denied',
  ad_storage:'denied',
  ad_user_data:'denied',
  ad_personalization:'denied',
  wait_for_update:500
});
`.trim()

const gtmScript = (id: string) => `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${id}');
`.trim()

// ── Viewport ───────────────────────────────────────────────────────────────
export const viewport: Viewport = {
  themeColor: '#0A1F44',
}

// ── Root metadata ──────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL('https://www.getfintegrity.com'),
  title: {
    default: 'Fintegrity Technologies Limited — Embedded compliance decisioning for African fintechs',
    template: '%s — Fintegrity Technologies Limited',
  },
  description:
    'Fintegrity Technologies Limited is the compliance brain behind fintech money flows. One API call returns a real-time CLEAR, FLAGGED, HELD_FOR_REVIEW, or BLOCKED decision, backed by an immutable, regulator-ready audit trail. Built for the CBN and NFIU regime.',
  openGraph: {
    type: 'website',
    siteName: 'Fintegrity Technologies Limited',
    locale: 'en_NG',
    title: 'Fintegrity Technologies Limited — Embedded compliance decisioning',
    description: 'Real-time compliance decisions with regulator-ready evidence, built for African fintechs. Lagos, Nigeria.',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Fintegrity Technologies Limited' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fintegrity Technologies Limited — Embedded compliance decisioning',
    description: 'Real-time compliance decisions with regulator-ready evidence, built for African fintechs.',
    images: ['/opengraph-image.png'],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon_32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/favicon_180.png', sizes: '180x180' }],
  },
  manifest: '/site.webmanifest',
}

// ── Root layout ────────────────────────────────────────────────────────────
// Provides the HTML shell, fonts, consent, and analytics for ALL routes
// (both the marketing site and the Payload admin).
//
// Nav and Footer live in src/app/(site)/layout.tsx so the Payload admin
// (in src/app/(payload)/) never inherits them.
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULTS_SCRIPT }} />
        {GTM_ID && (
          <script dangerouslySetInnerHTML={{ __html: gtmScript(GTM_ID) }} />
        )}
      </head>
      <body>
        {GTM_ID && (
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          />
        )}

        {/* (site)/layout.tsx adds Nav + <main> + Footer for marketing pages.
            (payload)/layout.tsx is a passthrough for the admin UI. */}
        {children}

        <ConsentBanner />
        <Suspense fallback={null}>
          <PageViewTracker />
        </Suspense>
      </body>
    </html>
  )
}
