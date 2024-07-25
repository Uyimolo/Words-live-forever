'use client';
import { cn } from '@/utilities/cn';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import logo from "@/assets/logo.png"

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Quotes', href: '/quotes' },
  { label: 'Authors', href: '/authors' },
];

export default function Header() {
  const pathName = usePathname();

  return (
    <header className='flex justify-between py-6 items-center px-4 md:px-8 lg:px-12'>

      <Image src={logo} alt='Words live forever' width={60} height={60} className='w-16 lg:w-24' />

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
    </header>
  );
}
