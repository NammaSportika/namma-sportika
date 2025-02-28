import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Events = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.5,
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

  // Combined array with images, titles, and descriptions
  const highlightItems = [
    {
      image: "/imgs/Events/8.svg",
      title: "Athletics",
      description: "(Men & Women - 100m & 200m)",
      path: "/events/athletics"
    },
    {
      image: "/imgs/Events/9.svg",
      title: "Basketball",
      description: "(Men & Women)",
      path: "/events/basketball"
    },
    {
      image: "/imgs/Events/12.svg",
      title: "Chess",
      description: "(Mixed)",
      path: "/events/chess"
    },
    {
      image: "/imgs/Events/13.svg",
      title: "Cricket",
      description: "(Men)",
      path: "/events/cricket"
    },
    {
      image: "/imgs/Events/10.svg",
      title: "Football",
      description: "(Men - 11 vs 11)",
      path: "/events/football"
    },
    {
      image: "/imgs/Events/14.svg",
      title: "Kabaddi",
      description: "(Men)",
      path: "/events/kabaddi"
    },
    {
      image: "/imgs/Events/15.svg",
      title: "Throwball",
      description: "(Men & Women)",
      path: "/events/throwball"
    },
    {
      image: "/imgs/Events/11.svg",
      title: "Volleyball",
      description: "(Men)",
      path: "/events/volleyball"
    }
  ];

  return (
    <div className='w-full bg-[#f4e4c9] py-8 min-h-screen'>
      {/* Page Heading */}
      <motion.div 
        className="w-full flex items-center justify-center my-8 md:my-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative flex items-center w-full max-w-6xl px-4">
          {/* Left Line */}
          <div className="flex-grow h-[2px] bg-gradient-to-r from-transparent to-[#004740]"></div>
          {/* Heading Text */}
          <h1 className="mx-8 text-4xl font-bold text-[#004740]">
            EVENTS
          </h1>
          {/* Right Line */}
          <div className="flex-grow h-[2px] bg-gradient-to-r from-[#004740] to-transparent"></div>
        </div>
      </motion.div>
    <motion.section 
      className="relative overflow-hidden bg-[#f4e4c9]"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Diagonal Design Element */}
      <div className="absolute top-0 right-0 w-1/4 sm:w-1/3 h-16 sm:h-24 transform -skew-y-6 
        -translate-y-6 sm:-translate-y-8 translate-x-4 sm:translate-x-8 opacity-20" />
      
      {/* Content Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Title Section */}   
        <motion.div 
          className="text-center mb-4 sm:mb-6 md:mb-8"
          variants={itemVariants}
        >
          <p className="text-[#a58255] text-lg md:text-xl max-w-2xl mx-auto">
            Click on any event to view details, rules, and prize information
          </p>
        </motion.div>

        {/* Custom Grid Layout */}
        <div className="max-w-6xl mx-auto">
          {/* Grid always has minimum 2 columns */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-5 md:gap-8">
            {highlightItems.map((item, index) => (
              <Link to={item.path} key={index}>
                <motion.div
                  className="relative group cursor-pointer transition-all duration-300 transform hover:-translate-y-2"
                  variants={itemVariants}
                >
                  <motion.div
                    className="relative aspect-[4/3] w-full overflow-hidden mb-2 rounded-xl"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-xl"></div>
                    <div className="w-full h-full flex items-center justify-center rounded-xl">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-contain p-2 rounded-xl"
                        loading="lazy"
                      />
                    </div>
                  </motion.div>
                  <h3 className="text-[#004740] text-lg font-bold text-center mb-1 truncate">
                    {item.title}
                  </h3>
                  <p className="text-[#a58255] text-xs sm:text-sm text-center">
                    {item.description}
                  </p>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
    </div>
  );
};

export default Events;