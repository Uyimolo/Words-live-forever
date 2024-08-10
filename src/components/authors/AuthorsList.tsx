'use client';
import SkeletonQuotes from '../quotes/SkeletonQuotes';
import Pagination from '../quotes/Pagination';
import { useCallback, useState } from 'react';
import { Author } from '@/types/type';
import HeadingOne from '../text/HeadingOne';
import AuthorCard from './AuthorCard';
import { useQuery } from '@tanstack/react-query';
import { fetchData } from '@/utilities/fetchData/fetchData';

const AuthorsList = () => {
  const [page, setPage] = useState<number>(1);

  // constructs URL for fetching authors list with pagination
  const buildUrl = (page: number) =>
    `https://api.quotable.io/authors?page=${page}&sortBy=content`;

  // fetch authors with react query
  const { data: authors, isFetching } = useQuery({
    queryKey: ['authors', buildUrl(page)],
    queryFn: async () => fetchData(buildUrl(page)),
  });

  const handlePagination = useCallback((pageCount: number) => {
    // optimistic ui update (atleast I think that is what this is doing lol)
    setPage(pageCount);

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }, []);

  return (
    <div className=' space-y-6 lg:space-y-10'>
      <HeadingOne>{`"WISE MEN'S HUB"`}</HeadingOne>

      {/* displays fetched authors in grid layout */}
      <div className='grid gap-6 md:grid-cols-2 md:gap-10 lg:grid-cols-3'>
        {isFetching ? (
          <SkeletonQuotes />
        ) : (
          authors.results.map((author: Author) => (
            <AuthorCard key={author._id} author={author} />
          ))
        )}
      </div>
      {/* pagination  */}
      <Pagination
        loading={isFetching}
        page={page}
        handlePagination={handlePagination}
        totalPages={authors?.results.totalPages}
      />
    </div>
  );
};

export default AuthorsList;
