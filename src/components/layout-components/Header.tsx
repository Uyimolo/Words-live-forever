'use client';
import { cn } from '@/utilities/cn';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import logo from '@/assets/logo.png';
import Search from '../search/Search';
import { Quote } from '@/types/type';
import { useState } from 'react';
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
              ' text-sm text-white lg:text-base ',
              pathName === item.href ? 'text-blue-400' : ''
            )}
            href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      {results && (
        <SearchResults
          setSearchTerm={setSearchTerm}
          results={results}
          searchTerm={searchTerm}
        />
      )}
    </header>
  );
}
