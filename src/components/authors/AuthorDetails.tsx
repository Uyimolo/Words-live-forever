import { Author } from '@/types/type';
import React, { Suspense } from 'react';
import Paragraph from '../text/Paragraph';
import ViewAuthor from './ViewAuthor';
import ScrollToTop from '@/utilities/ScrollToTop';
import RelatedQuotes from '../quotes/RelatedQuotes';
import LazyQuotes from '../quotes/LazyQuotes';

const AuthorDetails = ({ author }: { author: Author }) => {
  const { name } = author;

  // didn't want lazyQuotes to clutter the suspense container so i defined it up here
  const lazyQuotesContainer = (
    <div className='grid gap-6 md:grid-cols-2 md:gap-10 lg:grid-cols-3'>
      <LazyQuotes />
    </div>
  );

  return (
    <div className='w-full grid min-h-full gap-20'>
      <ScrollToTop />

      <ViewAuthor author={author} />

      <Suspense fallback={lazyQuotesContainer}>
        <RelatedQuotes name={name} />
      </Suspense>
    </div>
  );
};

export default AuthorDetails;
