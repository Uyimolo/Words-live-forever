import React from 'react';
import Paragraph from '../text/Paragraph';
import { PaginationProps } from '@/types/type';



const Pagination = ({ handlePagination, page, loading }: PaginationProps) => {
  return (
    <div className='text-white gap-6 flex items-center justify-center text-sm lg:text-base'>
      {/* decrease pagecount */}
      <button
        onClick={() => handlePagination(page - 1)}
        disabled={page === 1 || loading}
        className='p-2 border rounded w-24 lg:w-28 hover:text-blue-400 hover:border-blue-400 disabled:border-gray-500 disabled:text-gray-500 '>
        Previous
      </button>

      <Paragraph>{page}</Paragraph>

      {/* increase pagecount */}
      <button
        onClick={() => handlePagination(page + 1)}
        disabled={loading}
        className='p-2 border rounded hover:text-blue-400 hover:border-blue-400 w-24 lg:w-28'>
        Next
      </button>
    </div>
  );
};

export default Pagination;
