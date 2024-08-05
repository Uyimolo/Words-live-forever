'use client';
import { useQuery } from '@tanstack/react-query';
import Paragraph from '../text/Paragraph';
import { fetchData } from '@/utilities/fetchData/fetchData';
import { useEffect, useState } from 'react';
import { AccordionStateOption, Author, FilterOptions, FilterProps } from '@/types/type';
import { CiCircleRemove } from 'react-icons/ci';
import { IoSearchOutline } from 'react-icons/io5';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { cn } from '@/utilities/cn';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { FaCaretDown } from 'react-icons/fa';
import { motion } from 'framer-motion';

const FilterByAuthor = ({
  setSelectedFilters,
  selectedFilters,
  accordionState,
  handleAccordionState,
}: FilterProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [authorList, setAuthorList] = useState<string[]>([]);

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

  const handleAuthorListSelection = (author: string) => {
    setAuthorList((prevList) => {
      const newList = prevList.includes(author)
        ? prevList.filter((item) => item !== author)
        : [...authorList, author];

      setSelectedFilters({ ...selectedFilters, author: newList });

      return newList;
    });
  };

  return (
    <div className='space-y-4 max-w-3xl'>
      <Paragraph
        onClick={() => handleAccordionState('author')}
        className={cn('flex justify-between items-center')}>
        Filter by author
        <FaCaretDown
          className={cn('', accordionState.active ? 'rotate-180' : '')}
        />
      </Paragraph>

      <motion.div
        className={cn(
          'space-y-4',
          accordionState.active ? '' : 'overflow-hidden'
        )}
        initial={{ height: 0 }}
        animate={accordionState.active ? { height: 'auto' } : { height: 0 }}>
        {/* list of selected authors */}
        <div className='flex flex-wrap gap-1'>
          {authorList.map((author) => (
            <button
              key={author}
              className={cn(
                'flex gap-2 items-center py-1 px-2 rounded-full border border-gray-500'
              )}
              onClick={() => handleAuthorListSelection(author)}>
              <Paragraph>{author}</Paragraph>
              <IoIosAddCircleOutline
                className={cn('text-neutral-300 text-xl rotate-45')}
              />
            </button>
          ))}
        </div>

        <div className='relative'>
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
        </div>

        <div className='relative'>
          {/* search results drop down */}
          {author?.results && author?.results.length > 0 && (
            <div className='absolute top-0 bg-white w-full grid rounded-lg overflow-y-scroll max-h-[30vh]'>
              {author?.results &&
                author.results.map((author: Author) => (
                  <button
                    key={author._id}
                    onClick={() => handleAuthorListSelection(author.name)}
                    className={cn(
                      'hover:bg-blue-400 hover:text-neutral-100 text-left p-1 px-3 border', authorList.includes(author.name) && 'bg-blue-400'
                    )}>
                    {author.name}
                  </button>
                ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default FilterByAuthor;
