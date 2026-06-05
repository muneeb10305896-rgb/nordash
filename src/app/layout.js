import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Syne, DM_Sans } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';
import CookieBanner from '@/components/CookieBanner';

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm',
  display: 'swap',
});

const SITE_URL = 'https://nordash.vercel.app';

export const metadata = {
  title: 'NORDASH — Digital Agency | Nordic Precision meets Asian Energy',
  description:
    'NORDASH is a full-spectrum digital agency offering video editing, thumbnail design, social media marketing, software development, brand strategy, and more. Nordic precision. Asian energy.',
  keywords: [
    'digital agency',
    'video editing',
    'software development',
    'social media marketing',
    'brand design',
    'thumbnail design',
    'UI UX design',
    'web development',
    'NORDASH',
    'Nordic Asia agency',
  ],
  authors: [{ name: 'NORDASH Agency' }],
  creator: 'NORDASH',
  openGraph: {
    title: 'NORDASH — Digital Agency',
    description: 'Full-spectrum digital services. Nordic precision. Asian energy.',
    url: SITE_URL,
    siteName: 'NORDASH',
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: `${SITE_URL}/nordash-logo.png`,
        width: 800,
        height: 800,
        alt: 'NORDASH Digital Agency',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NORDASH — Digital Agency',
    description: 'Full-spectrum digital services. Nordic precision. Asian energy.',
    creator: '@nordash',
    images: [`${SITE_URL}/nordash-logo.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'NORDASH',
  url: SITE_URL,
  logo: `${SITE_URL}/nordash-logo.png`,
  description:
    'Full-spectrum digital agency offering video editing, social media marketing, software development, brand strategy, UI/UX design and more.',
  email: 'hello@nordash.agency',
  foundingDate: '2021',
  areaServed: 'Worldwide',
  contactPoint: {
    '@type': 'ContactPoint',
    email: 'hello@nordash.agency',
    contactType: 'Customer Service',
  },
  sameAs: [
    'https://www.instagram.com/muneeb.ahmed.butt.fi/',
    'https://www.linkedin.com/in/muneeb-ahmed-butt-4a384438a/',
    'https://www.linkedin.com/in/farheen-e-sehar-8b0868177/',
  ],
  knowsAbout: [
    'Video Editing',
    'Thumbnail Design',
    'Social Media Marketing',
    'Software Development',
    'Brand Strategy',
    'UI/UX Design',
    'SEO & Content Strategy',
    'Mobile App Development',
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <head>
        <link rel="icon" href="/nordash-logo.png" type="image/png" />
        <link rel="apple-touch-icon" href="/nordash-logo.png" />
        <meta name="theme-color" content="#0D1626" />
        <meta name="google-site-verification" content="G0tFP3VO5M1yw4IrNxt7F7QQsiOv4UsigAotNN5h8Jw" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={dmSans.className}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <CookieBanner />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
