'use client';
import React, { useEffect, useState } from 'react';
import { Quote, QuotesData } from '@/types/type';
import Pagination from './Pagination';
import LazyQuotes from './LazyQuotes';
import QuoteLink from './QuoteLink';

const QuotesList = ({ quotesData }: { quotesData: QuotesData }) => {
  // this will be for our page one.
  const initialQuotes = quotesData.results;

  const [quotes, setQuotes] = useState(initialQuotes);
  const [page, setPage] = useState<number>(1);
  // const [filter, setFilter] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const fetchQuotes = async () => {
    // to make sure users can't refetch page one data and rely only on what is gotten from the server component
    if (page > 1) {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.quotable.io/quotes?page=${page}&sortBy=content`
        );

        const data = await response.json();

        if (response.ok) {
          setQuotes(data.results);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    } else {
      setQuotes(initialQuotes);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, [page]);

  const handlePagination = (pageCount: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // [TO MYSELF] This is to delay the transition to prevent a flickering effect, i would add framer motion to intercept the skeleton and make it fade gently away later
    const timeout = setTimeout(() => {
      setPage(pageCount);
      return clearTimeout(timeout);
    }, 1000);
  };

  return (
    <div className=' space-y-6 lg:space-y-10'>
      {/* pagination  */}
      {/* <Pagination
        loading={loading}
        page={page}
        handlePagination={handlePagination}
      /> */}
      {/* filtering */}
      {/* <filter /> */}
      <div className='grid gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {loading ? (
          <LazyQuotes />
        ) : (
          quotes.map((quote: Quote) => (
            // actual quote
            <QuoteLink key={quote._id} quote={quote} />
          ))
        )}
      </div>
      {/* pagination  */}
      <Pagination
        loading={loading}
        page={page}
        handlePagination={handlePagination}
      />
    </div>
  );
};

export default QuotesList;
