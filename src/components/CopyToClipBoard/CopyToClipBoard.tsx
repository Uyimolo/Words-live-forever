'use client';
import { BsCopy } from 'react-icons/bs';
import { toast } from 'react-toastify';

const CopyToClipBoard = ({ text }: { text: string }) => {
  const handleCopyToClipBoard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Quote copied to clipboard!');
    } catch (err) {
      console.error('Error copying text to clipboard:', err);
        toast.error('Failed to copy Quote to clipboard. Please try again.');
    }
  };

  return (
    <BsCopy
      title='Copy to clipboard'
      onClick={handleCopyToClipBoard}
      className='text-white text-xl hover:text-blue-400'
    />
  );
};

export default CopyToClipBoard;
