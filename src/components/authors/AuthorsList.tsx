'use client';
import LazyQuotes from '../quotes/LazyQuotes';
import Pagination from '../quotes/Pagination';
import { useState } from 'react';
import { Author } from '@/types/type';
import HeadingOne from '../text/HeadingOne';
import AuthorCard from './AuthorCard';
import { useQuery } from '@tanstack/react-query';
import { fetchData } from '@/utilities/fetchData/fetchData';

const AuthorsList = () => {
  const [page, setPage] = useState<number>(1);

  const url = `https://api.quotable.io/authors?page=${page}&sortBy=content`;

  const { data: authors, isLoading } = useQuery({
    queryKey: ['authors', url],
    queryFn: async () => fetchData(url),
  });

  const handlePagination = (pageCount: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const timeout = setTimeout(() => {
      setPage(pageCount);
      return clearTimeout(timeout);
    }, 1000);
  };

  return (
    <div className=' space-y-6 lg:space-y-10'>
      <HeadingOne>{`"WISE MEN'S HUB"`}</HeadingOne>
      <div className='grid gap-6 md:grid-cols-2 md:gap-10 lg:grid-cols-3'>
        {isLoading ? (
          <LazyQuotes />
        ) : (
          authors.results.map((author: Author) => (
            <AuthorCard key={author._id} author={author} />
          ))
        )}
      </div>
      {/* pagination  */}
      <Pagination
        loading={isLoading}
        page={page}
        handlePagination={handlePagination}
      />
    </div>
  );
};

export default AuthorsList;
