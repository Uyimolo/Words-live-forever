import Paragraph from '../text/Paragraph';
import Divider from '../divider/Divider';

const ViewQuote = ({
  author,
  content,
  tags,
}: {
  author: string;
  content: string;
  tags: string[];
}) => {
  return (
    <div className='max-w-xl lg:max-w-3xl'>
      <div className=''>
        <h2 className='text-blue-400 text-xl'>
          {author ? author : 'Words Live Forever Team.'}
        </h2>

        <Divider className='mb-8 mt-4' />

        <h1 className='text-gray-300 text-2xl font-semibold relative md:text-3xl lg:text-4xl'>
          <span className='text-4xl md:text-5xl'>{`"`}</span>
          {content ? content : 'Getting your favourites quotes in a bit'}{' '}
          <span className='text-3xl -bottom-6 md:text-5xl absolute md:-bottom-8'>{`"`}</span>
        </h1>

        <Divider className='mt-8 mb-4' />

        {tags && <Paragraph>Tags: {tags.join(' | ')}</Paragraph>}
      </div>
    </div>
  );
};

export default ViewQuote;
