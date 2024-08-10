import { Quote } from '@/types/type';
import Paragraph from '../text/Paragraph';
import QuoteLink from './QuoteCard';
import { cn } from '@/utilities/cn';

type RelatedQuotesProps = {
  tags?: string[];
  authorName?: string;
};

/*
 * This component displays related quotes based on the provided tags or authorName.
 *
 * Props:
 * - tags (optional): An array of tags to fetch quotes related to these tags.
 * - authorName (optional): The name of the author to fetch quotes from.
 *
 * Note:
 * - Only one prop should be provided. If both are provided, authorName takes precedence.
 * - Fetches related quotes and displays them in a grid layout.
 */

const RelatedQuotes = async ({ tags, authorName }: RelatedQuotesProps) => {
  // Validate that only one of the props is passed
  if ((tags && authorName) || (!tags && !authorName)) {
    throw new Error('Only one of `tags` or `authorName` should be provided.');
  }

  // construct URL for fetching related quotes
  const buildUrl = (limit: number) => {
    const limitParam = `&limit=${limit}`;
    const queryParam = authorName
      ? `?author=${encodeURIComponent(authorName)}`
      : tags && `?tags=${encodeURIComponent(tags.join('|'))}`;

    return `https://api.quotable.io/quotes/random${queryParam}${limitParam}`;
  };

  // fetch related quotes
  const response = await fetch(buildUrl(10));

  // return a feedback message if fetch was not successful
  if (!response.ok) {
    return (
      <Paragraph className='text-white'>
        Could not fetch related quotes
      </Paragraph>
    );
  }

  const relatedQuotes = await response.json();

  // Return a feedback message if no quotes are found
  if (!Array.isArray(relatedQuotes) || relatedQuotes.length === 0) {
    return (
      <Paragraph className='text-white'>No related quotes found</Paragraph>
    );
  }

  return (
    <div className={cn('space-y-4', !relatedQuotes && 'hidden')}>
      {/*Displays a message indicating the context of the quotes (author or tags) */}
      {authorName ? (
        <Paragraph className='text-white'>More quotes by author</Paragraph>
      ) : (
        <Paragraph className='text-white'>
          More on <span className='text-blue-400'>{tags?.join(' | ')}</span>
        </Paragraph>
      )}
      {/* Maps over the fetched quotes to display them in a grid layout */}
      <div className='grid gap-6 md:grid-cols-2 md:gap-10 lg:grid-cols-3'>
        {relatedQuotes?.map((quote: Quote) => (
          <QuoteLink key={quote._id} quote={quote} />
        ))}
      </div>
    </div>
  );
};

export default RelatedQuotes;
