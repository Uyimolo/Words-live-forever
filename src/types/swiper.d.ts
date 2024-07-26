declare global {
  namespace JSX {
    interface IntrinsicElements {
      'swiper-container': React.HTMLAttributes<HTMLDivElement>;
      'swiper-slide': React.HTMLAttributes<HTMLDivElement>;
    }
  }
}

export {};
