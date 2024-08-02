import { Quote } from '@/types/type';
import Paragraph from '../text/Paragraph';
import QuoteLink from './QuoteLink';
import { cn } from '@/utilities/cn';

// Note: pass only tags or name, never both

const RelatedQuotes = async ({
  tags,
  name,
}: {
  tags?: string[];
  name?: string;
}) => {
  let relatedQuotes;

  if (!name) {
    const response = await fetch(
      `https://api.quotable.io/quotes/random?tags=${tags?.join('|')}&limit=10`
    );
    relatedQuotes = await response.json();
  } else {
    const response = await fetch(
      `https://api.quotable.io/quotes/random?author=${name}&limit=10`
    );
    relatedQuotes = await response.json();
  }

  return (
    <div className={cn('space-y-4', !relatedQuotes && 'hidden')}>
      {name ? (
        <Paragraph className='text-white'>More quotes by author</Paragraph>
      ) : (
        <Paragraph className='text-white'>
          More on <span className='text-blue-400'>{tags?.join(' | ')}</span>
        </Paragraph>
      )}

      <div className='grid gap-6 md:grid-cols-2 md:gap-10 lg:grid-cols-3'>
        {relatedQuotes?.map((quote: Quote) => (
          <QuoteLink key={quote._id} quote={quote} />
        ))}
      </div>
    </div>
  );
};

export default RelatedQuotes;
