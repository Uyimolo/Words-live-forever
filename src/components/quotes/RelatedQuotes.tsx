import { Quote } from '@/types/type';
import Paragraph from '../text/Paragraph';
import QuoteLink from './QuoteLink';

const RelatedQuotes = async ({ tags }: { tags: string[] }) => {
  const response = await fetch(
    `https://api.quotable.io/quotes/random?tags=${tags.join('|')}&limit=10`
  );
  const relatedQuotes = await response.json();
  return (
    <div className='space-y-4'>
      <Paragraph className='text-white'>
        More on <span className='text-blue-400'>{tags?.join(' | ')}</span>
      </Paragraph>

      <div className='grid gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {relatedQuotes?.map((quote: Quote) => (
          <QuoteLink key={quote._id} quote={quote} />
        ))}
      </div>
    </div>
  );
};

export default RelatedQuotes;
