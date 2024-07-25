import { Author } from '@/types/type';
import React from 'react';
import Paragraph from '../text/Paragraph';

const AuthorDetails = ({ author }: { author: Author }) => {
  const { name, bio } = author;
  return (
    <div className='w-full grid min-h-full items-center'>
      <div className='max-w-xl lg:max-w-3xl'>
        <div className='space-y-4'>
          <h2 className='text-blue-400 text-xl'>
            {name ? name : 'Words Live Forever Team.'}
          </h2>

          <h1 className='text-white text-base font-semibold relative lg:text-base'>
            {bio ? bio : 'Getting authors details in a bit'}
          </h1>

          <Paragraph className='text-white'>
            See more quotes by author
          </Paragraph>
        </div>
      </div>
    </div>
  );
};

export default AuthorDetails;
