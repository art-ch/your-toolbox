import type { Metadata } from 'next';
// import localFont from 'next/font/local';
import { Header, Footer } from '@/app/layout/index';

import './globals.css';

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: 'Your Toolbox',
  description: 'Make your computer do stuff for you',
  icons: {
    icon: '/favicon.png',
    shortcut: '/favicon.svg',
    apple: '/apple-touch-icon.png',
    other: {
      rel: 'favicon',
      url: '/favicon.png'
    }
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        {/* 44 (height of header and paddings) + 48 (height of footer) = 92 */}
        <main className="min-h-[calc(100vh-92px)] max-w-screen-xl my-0 mx-auto px-4 sm:px-6 2xl:px-0">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
