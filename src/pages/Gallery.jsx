import React, { useState } from 'react';
import { cn } from "../lib/utils";

// Marquee Component
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

// CSS styles for marquee animations and loading skeleton
const cssStyles = `
@keyframes marquee {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-100% - var(--gap)));
  }
}

@keyframes marquee-vertical {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(calc(-100% - var(--gap)));
  }
}

.animate-marquee {
  animation: marquee var(--duration, 40s) linear infinite;
}

.animate-marquee-vertical {
  animation: marquee-vertical var(--duration, 40s) linear infinite;
}

@keyframes image-scale {
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(1.1);
  }
}

@keyframes pulse {
  0% {
    opacity: 0.6;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.6;
  }
}

.skeleton-loading {
  animation: pulse 1.5s ease-in-out infinite;
  background: linear-gradient(90deg, #0a635a 25%, #0b7269 50%, #0a635a 75%);
  background-size: 200% 100%;
}

.fade-in {
  animation: fadeIn 0.5s ease-in forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Media queries for responsive image sizing */
@media (max-width: 640px) {
  .mobile-image-container {
    width: 200px !important;
    height: 143px !important;
  }
  .mobile-image {
    width: 200px !important;
    height: 143px !important;
  }
}

@media (min-width: 641px) and (max-width: 768px) {
  .mobile-image-container {
    width: 280px !important;
    height: 200px !important;
  }
  .mobile-image {
    width: 280px !important;
    height: 200px !important;
  }
}
`;

// Image Card Component with enhanced loading optimization for PNG images
const ImageCard = ({
  img,
  imgHeight = 250,
  imgWidth = 350,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  
  // Maintain aspect ratio
  const aspectRatio = imgHeight / imgWidth;

  // Generate a smaller thumbnail version path for initial quick loading
  // Assuming your images follow a pattern where thumbnails are named with -thumb suffix
  const thumbPath = img.replace(/\.(png|jpg|jpeg|webp)$/, '-thumb.$1');
  
  return (
    <figure
      className={cn(
        "relative cursor-pointer overflow-hidden rounded-xl border p-2 sm:p-4 mx-2 bg-[#07534c] hover:bg-[#07534c] transition-all duration-300"
      )}
    >
      <div className="flex flex-col items-center">
        <div 
          className="overflow-hidden rounded-lg relative mobile-image-container"
          style={{
            width: `${imgWidth}px`,
            height: `${imgHeight}px`
          }}
        >
          {/* Skeleton loader - shown while image is loading */}
          {!isLoaded && !hasError && (
            <div 
              className="absolute inset-0 skeleton-loading rounded-lg mobile-image"
              style={{ width: `${imgWidth}px`, height: `${imgHeight}px` }}
            ></div>
          )}
          
          {/* Fallback for failed images */}
          {hasError && (
            <div 
              className="absolute inset-0 flex items-center justify-center bg-gray-200 rounded-lg text-gray-500 mobile-image"
              style={{ width: `${imgWidth}px`, height: `${imgHeight}px` }}
            >
              Image unavailable
            </div>
          )}
          
          {/* Actual image with lazy loading and LQIP technique */}
          <img 
            className={cn(
              "rounded-lg object-cover transition-transform duration-500 hover:scale-110 mobile-image",
              isLoaded ? "fade-in" : "opacity-0"
            )}
            width={imgWidth} 
            height={imgHeight} 
            alt="Gallery image" 
            src={img}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            loading="lazy"
            decoding="async"
            style={{
              width: `${imgWidth}px`,
              height: `${imgHeight}px`
            }}
          />
        </div>
      </div>
    </figure>
  );
};

// Gallery Component with improved image loading strategy
const Gallery = ({ 
  images = []
}) => {
  // Split images into three rows of 12 each for the marquee
  const firstRow = images.slice(0, 12);
  const secondRow = images.slice(12, 24);
  const thirdRow = images.slice(24, 36);
  
  // Adjust marquee speed based on screen size and row content
  const baseDuration = 30; // seconds for desktop
  const mobileDuration = 20; // faster for mobile
  
  // Use window size to determine if we're on mobile (if available)
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const durationBase = isMobile ? mobileDuration : baseDuration;
  
  const firstRowDuration = durationBase;
  const secondRowDuration = durationBase;
  const thirdRowDuration = durationBase * (thirdRow.length / Math.max(firstRow.length, 1));

  return (
    <section className="py-4 sm:py-8 relative overflow-hidden bg-[#F4E4CA] min-h-screen">
      {/* Page Heading */}
      <div className="w-full flex items-center justify-center my-4 sm:my-6 md:my-12">
        <div className="relative flex items-center w-full max-w-6xl px-4">
          {/* Left Line */}
          <div className="flex-grow h-[2px] bg-gradient-to-r from-transparent to-[#004740]"></div>
          {/* Heading Text */}
          <h1 className="mx-2 sm:mx-4 md:mx-8 text-2xl sm:text-3xl md:text-4xl font-bold text-[#004740]">
            GALLERY
          </h1>
          {/* Right Line */}
          <div className="flex-grow h-[2px] bg-gradient-to-r from-[#004740] to-transparent"></div>
        </div>
      </div>

      {/* Inject required CSS */}
      <style dangerouslySetInnerHTML={{ __html: cssStyles }} />
      
      {/* Content Container */}
      <div className="container mx-auto px-2 sm:px-4 lg:px-8">
        {/* Marquee Gallery */}
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden gap-2 sm:gap-4">
          {/* First row - left to right */}
          <Marquee pauseOnHover className={`[--duration:${firstRowDuration}s]`}>
            {firstRow.map((image, index) => (
              <ImageCard 
                key={`row1-${index}`} 
                img={image.image} 
                imgHeight={250}
                imgWidth={350}
              />
            ))}
          </Marquee>
          
          {/* Second row - right to left */}
          <Marquee reverse pauseOnHover className={`[--duration:${secondRowDuration}s]`}>
            {secondRow.map((image, index) => (
              <ImageCard 
                key={`row2-${index}`} 
                img={image.image}
                imgHeight={250}
                imgWidth={350}
              />
            ))}
          </Marquee>

          {/* Third row - left to right (with adjusted duration) */}
          <Marquee pauseOnHover className={`[--duration:${thirdRowDuration}s]`}>
            {thirdRow.map((image, index) => (
              <ImageCard 
                key={`row3-${index}`} 
                img={image.image}
                imgHeight={250}
                imgWidth={350}
              />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

// Example usage in a GalleryPage with PNG images instead of SVG
export default function GalleryPage() {
  const galleryItems = [
    // First row (1-12)
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
    // Second row (13-24)
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
    // Third row (25-36)
    { image: "/imgs/GalleryImg/25.png" },
    { image: "/imgs/GalleryImg/26.png" },
    { image: "/imgs/GalleryImg/27.png" },
    { image: "/imgs/GalleryImg/28.png" },
    { image: "/imgs/GalleryImg/29.png" },
    { image: "/imgs/GalleryImg/30.png" },
    { image: "/imgs/GalleryImg/31.png" },
    { image: "/imgs/GalleryImg/32.png" },
    { image: "/imgs/GalleryImg/33.png" },
    { image: "/imgs/GalleryImg/34.png" },
    { image: "/imgs/GalleryImg/35.png" },
    { image: "/imgs/GalleryImg/36.png" }
  ];

  return (
    <Gallery 
      images={galleryItems}
    />
  );
}