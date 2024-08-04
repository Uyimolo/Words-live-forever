'use client';
import { useQuery } from '@tanstack/react-query';
import Paragraph from '../text/Paragraph';
import { fetchData } from '@/utilities/fetchData/fetchData';
import { useEffect, useState } from 'react';
import { Author } from '@/types/type';
import { CiCircleRemove } from 'react-icons/ci';
import { IoSearchOutline } from 'react-icons/io5';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { cn } from '@/utilities/cn';

const FilterByAuthor = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const { data: author, isFetching } = useQuery({
    queryKey: ['filterAuthor', searchTerm],
    queryFn: async () =>
      fetchData(`https://api.quotable.io/search/authors?query=${searchTerm}`),
  });

  useEffect(() => {
    if (author?.results > 0) document.body.style.overflow = 'hidden';
  }, [author]);

  const handleCancelSearch = () => {
    setSearchTerm('');
  };

  return (
    <div className='space-y-4 max-w-sm relative'>
      <Paragraph>Filter by Author</Paragraph>
      <input
        className='w-full pl-10 pr-4 py-2 rounded-full bg-transparent border border-gray-500 text-neutral-300'
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
      />

      <IoSearchOutline
        title='Search Quotes'
        className={cn(
          'cursor-pointer text-gray-500 text-2xl absolute top-1/2 -translate-y-1/2 left-2'
        )}
      />

      {/* cancel search icon */}
      <CiCircleRemove
        title='Cancel Search'
        onClick={handleCancelSearch}
        className={cn(
          'cursor-pointer text-3xl absolute top-1/2 -translate-y-1/2 right-2 text-gray-500',
          searchTerm && !isFetching ? 'block' : 'hidden'
        )}
      />

      <AiOutlineLoading3Quarters
        title='Loading search results'
        className={cn(
          'cursor-pointer text-xl animate-loadin absolute top-1/2 right-2 text-gray-500 -translate-y-1/2',
          isFetching && searchTerm ? 'block' : 'hidden'
        )}
      />

      {/* search results drop down */}
      {author?.results && author?.results.length > 0 && (
        <div className='absolute bottom-16 bg-white w-full grid rounded-lg overflow-scroll max-h-[50vh]'>
          {author?.results &&
            author.results.map((author: Author) => (
              <button
                key={author._id}
                className='hover:bg-blue-400 text-left p-1 px-3 border'>
                {author.name}
              </button>
            ))}
        </div>
      )}
    </div>
  );
};

export default FilterByAuthor;
