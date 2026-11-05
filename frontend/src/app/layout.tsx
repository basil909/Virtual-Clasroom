import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'

import { AuthProvider } from '@/providers/AuthProvider'
import PrototypeBanner from '@/components/layout/PrototypeBanner'

import '../styles/animations.css'
import './globals.css'

/* ---------- Environment ---------- */

const FALLBACK_SITE_URL = 'http://localhost:3000'

function resolveSiteUrl(): URL {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim() || FALLBACK_SITE_URL
  try {
    return new URL(raw)
  } catch {
    // A malformed env var must not crash the build.
    return new URL(FALLBACK_SITE_URL)
  }
}

const isProduction = process.env.NODE_ENV === 'production'
const showPrototypeBanner =
  !isProduction || process.env.NEXT_PUBLIC_SHOW_PROTOTYPE_BANNER === 'true'

// Never let dev, preview, or prototype deployments be indexed.
const allowIndexing = isProduction && !showPrototypeBanner

const SITE_NAME = 'SkillX'
const SITE_TITLE = 'SkillX — Virtual Classroom'
const SITE_DESCRIPTION =
  'SkillX is a modern virtual classroom for learning, teaching, and collaboration.'

/* ---------- Metadata ---------- */

export const metadata: Metadata = {
  metadataBase: resolveSiteUrl(),

  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,

  alternates: {
    canonical: '/',
  },

  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: '/',
    locale: 'en_US',
    // Add `app/opengraph-image.png` and Next.js will wire the image up automatically.
  },

  twitter: {
    card: 'summary_large_image',
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },

  robots: allowIndexing
    ? {
        index: true,
        follow: true,
        googleBot: {
          index: true,
          follow: true,
          'max-image-preview': 'large',
          'max-snippet': -1,
          'max-video-preview': -1,
        },
      }
    : { index: false, follow: false },

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

/* ---------- Viewport ---------- */

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  // globals.css is light-only; switch both back if you add a dark theme.
  colorScheme: 'light',
  themeColor: '#f6f6f3',
}

/* ---------- Root layout ---------- */

export default function RootLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="flex min-h-dvh flex-col bg-[var(--background)] text-[var(--foreground)] antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-[var(--foreground)] focus:px-4 focus:py-2 focus:text-[var(--background)]"
        >
          Skip to main content
        </a>

        <AuthProvider>
          {showPrototypeBanner ? <PrototypeBanner /> : null}

          <div id="main-content" tabIndex={-1} className="flex-1 outline-none">
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}