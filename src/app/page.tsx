import QuoteDetails from '@/components/quotes/QuoteDetails';

const fetchRandomQuotes = async () => {
  const response = await fetch('https://api.quotable.io/quotes/random', {
    cache: 'no-store',
  });

  const data = await response.json();
  return data[0];
};

export default async function Home() {
  const quote = await fetchRandomQuotes();

  return <QuoteDetails quote={quote} />;
}
