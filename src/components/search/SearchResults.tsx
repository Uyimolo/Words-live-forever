import { Quote, SearchResultsProps } from '@/types/type';
import QuoteLink from '../quotes/QuoteCard';
import { cn } from '@/utilities/cn';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchData } from '@/utilities/fetchData/fetchData';
import { useEffect } from 'react';
import Paragraph from '../text/Paragraph';
import { toast } from 'react-toastify';

/**
 * Component to display search results for quotes.
 *
 * This component fetches and displays quotes based on the current search term.
 * It uses pagination to load more results as needed and handles different
 * states of the search process.
 *
 * Props:
 * - searchTerm: The term used to search for quotes.
 * - setSearchTerm: Function to clear or update the search term.
 * - setIsSearching: Function to indicate if a search is ongoing.
 *
 * Features:
 * - Fetches paginated results using useInfiniteQuery.
 * - Displays search results with appropriate messages for different states.
 * - Manages scroll behavior based on search results visibility.
 */
const SearchResults = ({
  searchTerm,
  setSearchTerm,
  setIsSearching,
}: SearchResultsProps) => {
  // Clears the search term and hides search results
  const clearSearchTerm = () => {
    setSearchTerm('');
  };

  // Constructs the URL for fetching search results with pagination and search term
  const generateSearchUrl = (page: number, searchTerm: string) => {
    const pageParam = `page=${page}`;
    const searchTermParam = `&query=${encodeURIComponent(searchTerm)}`;
    const queryParam = [pageParam, searchTermParam].join('');
    return `https://api.quotable.io/search/quotes?${queryParam}&fields=author,`;
  };

  // Fetches paginated search results using react-query
  const {
    data: results,
    isFetchingNextPage,
    fetchNextPage,
    isFetching,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['search', generateSearchUrl(1, searchTerm)],
    queryFn: async ({ pageParam = 1 }) =>
      fetchData(generateSearchUrl(pageParam, searchTerm)),
    getNextPageParam: (lastPage) => {
      // Determines the next page to fetch based on the response
      return lastPage.totalPages === lastPage.page ? null : lastPage.page + 1;
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    // Update search status
    setIsSearching(isFetching);
  }, [isFetching]);

  useEffect(() => {
    // Manage body scroll when search activity is ongoing (search input is not empty)
    document.body.style.overflow =
      searchTerm?.trim().length > 0 ? 'hidden' : 'auto';
  }, [searchTerm]);

  /**
   * Generates a feedback message based on the number of search results and
   * available quotes.
   *
   * Returns:
   * - A message about the number of displayed and total available quotes
   *   or a message indicating no results found.
   */
  const totalSearchResults =
    results?.pages.reduce((total, page) => total + page.results?.length, 0) ||
    0;

  const totalAvailableResults = results?.pages[0]?.totalCount || 0;
  const feedbackMessage = (() => {
    if (
      totalSearchResults === totalAvailableResults &&
      totalAvailableResults > 0
    ) {
      return `We found ${totalAvailableResults} quote${
        totalAvailableResults > 1 ? 's' : ''
      } that match your search.`;
    }

    if (totalSearchResults > 0) {
      return `Currently displaying ${totalSearchResults} quote${
        totalSearchResults > 1 ? 's' : ''
      } out of ${totalAvailableResults} total available results.`;
    }

    return 'No quotes found. Try a different search term to see more results.';
  })();

  return (
    <div
      className={cn(
        'w-full bg-gray-900 fixed left-0 top-32 h-[calc(100vh-80px)] overflow-auto px-4 z-10 md:top-20 md:px-8 lg:px-12',
        // !results?.pages[0]?.results?.length && searchTerm && 'h-12',
        searchTerm.length ? 'block' : 'hidden'
      )}>
      {/* Display feedback message for search results */}
      <Paragraph className='fixed bg-gray-900 z-10 w-11/12 pb-4'>
        {feedbackMessage}
      </Paragraph>

      {/* Display searched results in a grid layout */}
      <div className='mt-16 pr-2 lg:mt-10'>
        <div className='grid gap-6 md:grid-cols-2 md:gap-10 lg:grid-cols-3'>
          {results?.pages[0]?.results?.length > 0 &&
            results?.pages.map((page) =>
              page.results.map((quote: Quote) => (
                <QuoteLink
                  key={quote._id}
                  quote={quote}
                  onClick={clearSearchTerm}
                />
              ))
            )}
        </div>

        {/* Button to load more results */}
        {totalAvailableResults > 0 && !isFetchingNextPage && (
          <div className='py-8 w-fit mx-auto focus:outline-0'>
            <button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
              aria-label='Load more results'
              className={cn(
                'text-white bg-blue-500 hover:bg-blue-600 w-fit mx-auto px-4 py-2 rounded-md',
                isFetchingNextPage || (!hasNextPage && 'hidden')
              )}>
              Load more results
            </button>
          </div>
        )}

        {/* Display message when fetching next page of quotes */}
        {isFetchingNextPage && hasNextPage && (
          <Paragraph className='text-center text-gray-500 py-8'>
            Loading more quotes...
          </Paragraph>
        )}

        {/* Message displayed when there are no more quotes available */}
        {results?.pages[0].page?.results?.length > 0 && !hasNextPage && (
          <Paragraph className='text-center pb-8'>
            {`You've reached the end of the available quotes.`}
          </Paragraph>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
