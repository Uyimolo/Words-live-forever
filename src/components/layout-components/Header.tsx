'use client';
import { cn } from '@/utilities/cn';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import logo from '@/assets/logo.png';
import Search from '../search/Search';
import { Quote } from '@/types/type';
import { useEffect, useState } from 'react';
import SearchResults from '../search/SearchResults';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Quotes', href: '/quotes' },
  { label: 'Authors', href: '/authors' },
];

export default function Header() {
  const [results, setResults] = useState<Quote[] | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const pathName = usePathname();

  useEffect(() => {
    if (results && results?.length >= 1) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [results, searchTerm]);

  return (
    <header className='relative flex justify-between py-2 items-center px-4 md:gap-10 md:px-8 lg:px-12'>
      <Image
        src={logo}
        alt='Words live forever'
        width={60}
        height={60}
        className='w-16 lg:w-24'
      />

      <Search
        results={results}
        setResults={setResults}
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
      />

      <nav className='flex  gap-4 lg:gap-4 '>
        {navItems.map((item, index) => (
          <Link
            key={index}
            className={cn(
              ' text-sm text-neutral-500 lg:text-base hover:text-neutral-300',
              pathName === item.href ? 'text-neutral-100' : ''
            )}
            href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      {results && (
        <SearchResults
          setSearchTerm={setSearchTerm}
          setResults={setResults}
          results={results}
          searchTerm={searchTerm}
        />
      )}
    </header>
  );
}
