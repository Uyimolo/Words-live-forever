import { Author } from '@/types/type';

const ViewAuthor = ({ author }: { author: Author }) => {
  const { name, bio } = author;
  return (
    <div className='max-w-xl space-y-4 lg:max-w-3xl'>
      <h2 className='text-blue-400 text-xl'>
        {name ? name : 'Words Live Forever Team.'}
      </h2>

      <h1 className='text-white text-xl font-semibold relative lg:text-2xl xl:text-3xl '>
        {bio ? bio : 'Getting authors details in a bit'}
      </h1>
    </div>
  );
};

export default ViewAuthor;
