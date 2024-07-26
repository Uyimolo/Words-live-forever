import Link from "next/link";
import Paragraph from "../text/Paragraph";
import { Quote } from "@/types/type";
import { MouseEventHandler } from "react";

const QuoteLink = ({
  quote,
  onClick,
}: {
  quote: Quote;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) => {
  return (
    <Link
      href={`/quotes/${quote._id}`}
      key={quote._id}
      onClick={onClick}
      className='border rounded min-w-full px-4 py-6 space-y-4 hover:border-blue-400 hover:shadow-2xl hover:shadow-blue-400/30'>
      <Paragraph className=''>{`${quote.content}`}</Paragraph>

      <Paragraph className='text-right text-gray-100'>
        - {quote.author}
      </Paragraph>
    </Link>
  );
};

export default QuoteLink
