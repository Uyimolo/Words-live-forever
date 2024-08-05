import { cn } from '@/utilities/cn';

const Divider = ({ className }: { className?: string }) => {
  return <div className={cn('h-[1px] w-full bg-neutral-600', className)}></div>;
};

export default Divider;
