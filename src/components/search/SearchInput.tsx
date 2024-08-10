'use client';
import { useEffect, useRef, useState } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { CiCircleRemove } from 'react-icons/ci';
import { cn } from '@/utilities/cn';
import { SearchProps } from '@/types/type';

{
  /* This component conditionally displays a search input on mobile devices when the search icon is clicked
   * On desktop devices it always displays the search input
   * When the cancel icon is clicked, the input field will be cleared and the search input will disappear (on mobile).
   * Props:
   * - searchTerm: The current search term entered by the user.
   * - setSearchTerm: A function to update the search term.
   * - isSearching: A boolean indicating whether the search results are being fetched or not.
   *
   * Note: This component assumes the existence of a main header and a navbar
   * You may need to modify the component structure and CSS accordingly to fit your specific layout.
   */
}
const SearchInput = ({
  searchTerm,
  setSearchTerm,
  isSearching,
}: SearchProps) => {
  const [showSearchInput, setShowSearchInput] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleCancelSearch = () => {
    setShowSearchInput(false);
    setSearchTerm('');
  };

  const displaySearchInput = () => {
    setShowSearchInput(true);
  };

  useEffect(() => {
    // focus the search input when the search input is displayed
    if (showSearchInput) {
      searchInputRef.current && searchInputRef.current.focus();
    }
  }, [showSearchInput]);

  return (
    <div
      className={cn(
        'w-fit z-10 md:w-full md:relative md:left-0 md:right-0 md:translate-0 px-4',
        // position search input below the main header and navbar when showSearchInput is true ON MOBILE ONLY
        showSearchInput
          ? 'w-full absolute -bottom-10 right-0 h-fit left-1/2 -translate-x-1/2 md:relative md:bottom-0 md:translate-x-0 md:left-0'
          : ''
      )}>
      <input
        ref={searchInputRef}
        type='text'
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        className={cn(
          'w-full pl-10 pr-4 py-2 rounded-full bg-transparent border border-gray-500 text-neutral-300',
          showSearchInput ? 'block' : 'hidden md:block'
        )}
      />

      <IoSearchOutline
        title='Search Quotes'
        onClick={displaySearchInput}
        className={cn(
          'cursor-pointer text-gray-500 text-2xl',
          // position search icon inside the search input when search input is visible else position inline with the navbar bar
          !showSearchInput
            ? 'md:absolute md:top-1/4 md-translate-y-1/2 md:left-7'
            : 'absolute top-1/2 -translate-y-1/2 left-7'
        )}
      />

      <CiCircleRemove
        title='Cancel Search'
        onClick={handleCancelSearch}
        className={cn(
          'cursor-pointer text-3xl absolute top-1/2 -translate-y-1/2 right-6 text-gray-500',
          !isSearching && showSearchInput ? 'block' : 'hidden',
          // hide cancel on large screens until a search value is inputed
          searchTerm && !isSearching ? 'md:block' : 'md:hidden'
        )}
      />

      <AiOutlineLoading3Quarters
        title='Loading search results'
        className={cn(
          'cursor-pointer text-xl animate-loading absolute top-1/4 -translate-1/2 right-6 text-gray-500',
          // show loading indicator when fetching results
          isSearching && searchTerm ? 'block' : 'hidden'
        )}
      />
    </div>
  );
};

export default SearchInput;
