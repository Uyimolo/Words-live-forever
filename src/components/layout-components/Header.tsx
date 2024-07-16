'use client';
import { cn } from '@/utilities/cn';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Quotes', href: '/quotes' },
  { label: 'Authors', href: '/authors' },
  // Add more navigation items as needed...
];

export default function Header() {
  const pathName = usePathname();

  return (
    <header className='flex justify-between py-6 items-center px-4 md:px-8 lg:px-12'>
      <div className=''>
        <p className='text-orange-400 text-3xl font-bold lg:text-5xl'>WLFeva</p>
      </div>

      <nav className='flex  gap-2 lg:gap-4 '>
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
    </header>
  );
}
