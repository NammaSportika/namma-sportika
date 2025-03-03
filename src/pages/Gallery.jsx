import React, { useState, useEffect } from 'react';
import { cn } from "../lib/utils";

// Updated helper to use Statically's GitHub CDN format
const getStaticallyGithubUrl = (url) => {
  // Check if we're in development (localhost) or production
  const isLocalhost = typeof window !== 'undefined' && 
    (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
  
  // For local development, use the paths directly
  if (isLocalhost) {
    return url;
  }
  
  // Remove the leading slash from the image path
  const cleanPath = url.startsWith('/') ? url.substring(1) : url;
  
  // For production, use Statically's GitHub CDN
  const githubUser = 'NammaSportika';
  const githubRepo = 'namma-sportika';
  const githubBranch = 'main';
  
  // Add "public" prefix to the path since images are in the public folder
  const fullPath = `public/${cleanPath}`;
  
  return `https://cdn.statically.io/gh/${githubUser}/${githubRepo}/${githubBranch}/${fullPath}`;
};

// Marquee Component (unchanged)
const Marquee = ({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 sm:p-4 [--duration:40s] [--gap:1rem] gap-[var(--gap)]",
        vertical ? "flex-col" : "flex-row",
        className
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn(
              "flex shrink-0 justify-around gap-[var(--gap)]",
              vertical ? "animate-marquee-vertical flex-col" : "animate-marquee flex-row",
              pauseOnHover ? "group-hover:[animation-play-state:paused]" : "",
              reverse ? "[animation-direction:reverse]" : ""
            )}
            style={{
              animation: `${vertical ? 'marquee-vertical' : 'marquee'} var(--duration, 40s) linear infinite`,
              animationDirection: reverse ? 'reverse' : 'normal',
            }}
          >
            {children}
          </div>
        ))}
    </div>
  );
};

// CSS styles (unchanged)
const cssStyles = `
@keyframes marquee {
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-100% - var(--gap))); }
}
@keyframes marquee-vertical {
  0% { transform: translateY(0); }
  100% { transform: translateY(calc(-100% - var(--gap))); }
}
.animate-marquee {
  animation: marquee var(--duration, 40s) linear infinite;
  will-change: transform;
}
.animate-marquee-vertical {
  animation: marquee-vertical var(--duration, 40s) linear infinite;
  will-change: transform;
}
@keyframes image-scale {
  0% { transform: scale(1); }
  100% { transform: scale(1.1); }
}
@keyframes pulse {
  0% { opacity: 0.6; }
  50% { opacity: 1; }
  100% { opacity: 0.6; }
}
.skeleton-loading {
  animation: pulse 1.5s ease-in-out infinite;
  background: linear-gradient(90deg, #0a635a 25%, #0b7269 50%, #0a635a 75%);
  background-size: 200% 100%;
}
.fade-in {
  animation: fadeIn 0.3s ease-in forwards;
}
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
@media (max-width: 640px) {
  .mobile-image-container, .mobile-image {
    width: 200px !important;
    height: 143px !important;
  }
}
@media (min-width: 641px) and (max-width: 768px) {
  .mobile-image-container, .mobile-image {
    width: 280px !important;
    height: 200px !important;
  }
}
`;

