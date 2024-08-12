'use client';
import Image from 'next/image';
import logo from '@/assets/logo.png';
import SearchInput from '../search/SearchInput';
import { useState } from 'react';
import SearchResults from '../search/SearchResults';
import NavigationMenu from './NavigationMenu';

/*
 * Header component that includes a navigation menu, a search input and search results

 * States:
 * - SearchTerm : (string) value of the search input
 * - isSearching : (boolean) true if search is in progress
 *
 * Features:
 * - Provides navigation links for different pages.
 * - Integrates a search input that triggers search results.
 */

export default function Header() {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isSearching, setIsSearching] = useState<boolean>(false);

  return (
    <header className='relative flex justify-between py-2 items-center px-4 md:gap-10 md:px-8 lg:px-12'>
      {/* Logo */}
      <Image
        src={logo}
        alt='Words live forever'
        width={60}
        height={60}
        className='w-16 lg:w-24'
      />

      <SearchInput
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        isSearching={isSearching}
      />

      <NavigationMenu />

      <SearchResults
        setSearchTerm={setSearchTerm}
        searchTerm={searchTerm}
        setIsSearching={setIsSearching}
      />
    </header>
  );
}
