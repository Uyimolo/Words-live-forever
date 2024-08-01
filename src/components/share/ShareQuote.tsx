'use client';
import { FaShare } from 'react-icons/fa';

const ShareQuote = ({ author, _id }: { author: string; _id: string }) => {
  const handleShareQuote = async () => {
    try {
      await navigator.share({
        title: 'Words Live Forever',
        text: `Check out this quote by ${author}`,
        url: `https://words-live-forever.vercel.app/quotes/${_id}`,
      });
      console.log('Quote shared successfully!');
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

export default ShareQuote;
