import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/layout-components/Header';
import Footer from '@/components/layout-components/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Words live forever',
  description: 'Find your favourite quotes here',
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
        <main className='flex-1 grid px-4 md:px-8 lg:px-12 '>
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
