'use client';
import Paragraph from '@/components/text/Paragraph';

const Error = () => {
  return (
    <div className='grid place-content-center h-[40vh]'>
      <Paragraph className='mx-auto'>Something went wrong</Paragraph>
      <Paragraph>
        Please check your internet connection and reload the page
      </Paragraph>
    </div>
  );
};

export default Error;
