'use client';

import { useCallback, useEffect, useState } from 'react';
import {
  useQuery,
  keepPreviousData,
  useInfiniteQuery,
} from '@tanstack/react-query';

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
import Paragraph from '../text/Paragraph';

const initialFilters: FilterOptions = {
  tags: [],
  author: [],
  length: 'none',
};

const QuotesList = () => {
  // const [page, setPage] = useState<number>(1);
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

  const buildUrl = (
    page: number,
    tags: string[],
    author: string[],
    length: 'none' | 'short' | 'medium' | 'long'
  ) => {
    // Create URL parameters based on the provided filters
    const pageParam = `page=${page}`;
    const tagsParam = tags.length
      ? `&tags=${encodeURIComponent(tags.join('|'))}`
      : '';
    const authorParam = author.length
      ? `&author=${encodeURIComponent(author.join('|'))}`
      : '';
    const lengthParam = length && getLengthParams(length);

    // concatenating the parameters
    const queryParam = [pageParam, tagsParam, authorParam, lengthParam]
      .filter(Boolean)
      .join('');

    // returning the constructed URL with all the parameters
    return `https://api.quotable.io/quotes?${queryParam}`;
  };

  const {
    data: quotes,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery({
    queryKey: ['quotes', buildUrl(1, tags, author, length)], // Initial page is 1
    queryFn: async ({ pageParam = 1 }) =>
      fetchData(buildUrl(pageParam, tags, author, length)),
    getNextPageParam: (lastPage) => {
      if (lastPage.page === lastPage.totalPages) return null; // No more pages to load
      return lastPage.page + 1; // Fetch the next page
    },
    initialPageParam: 1,
  });

  const handleScroll = useCallback(() => {
    const scrollTop = window.scrollY;
    const clientHeight = document.documentElement.clientHeight;
    const scrollHeight = document.documentElement.scrollHeight;

    if (scrollTop + clientHeight >= scrollHeight - 100) {
      fetchNextPage();
    }
  }, [fetchNextPage]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  const handleFilterVisibility = () => {
    setShowFilters(true);
  };

  return (
    <div
      className={cn('space-y-6 lg:space-y-10', showFilters ? '' : 'relative')}>
      {/* filter button */}
      {!showFilters && (
        <button
          className='flex items-center gap-4 py-1 px-4 text-neutral-300 absolute right-0 -top-10 border border-gray-500 rounded text-sm md:top-5 lg:text-base hover:border-blue-400 hover:shadow-blue-400/20 hover:shadow-xl'
          onClick={handleFilterVisibility}>
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
        {!quotes?.pages ? (
          <LazyQuotes />
        ) : (
          quotes?.pages.map((page) =>
            page.results.map((quote: Quote) => (
              <QuoteLink key={quote._id} quote={quote} />
            ))
          )
        )}
      </div>

      {quotes?.pages[0].results.length === 0 && (
        <Paragraph className='text-center'>
          No quotes match your current filter criteria.
        </Paragraph>
      )}

      {isFetchingNextPage && hasNextPage && (
        <Paragraph className='text-center text-gray-500'>
          Loading more quotes...
        </Paragraph>
      )}

      {!hasNextPage && (
        <Paragraph className='text-center'>
          You've reached the end of the available quotes.
        </Paragraph>
      )}
    </div>
  );
};

export default QuotesList;
