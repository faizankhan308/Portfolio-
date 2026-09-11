import type { Metadata } from 'next'

export const SITE_URL = process.env.NEXT_PUBLIC_API_URL_ORIGIN

export const AVAILABILITY = {
  open: true,
  label: 'seeking full-time roles',
  closedLabel: 'not taking on new work',
}

export const SITE_AUTHOR = {
  name: 'Faizan Khan',
  url: SITE_URL,
  jobTitle: 'Full-Stack Developer & Software Engineer',
  phone: '+91 8874917623',
  github: 'https://github.com/faizankhan308',
  linkedin: 'https://linkedin.com/in/faizan-khan308/',
  email: 'khanfaizan68397@gmail.com',
}

export const SITE_META: Metadata = {
  metadataBase: new URL(SITE_URL ?? 'https://github.com/faizankhan308'),
  title: 'fk.dev — Faizan Khan — Full-Stack Developer & Software Engineer',
  description: 'Personal portfolio of Faizan Khan, a Full-Stack Developer, AI Training Expert, and Computer Science Engineer.',
  openGraph: {
    title: 'fk.dev — Faizan Khan — Full-Stack Developer & Software Engineer',
    description: 'Personal portfolio of Faizan Khan, a Full-Stack Developer, AI Training Expert, and Computer Science Engineer.',
    url: SITE_URL,
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'fk.dev — Faizan Khan — Full-Stack Developer & Software Engineer',
    description: 'Personal portfolio of Faizan Khan, a Full-Stack Developer, AI Training Expert, and Computer Science Engineer.',
    images: ['/og-image.png'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: SITE_URL },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    other: { rel: 'manifest', url: '/site.webmanifest' },
  },
}

export function pageMeta(title: string, description: string): Metadata {
  return {
    title,
    description,
    openGraph: { title, description, type: 'website' },
    twitter: { card: 'summary', title, description },
  }
}

export const personJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: SITE_AUTHOR.name,
  url: SITE_AUTHOR.url,
  jobTitle: SITE_AUTHOR.jobTitle,
  sameAs: [SITE_AUTHOR.github, SITE_AUTHOR.linkedin],
}
