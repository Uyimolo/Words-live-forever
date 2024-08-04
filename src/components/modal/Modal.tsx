import { cn } from '@/utilities/cn';
import { ReactNode } from 'react';

const Modal = ({
  children,
  className,
  showModal,
  showModalFunc,
}: {
  children: ReactNode;
  className?: string;
  showModal: boolean;
  showModalFunc: (showModal: boolean) => void;
}) => {
  return (
    <div
      className={cn(
        'place-content-center w-full h-[100vh] fixed top-0 left-0 bg-white/30 backdrop-blur-sm z-10',
        className,
        showModal ? 'grid' : 'hidden'
      )}
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          showModalFunc(false);
        }
      }}>
      <div className='w-fit rounded-xl bg-white' onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
