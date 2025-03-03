import React from 'react';
import { motion } from 'framer-motion';
import { FlipText } from '../components/ui/flip-text';

const AboutGitamSports = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.8 },
    },
  };

  return (
    <div className="w-full bg-[#f4e4c9] py-8 min-h-screen">
      {/* Page Heading */}
      <div className="w-full flex items-center justify-center my-8 md:my-12">
        <div className="relative flex items-center w-full max-w-4xl px-4">
          {/* Left Line */}
          <div className="flex-grow h-[2px] bg-gradient-to-r from-transparent to-[#004740]"></div>
          {/* Heading Text */}
          <h1 className="mx-8 text-4xl font-bold text-[#004740]">
            ABOUT US
          </h1>
          {/* Right Line */}
          <div className="flex-grow h-[2px] bg-gradient-to-r from-[#004740] to-transparent"></div>
        </div>
      </div>

      {/* FIRST SECTION */}
      <motion.div
        className="relative w-full bg-[#f4e4c9] py-12 md:py-16 px-4 md:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        {/* Centered Card */}
        <div className="max-w-4xl mx-auto bg-[#07534c] rounded-lg shadow-lg p-8 flex flex-col md:flex-row items-center gap-8">
          {/* Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="/imgs/AboutGS/2.png"
              alt="About GITAM"
              className="max-w-full h-auto object-cover rounded-lg"
            />
          </div>
          {/* Text */}
          <div className="w-full md:w-1/2">
            <h2 className="text-[#f9f871] text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <FlipText>GITAM</FlipText>
            </h2>
            <p className="text-[#e7fefe] text-lg md:text-xl leading-relaxed">
              Founded in 1980 and inspired by Mahatma Gandhi's ideals, GITAM is NAAC A++ accredited, with 12 schools across four campuses, offering programs to 25,000+ students.
            </p>
          </div>
        </div>
      </motion.div>

      {/* SECOND SECTION */}
      <motion.div
        className="relative w-full bg-[#f4e4c9] py-12 md:py-16 px-4 md:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        {/* Centered Card */}
        <div className="max-w-4xl mx-auto bg-[#07534c] rounded-lg shadow-lg p-8 flex flex-col md:flex-row items-center gap-8">
          {/* Image (shown on the right on larger screens) */}
          <div className="order-2 md:order-1 w-full md:w-1/2">
            <h2 className="text-[#f9f871] text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              <FlipText>GITAM Sports</FlipText>
            </h2>
            <p className="text-[#e7fefe] text-lg md:text-xl leading-relaxed">
              GITAM fosters sports excellence through inter-college tournaments, events, and competitions, promoting teamwork and leadership. It supports students with coaching, training, and sponsorship to compete at state and national levels.
            </p>
          </div>

          {/* Text (shown on the left on larger screens) */}
          <div className="order-1 md:order-2 w-full md:w-1/2 flex justify-center">
            <img
              src="/imgs/AboutGS/1.png"
              alt="About GITAM SPORTS"
              className="max-w-full h-auto object-cover rounded-lg"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AboutGitamSports;
