import QuoteDetails from '@/components/quotes/QuoteDetails';

const SingleQuote = async ({ params }: { params: { quoteId: string } }) => {
  const response = await fetch(`https://api.quotable.io/quotes/${params.quoteId}`);

  const quote = await response.json();

  return <QuoteDetails quote={quote} />;
};

export default SingleQuote;
