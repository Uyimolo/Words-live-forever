'use client';

import { useCallback, useEffect, useState } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';

import { fetchData } from '@/utilities/fetchData/fetchData';

import { FilterOptions, Quote } from '@/types/type';

import Pagination from './Pagination';
import LazyQuotes from './LazyQuotes';
import QuoteLink from './QuoteLink';
import HeadingOne from '../text/HeadingOne';
import { FaFilter } from 'react-icons/fa';
import FilterQuotes from '../filterQuotes/FilterQuotes';
import { cn } from '@/utilities/cn';
import Modal from '../modal/Modal';

const initialFilters: FilterOptions = {
  tags: [],
  author: [],
  length: 'none',
};

const QuotesList = () => {
  const [page, setPage] = useState<number>(1);
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);

  const { tags, author, length } = filters;

  const getLengthParams = (length: 'none' | 'short' | 'medium' | 'long') => {
    switch (length) {
      case 'short':
        return '&minLength=0&maxLength=100';
      case 'medium':
        return '&minLength=101&maxLength=200';
      case 'long':
        return '&minLength=201&maxLength=3000';
      case 'none':
      default:
        return ''; // No length filtering
    }
  };

  // const queryLength = getQueryLength(length);

  const buildUrl = (page: number, tags: string[]) =>
    `https://api.quotable.io/quotes?page=${page}${
      tags.length > 0 && `&tags=${tags.join('|')}`
    }${author.length > 0 && `&author=${author.join('|')}`}${
      length && getLengthParams(length)
    }&sortBy=content`;

  const { data: quotes, isFetching } = useQuery({
    queryKey: ['quotes', buildUrl(page, tags)],
    queryFn: async () => fetchData(buildUrl(page, tags)),
    placeholderData: keepPreviousData,
  });

  const handlePagination = useCallback((pageCount: number) => {
    // optimistic ui update (atleast I think that is what this is doing)
    setPage(pageCount);

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }, []);

  return (
    <div
      className={cn('space-y-6 lg:space-y-10', showFilters ? '' : 'relative')}>
      {/* filter button */}
      {!showFilters && (
        <button
          className='flex items-center gap-4 py-1 px-4 text-neutral-300 absolute right-0 -top-10 border border-gray-500 rounded text-sm md:top-5 lg:text-base hover:border-blue-400 hover:shadow-blue-400/20 hover:shadow-xl'
          onClick={() => setShowFilters(true)}>
          Filter Quotes
          <FaFilter title='filter quotes' className='text-blue-400' />
        </button>
      )}

      {/* filter modal */}
      <Modal showModal={showFilters} showModalFunc={setShowFilters}>
        <FilterQuotes
          initialFilters={initialFilters}
          closeFilter={setShowFilters}
          setFilters={setFilters}
        />
      </Modal>

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
