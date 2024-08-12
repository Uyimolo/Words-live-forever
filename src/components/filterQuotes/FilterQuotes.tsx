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
    <div className='relative flex flex-col justify-between w-[90vw] overflow-auto min-h-[450px] h-[80vh] bg-gray-800 rounded-xl pt-16 pb-4 px-4 md:px-8 md:min-w-min md:w-[70vw] md:h-[70vh] md:overflow-auto lg:p-10 lg:pt-14 lg:h-[90vh]'>
      <div className=' space-y-4'>
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

        <Divider />

        <FilterByAuthor
          setSelectedFilters={setSelectedFilters}
          selectedFilters={selectedFilters}
          accordionState={accordionState[1]}
          handleAccordionState={handleAccordionState}
        />

        <Divider />

        <FIlterByLength
          setSelectedFilters={setSelectedFilters}
          selectedFilters={selectedFilters}
          accordionState={accordionState[2]}
          handleAccordionState={handleAccordionState}
        />
      </div>

      <button
        className='w-full justify-self-end text-neutral-100 rounded bg-blue-400 p-2'
        onClick={handleSetFilters}>
        Apply Filters
      </button>
    </div>
  );
};

export default FilterQuotes;
