import React from 'react';
import { motion } from 'framer-motion';
import { FiAward, FiCamera } from 'react-icons/fi';
import { FlipText } from '../../components/ui/flip-text';
import { TextAnimate } from '../../components/ui/text-animate';

const SportikaHighlights = () => {
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

  const highlightItems = [
    {
      image: "/imgs/HighlightsImgs/1.png",
      title: "Grand Opening Ceremony"
    },
    {
      image: "/imgs/HighlightsImgs/2.png",
      title: "Sports Competitions"
    },
    {
      image: "/imgs/HighlightsImgs/3.png",
      title: "Talent Showcase"
    },
    {
      image: "/imgs/HighlightsImgs/4.png",
      title: "Food Stalls & Entertainment"
    },
    {
      image: "/imgs/HighlightsImgs/5.png",
      title: "Award Ceremony"
    }
  ];

  return (
    <motion.section 
      className="bg-[#f4e4c9] py-8 sm:py-12 md:py-16 relative overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      {/* Diagonal Design Element */}
      <div className="absolute top-0 right-0 w-1/4 sm:w-1/3 h-16 sm:h-24 transform -skew-y-6 -translate-y-6 sm:-translate-y-8 translate-x-4 sm:translate-x-8 opacity-20" />

      {/* Content Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header with Page Heading */}
        <header className="py-8">
          <div className="flex items-center justify-center w-full max-w-5xl px-4 mx-auto">
            <div className="flex-grow h-px bg-gradient-to-r from-transparent to-[#004740]"></div>
            <h1 className="mx-8 text-4xl font-bold text-[#004740]">
              HIGHLIGHTS
            </h1>
            <div className="flex-grow h-px bg-gradient-to-r from-[#004740] to-transparent"></div>
          </div>
        </header>

        {/* Custom Grid Layout */}
        <div className="max-w-6xl mx-auto">
          {/* First Row - 3 images */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-4 sm:mb-6 md:mb-8">
            {highlightItems.slice(0, 3).map((item, index) => (
              <motion.div
                key={index}
                className="relative group"
                variants={itemVariants}
              >
                <motion.div
                  className="relative aspect-[4/3] w-full max-w-[300px] mx-auto overflow-hidden mb-3"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </motion.div>
                <h3 className="text-[#07534c] text-lg sm:text-xl md:text-2xl font-bold text-center">
                  <TextAnimate animation="fadeIn" by="character" once>
                    {item.title}
                  </TextAnimate>
                </h3>
              </motion.div>
            ))}
          </div>

          {/* Second Row - 2 images centered */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 w-full sm:max-w-[66%] mx-auto">
            {highlightItems.slice(3, 5).map((item, index) => (
              <motion.div
                key={index + 3}
                className="relative group"
                variants={itemVariants}
              >
                <motion.div
                  className="relative aspect-[4/3] w-full max-w-[300px] mx-auto overflow-hidden mb-3"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-contain"
                    loading="lazy"
                  />
                </motion.div>
                <h3 className="text-[#07534c] text-lg sm:text-xl md:text-2xl font-bold text-center">
                  <TextAnimate animation="fadeIn" by="character" once>
                    {item.title}
                  </TextAnimate>
                </h3>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default SportikaHighlights;
