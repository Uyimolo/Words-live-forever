'use client';
import LazyQuotes from '../quotes/LazyQuotes';
import Pagination from '../quotes/Pagination';
import { useCallback, useState } from 'react';
import { Author } from '@/types/type';
import HeadingOne from '../text/HeadingOne';
import AuthorCard from './AuthorCard';
import { useQuery } from '@tanstack/react-query';
import { fetchData } from '@/utilities/fetchData/fetchData';

const AuthorsList = () => {
  const [page, setPage] = useState<number>(1);

  const buildUrl = (page: number) =>
    `https://api.quotable.io/authors?page=${page}&sortBy=content`;

  const { data: authors, isFetching } = useQuery({
    queryKey: ['authors', buildUrl(page)],
    queryFn: async () => fetchData(buildUrl(page)),
  });

  const handlePagination = useCallback(
    (pageCount: number) => {
      // optimistic ui update (atleast I think that is what this is doing)
      setPage(pageCount);

      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    },
    [page]
  );

  return (
    <div className=' space-y-6 lg:space-y-10'>
      <HeadingOne>{`"WISE MEN'S HUB"`}</HeadingOne>
      <div className='grid gap-6 md:grid-cols-2 md:gap-10 lg:grid-cols-3'>
        {isFetching ? (
          <LazyQuotes />
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
      />
    </div>
  );
};

export default AuthorsList;
