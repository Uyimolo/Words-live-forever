'use client';

import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';

// utilities
import { fetchData } from '@/utilities/fetchData/fetchData';

// types
import { Quote } from '@/types/type';

// components
import Pagination from './Pagination';
import LazyQuotes from './LazyQuotes';
import QuoteLink from './QuoteLink';
import HeadingOne from '../text/HeadingOne';

const QuotesList = () => {
  const [page, setPage] = useState<number>(1);

  const url = `https://api.quotable.io/quotes?page=${page}&sortBy=content`;

  const { data: quotes, isLoading } = useQuery({
    queryKey: ['quotes', url],
    queryFn: async () => fetchData(url),
  });

  const handlePagination = (pageCount: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // give time for scrollToTop animation to complete
    const timeout = setTimeout(() => {
      setPage(pageCount);
      return clearTimeout(timeout);
    }, 500);
  };

  return (
    <div className='space-y-6 lg:space-y-10'>
      <HeadingOne>{`"IN THE WORDS OF THE WISE"`}</HeadingOne>

      <div className='grid gap-2 md:grid-cols-2 md:gap-10 lg:grid-cols-3'>
        {isLoading ? (
          <LazyQuotes />
        ) : (
          quotes.results.map((quote: Quote) => (
            <QuoteLink key={quote._id} quote={quote} />
          ))
        )}
      </div>

      <Pagination
        loading={isLoading}
        page={page}
        handlePagination={handlePagination}
      />
    </div>
  );
};

export default QuotesList;
