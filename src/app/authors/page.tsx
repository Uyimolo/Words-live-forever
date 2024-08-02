import AuthorsList from '@/components/authors/AuthorsList';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Authors - Words Live Forever',
  description: 'Bringing important, life shaping words to you ',
  keywords: ['quotes', 'inspirational quotes'],
  robots: 'index, follow',
};

const page = async () => {
  return <AuthorsList />;
};

export default page;
