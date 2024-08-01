'use client';
import logo from '@/assets/logo.png';
import Image from 'next/image';

const Loading = () => {
  return (
    <div className='h-[80vh] text-white w-full grid place-content-center'>
      <div>
        <Image src={logo} alt='loading' width={100} className='animate-lazy' />
      </div>
    </div>
  );
};

export default Loading;
