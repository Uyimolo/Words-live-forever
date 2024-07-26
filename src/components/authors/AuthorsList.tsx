'use client';
import Link from 'next/link';
import LazyQuotes from '../quotes/LazyQuotes';
import Pagination from '../quotes/Pagination';
import Paragraph from '../text/Paragraph';
import { useEffect, useState } from 'react';
import { Author, AuthorsData, Quote } from '@/types/type';

const AuthorsList = ({ authorsData }: { authorsData: AuthorsData }) => {
  const initialQuotes = authorsData.results;

  const [quotes, setQuotes] = useState(initialQuotes);
  const [page, setPage] = useState<number>(1);
  const [filter, setFilter] = useState<string>('');
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
  }, [page, filter]);

  const handlePagination = (pageCount: number) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // [TO MYSELF] This is to delay the transition to prevent a flickering effect, i would add framer motion to intercept the skeleton and make it fade gently away later
    const timeout = setTimeout(() => {
      setPage(pageCount);
      return clearTimeout(timeout);
    }, 1000);
  };
  return (
    <div className=' space-y-6 lg:space-y-10'>
      {/* filtering */}
      {/* <filter /> */}
      <div className='grid gap-2 md:grid-cols-2 lg:grid-cols-3'>
        {loading ? (
          <LazyQuotes />
        ) : (
          quotes.map((author: Author) => (
            // actual quote
            <Link
              href={`/authors/${author._id}`}
              key={author._id}
              className='border rounded min-w-full px-4 py-6 space-y-4 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-400/30'>
              <Paragraph>{author.name}</Paragraph>

              <Paragraph className=''>{`${author.bio}`}</Paragraph>

              <Paragraph className='text-right text-gray-100'>
                - {author.description}
              </Paragraph>

              {/* <Link href={author.link} className='p-1 border border-white'>
                <Paragraph>Wikipedia</Paragraph>
              </Link> */}
            </Link>
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
