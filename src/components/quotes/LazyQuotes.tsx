const LazyQuotes = () => {
  return (
    <>
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((lazyQuote) => (
        <div
          key={lazyQuote}
          className='w-full flex justify-between flex-col aspect-[2/1] border border-gray-400/30 bg-white/10 rounded px-4 py-6 space-y-4 min-w-full animate-lazy'>
          <div className='space-y-4'>
            <div className='h-6 w-full bg-gray-500/50'></div>

            <div className='h-6 w-10/12 bg-gray-500/50'></div>

            <div className='h-6 w-10/12 bg-gray-500/50'></div>
          </div>

          <div className='h-3 w-1/2 bg-gray-500/50 self-end'></div>

          <div className='flex gap-4'>
            {[1, 2, 3, 4].map((num: number) => (
              <div
                className='aspect-square rounded-full bg-gray-500/50 w-6'
                key={num}></div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
};

export default LazyQuotes;
