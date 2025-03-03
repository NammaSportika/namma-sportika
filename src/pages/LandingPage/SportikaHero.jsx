import React from 'react';
import { motion } from 'framer-motion';
import { FlipText } from '../../components/ui/flip-text';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.3
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: "easeOut"
    }
  }
};

const SportikaHero = () => {
  return (
    <div className="w-screen overflow-hidden bg-[#f4e4c9]">
      {/* Header with Page Heading */}
      <header className="py-8">
        <div className="flex items-center justify-center w-full max-w-5xl px-4 mx-auto">
          <div className="flex-grow h-px bg-gradient-to-r from-transparent to-[#004740]"></div>
          <h1 className="mx-8 text-4xl font-bold text-[#004740]">
            ABOUT
          </h1>
          <div className="flex-grow h-px bg-gradient-to-r from-[#004740] to-transparent"></div>
        </div>
      </header>

      {/* Main Content Section */}
      <motion.section
        className="py-12 md:py-16 px-4 md:px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >
        <div className="max-w-4xl mx-auto bg-[#07534c] rounded-lg shadow-lg p-8 flex flex-col md:flex-row items-center gap-8">
          {/* Image Container */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img
              src="/imgs/AboutGS/1.svg"
              alt="About GITAM"
              className="max-w-full h-auto object-cover"
            />
          </div>
          {/* Text Content */}
          <div className="w-full md:w-1/2">
            <h2 className="text-[#f9f871] text-2xl md:text-3xl lg:text-4xl font-bold mb-4">
              <FlipText>NAMMA SPORTIKA</FlipText>
            </h2>
            <p className="text-[#e7fefe] text-lg md:text-xl leading-relaxed">
              An inter-university sports meet that gives a platform to students to test their skills in the field of sports. Numerous sporting events will take place over a 3-day long event each day a new chance for growth and learning.
            </p>
          </div>
        </div>
      </motion.section>
    </div>
  );
};

export default SportikaHero;