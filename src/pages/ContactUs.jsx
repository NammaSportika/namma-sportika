import React from 'react';
import { FiPhone, FiMail } from 'react-icons/fi';

const ContactUs = () => {
  // Brand colors
  const brandColors = {
    primary: "#07534c",    // Dark teal (container background)
    secondary: "#a58255",  // Brown/gold
    background: "#f4e4c9", // Light cream background
    accent: "#e7fefe",     // Light teal (for rows and lines)
    heading: "#f9f871"     // Yellow (for headings)
  };

  return (
    <div className="w-full bg-[#f4e4c9] py-4 sm:py-6 md:py-8 min-h-screen px-3 sm:px-4 md:px-6">
      {/* Page Heading */}
      <div className="w-full flex items-center justify-center my-4 sm:my-6 md:my-8 lg:my-12">
        <div className="relative flex items-center w-full max-w-6xl">
          {/* Left Line */}
          <div className="flex-grow h-[2px] bg-gradient-to-r from-transparent to-[#004740]"></div>
          {/* Heading Text */}
          <h1 className="mx-3 sm:mx-5 md:mx-8 text-2xl sm:text-3xl md:text-4xl font-bold text-[#004740] whitespace-nowrap">
              CONTACT US
          </h1>
          {/* Right Line */}
          <div className="flex-grow h-[2px] bg-gradient-to-r from-[#004740] to-transparent"></div>
        </div>
      </div>

      {/* Main content with 25% margin on small screens */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 md:gap-6 max-w-6xl mx-auto sm:mx-auto md:mx-auto w-full sm:w-full md:w-full">
        {/* On smaller screens, add left and right margins */}
        <div className="md:col-span-1 sm:w-3/4 mx-auto md:w-full">
          {/* Managers Card */}
          <div className="bg-[#07534c] rounded-lg shadow-md overflow-hidden">
            {/* Heading with Line Decoration */}
            <div className="relative flex items-center justify-center py-3 sm:py-4 md:py-5">
              <div className="absolute left-4 sm:left-5 md:left-6 right-4 sm:right-5 md:right-6 h-[2px]">
                {/* <div className="w-full h-full bg-[#e7fefe]"></div> */}
              </div>
              <h2 className="font-bold text-xl sm:text-2xl text-[#f9f871] bg-[#07534c] px-3 sm:px-4 relative z-10">
                Managers
              </h2>
            </div>

            {/* Contact List */}
            <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
              {/* Contact Card 1 - Always horizontal layout */}
              <div className="flex items-center justify-between bg-[#a58255] rounded-lg p-3 sm:p-4">
                <p className="text-[#e7fefe] font-medium text-base sm:text-lg truncate pr-2">Diya Prashant</p>
                <a 
                  href="tel:7760281313" 
                  className="flex items-center gap-1 sm:gap-2 text-[#e7fefe] hover:text-white transition-colors whitespace-nowrap"
                >
                  <FiPhone />
                  <span className="font-medium">7760281313</span>
                </a>
              </div>

              {/* Contact Card 2 - Always horizontal layout */}
              <div className="flex items-center justify-between bg-[#a58255] rounded-lg p-3 sm:p-4">
                <p className="text-[#e7fefe] font-medium text-base sm:text-lg truncate pr-2">Paarth Goel</p>
                <a 
                  href="tel:9321793974" 
                  className="flex items-center gap-1 sm:gap-2 text-[#e7fefe] hover:text-white transition-colors whitespace-nowrap"
                >
                  <FiPhone />
                  <span className="font-medium">9321793974</span>
                </a>
              </div>

              {/* Email Card */}
              <div className="flex items-center justify-between bg-[#a58255] rounded-lg p-3 sm:p-4">
                <a 
                  href="mailto:nammasportika@gmail.com" 
                  className="flex items-center gap-1 sm:gap-2 w-full text-[#e7fefe] hover:text-white transition-colors"
                >
                  <FiMail className="shrink-0" />
                  <span className="font-medium text-sm sm:text-base md:text-base truncate">nammasportika@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Student Co-ordinators Card with same margins on smaller screens */}
        <div className="md:col-span-1 sm:w-3/4 mx-auto md:w-full">
          <div className="bg-[#07534c] rounded-lg shadow-md overflow-hidden">
            {/* Heading with Line Decoration */}
            <div className="relative flex items-center justify-center py-3 sm:py-4 md:py-5">
              <div className="absolute left-4 sm:left-5 md:left-6 right-4 sm:right-5 md:right-6 h-[2px]">
                {/* <div className="w-full h-full bg-[#e7fefe]"></div> */}
              </div>
              <h2 className="font-bold text-xl sm:text-2xl text-[#f9f871] bg-[#07534c] px-3 sm:px-4 relative z-10">
                Student Co-ordinators
              </h2>
            </div>

            {/* Contact List */}
            <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
              {/* Contact Card 1 - Always horizontal layout */}
              <div className="flex items-center justify-between bg-[#a58255] rounded-lg p-3 sm:p-4">
                <p className="text-[#e7fefe] font-medium text-base sm:text-lg truncate pr-2">Aprameya Ansh</p>
                <a 
                  href="tel:6200949283" 
                  className="flex items-center gap-1 sm:gap-2 text-[#e7fefe] hover:text-white transition-colors whitespace-nowrap"
                >
                  <FiPhone />
                  <span className="font-medium">6200949283</span>
                </a>
              </div>

              {/* Contact Card 2 - Always horizontal layout */}
              <div className="flex items-center justify-between bg-[#a58255] rounded-lg p-3 sm:p-4">
                <p className="text-[#e7fefe] font-medium text-base sm:text-lg truncate pr-2">Stuti Das</p>
                <a 
                  href="tel:9205178790" 
                  className="flex items-center gap-1 sm:gap-2 text-[#e7fefe] hover:text-white transition-colors whitespace-nowrap"
                >
                  <FiPhone />
                  <span className="font-medium">9205178790</span>
                </a>
              </div>

              {/* Email Card */}
              <div className="flex items-center justify-between bg-[#a58255] rounded-lg p-3 sm:p-4">
                <a 
                  href="mailto:nammasportika@gmail.com" 
                  className="flex items-center gap-1 sm:gap-2 w-full text-[#e7fefe] hover:text-white transition-colors"
                >
                  <FiMail className="shrink-0" />
                  <span className="font-medium text-sm sm:text-base md:text-base truncate">nammasportika@gmail.com</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;