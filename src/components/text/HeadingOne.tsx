import { cn } from '@/utilities/cn';
import { ReactNode } from 'react';

const HeadingOne = ({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) => {
  return (
    <h1
      className={cn(
        'text-blue-400 text-lg font-semibold md:text-xl lg:text-2xl',
        className
      )}>
      {children}
    </h1>
  );
};

export default HeadingOne;
