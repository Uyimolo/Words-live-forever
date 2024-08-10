import { Quote, SearchResultsProps } from '@/types/type';
import QuoteLink from '../quotes/QuoteCard';
import { cn } from '@/utilities/cn';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchData } from '@/utilities/fetchData/fetchData';
import { useEffect } from 'react';
import Paragraph from '../text/Paragraph';
{
  /* This component handles the display of search results for quotes.
   * It fetches data based on the search term and displays it in a grid layout.
   *
   * Props:
   * - searchTerm: The current term used to search for quotes.
   * - setSearchTerm: Function to clear or update the search term.
   * - setIsSearching: Function to indicate if a search is ongoing.
   *
   * Features:
   * - Fetches paginated results using useInfiniteQuery.
   * - Displays search results and handles empty states.
   * - Manages scroll behavior based on search results visibility.
   */
}

const SearchResults = ({
  searchTerm,
  setSearchTerm,
  setIsSearching,
}: SearchResultsProps) => {
  // Clears the current search term and hides search results
  const removeSearchResults = () => {
    setSearchTerm('');
  };

  // Constructs the URL for fetching search results with pagination and search term
  const buildUrl = (page: number, searchTerm: string) => {
    const pageParam = `page=${page}`;
    const searchTermParam = `&query=${encodeURIComponent(searchTerm)}`;
    const queryParam = [pageParam, searchTermParam].join('');
    return `https://api.quotable.io/search/quotes?${queryParam}&fields=author,`;
  };

  // fetches paginated search results using react query
  const {
    data: results,
    isFetchingNextPage,
    fetchNextPage,
    isFetching,
    hasNextPage,
  } = useInfiniteQuery({
    queryKey: ['search', buildUrl(1, searchTerm)],
    queryFn: async ({ pageParam = 1 }) =>
      fetchData(buildUrl(pageParam, searchTerm)),
    getNextPageParam: (lastPage) => {
      // Determines if there are more pages to fetch based on the response
      if (lastPage.totalPages === lastPage.page) return null;
      return lastPage.page + 1;
    },
    initialPageParam: 1,
  });

  useEffect(() => {
    setIsSearching(isFetching);
  }, [isFetching]);

  useEffect(() => {
    // toggles body scroll based on the presence of search results
    if (results?.pages[0].results) {
      document.body.style.overflow = 'hidden'; // disable scroll
    } else {
      document.body.style.overflow = 'auto'; // enable scroll
    }
  }, [results, searchTerm]);

  return (
    <div
      className={cn(
        'w-full bg-black/80 backdrop-blur-sm fixed left-0 top-32 h-screen px-4 overflow-y-auto z-10 md:top-20 md:px-8 lg:px-12',
        !results?.pages[0]?.results?.length && searchTerm && 'h-12 absolute',
        searchTerm.length ? 'block' : 'hidden'
      )}>
      {/* display searched results. */}
      <div className='overflow-y-auto max-h-[80vh] mt-6'>
        <div className='grid gap-6 md:grid-cols-2 md:gap-10 lg:grid-cols-3'>
          {results?.pages[0]?.results?.length > 0 &&
            results?.pages.map((page) =>
              page.results.map((quote: Quote) => (
                <QuoteLink
                  key={quote._id}
                  quote={quote}
                  onClick={removeSearchResults}
                />
              ))
            )}
        </div>

        {/* button to fetch more results*/}
        <div className='py-8 w-fit mx-auto'>
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            aria-label='Load more results'
            className={cn(
              'text-white bg-blue-500 hover:bg-blue-600 w-fit mx-auto px-4 py-2 rounded-md',
              isFetchingNextPage || (!hasNextPage && 'hidden')
            )}>
            See more results
          </button>
        </div>

        {/* Display message when there are no more quotes available */}
        {!hasNextPage && (
          <Paragraph className='text-center pb-8'>
            You've reached the end of the available quotes.
          </Paragraph>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
