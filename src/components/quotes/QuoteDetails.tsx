import { Suspense } from 'react';
import { Quote } from '@/types/type';
import SkeletonQuotes from './SkeletonQuotes';
import RelatedQuotes from './RelatedQuotes';
import ScrollToTop from '@/utilities/ScrollToTop';
import ViewQuote from './ViewQuote';

// This component shows details of a quote and related quotes (based on relevant quote tags)

const QuoteDetails = async ({ quote }: { quote: Quote }) => {
  const { author, content, tags } = quote;

  // didn't want SkeletonQuotes to clutter the suspense container so i defined it up here
  const skeletonQuotesContainer = (
    <div className='grid gap-6 md:grid-cols-2 md:gap-10 lg:grid-cols-3'>
      <SkeletonQuotes />
    </div>
  );

  return (
    <div className='w-full grid min-h-full gap-20'>
      {/* scroll to top when ever a new quote is shown */}
      <ScrollToTop />

      {/* display quote */}
      <ViewQuote author={author} tags={tags} content={content} />

      {/* Stream related quotes */}
      <Suspense fallback={skeletonQuotesContainer}>
        <RelatedQuotes tags={tags} />
      </Suspense>
    </div>
  );
};

export default QuoteDetails;
