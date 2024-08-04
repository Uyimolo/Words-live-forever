'use client';

import Paragraph from '../text/Paragraph';
import { IoIosAddCircleOutline } from 'react-icons/io';
import FilterByTheme from './FilterByTheme';
import { FilterOptions } from '@/types/type';
import FilterByAuthor from './FilterByAuthor';

const FilterQuotes = ({
  closeFilter,
  setFilters,
  filters,
}: {
  closeFilter: (showFilter: boolean) => void;
  setFilters: (filters: FilterOptions) => void;
  filters: FilterOptions;
}) => {
  return (
    <div className='relative w-[90vw] h-[90vh] mx-auto overflow-y-scroll space-y-6 bg-gray-800 rounded-xl pt-8 pb-4 px-4 md:w-[70vw] md:h-fit md:overflow-auto lg:p-10 lg:pt-14 lg:space-y-12'>
      <IoIosAddCircleOutline
        className='cursor-pointer absolute top-4 right-4 text-3xl text-gray-300 rotate-45 lg:right-10 lg:top-8'
        onClick={() => closeFilter(false)}
      />

      <FilterByTheme setFilters={setFilters} filters={filters} />

      <FilterByAuthor />

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
