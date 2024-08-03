'use client';

import { useCallback, useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { fetchData } from '@/utilities/fetchData/fetchData';

import { Quote } from '@/types/type';

import Pagination from './Pagination';
import LazyQuotes from './LazyQuotes';
import QuoteLink from './QuoteLink';
import HeadingOne from '../text/HeadingOne';

const QuotesList = () => {
  const [page, setPage] = useState<number>(1);

  const buildUrl = (page: number) =>
    `https://api.quotable.io/quotes?page=${page}&sortBy=content`;

  const {
    data: quotes,
    isFetching,
  } = useQuery({
    queryKey: ['quotes', buildUrl(page)],
    queryFn: async () => fetchData(buildUrl(page)),
    placeholderData: keepPreviousData,
  });

  const handlePagination = useCallback(
    (pageCount: number) => {
      // optimistic ui update (atleast I think that is what this is doing)
      setPage(pageCount);

      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    },
    [page]
  );

  return (
    <div className='space-y-6 lg:space-y-10'>
      <HeadingOne>{`"IN THE WORDS OF THE WISE"`}</HeadingOne>

      <div className='grid gap-6 md:grid-cols-2 md:gap-10 lg:grid-cols-3'>
        {isFetching ? (
          <LazyQuotes />
        ) : (
          quotes.results.map((quote: Quote) => (
            <QuoteLink key={quote._id} quote={quote} />
          ))
        )}
      </div>

      <Pagination
        loading={isFetching}
        page={page}
        handlePagination={handlePagination}
      />
    </div>
  );
};

export default QuotesList;
