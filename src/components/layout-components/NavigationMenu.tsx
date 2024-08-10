import { cn } from "@/utilities/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";

// navigation links
const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Quotes', href: '/quotes' },
  { label: 'Authors', href: '/authors' },
];

const NavigationMenu = () => {
  const pathName = usePathname();

  return (
    <nav className='flex  gap-4 lg:gap-4 '>
      {navItems.map((item, index) => (
        <Link
          key={index}
          className={cn(
            ' text-sm text-neutral-500 lg:text-base hover:text-neutral-300',
            pathName === item.href ? 'text-neutral-100' : ''
          )}
          href={item.href}
          aria-current={pathName === item.href ? 'page' : undefined}>
          {item.label}
        </Link>
      ))}
    </nav>
  );
};

export default NavigationMenu;
