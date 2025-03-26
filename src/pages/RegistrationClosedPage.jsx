import React from 'react';
import { Calendar, Timer, ArrowRight } from 'lucide-react';

const RegistrationClosedPage = () => {
  return (
    <div className="min-h-screen w-full bg-[#f4e4c9] flex flex-col p-3 sm:p-6 md:p-8 relative">
      {/* Page Heading */}
      <div className="w-full flex items-center justify-center my-4 sm:my-8 md:my-10">
        <div className="relative flex items-center w-full max-w-4xl px-2 sm:px-4">
          <div className="flex-grow h-[2px] bg-gradient-to-r from-transparent to-[#004740]"></div>
          <h1 className="mx-2 sm:mx-8 text-xl sm:text-2xl md:text-4xl font-bold text-[#004740] text-center whitespace-nowrap">
            REGISTRATIONS CLOSED
          </h1>
          <div className="flex-grow h-[2px] bg-gradient-to-r from-[#004740] to-transparent"></div>
        </div>
      </div>

      {/* Registration Closed Card */}
      <div className="w-full max-w-2xl mx-auto">
        <div className="bg-[#07534c] rounded-2xl shadow-xl overflow-hidden border-2 border-[#a58255]">
          <div className="p-6 sm:p-8 text-center">
            <div className="mb-6 flex justify-center">
              <Calendar className="h-16 w-16 text-[#a58255] mb-4" />
            </div>
            
            <h2 className="text-2xl sm:text-3xl font-bold text-[#e7fefe] mb-4">
              Registration Closed
            </h2>
            
            <p className="text-[#e7fefe]/80 mb-6 text-sm sm:text-base">
              Registrations for Namma Sportika 2025 is currently closed. 
              We look forward to welcoming you next year!
            </p>
            
            <div className="bg-[#a58255]/20 p-4 rounded-lg border border-[#a58255]/30 mb-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Timer className="h-5 w-5 mr-3 text-[#a58255]" />
                  <span className="text-[#e7fefe] font-semibold">
                    Next Registration Period
                  </span>
                </div>
                <span className="text-[#e7fefe] font-bold">
                  March 2026
                </span>
              </div>
            </div>
            
            <div className="flex justify-center">
              <a 
                href="https://www.instagram.com/sportika.gitam" 
                className="bg-[#a58255] hover:bg-[#9b774a] text-[#e7fefe] font-semibold px-6 py-3 rounded-lg transition-all duration-200 flex items-center group"
              >
                Stay Updated
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </div>
          </div>
        </div>
        
        {/* Footer Note */}
        <p className="text-xs font-medium text-[#004740]/60 text-center mt-4 sm:mt-6">
          Check our official website or social media for upcoming event details.
        </p>
      </div>
    </div>
  );
};

export default RegistrationClosedPage;