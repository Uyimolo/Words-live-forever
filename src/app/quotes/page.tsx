import QuotesList from '@/components/quotes/QuotesList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Quotes - Words Live Forever',
  description: 'Bringing important, life shaping words to you ',
  keywords: ['quotes', 'inspirational quotes'],
  robots: 'index, follow',
};

const Quotes = () => {
  return <QuotesList />;
};

export default Quotes;
