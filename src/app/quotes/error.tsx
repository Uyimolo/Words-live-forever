'use client'; // Error boundaries must be Client Components

import HeadingOne from '@/components/text/HeadingOne';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className='grid place-content-center gap-6'>
      <HeadingOne className='text-neutral-300'>Something went wrong { error.message}</HeadingOne>
      <button className='text-neutral-300 text-sm border rounded py-2 px-4 mx-auto w-fit  lg:text-base'
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }>
        Try again
      </button>
    </div>
  );
}
