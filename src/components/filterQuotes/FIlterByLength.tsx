import { FilterProps } from '@/types/type';
import Paragraph from '../text/Paragraph';
import { FaCaretDown } from 'react-icons/fa';
import { cn } from '@/utilities/cn';
import { motion } from 'framer-motion';

const FIlterByLength = ({
  setSelectedFilters,
  selectedFilters,
  accordionState,
  handleAccordionState,
}: FilterProps) => {
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
      </motion.div>
    </div>
  );
};

export default FIlterByLength;
