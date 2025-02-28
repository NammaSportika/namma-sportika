import React, { useState, useEffect } from 'react';

const Rulebook = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMounted, setIsMounted] = useState(false);
  
  // Ensure the component is mounted before rendering
  useEffect(() => {
    setIsMounted(true);
    return () => {
      setIsMounted(false);
    };
  }, []);
  
  if (!isMounted) {
    return null; // Or render a loading state
  }
  
  return (
    <div className="w-full bg-[#f4e4c9] py-4 sm:py-6 md:py-8 min-h-screen">
      <div className="container mx-auto px-4">
        {/* Page Heading */}
        <div className="w-full flex items-center justify-center my-4 sm:my-6 md:my-8 lg:my-12">
          <div className="relative flex items-center w-full max-w-4xl">
            {/* Left Line */}
            <div className="flex-grow h-[2px] bg-gradient-to-r from-transparent to-[#004740]"></div>
            {/* Heading Text */}
            <h1 className="mx-4 sm:mx-6 md:mx-8 text-2xl sm:text-3xl md:text-4xl font-bold text-[#004740]">
              RULEBOOK
            </h1>
            {/* Right Line */}
            <div className="flex-grow h-[2px] bg-gradient-to-r from-[#004740] to-transparent"></div>
          </div>
        </div>
        
        <div className="w-full rounded-lg overflow-hidden shadow-md">
          {isLoading && (
            <div className="flex justify-center items-center h-48 sm:h-64 md:h-96">
              <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 border-t-2 border-b-2 border-[#004740]"></div>
            </div>
          )}
          
          {/* Responsive PDF Viewer using responsive padding-bottom for aspect ratio */}
          <div className="relative w-full overflow-hidden pb-[85%] sm:pb-[75%] md:pb-[65%] lg:pb-[56.25%]">
            <object
              data="/pdf/namma Sportika Rule Book  GITAM BLR_compressed (1).pdf"
              type="application/pdf"
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              onLoad={() => setIsLoading(false)}
            >
              <p className="text-center py-10">
                Your browser doesn't support embedded PDFs.
                <a 
                  href="/pdf/namma Sportika Rule Book  GITAM BLR_compressed (1).pdf" 
                  download="Namma-Sportika-Rulebook.pdf"
                  className="text-[#004740] font-medium ml-2 underline hover:text-[#003730]"
                >
                  Click here to download
                </a>
              </p>
            </object>
          </div>
        </div>
        
        <div className="mt-4 sm:mt-5 md:mt-6 flex justify-center pb-4 sm:pb-6 md:pb-8">
          <a
            href="/pdf/namma Sportika Rule Book  GITAM BLR_compressed (1).pdf"
            download="Namma-Sportika-Rulebook.pdf"
            className="inline-flex items-center px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-full
                       bg-[#004740] hover:bg-[#003730] 
                       text-white text-sm sm:text-base font-semibold
                       transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0
                       shadow-md hover:shadow-lg"
          >
            Download Rulebook
          </a>
        </div>
      </div>
    </div>
  );
};

export default Rulebook;
