import type { Metadata, Viewport } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';

import './globals.css';
import SmoothScroll from '@/components/SmoothScroll';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap'
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap'
});

export const metadata: Metadata = {
  title: 'AndiumClient — Elevate Your Minecraft Experience',
  description:
    'A modern Minecraft client built for performance, PvP and pure visual joy. Free on Windows, macOS, and Linux.',
  metadataBase: new URL('https://andium.example'),
  openGraph: {
    title: 'AndiumClient — Elevate Your Minecraft Experience',
    description:
      'A modern Minecraft client built for performance, PvP and pure visual joy.',
    type: 'website'
  }
};

export const viewport: Viewport = {
  themeColor: '#0A0A0F',
  width: 'device-width',
  initialScale: 1
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} dark`}
    >
      <body className="font-sans antialiased">
        <SmoothScroll />
        <div className="page-fade">{children}</div>
      </body>
    </html>
  );
}
