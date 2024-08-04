'use client';

import { Tag } from '@/types/type';
import { fetchData } from '@/utilities/fetchData/fetchData';
import { useQuery } from '@tanstack/react-query';
import Paragraph from '../text/Paragraph';
import { IoIosAddCircleOutline } from 'react-icons/io';

const FilterQuotes = () => {
  const { isFetching, data: tags } = useQuery({
    queryKey: ['tags'],
    queryFn: async () => fetchData('https://quotable.io/tags'),
  });

  return (
    <div className='w-[95vw] h-[95vh] mx-auto overflow-y-scroll space-y-6 bg-gray-800 rounded-xl p-4 md:w-[70vw] md:h-fit md:overflow-auto lg:p-10 lg:space-y-12'>
      {/* filter by tags */}

      <div className='space-y-4'>
        <Paragraph>Filter by Themes</Paragraph>
        <div className='flex flex-wrap gap-2'>
          {tags
            ?.filter((tag: Tag) => tag.quoteCount > 10)
            .map((tag: Tag) => (
              <button
                key={tag._id}
                className='flex gap-2 items-center py-1 px-2 rounded-full border border-gray-500'>
                <Paragraph>{tag.name}</Paragraph>
                <IoIosAddCircleOutline className='text-neutral-300 text-xl' />
              </button>
            ))}
        </div>
      </div>

      <div className='space-y-4'>
        <Paragraph>Filter by Author</Paragraph>
        {/* input field for author */}
        <input className='w-full pl-10 pr-4 py-2 rounded-full bg-transparent border border-gray-500 text-neutral-300 max-w-sm' />
      </div>
      {/* end of author filter */}

      <div className='space-y-4'>
        <Paragraph>Filter by Length</Paragraph>
        <div className='flex flex-col gap-2 lg:flex-row w-fit'>
          <label className='text-neutral-300  flex gap-2'>
            <input type='radio' name='length' value='short' />
            None
          </label>
          <label className='text-neutral-300  flex gap-2'>
            <input type='radio' name='length' value='short' />
            Short
          </label>
          <label className='text-neutral-300 flex gap-2'>
            <input type='radio' name='length' value='medium' />
            Medium
          </label>
          <label className='text-neutral-300 flex gap-2'>
            <input type='radio' name='length' value='long' />
            Long
          </label>
        </div>
      </div>
    </div>
  );
};

export default FilterQuotes;
