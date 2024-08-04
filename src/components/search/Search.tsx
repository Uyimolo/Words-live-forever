'use client';
import { useEffect, useRef, useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { CiCircleRemove } from 'react-icons/ci';
import { cn } from '@/utilities/cn';
import { useQuery } from '@tanstack/react-query';
import { SearchProps } from '@/types/type';

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

  // set results when data is recieved from useQuery
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

  //focus the search input anytime the search component mounts
  useEffect(() => {
    if (showSearch) {
      inputRef.current && inputRef.current.focus();
    }
  });

  return (
    <div
      className={cn(
        'w-fit z-10 md:w-full md:relative md:left-0 md:right-0 md:translate-0 px-4',
        // when showsearch is true change position of search div to absolute and move it down below the main header
        showSearch
          ? 'w-full absolute -bottom-10 right-0 h-fit left-1/2 -translate-x-1/2 md:relative md:bottom-0 md:translate-x-0 md:left-0'
          : ''
      )}>
      <input
        ref={inputRef}
        type='text'
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        className={cn(
          'w-full pl-10 pr-4 py-2 rounded-full bg-transparent border border-gray-500 text-neutral-300',
          showSearch ? 'block' : 'hidden md:block'
        )}
      />

      {/* search icon */}
      <IoSearchOutline
        title='Search Quotes'
        onClick={() => setShowSearch(true)}
        className={cn(
          'cursor-pointer text-gray-500 text-2xl',
          // position search icon properly to display on the input when showsearch is true
          !showSearch
            ? 'md:absolute md:top-1/4 md-translate-y-1/2 md:left-7'
            : 'absolute top-1/2 -translate-y-1/2 left-7'
        )}
      />

      {/* cancel search icon */}
      <CiCircleRemove
        title='Cancel Search'
        onClick={handleCancelSearch}
        className={cn(
          'cursor-pointer text-3xl absolute top-1/2 -translate-y-1/2 right-6 text-gray-500',
          showSearch && results ? 'block' : 'hidden',
          // hide cancel on small screens when loading a new query
          !isLoading && showSearch ? 'block' : 'hidden',
          // hide cancel on large screens until a search value is inputed
          searchTerm && !isLoading ? 'md:block' : 'md:hidden'
        )}
      />

      <AiOutlineLoading3Quarters
        title='Loading search results'
        className={cn(
          'cursor-pointer text-xl animate-loading absolute top-1/4 -translate-1/2 right-6 text-gray-500',
          showSearch ? 'block' : 'hidden',
          isLoading && searchTerm ? 'block' : 'hidden'
        )}
      />
    </div>
  );
};

export default Search;
