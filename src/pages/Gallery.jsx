import React from 'react';
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
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] gap-[var(--gap)]",
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

// CSS styles for marquee animations
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
`;

// Image Card Component with hover animation on image
const ImageCard = ({
  img,
  title,
  imgHeight = 200,
  imgWidth = 300,
}) => {
  return (
    <figure
      className={cn(
        "relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border p-4 mx-2 bg-[#07534c] hover:bg-[#07534c] transition-all duration-300"
      )}
    >
      <div className="flex flex-col items-center">
        <div className="overflow-hidden rounded-lg">
          <img 
            className="rounded-lg object-cover transition-transform duration-500 hover:scale-110" 
            width={imgWidth} 
            height={imgHeight} 
            alt={title || "Gallery image"} 
            src={img} 
          />
        </div>
        {title && (
          <figcaption className="mt-3 text-sm font-medium text-center text-[#e7fefe]">
            {title}
          </figcaption>
        )}
      </div>
    </figure>
  );
};

// Gallery Component
const Gallery = ({ 
  images = [], 
  imgHeight = 200, 
  imgWidth = 300 
}) => {
  // Split images into three rows for the marquee
  const firstRow = images.slice(0, Math.ceil(images.length / 3));
  const secondRow = images.slice(Math.ceil(images.length / 3), Math.ceil(images.length / 3) * 2);
  const thirdRow = images.slice(Math.ceil(images.length / 3) * 2);
  
  // Calculate durations based on number of items in each row
  // This ensures the visual speed appears the same regardless of item count
  const baseDuration = 30; // seconds
  const firstRowDuration = baseDuration;
  const secondRowDuration = baseDuration;
  
  // Adjust third row duration to match visual speed of other rows
  // If the third row has fewer items, we need to reduce the duration proportionally
  const thirdRowDuration = baseDuration * (thirdRow.length / Math.max(firstRow.length, 1));

  return (
    <section className="py-8 relative overflow-hidden bg-[#F4E4CA] min-h-screen">

      {/* Page Heading */}
      <div className="w-full flex items-center justify-center my-8 md:my-12">
        <div className="relative flex items-center w-full max-w-6xl px-4">
          {/* Left Line */}
          <div className="flex-grow h-[2px] bg-gradient-to-r from-transparent to-[#004740]"></div>
          {/* Heading Text */}
          <h1 className="mx-8 text-4xl font-bold text-[#004740]">
            GALLERY
          </h1>
          {/* Right Line */}
          <div className="flex-grow h-[2px] bg-gradient-to-r from-[#004740] to-transparent"></div>
        </div>
      </div>

      {/* Inject required CSS */}
      <style dangerouslySetInnerHTML={{ __html: cssStyles }} />
      
      {/* Content Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Marquee Gallery */}
        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden gap-4">
          {/* First row - left to right */}
          <Marquee pauseOnHover className={`[--duration:${firstRowDuration}s]`}>
            {firstRow.map((image, index) => (
              <ImageCard 
                key={`row1-${index}`} 
                img={image.image} 
                title={image.text} 
                imgHeight={imgHeight}
                imgWidth={imgWidth}
              />
            ))}
          </Marquee>
          
          {/* Second row - right to left */}
          <Marquee reverse pauseOnHover className={`[--duration:${secondRowDuration}s]`}>
            {secondRow.map((image, index) => (
              <ImageCard 
                key={`row2-${index}`} 
                img={image.image} 
                title={image.text} 
                imgHeight={imgHeight}
                imgWidth={imgWidth}
              />
            ))}
          </Marquee>

          {/* Third row - left to right (with adjusted duration) */}
          <Marquee pauseOnHover className={`[--duration:${thirdRowDuration}s]`}>
            {thirdRow.map((image, index) => (
              <ImageCard 
                key={`row3-${index}`} 
                img={image.image} 
                title={image.text} 
                imgHeight={imgHeight}
                imgWidth={imgWidth}
              />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

// Example usage in a GalleryPage
export default function GalleryPage() {
  const galleryItems = [
    { image: "/imgs/Events/8.svg", text: "Athletics" },
    { image: "/imgs/Events/9.svg", text: "Basketball" },
    { image: "/imgs/Events/12.svg", text: "Chess" },
    { image: "/imgs/Events/13.svg", text: "Cricket" },
    { image: "/imgs/Events/10.svg", text: "Football" },
    { image: "/imgs/Events/14.svg", text: "Kabaddi" },
    { image: "/imgs/Events/15.svg", text: "Throwball" },
    { image: "/imgs/Events/11.svg", text: "Volleyball" }
  ];

  return (
    <Gallery 
      images={galleryItems} 
      imgHeight={180}
      imgWidth={280}
    />
  );
}