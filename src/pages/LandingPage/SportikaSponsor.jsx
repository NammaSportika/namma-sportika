import React from 'react';
import { motion } from 'framer-motion';
import { FiStar, FiAward } from 'react-icons/fi';
import { FlipText } from '../../components/ui/flip-text';
import { TextAnimate } from '../../components/ui/text-animate';

const SportikaSponsor = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0, 
      y: 20 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.section 
      className="bg-[#f4e4c9] relative py-16 px-4"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={containerVariants}
    >
      {/* Background Lines */}
      <div className="absolute left-0 top-0 w-1/3 h-full">
        {[...Array(8)].map((_, i) => (
          <div 
            key={i} 
            className="h-8 bg-[#A48255] opacity-20 mb-8 transform -skew-x-12"
            style={{
              width: `${100 - (i * 10)}%`,
              marginLeft: `${i * 5}%`
            }}
          />
        ))}
      </div>

      {/* Content Container */}
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Title */}
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <h1 className="text-[#004740] text-5xl md:text-6xl font-bold mb-4">
            <FlipText>
            SPONSORS
            </FlipText>
          </h1>
          <div className="text-[#004740] text-xl font-semibold">
            <TextAnimate animation="fadeIn" by="character" once>
            TITLE SPONSOR
            </TextAnimate>
          </div>
        </motion.div>

        {/* Title Sponsors */}
        <motion.div 
          className="flex justify-center gap-8 mb-16"
          variants={itemVariants}
        >
          {[1, 2].map((index) => (
            <motion.div
              key={`title-${index}`}
              className="w-48 h-48 rounded-lg border-4 border-[#004740] bg-white p-2"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <FiStar className="text-4xl text-[#004740] opacity-50" />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Other Sponsors Title */}
        <motion.div 
          className="text-center mb-8"
          variants={itemVariants}
        >
          <h2 className="text-[#004740] text-2xl font-semibold">
            <TextAnimate animation="fadeIn" by="character" once>
            OUR OTHER SPONSORS  
            </TextAnimate>
          </h2>
        </motion.div>

        {/* Other Sponsors Grid */}
        <motion.div 
          className="grid grid-cols-3 gap-8 max-w-4xl mx-auto mb-16"
          variants={containerVariants}
        >
          {[...Array(6)].map((_, index) => (
            <motion.div
              key={`other-${index}`}
              className="w-full aspect-square rounded-lg border-4 border-[#004740] bg-white p-2"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="w-full h-full flex items-center justify-center">
                <FiStar className="text-3xl text-[#004740] opacity-50" />
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </motion.section>
  );
};

export default SportikaSponsor;