'use client';
import { Author, Quote } from '@/types/type';
import { FaShare } from 'react-icons/fa';

const Share = ({
  quote,
  author,
  variant,
}: {
  quote?: Quote;
  author?: Author;
  variant: 'quote' | 'author';
}) => {
  const handleShareQuote = async () => {
    try {
      if ((variant = 'quote'))
        await navigator.share({
          title: 'Words Live Forever',
          text: `Check out this quote by ${quote?.author}`,
          url: `https://words-live-forever.vercel.app/quotes/${quote?._id}`,
        });
      else if ((variant = 'author')) {
        await navigator.share({
          title: 'Words Live Forever',
          text: `See all about ${author?.name}`,
          url: `https://words-live-forever.vercel.app/authors/${author?._id}`,
        });
      }

      console.log('Shared successfully!');
    } catch (error) {
      console.error('Error sharing quote:', error);
    }
  };

  return (
    <>
      <FaShare
        className='text-xl text-white cursor-pointer hover:text-blue-400'
        title='Share Quote'
        onClick={handleShareQuote}
      />
    </>
  );
};

export default Share;
