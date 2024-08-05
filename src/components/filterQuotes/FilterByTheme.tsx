import { FilterProps, Tag } from '@/types/type';
import Paragraph from '../text/Paragraph';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { useQuery } from '@tanstack/react-query';
import { fetchData } from '@/utilities/fetchData/fetchData';
import { useState } from 'react';
import { cn } from '@/utilities/cn';
import { FaCaretDown } from 'react-icons/fa';
import { motion } from 'framer-motion';

const FilterByTheme = ({
  setSelectedFilters,
  selectedFilters,
  accordionState,
  handleAccordionState,
}: FilterProps) => {
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);

  const { data: tags, isFetching } = useQuery({
    queryKey: ['tags'],
    queryFn: async () => fetchData('https://quotable.io/tags'),
  });

  // this function toggles selected themes and then updates the selected filters array
  const handleThemeSelection = (tagName: string) => {
    setSelectedThemes((prevSelectedThemes) => {
      const updatedThemes = prevSelectedThemes.includes(tagName)
        ? prevSelectedThemes.filter((tag) => tag !== tagName)
        : [...prevSelectedThemes, tagName];

      // update selected filters
      setSelectedFilters({
        ...selectedFilters,
        tags: updatedThemes,
      });

      // set selected themes to updated themes
      return updatedThemes;
    });
  };

  return (
    <div className='space-y-4'>
      <Paragraph
        onClick={() => handleAccordionState('theme')}
        className={cn('flex gap-2 items-center justify-between')}>
        Filter by theme
        <FaCaretDown
          className={cn('', accordionState.active ? 'rotate-180' : '')}
        />
      </Paragraph>

      <motion.div
        initial={{ height: 0 }}
        animate={accordionState.active ? { height: 'auto' } : { height: 0 }}
        className='flex flex-wrap gap-2 overflow-hidden'>
        
        {!isFetching ? tags
          // show only tags with at least 10 quotes (don't want irrelevant tags)
          ?.filter((tag: Tag) => tag.quoteCount >= 10)
          .map((tag: Tag) => (
            <button
              key={tag._id}
              className={cn(
                'flex gap-2 items-center py-1 px-2 rounded-full border border-gray-500',
                selectedThemes.includes(tag.name) ? 'border-blue-400' : ''
              )}
              onClick={() => handleThemeSelection(tag.name)}>
              <Paragraph>{tag.name}</Paragraph>
              <IoIosAddCircleOutline
                className={cn(
                  'text-neutral-300 text-xl',
                  selectedThemes.includes(tag.name)
                    ? 'rotate-45 text-red-300'
                    : ''
                )}
              />
            </button>
          )) : <Paragraph>Fetching theme data...</Paragraph>}
      </motion.div>
    </div>
  );
};

export default FilterByTheme;
