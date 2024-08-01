import { Quote, SearchResultsProps } from '@/types/type';
import Paragraph from '../text/Paragraph';
import QuoteLink from '../quotes/QuoteLink';
// utilities
import { cn } from '@/utilities/cn';

const SearchResults = ({
  results,
  searchTerm,
  setSearchTerm,
  setResults,
}: SearchResultsProps) => {
  const handleCloseSearch = () => {
    setSearchTerm('');
    setResults(null);
  };

  return (
    <div
      className={cn(
        'w-full bg-black fixed left-0 top-32 h-screen px-4 overflow-hidden space-y-4 z-10 md:top-20 md:px-8 lg:px-12',
        !results?.length && searchTerm && 'h-12 absolute',
        searchTerm ? 'block' : 'hidden'
      )}>
      {searchTerm && (
        <Paragraph className='pt-4'>{`Found ${results?.length} matches for '${searchTerm}'`}</Paragraph>
      )}

      {results && (
        <div className='grid items-start gap-10 pb-10 max-h-[80vh]  overflow-y-scroll md:items-stretch md:grid-cols-2 lg:grid-cols-3'>
          {results.map((quote) => (
            <QuoteLink
              onClick={handleCloseSearch}
              key={quote._id}
              quote={quote}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;
