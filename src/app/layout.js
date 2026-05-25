import { Analytics } from '@vercel/analytics/react';
import { Syne, DM_Sans } from 'next/font/google';
import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';

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
    url: 'https://nordash.agency',
    siteName: 'NORDASH',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NORDASH — Digital Agency',
    description: 'Full-spectrum digital services. Nordic precision. Asian energy.',
    creator: '@nordash',
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

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${syne.variable} ${dmSans.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#050A14" />
        <meta name="google-site-verification" content="G0tFP3VO5M1yw4IrNxt7F7QQsiOv4UsigAotNN5h8Jw" />
      </head>
      <body className={dmSans.className}>
        <SmoothScroll>
          {children}
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}