// Optimized Image Card Component
const ImageCard = ({
  img,
  imgHeight = 250,
  imgWidth = 350,
  priority = false,
  lqip = null, // Low-quality image placeholder
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  // Use the updated GitHub Statically CDN helper
  const imageUrl = getStaticallyGithubUrl(img);
  const lqipUrl = lqip ? getStaticallyGithubUrl(lqip) : null;
  
  return (
    <figure className={cn("relative cursor-pointer overflow-hidden rounded-xl border p-2 sm:p-4 mx-2 bg-[#07534c] hover:bg-[#07534c] transition-all duration-300")}>
      <div className="flex flex-col items-center">
        <div 
          className="overflow-hidden rounded-lg relative mobile-image-container"
          style={{ width: `${imgWidth}px`, height: `${imgHeight}px` }}
        >
          {/* LQIP or Skeleton while loading */}
          {!isLoaded && !hasError && (
            lqip ? (
              <img 
                src={lqipUrl}
                alt="Preview"
                className="absolute inset-0 w-full h-full object-cover blur-sm scale-105 mobile-image"
                style={{ width: `${imgWidth}px`, height: `${imgHeight}px` }}
              />
            ) : (
              <div 
                className="absolute inset-0 skeleton-loading rounded-lg mobile-image"
                style={{ width: `${imgWidth}px`, height: `${imgHeight}px` }}
              ></div>
            )
          )}
          {/* Fallback for error */}
          {hasError && (
            <div 
              className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-lg text-gray-500 mobile-image"
              style={{ width: `${imgWidth}px`, height: `${imgHeight}px` }}
            >
              Image unavailable
            </div>
          )}
          {/* Actual Image */}
          <img 
            className={cn("rounded-lg object-cover transition-transform duration-500 hover:scale-110 mobile-image", isLoaded ? "fade-in" : "opacity-0")}
            width={imgWidth} 
            height={imgHeight} 
            alt="Gallery image" 
            src={imageUrl}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            loading={priority ? "eager" : "lazy"}
            decoding={priority ? "sync" : "async"}
            fetchpriority={priority ? "high" : "auto"}
            style={{ width: `${imgWidth}px`, height: `${imgHeight}px`, willChange: 'transform' }}
          />
        </div>
      </div>
    </figure>
  );
};

// Gallery Component with updated image preloading
const Gallery = ({ images = [] }) => {
  const [imagesPreloaded, setImagesPreloaded] = useState(false);
  
  useEffect(() => {
    const preloadCriticalImages = async () => {
      try {
        const firstBatchSize = 6;
        const criticalImages = [
          ...images.slice(0, Math.ceil(images.length / 3)).slice(0, firstBatchSize / 3),
          ...images.slice(Math.ceil(images.length / 3), Math.ceil(images.length / 3) * 2).slice(0, firstBatchSize / 3),
          ...images.slice(Math.ceil(images.length / 3) * 2).slice(0, firstBatchSize / 3)
        ];
        await Promise.all(criticalImages.map(img => {
          return new Promise((resolve, reject) => {
            const image = new Image();
            image.onload = () => resolve();
            image.onerror = reject;
            image.src = getStaticallyGithubUrl(img.image);
          });
        }));
        setImagesPreloaded(true);
      } catch (error) {
        console.error("Error preloading images:", error);
        setImagesPreloaded(true);
      }
    };
    
    preloadCriticalImages();
    
    if ('IntersectionObserver' in window) {
      const lazyImageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const lazyImage = entry.target;
            if (lazyImage.dataset.src) {
              lazyImage.src = lazyImage.dataset.src;
              lazyImage.removeAttribute('data-src');
              lazyImageObserver.unobserve(lazyImage);
            }
          }
        });
      });
      document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        lazyImageObserver.observe(img);
      });
      return () => {
        if (lazyImageObserver) lazyImageObserver.disconnect();
      };
    }
  }, [images]);
  
  const firstRow = images.slice(0, Math.ceil(images.length / 3));
  const secondRow = images.slice(Math.ceil(images.length / 3), Math.ceil(images.length / 3) * 2);
  const thirdRow = images.slice(Math.ceil(images.length / 3) * 2);
  
  const baseDuration = 30;
  const mobileDuration = 20;
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const durationBase = isMobile ? mobileDuration : baseDuration;
  const firstRowDuration = durationBase;
  const secondRowDuration = durationBase;
  const thirdRowDuration = durationBase * (thirdRow.length / Math.max(firstRow.length, 1));

  return (
    <section className="py-4 sm:py-8 relative overflow-hidden bg-[#F4E4CA] min-h-screen">
      <div className="w-full flex items-center justify-center my-4 sm:my-6 md:my-12">
        <div className="relative flex items-center w-full max-w-6xl px-4">
          <div className="flex-grow h-[2px] bg-gradient-to-r from-transparent to-[#004740]"></div>
          <h1 className="mx-2 sm:mx-4 md:mx-8 text-2xl sm:text-3xl md:text-4xl font-bold text-[#004740]">
            GALLERY
          </h1>
          <div className="flex-grow h-[2px] bg-gradient-to-r from-[#004740] to-transparent"></div>
        </div>
      </div>
      <style dangerouslySetInnerHTML={{ __html: cssStyles }} />
      <div className="container mx-auto px-2 sm:px-4 lg:px-8">
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden gap-2 sm:gap-4">
          <Marquee pauseOnHover className={`[--duration:${firstRowDuration}s]`}>
            {firstRow.map((image, index) => (
              <ImageCard 
                key={`row1-${index}`} 
                img={image.image} 
                imgHeight={250}
                imgWidth={350}
                priority={index < 2}
              />
            ))}
          </Marquee>
          <Marquee reverse pauseOnHover className={`[--duration:${secondRowDuration}s]`}>
            {secondRow.map((image, index) => (
              <ImageCard 
                key={`row2-${index}`} 
                img={image.image}
                imgHeight={250}
                imgWidth={350}
                priority={index < 2}
              />
            ))}
          </Marquee>
          <Marquee pauseOnHover className={`[--duration:${thirdRowDuration}s]`}>
            {thirdRow.map((image, index) => (
              <ImageCard 
                key={`row3-${index}`} 
                img={image.image}
                imgHeight={250}
                imgWidth={350}
                priority={index < 2}
              />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default function GalleryPage() {
  const galleryItems = [
    { image: "/imgs/GalleryImg/1.png" },
    { image: "/imgs/GalleryImg/2.png" },
    { image: "/imgs/GalleryImg/3.png" },
    { image: "/imgs/GalleryImg/4.png" },
    { image: "/imgs/GalleryImg/5.png" },
    { image: "/imgs/GalleryImg/6.png" },
    { image: "/imgs/GalleryImg/7.png" },
    { image: "/imgs/GalleryImg/8.png" },
    { image: "/imgs/GalleryImg/9.png" },
    { image: "/imgs/GalleryImg/10.png" },
    { image: "/imgs/GalleryImg/11.png" },
    { image: "/imgs/GalleryImg/12.png" },
    { image: "/imgs/GalleryImg/13.png" },
    { image: "/imgs/GalleryImg/14.png" },
    { image: "/imgs/GalleryImg/15.png" },
    { image: "/imgs/GalleryImg/16.png" },
    { image: "/imgs/GalleryImg/17.png" },
    { image: "/imgs/GalleryImg/18.png" },
    { image: "/imgs/GalleryImg/19.png" },
    { image: "/imgs/GalleryImg/20.png" },
    { image: "/imgs/GalleryImg/21.png" },
    { image: "/imgs/GalleryImg/22.png" },
    { image: "/imgs/GalleryImg/23.png" },
    { image: "/imgs/GalleryImg/24.png" },
    { image: "/imgs/GalleryImg/25.png" },
    { image: "/imgs/GalleryImg/26.png" },
    { image: "/imgs/GalleryImg/27.png" }
  ];

  return (
    <Gallery images={galleryItems} />
  );
}