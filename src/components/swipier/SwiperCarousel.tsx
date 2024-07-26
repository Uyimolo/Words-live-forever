// 'use client';
// import { useRef, useEffect } from 'react';
// import { Quote } from '@/types/type';
// import dynamic from 'next/dynamic';
// import QuoteLink from '../quotes/QuoteLink';
// import 'swiper/swiper-bundle.css'; // Ensure you import the Swiper CSS

// // Dynamically import Swiper components to ensure SSR compatibility
// const Swiper = dynamic(() => import('swiper/react').then((mod) => mod.Swiper), {
//   ssr: false,
// });
// const SwiperSlide = dynamic(
//   () => import('swiper/react').then((mod) => mod.SwiperSlide),
//   { ssr: false }
// );

// const SwiperCarousel = ({ quotes }: { quotes: Quote[] }) => {
//   const swiperRef = useRef(null);

//   useEffect(() => {
//     if (swiperRef.current) {
//       const swiperContainer = swiperRef.current;

//       const params = {
//         navigation: true,
//         breakpoints: {
//           0: {
//             slidesPerView: 2.4,
//             spaceBetween: 10,
//           },
//           768: {
//             slidesPerView: 4.4,
//             spaceBetween: 10,
//           },
//           1024: {
//             slidesPerView: 5.4,
//             spaceBetween: 10,
//           },
//         },
//         injectStyles: [
//           `
//             .swiper-button-next,
//             .swiper-button-prev {
//               background-color: white;
//               border-radius: 50%;
//               border: none;
//               color: #171717;
//               width: 1rem;
//               height: 1rem;
//               padding: .5rem;
//             }
//           `,
//         ],
//       };

//       Object.assign(swiperContainer, params);
//       // swiperContainer.initialize();
//     }
//   }, []);

//   return (
//     <div className='text-white'>
//       <Swiper ref={swiperRef}>
//         {quotes.map((quote) => (
//           <SwiperSlide key={quote._id}>
//             <QuoteLink quote={quote} />
//           </SwiperSlide>
//         ))}
//       </Swiper>
//     </div>
//   );
// };

// export default SwiperCarousel;
