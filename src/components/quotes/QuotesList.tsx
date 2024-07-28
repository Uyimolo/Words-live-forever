'use client';
import React, { useState } from 'react';
import { Quote } from '@/types/type';
import Pagination from './Pagination';
import LazyQuotes from './LazyQuotes';
import QuoteLink from './QuoteLink';
import HeadingOne from '../text/HeadingOne';
import { useQuery } from '@tanstack/react-query';
import { fetchData } from '@/utilities/fetchData/fetchData';

const QuotesList = () => {
  const [page, setPage] = useState<number>(1);

  const url = `https://api.quotable.io/quotes?page=${page}&sortBy=content`;

  const { data: quotes, isLoading } = useQuery({
    queryKey: ['quotes', url],
    queryFn: async () => fetchData(url),
  });

  const handlePagination = (pageCount: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // delay to prevent flickering due to sudden changes in data
    const timeout = setTimeout(() => {
      setPage(pageCount);
      return clearTimeout(timeout);
    }, 1000);
  };

  return (
    <div className=' space-y-6 lg:space-y-10'>
      <HeadingOne>"IN THE WORDS OF THE WISE"</HeadingOne>

      <div className='grid gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
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
