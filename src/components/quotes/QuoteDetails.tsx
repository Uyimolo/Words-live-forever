import { Quote } from "@/types/type"
import Paragraph from "../text/Paragraph";


const QuoteDetails = ({ quote }: { quote: Quote }) => {
    
 const { author, content } = quote;

 return (
   <div className='w-full grid min-h-full items-center'>
     <div className='max-w-xl lg:max-w-3xl'>
       <div className='space-y-4'>
         <h2 className='text-blue-400 text-xl'>
           {author ? author : 'Words Live Forever Team.'}
         </h2>

         <h1 className='text-white text-4xl font-semibold relative'>
           <span className='text-5xl'>{`"`}</span>
           {content ? content : 'Getting your favourites quotes in a bit'}{' '}
           <span className='text-5xl absolute -bottom-8'>{`"`}</span>
         </h1>

         <Paragraph className='text-white'>See more quotes by author</Paragraph>
       </div>
       {/* ))} */}
     </div>
   </div>
 );
}

export default QuoteDetails
