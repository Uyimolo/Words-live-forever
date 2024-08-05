'use client';
import { IoIosAddCircleOutline } from 'react-icons/io';
import FilterByTheme from './FilterByTheme';
import { AccordionStateOption, FilterOptions } from '@/types/type';
import FilterByAuthor from './FilterByAuthor';
import { useState } from 'react';
import FIlterByLength from './FIlterByLength';
import Divider from '../divider/Divider';

const initialAccordionState: AccordionStateOption[] = [
  { name: 'theme', active: false },
  { name: 'author', active: false },
  { name: 'length', active: false },
];

const FilterQuotes = ({
  closeFilter,
  setFilters,
  initialFilters,
}: {
  closeFilter: (showFilter: boolean) => void;
  setFilters: (filters: FilterOptions) => void;
  initialFilters: FilterOptions;
}) => {
  const [selectedFilters, setSelectedFilters] =
    useState<FilterOptions>(initialFilters);

  const [accordionState, setAccordionState] = useState(initialAccordionState);

  const handleAccordionState = (variant: string) => {
    const newState = accordionState.map((item) =>
      item.name === variant
        ? { ...item, active: !item.active }
        : { ...item, active: false }
    );

    setAccordionState(newState);
  };

  const handleSetFilters = () => {
    setFilters(selectedFilters);
    closeFilter(false);
  };

  return (
    <div className='relative w-[90vw] h-[90vh] mx-auto overflow-y-scroll space-y-4 bg-gray-800 rounded-xl pt-16 pb-4 px-4 md:w-[70vw] md:h-fit md:overflow-auto lg:p-10 lg:pt-14 lg:space-y-12'>
      <IoIosAddCircleOutline
        className='cursor-pointer absolute top-4 right-4 text-3xl text-gray-300 rotate-45 lg:right-10 lg:top-8'
        onClick={() => closeFilter(false)}
      />

      <FilterByTheme
        setSelectedFilters={setSelectedFilters}
        selectedFilters={selectedFilters}
        accordionState={accordionState[0]}
        handleAccordionState={handleAccordionState}
      />

      <Divider  />
      
      <FilterByAuthor
        setSelectedFilters={setSelectedFilters}
        selectedFilters={selectedFilters}
        accordionState={accordionState[1]}
        handleAccordionState={handleAccordionState}
      />

      <Divider  />
      
      <FIlterByLength
        setSelectedFilters={setSelectedFilters}
        selectedFilters={selectedFilters}
        accordionState={accordionState[2]}
        handleAccordionState={handleAccordionState}
      />

      <div className=''>
        <button
          className='w-full text-neutral-100 rounded bg-blue-400 p-2'
          onClick={handleSetFilters}>
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default FilterQuotes;
