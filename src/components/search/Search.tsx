import search from '@/assets/search-alt-2-svgrepo-com.svg';
import cancel from '@/assets/cancel-svgrepo-com.svg';
import { cn } from '@/utilities/cn';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { SearchProps } from '@/types/type';
import loadingIcon from '@/assets/loading-svgrepo-com.svg';
import { useQuery } from '@tanstack/react-query';

const Search = ({
  setResults,
  results,
  searchTerm,
  setSearchTerm,
}: SearchProps) => {
  const [showSearch, setShowSearch] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const url = `https://api.quotable.io/search/quotes?query=${searchTerm.trim()}`;

  const fetchSearchResult = async (url: string) => {
    if (searchTerm) {
      const response = await fetch(url);
      return await response.json();
    }
  };

  const { data, isLoading } = useQuery({
    queryKey: ['search', url],
    queryFn: async () => fetchSearchResult(url),
    enabled: !!searchTerm.trim(),
  });

  useEffect(() => {
    if (data && data.results) {
      setResults(data.results);
    }
  }, [data, setResults]);

  const handleCancelSearch = () => {
    setShowSearch(false);
    setSearchTerm('');
    setResults(null);
  };

  // // focus the search input anytime the search component mounts
  useEffect(() => {
    if (showSearch) {
      inputRef.current && inputRef.current.focus();
    }
  });

  return (
    <div
      className={cn(
        'w-fit z-10 md:w-full md:relative md:left-0 md:right-0 md:translate-0 px-4',
        showSearch
          ? 'w-full absolute -bottom-10 right-0 h-fit left-1/2 -translate-x-1/2'
          : ''
      )}>
      <input
        ref={inputRef}
        type='text'
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        className={cn(
          'w-full pl-10 pr-4 py-2 rounded-full bg-black border border-white text-white',
          showSearch ? 'block' : 'hidden md:block'
        )}
      />

      {/* search icon */}
      <Image
        src={search}
        alt='search'
        width={20}
        height={20}
        onClick={() => setShowSearch(true)}
        className={cn(
          'cursor-pointer',
          !showSearch
            ? 'md:absolute md:top-1/4 md-translate-y-1/2 md:left-7'
            : 'absolute top-1/2 -translate-y-1/2 left-7'
        )}
      />

      {/* cancel search icon */}
      <Image
        src={cancel}
        alt='cancel search'
        width={20}
        height={20}
        onClick={handleCancelSearch}
        className={cn(
          'cursor-pointer absolute top-1/4 -translate-1/2 right-6',
          showSearch && results ? 'block' : 'hidden',
          !isLoading && searchTerm ? 'block' : 'hidden'
        )}
      />

      <Image
        src={loadingIcon}
        alt='cancel search'
        width={20}
        height={20}
        className={cn(
          'cursor-pointer animate-loading absolute top-1/4 -translate-1/2 right-6',
          showSearch ? 'block' : 'hidden',
          isLoading && searchTerm ? 'block' : 'hidden'
        )}
      />
    </div>
  );
};

export default Search;
