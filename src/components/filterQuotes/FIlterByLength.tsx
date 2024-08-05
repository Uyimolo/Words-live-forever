import { FilterProps } from '@/types/type';
import Paragraph from '../text/Paragraph';
import { FaCaretDown } from 'react-icons/fa';
import { cn } from '@/utilities/cn';
import { motion } from 'framer-motion';
import { ChangeEvent } from 'react';

const FIlterByLength = ({
  setSelectedFilters,
  selectedFilters,
  accordionState,
  handleAccordionState,
}: FilterProps) => {
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value as 'none' | 'short' | 'medium' | 'long';
    setSelectedFilters({ ...selectedFilters, length: newValue });
    handleAccordionState('length');
  };


  return (
    <div className='space-y-4'>
      <Paragraph
        onClick={() => handleAccordionState('length')}
        className={cn('flex gap-2 items-center justify-between')}>
        Filter by length
        <FaCaretDown
          className={cn('', accordionState.active ? 'rotate-180' : '')}
        />
      </Paragraph>

      <motion.div
        initial={{ height: 0 }}
        animate={accordionState.active ? { height: 'auto' } : { height: 0 }}
        className='flex flex-col gap-2 lg:flex-row w-fit overflow-hidden'>
        <label className='text-neutral-300 flex gap-2'>
          <input
            type='radio'
            name='length'
            value='none'
            checked={selectedFilters.length === 'none'}
            onChange={handleChange}
          />
          None
        </label>
        <label className='text-neutral-300 flex gap-2'>
          <input
            type='radio'
            name='length'
            value='short'
            checked={selectedFilters.length === 'short'}
            onChange={handleChange}
          />
          Short
        </label>
        <label className='text-neutral-300 flex gap-2'>
          <input
            type='radio'
            name='length'
            value='medium'
            checked={selectedFilters.length === 'medium'}
            onChange={handleChange}
          />
          Medium
        </label>
        <label className='text-neutral-300 flex gap-2'>
          <input
            type='radio'
            name='length'
            value='long'
            checked={selectedFilters.length === 'long'}
            onChange={handleChange}
          />
          Long
        </label>
      </motion.div>
    </div>
  );
};


export default FIlterByLength;
