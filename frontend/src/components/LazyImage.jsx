import React, { useState, useEffect, useRef } from 'react';

const LazyImage = ({ src, alt, className, ...props }) => {
  const [isIntersected, setIsIntersected] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    if (typeof window === 'undefined' || !window.IntersectionObserver) {
      setIsIntersected(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsIntersected(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '200px', // start loading when the image is within 200px of the viewport
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={imgRef}
      className={`w-full overflow-hidden transition-all duration-300 relative ${
        isLoaded ? 'bg-transparent' : 'bg-bw-dark min-h-[250px] flex items-center justify-center'
      }`}
    >
      {/* Premium Loader / Pulse Placeholder */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-bw-gray/10 animate-pulse">
          <div className="w-6 h-6 rounded-full border-2 border-bw-white/10 border-t-bw-white/30 animate-spin" />
        </div>
      )}

      {isIntersected && (
        <img
          src={src}
          alt={alt}
          onLoad={() => setIsLoaded(true)}
          className={`${className} transition-all duration-700 ease-out ${
            isLoaded ? '' : 'opacity-0 scale-95'
          }`}
          {...props}
        />
      )}
    </div>
  );
};

export default LazyImage;
