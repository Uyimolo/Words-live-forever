import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout-components/Header';
import Footer from '@/components/layout-components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Words Live Forever',
  description: 'Bringing words to you ',
  keywords: ['quotes', 'inspirational quotes'],
  robots: 'index, follow',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${inter.className} flex flex-col min-h-screen  bg-black`}>
        <Header />
        <main className='flex-1 grid py-12 px-4 md:px-8 lg:px-12 lg:py-13'>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
