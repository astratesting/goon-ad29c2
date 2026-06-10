import type { Metadata } from 'next';
import { Space_Grotesk, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  weight: ['600', '700'],
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['400', '600'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  weight: ['400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://goon.so'),
  title: {
    default: 'Goon — Describe your offer. Get a landing page.',
    template: '%s | Goon',
  },
  description:
    'Goon turns one paragraph about your business into a polished, conversion-tested landing page in under a minute — no designer, no Figma, no agency.',
  openGraph: {
    title: 'Goon — Describe your offer. Get a landing page.',
    description:
      'Goon turns one paragraph about your business into a polished, conversion-tested landing page in under a minute.',
    url: 'https://goon.so',
    siteName: 'Goon',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Goon — Describe your offer. Get a landing page.',
    description:
      'Goon turns one paragraph about your business into a polished, conversion-tested landing page in under a minute.',
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const plausibleDomain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        {plausibleDomain && (
          <script
            defer
            data-domain={plausibleDomain}
            src="https://plausible.io/js/script.js"
          />
        )}
      </head>
      <body className="bg-ink-0 text-text-hi font-body antialiased">
        {children}
      </body>
    </html>
  );
}
