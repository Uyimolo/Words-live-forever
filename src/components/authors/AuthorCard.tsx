import Link from 'next/link';
import Paragraph from '../text/Paragraph';
import { Author } from '@/types/type';
import CopyToClipBoard from '../CopyToClipBoard/CopyToClipBoard';
import Share from '../share/Share';
import { FaEye } from 'react-icons/fa';
import AddToFavorites from '../like-favourite/AddToFavorites';

const AuthorCard = ({ author }: { author: Author }) => {
  const { name, slug, description, bio } = author;
  return (
    <div
      className='flex flex-col justify-between border rounded min-w-full p-4 space-y-4 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-400/30'>
      <div className='space-y-4'>
        <Paragraph className='text-blue-400'>{name}</Paragraph>

        <Paragraph className=''>{`${bio}`}</Paragraph>
      </div>

      <div className='space-y-4'>
        <Paragraph className='text-right text-gray-100'>
          - {description}
        </Paragraph>

        <div className='flex gap-4'>
          <Share author={author} variant='quote' />

          <CopyToClipBoard text={`"${bio}" -${name}`} />

          <Link href={`/authors/${slug}`}>
            <FaEye className='text-white text-xl hover:text-blue-400' />
          </Link>

          <AddToFavorites />
        </div>
      </div>
    </div>
  );
};

export default AuthorCard;
