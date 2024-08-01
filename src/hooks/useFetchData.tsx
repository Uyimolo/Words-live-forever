'use client';
import { useEffect, useState } from 'react';

const useFetchData = (url: string) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) {
          setError(`HTTP error! status: ${response.status}`);
          return;
        }
        const data =  await response.json();
        setData(data);
      } catch {
        setError('Network error!');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [url]);

  return { data, isLoading, error };
};

export default useFetchData;
