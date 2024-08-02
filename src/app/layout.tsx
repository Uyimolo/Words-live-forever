import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import 'react-toastify/dist/ReactToastify.min.css';
import Header from '@/components/layout-components/Header';
import Footer from '@/components/layout-components/Footer';
import TanstackQueryProvider from '@/utilities/providers/TanstackQueryProvider';
import { Flip, ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Words Live Forever',
  description: 'Bringing important, life shaping words to you ',
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
        <TanstackQueryProvider>
          <Header />
          <main className='flex-1 grid py-16 px-4 md:px-8 lg:px-12 lg:py-28'>
            {children}
          </main>
          <ToastContainer
            stacked
            position='top-right'
            hideProgressBar
            pauseOnFocusLoss
            rtl={false}
            draggable
            transition={Flip}
            theme='light'
          />
          <Footer />
        </TanstackQueryProvider>
      </body>
    </html>
  );
}
