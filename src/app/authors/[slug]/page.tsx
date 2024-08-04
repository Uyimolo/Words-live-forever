import AuthorDetails from '@/components/authors/AuthorDetails';
import React from 'react';
import { Metadata, ResolvingMetadata } from 'next';

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const slug = params.slug;

  const author = await fetch(
    `https://api.quotable.io/authors?slug=${slug}`
  ).then((res) => res.json());

  return {
    title: author.results[0].name + ' -Words Live Forever',
    description: author.results[0].description,
    keywords: ['quotes', 'author'],
    robots: 'index, follow',
  };
}

const Author = async ({ params }: { params: { slug: string } }) => {
  const response = await fetch(
    `https://api.quotable.io/authors?slug=${params.slug}`
  );

  const data = await response.json();
  const author = data.results[0];

  return <AuthorDetails author={author} />;
};

export default Author;
