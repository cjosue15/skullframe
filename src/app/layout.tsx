import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';
import '@fontsource/bungee-spice';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Skullframe | Arte y productos exclusivos',
  description:
    'Descubre arte, accesorios y productos únicos en Skullframe. Compra y explora nuestra colección exclusiva.',
  keywords: [
    'arte',
    'productos exclusivos',
    'accesorios',
    'colección',
    'Skullframe',
    'tienda',
  ],
  applicationName: 'Skullframe',
  authors: [{ name: 'Skullframe' }],
  creator: 'Skullframe',
  publisher: 'Skullframe',
  openGraph: {
    title: 'Skullframe | Arte y productos exclusivos',
    description:
      'Descubre arte, accesorios y productos únicos en Skullframe. Compra y explora nuestra colección exclusiva.',
    url: 'https://skullframe.com',
    siteName: 'Skullframe',
    images: [
      {
        url: 'https://skullframe.com/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Skullframe | Arte y productos exclusivos',
      },
    ],
    locale: 'es-ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Skullframe | Arte y productos exclusivos',
    description:
      'Descubre arte, accesorios y productos únicos en Skullframe. Compra y explora nuestra colección exclusiva.',
    images: ['https://skullframe.com/og-image.png'],
    creator: '@skullframe',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
    other: [
      {
        rel: 'icon',
        url: '/favicon.ico',
      },
    ],
  },
  manifest: '/manifest.json',
  themeColor: '#ffffff',
  colorScheme: 'light dark',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang='es' className='antialiased'>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}

          <div className='absolute top-0 z-[-2] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]'></div>
        </body>
      </html>
    </ClerkProvider>
  );
}
