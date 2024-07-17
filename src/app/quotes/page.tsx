import QuotesList from '@/components/quotes/QuotesList';
// rendered on the server to increase page load by fetching the first quote page on the server, subsequent queries will happen on the quotelist componsnt (client side)
const fetchQuotes = async () => {
  try {
    const response = await fetch(
      'https://api.quotable.io/quotes?page=1?sortBy=content'
    );
    if (response.ok) {
      const data = await response.json();
      return data
    }
  } catch (error) {
    console.error(error);
    return 'Failed to fetch quotes';
  }
};

const Quotes = async () => {
  const quotesData = await fetchQuotes();
  return (
      <QuotesList quotesData={quotesData} />
  );
};

export default Quotes;
