import { FilterOptions, Tag } from '@/types/type';
import Paragraph from '../text/Paragraph';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { useQuery } from '@tanstack/react-query';
import { fetchData } from '@/utilities/fetchData/fetchData';
import { useState } from 'react';
import { cn } from '@/utilities/cn';

const FilterByTheme = ({
  setFilters,
  filters,
}: {
  setFilters: (filters: FilterOptions) => void;
  filters: FilterOptions;
}) => {
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);

  const { isFetching, data: tags } = useQuery({
    queryKey: ['tags'],
    queryFn: async () => fetchData('https://quotable.io/tags'),
  });

  const handleThemeSelection = (tagName: string) => {
    setSelectedThemes((prevSelectedThemes) => {
      const updatedThemes = prevSelectedThemes.includes(tagName)
        ? prevSelectedThemes.filter((tag) => tag !== tagName)
        : [...prevSelectedThemes, tagName];

      // Directly set the updated filters without using a function
      setFilters({
        ...filters,
        tags: updatedThemes,
      });

      return updatedThemes;
    });
  };

  return (
    <div className='space-y-4'>
      <Paragraph>Filter by Themes</Paragraph>
      <div className='flex flex-wrap gap-2'>
        {tags
          // show only tags with at least 10 quotes
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
          ))}
      </div>
    </div>
  );
};

export default FilterByTheme;
