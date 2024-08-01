import { Suspense } from 'react';
// types
import { Quote } from '@/types/type';
// components
import LazyQuotes from './LazyQuotes';
import RelatedQuotes from './RelatedQuotes';
// utilities
import ScrollToTop from '@/utilities/ScrollToTop';
import ViewQuote from './ViewQuote';

const QuoteDetails = async ({ quote }: { quote: Quote }) => {
  const { author, content, tags } = quote;

  // didn't want lazyQuotes to clutter the suspense container so i defined it up here
  const lazyQuotesContainer = (
    <div className='grid gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      <LazyQuotes />
    </div>
  );

  return (
    <div className='w-full grid min-h-full gap-20'>
      <ScrollToTop />

      <ViewQuote author={author} tags={tags} content={content} />

      <Suspense fallback={lazyQuotesContainer}>
        <RelatedQuotes tags={tags} />
      </Suspense>
    </div>
  );
};

export default QuoteDetails;
