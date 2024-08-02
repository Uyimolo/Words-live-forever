'use client';
import LazyQuotes from '../quotes/LazyQuotes';
import Pagination from '../quotes/Pagination';
import { useEffect, useState } from 'react';
import { Author, AuthorsData, Quote } from '@/types/type';
import HeadingOne from '../text/HeadingOne';
import AuthorCard from './AuthorCard';

const AuthorsList = ({ authorsData }: { authorsData: AuthorsData }) => {
  const initialQuotes = authorsData.results;
  const [quotes, setQuotes] = useState(initialQuotes);
  const [page, setPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchQuotes = async () => {
    // to make sure users to refetch page one data and rely only on what is gotten from the server component
    if (page > 1) {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.quotable.io/authors?page=${page}&sortBy=content`
        );

        const data = await response.json();

        if (response.ok) {
          setQuotes(data.results);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    } else {
      setQuotes(initialQuotes);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, [page]);

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
        {loading ? (
          <LazyQuotes />
        ) : (
          quotes.map((author: Author) => (
            <AuthorCard key={author._id} author={author} />
          ))
        )}
      </div>
      {/* pagination  */}
      <Pagination
        loading={loading}
        page={page}
        handlePagination={handlePagination}
      />
    </div>
  );
};

export default AuthorsList;
