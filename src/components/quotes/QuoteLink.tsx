import { MouseEventHandler } from 'react';
import Link from 'next/link';
import { FaEye } from 'react-icons/fa';
import Paragraph from '../text/Paragraph';
import { Quote } from '@/types/type';
import CopyToClipBoard from '../CopyToClipBoard/CopyToClipBoard';
import AddToFavorites from '../like-favourite/AddToFavorites';
import Share from '../share/Share';

const QuoteLink = ({
  quote,
  onClick,
}: {
  quote: Quote;
  onClick?: MouseEventHandler<HTMLDivElement>;
}) => {
  const { _id, content, author, tags } = quote;

  return (
    <div
      onClick={onClick}
      className='flex flex-col justify-between border rounded min-w-full px-4 py-4 space-y-4 hover:border-blue-400 hover:shadow-2xl focus:shadow-2xl focus:shadow-blue-400/30 hover:shadow-blue-400/30 focus:border-blue-400 focus:outline-blue-400'>
      <div className='space-y-4'>
        <Paragraph className='text-blue-400'>{tags.join(' | ')}</Paragraph>
        <Paragraph className='self-start'>{`"${content}"`}</Paragraph>
      </div>

      <Paragraph className='text-right text-gray-100 w-fit border-b border-neutral-600 pb-1 self-end justify-self-end'>
        - {author}
      </Paragraph>

      {/* share, add to collection etc (template) */}
      <div className='flex gap-4'>
        <Share quote={quote} variant='quote' />

        <CopyToClipBoard text={`"${content}" -${author}`} />

        <Link href={`/quotes/${_id}`}>
          <FaEye className='text-white text-xl hover:text-blue-400' />
        </Link>

        <AddToFavorites />
      </div>
    </div>
  );
};

export default QuoteLink;

`"'All conditioned things are impermanent' — when one sees this with wisdom, one turns away from suffering." -The Buddha`;
