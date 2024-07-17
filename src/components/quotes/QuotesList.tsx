'use client';
import React, { useEffect, useState } from 'react';
import Paragraph from '../text/Paragraph';
import { Quote, QuotesData } from '@/types/type';
import Pagination from './Pagination';
import LazyQuotes from './LazyQuotes';
import Link from 'next/link';

const QuotesList = ({ quotesData }: { quotesData: QuotesData }) => {
  // this will be for our page one.
  const initialQuotes = quotesData.results;

  const [quotes, setQuotes] = useState(initialQuotes);
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const fetchQuotes = async () => {
    // to make sure users to refetch page one data and rely only on what is gotten from the server component
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
  }, [page, filter]);

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
      <Pagination
        loading={loading}
        page={page}
        handlePagination={handlePagination}
      />
      {/* filtering */}
      <filter />
      <div className='grid gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {loading ? (
          <LazyQuotes />
        ) : (
          quotes.map((quote: Quote) => (
            // actual quote
            <Link
              href={`/quotes/${quote._id}`}
              key={quote._id}
              className='border rounded min-w-full px-4 py-6 space-y-4 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-400/30'>
              <Paragraph className=''>{`${quote.content}`}</Paragraph>

              <Paragraph className='text-right text-gray-100'>
                - {quote.author}
              </Paragraph>
            </Link>
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
