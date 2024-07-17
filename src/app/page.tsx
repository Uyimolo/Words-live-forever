import QuoteDetails from '@/components/quotes/QuoteDetails';

const fetchRandomQuotes = async () => {
  try {
    const response = await fetch('https://api.quotable.io/quotes/random');
    if (response.ok) {
      const data = await response.json();
      return data;
    }
  } catch (error) {
    console.error(error);
    return 'Failed to fetch a quote';
  }
};
export default async function Home() {
  const quote = await fetchRandomQuotes();

  return <QuoteDetails quote={quote[0]} />;
}
