'use client';

import { useCallback, useEffect, useState } from 'react';
import { useInfiniteQuery } from '@tanstack/react-query';

import { fetchData } from '@/utilities/fetchData/fetchData';

import { FilterOptions, Quote } from '@/types/type';

import SkeletonQuotes from './SkeletonQuotes';
import QuoteCard from './QuoteCard';
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

/*
 * This component displays a paginated (infinite scrolling) list of quotes with filtering options.
 *
 * Features:
 * - Infinite scrolling to load more quotes.
 * - Filter quotes by tags, author, or length.
 * - Displays loading, error, and empty states.
 */

const QuotesList = () => {
  const [showFilters, setShowFilters] = useState<boolean>(false);
  const [filters, setFilters] = useState<FilterOptions>(initialFilters);

  const { tags, author, length } = filters;

  // generate parameter for filtering by length based on the filter length property
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

  // Construct the URL for fetching quotes with pagination and filtering parameters
  const buildUrl = (
    page: number,
    tags: string[],
    author: string[],
    length: 'none' | 'short' | 'medium' | 'long'
  ) => {
    const pageParam = `page=${page}`;
    const tagsParam = tags.length
      ? `&tags=${encodeURIComponent(tags.join('|'))}`
      : '';
    const authorParam = author.length
      ? `&author=${encodeURIComponent(author.join('|'))}`
      : '';
    const lengthParam = length && getLengthParams(length);

    // remove empty filters from the query string
    const queryParam = [pageParam, tagsParam, authorParam, lengthParam]
      .filter(Boolean)
      .join('');

    return `https://api.quotable.io/quotes?${queryParam}`;
  };

  // fetch paginated and filtered queries using react query
  const {
    data: quotes,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
  } = useInfiniteQuery({
    queryKey: ['quotes', buildUrl(1, tags, author, length)],

    queryFn: async ({ pageParam = 1 }) =>
      fetchData(buildUrl(pageParam, tags, author, length)),

    getNextPageParam: (lastPage) => {
      if (lastPage.page === lastPage.totalPages) return null;
      return lastPage.page + 1;
    },

    initialPageParam: 1,
  });

  // fetch the next page of quotes when user scrolls near the bottom of the page
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

  // Open up the filter modal
  const handleFilterVisibility = () => {
    setShowFilters(true);
  };

  // return an error if fetch fails
  if (isError) {
    return (
      <Paragraph className='text-center'>
        Failed to load quotes. Please try again later.
      </Paragraph>
    );
  }

  return (
    <div
      className={cn('space-y-6 lg:space-y-10', showFilters ? '' : 'relative')}>
      {/* Button to display filter modal */}
      {!showFilters && (
        <button
          className='flex items-center gap-4 py-1 px-4 text-neutral-300 absolute right-0 -top-10 border border-gray-500 rounded text-sm md:top-5 lg:text-base hover:border-blue-400 hover:shadow-blue-400/20 hover:shadow-xl'
          onClick={handleFilterVisibility}>
          Filter Quotes
          <FaFilter title='filter quotes' className='text-blue-400' />
        </button>
      )}

      {/* Modal containing filter options */}
      <Modal showModal={showFilters} showModalFunc={setShowFilters}>
        <FilterQuotes
          initialFilters={initialFilters}
          closeFilter={setShowFilters}
          setFilters={setFilters}
        />
      </Modal>

      <HeadingOne>{`"IN THE WORDS OF THE WISE"`}</HeadingOne>

      {/* Maps over fetched quotes and display them in grid layout */}
      <div className='grid gap-6 md:grid-cols-2 md:gap-10 lg:grid-cols-3'>
        {!quotes?.pages ? (
          <SkeletonQuotes />
        ) : (
          quotes?.pages.map((page) =>
            page.results.map((quote: Quote) => (
              <QuoteCard key={quote._id} quote={quote} />
            ))
          )
        )}
      </div>

      {/* Displays message if no quotes fit current filter criteria*/}
      {quotes?.pages[0].results.length === 0 && (
        <Paragraph className='text-center'>
          No quotes match your current filter criteria.
        </Paragraph>
      )}

      {/* Display message when fetching next page of quotes */}
      {isFetchingNextPage && hasNextPage && (
        <Paragraph className='text-center text-gray-500'>
          Loading more quotes...
        </Paragraph>
      )}

      {/* Display message when there are no more quotes available */}
      {!hasNextPage && (
        <Paragraph className='text-center'>
          {`You've reached the end of the available quotes.`}
        </Paragraph>
      )}
    </div>
  );
};

export default QuotesList;
