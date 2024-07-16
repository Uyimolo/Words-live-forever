import Paragraph from '@/components/text/Paragraph';
import { Quote } from '@/types/type';
import { Metadata } from 'next';

export const metadate: Metadata = {
  title: 'Words Live Forever',
  description: 'Bringing words to you ',
  keywords: ['quotes'],
  robots: 'index, follow',
};

const fetchRandomQuotes = async () => {
  try {
    const response = await fetch('https://api.quotable.io/quotes/random');
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
    return 'Failed to fetch a quote';
  }
};
export default async function Home() {
  const quote = await fetchRandomQuotes();

  const { author, tags, content } = quote[0];

  return (
    <div className='w-full grid min-h-full items-center'>
      <div className='max-w-xl lg:max-w-3xl'>
        <div className='space-y-4'>
          <h2 className='text-blue-400 text-xl'>{author ? author : "Words Live Forever Team."}</h2>

          <h1 className='text-white text-4xl font-semibold relative'>
            <span className='text-5xl'>{`"`}</span>
            {content ? content : 'Getting your favourites quotes in a bit'}{' '}
            <span className='text-5xl absolute -bottom-8'>{`"`}</span>
          </h1>

        

          <Paragraph className='text-white'>See more posts by author</Paragraph>
        </div>
        {/* ))} */}
      </div>
    </div>
  );
}
