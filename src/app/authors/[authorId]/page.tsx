import AuthorDetails from '@/components/authors/AuthorDetails';
import React from 'react';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { authorId: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  
  const id = params.authorId;

  const author = await fetch(
    `https://api.quotable.io/authors/${params.authorId}`
  ).then((res) => res.json());

  return {
    title: author.name + ' -Words Live Forever',
    description: author.description,
    keywords: ['quotes', 'author'],
    robots: 'index, follow',
  };
}

const Author = async ({ params }: { params: { authorId: string } }) => {
  const response = await fetch(
    `https://api.quotable.io/authors/${params.authorId}`
  );

  const author = await response.json();

  return <AuthorDetails author={author} />;
};

export default Author;
