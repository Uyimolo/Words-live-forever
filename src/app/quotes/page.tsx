import Paragraph from '@/components/text/Paragraph';
import { Quote } from '@/types/type';

const fetchQuotes = async () => {
  try {
    const response = await fetch('https://api.quotable.io/quotes?page=1');
    if (response.ok) {
      const data = await response.json();
      return data.results;
    }
  } catch (error) {
    console.error(error);
    return 'Failed to fetch quotes';
  }
};

const Quotes = async () => {
  const quotes = await fetchQuotes();
  return (
    <div className='w-full'>
      <div className='grid gap-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
        {quotes.map((quote: Quote) => (
          <div
            key={quote._id}
            className='border rounded min-w-full px-4 py-6 space-y-4 hover:bg-white/20'>
            <Paragraph className=''>{`${quote.content}`}</Paragraph>
            <Paragraph className='text-right text-gray-100'>
              - {quote.author}
            </Paragraph>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Quotes;
