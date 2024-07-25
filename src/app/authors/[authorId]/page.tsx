import AuthorDetails from '@/components/authors/AuthorDetails';
import React from 'react';

const Author = async ({ params }: { params: { authorId: string } }) => {
  const response = await fetch(
    `https://api.quotable.io/authors/${params.authorId}`
  );

  const author = await response.json();

  return <AuthorDetails author={author} />;
};

export default Author;
