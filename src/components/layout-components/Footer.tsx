import React from 'react'
import Paragraph from '../text/Paragraph';

const Footer = () => {
  return (
    <footer className='border-t border-gray-300/50 py-6 px-4 md:px-8 lg:px-12 bg-black'>
      <Paragraph className='text-gray-300'>© Words live forever</Paragraph>
    </footer>
  );
}

export default Footer
