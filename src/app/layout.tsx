import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import { Suspense } from 'react'
import { Sora, Inter, JetBrains_Mono } from 'next/font/google'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import ConsentBanner from '@/components/consent/ConsentBanner'
import PageViewTracker from '@/components/analytics/PageViewTracker'
import './globals.css'

// ── Fonts ──────────────────────────────────────────────────────────────────
// Self-hosted via next/font — no external CDN request, no FOUT.
// CSS variables --font-sora, --font-inter, --font-mono are set on <html>.
const sora = Sora({ subsets: ['latin'], variable: '--font-sora', display: 'swap', weight: ['400', '500', '600', '700'] })
const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap', weight: ['400', '500', '600'] })
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap', weight: ['400', '500'] })

// ── GTM ────────────────────────────────────────────────────────────────────
// Set by Vercel env vars. If unset, the dataLayer is still initialised so
// trackMarketingEvent() works (Mixpanel still receives events).
const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID

// Consent Mode v2 defaults: all denied until user acts.
// Must run BEFORE the GTM snippet so GTM reads the correct default state.
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

// GTM loader snippet (only injected when GTM_ID is set)
const gtmScript = (id: string) => `
(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${id}');
`.trim()

// ── Viewport ───────────────────────────────────────────────────────────────
export const viewport: Viewport = {
  themeColor: '#635BFF',
}

// ── Root metadata ──────────────────────────────────────────────────────────
export const metadata: Metadata = {
  metadataBase: new URL('https://www.getfintegrity.com'),
  title: {
    default: 'Fintegrity Technologies Limited — Embedded compliance decisioning for African fintechs',
    template: '%s — Fintegrity Technologies Limited',
  },
  description:
    'Fintegrity Technologies Limited is the compliance brain behind fintech money flows. One API call returns a real-time ALLOW, REVIEW, or BLOCK decision, backed by an immutable, regulator-ready audit trail. Built for the CBN and NFIU regime.',
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
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        {/* Google Consent Mode v2 — defaults ALL denied before GTM loads */}
        <script dangerouslySetInnerHTML={{ __html: CONSENT_DEFAULTS_SCRIPT }} />
        {/* GTM loader — only present when NEXT_PUBLIC_GTM_ID is set */}
        {GTM_ID && (
          <script dangerouslySetInnerHTML={{ __html: gtmScript(GTM_ID) }} />
        )}
      </head>
      <body>
        {/* GTM noscript iframe fallback */}
        {GTM_ID && (
          <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          />
        )}

        <Nav />
        <main>{children}</main>
        <Footer />

        {/* Consent banner — shown on first visit, persists settings affordance after */}
        <ConsentBanner />

        {/*
          Page-view tracker — useSearchParams() requires a Suspense boundary in Next.js.
          The fallback is null so there is no visible loading state.
        */}
        <Suspense fallback={null}>
          <PageViewTracker />
        </Suspense>
      </body>
    </html>
  )
}
