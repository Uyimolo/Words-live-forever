'use client';
import { Quote } from '@/types/type';
import Paragraph from '../text/Paragraph';
// import SwiperCarousel from '../swipier/SwiperCarousel';
import { useEffect, useState } from 'react';
import QuoteLink from './QuoteLink';
import LazyQuotes from './LazyQuotes';

const QuoteDetails = ({ quote }: { quote: Quote }) => {
  const [relatedQuotes, setRelatedQuotes] = useState<Quote[] | []>([]);
  const { author, content, tags } = quote;
  console.log(tags);
  const fetchRelatedQuotes = async () => {
    try {
      const response = await fetch(
        `https://api.quotable.io/quotes?tags=${tags.join('|')}&sortBy=content`
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setRelatedQuotes(
          data.results.filter(
            (relatedQuote: Quote) => relatedQuote._id !== quote._id
          )
        );
      } else {
        console.error('Failed to fetch related quotes');
        setRelatedQuotes([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchRelatedQuotes();
  }, []);

  return (
    <div className='w-full grid min-h-full items-center gap-12'>
      {/* Original quote */}
      <div className='max-w-xl lg:max-w-3xl'>
        <div className='space-y-4'>
          <h2 className='text-blue-400 text-xl'>
            {author ? author : 'Words Live Forever Team.'}
          </h2>

          <h1 className='text-white text-4xl font-semibold relative'>
            <span className='text-5xl'>{`"`}</span>
            {content ? content : 'Getting your favourites quotes in a bit'}{' '}
            <span className='text-5xl absolute -bottom-8'>{`"`}</span>
          </h1>

          <Paragraph>Tags: {tags.join(' | ')}</Paragraph>
        </div>

        {/*  */}
      </div>

     {relatedQuotes.length > 0 && <div className='space-y-4'>
        <Paragraph className='text-white'>
          More quotes on{' '}
          <span className='text-blue-400'>{tags.join(' | ')}</span>
        </Paragraph>

        <div className='grid gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
          {relatedQuotes.length ? (
            relatedQuotes.map((quote) => <QuoteLink key={quote._id} quote={quote} />)
          ) : (
            <LazyQuotes />
          )}
        </div>
      </div>}
    </div>
  );
};

export default QuoteDetails;
