import { cn } from '@/utilities/cn';
import { ReactNode } from 'react';

/**
 * Modal component to display content in an overlay dialog.
 *
 * Props:
 * - children: (ReactNode) Content to be displayed inside the modal (texts, other components, etc.).
 * - className: (string, optional) Additional Tailwind or CSS classes to apply to the modal.
 * - showModal: (boolean) Boolean value to determine if the modal should be visible.
 * - showModalFunc: (function) Function to toggle the visibility of the modal.
 *
 * Features:
 * - Displays a modal overlay with a backdrop that dims the background.
 * - Closes the modal when the backdrop is clicked.
 * - Prevents closing the modal when clicking inside the modal content area.
 */
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
        'place-content-center w-full h-[100vh] fixed top-0 left-0 bg-black/70 backdrop-blur-sm z-10',
        className,
        showModal ? 'grid' : 'hidden'
      )}
      // Close the modal if the backdrop is clicked
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          showModalFunc(false);
        }
      }}>
      <div
        className='w-fit h-fit'
        // prevent closing the modal when modal content is clicked
        onClick={(event) => event.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
