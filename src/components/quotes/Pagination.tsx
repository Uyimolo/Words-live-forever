import { useState } from 'react';
import Paragraph from '../text/Paragraph';
import { PaginationProps } from '@/types/type';

const Pagination = ({
  handlePagination,
  page,
  totalPages,
  loading,
}: PaginationProps) => {
  const [pageJump, setPageJump] = useState<number>();

  return (
    <div className='text-white flex bg-blue-900 overflow-hidden bg-blue-80 text-sm lg:text-base'>
      {/* decrease pagecount */}
      <button
        onClick={() => handlePagination(page - 1)}
        disabled={page === 1 || loading}
        className='p-2  rounded lg:w-28 hover:text-blue-400   disabled:text-gray-500 borde'>
        Previous
      </button>

      <div className='flex'>
        <input
          type='number'
          min={1}
          max={totalPages}
          value={page}
          onChange={(event) => setPageJump(Number(event.target.value))}
          className='w-20 p-2 rounded bg-neutral-300 text-neutral-800  text-center'
        />
        <button className='text-nowrap p-2 border'>Go to page</button>
      </div>

      {/* increase pagecount */}
      <button
        onClick={() => handlePagination(page + 1)}
        disabled={loading || page === totalPages}
        className='p-2  rounded lg:w-28 hover:text-blue-400   disabled:text-gray-500 borde'>
        Next
      </button>
    </div>
  );
};

export default Pagination;
