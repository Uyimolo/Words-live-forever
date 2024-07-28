import { Quote } from '@/types/type';
import Paragraph from '../text/Paragraph';
import LazyQuotes from './LazyQuotes';
import Divider from './divider/Divider';
import { Suspense } from 'react';
import RelatedQuotes from './RelatedQuotes';
import ScrollToTop from '@/utilities/ScrollToTop';

const QuoteDetails = async ({ quote }: { quote: Quote }) => {
  const { author, content, tags } = quote;

  const lazyQuotesContainer = (
    <div className='grid gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      <LazyQuotes />
    </div>
  );

  return (
    <div className='w-full grid min-h-full gap-20'>
      <ScrollToTop />
      {/* Original quote */}
      <div className='max-w-xl lg:max-w-3xl'>
        <div className=''>
          <h2 className='text-blue-400 text-xl'>
            {author ? author : 'Words Live Forever Team.'}
          </h2>

          <Divider className='mb-8 mt-4' />

          <h1 className='text-white text-2xl font-semibold relative md:text-3xl lg:text-4xl'>
            <span className='text-4xl md:text-5xl'>{`"`}</span>
            {content ? content : 'Getting your favourites quotes in a bit'}{' '}
            <span className='text-3xl -bottom-6 md:text-5xl absolute md:-bottom-8'>{`"`}</span>
          </h1>

          <Divider className='mt-8 mb-4' />

          <Paragraph>Tags: {tags.join(' | ')}</Paragraph>
        </div>
      </div>

      <Suspense fallback={lazyQuotesContainer}>
        <RelatedQuotes tags={tags} />
      </Suspense>
    </div>
  );
};

export default QuoteDetails;
