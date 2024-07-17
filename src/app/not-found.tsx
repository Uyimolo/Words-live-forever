import Paragraph from '@/components/text/Paragraph';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className='grid gap-4 place-content-center'>
      <Paragraph>Still under construction </Paragraph>

      <Link href='/'>
        <button className='p-2 text-white text-sm border rounded hover:text-blue-400 hover:border-blue-400 min-w-24 lg:text-white lg:min-w-28'>
          Go back to home page
        </button>
      </Link>
    </div>
  );
};

export default NotFound;
