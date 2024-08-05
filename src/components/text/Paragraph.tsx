import { cn } from '@/utilities/cn';
import React from 'react';

interface ParagraphProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

const Paragraph: React.FC<ParagraphProps> = ({
  children,
  className,
  onClick,
}) => {
  return (
    <p
      onClick={onClick}
      className={cn('text-sm text-neutral-300 lg:text-base', className)}>
      {children}
    </p>
  );
};

export default Paragraph;
