import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiUser, FiBriefcase } from 'react-icons/fi';

const TeamCard = ({ contact }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="h-full w-full"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover="hover"
      initial="initial"
    >
      <motion.div
        className="bg-[#a58255] rounded-xl overflow-hidden shadow-md h-full cursor-pointer flex flex-col"
        variants={{
          hover: {
            scale: 1.03,
            y: -5,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.15)",
            transition: { duration: 0.3, ease: "easeOut" }
          }
        }}
      >
        <div className="relative overflow-hidden">
          <motion.div 
            className="aspect-square bg-[#07534c]"
            variants={{
              hover: { 
                scale: 1.05,
                transition: { duration: 0.5, ease: "easeOut" }
              }
            }}
          >
            <img
              src={contact.image || "/imgs/placeholder.svg"}
              alt={contact.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </motion.div>
          
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-[#07534c] via-70% to-transparent pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 0.9 : 0 }}
            transition={{ duration: 0.3 }}
          />
        </div>
        
        {/* Hover Content */}
        <motion.div 
          className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: isHovered ? 1 : 0,
            y: isHovered ? 0 : 20
          }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-[#e7fefe] font-semibold text-sm sm:text-lg md:text-xl mb-1 sm:mb-2">{contact.name}</h3>
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-4">
            <FiBriefcase className="text-[#e7fefe] w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 shrink-0" />
            <p className="text-[#e7fefe] text-xs sm:text-sm font-medium">{contact.position}</p>
          </div>
          
          <motion.div 
            className="space-y-2 sm:space-y-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <FiPhone className="text-[#e7fefe] w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 shrink-0" />
              <p className="text-[#e7fefe] text-xs sm:text-sm font-medium">{contact.phone}</p>
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              <FiMail className="text-[#e7fefe] w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 shrink-0" />
              <p className="text-[#e7fefe] text-xs sm:text-sm font-medium break-all">{contact.email}</p>
            </div>
          </motion.div>
        </motion.div>

        {/* Default Content */}
        <motion.div 
          className="p-3 sm:p-4 md:p-6 flex-grow"
          animate={{ opacity: isHovered ? 0 : 1 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
            <FiUser className="text-[#e7fefe] w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            <h3 className="text-[#e7fefe] font-semibold text-sm sm:text-base md:text-xl line-clamp-1">{contact.name}</h3>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <FiBriefcase className="text-[#e7fefe] w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            <p className="text-[#e7fefe] text-xs sm:text-sm md:text-base font-medium line-clamp-1">{contact.position}</p>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

const SectionHeading = ({ title }) => (
  <div className="w-full flex items-center justify-center my-8 md:my-12">
        <div className="relative flex items-center w-full max-w-6xl px-4">
          {/* Left Line */}
          <div className="flex-grow h-[2px] bg-gradient-to-r from-transparent to-[#004740]"></div>
          {/* Heading Text */}
          <h1 className="mx-8 text-4xl font-bold text-[#004740]">
            {title}
          </h1>
          {/* Right Line */}
          <div className="flex-grow h-[2px] bg-gradient-to-r from-[#004740] to-transparent"></div>
        </div>
      </div>
);

const TeamSection = ({ title, contacts, cardsPerRow }) => {
  return (
    <motion.div
      className="w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.05,
            delayChildren: 0.1
          }
        }
      }}
    >
      <SectionHeading title={title} />
      <div className="flex flex-wrap justify-center mx-auto" style={{ gap: '0.75rem' }}>
        {contacts.map((contact, index) => (
          <motion.div
            key={index}
            className={`${
              cardsPerRow === 3 ? 'w-[calc(33.333%-0.75rem)]' : 
              cardsPerRow === 4 ? 'w-[calc(25%-0.75rem)]' : 
              'w-[calc(20%-0.75rem)]'
            } min-w-[140px]`}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { 
                opacity: 1, 
                y: 0,
                transition: { duration: 0.5 }
              }
            }}
          >
            <TeamCard contact={contact} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

const OurTeam = () => {
  // Sample data - you would replace this with your actual data
  const managers = [
    {
      image: "/imgs/ContactUs/1.svg",
      name: "Narendra Luthar",
      position: "Manager, Sports",
      phone: "+91-8904778392",
      email: "nbandaru@gitam.edu"
    },
    {
      image: "/imgs/ContactUs/2.svg",
      name: "Bharath K G",
      position: "Assistant Manager",
      phone: "+91-8880487408",
      email: "bgangadh2@gitam.edu"
    },
    {
      image: "/imgs/ContactUs/3.svg",
      name: "Pushkar Desai",
      position: "Manager, Technology",
      phone: "+91-9013540059",
      email: "pdesai@gitam.in"
    }
  ];
  
  // Sample data for chairs, heads and leads
  // In a real application, you would replace this with your actual data
  const chairs = Array(4).fill().map((_, i) => ({
    image: `/imgs/ContactUs/${(i % 6) + 1}.svg`,
    name: `Chair ${i + 1}`,
    position: `Chair, Department ${i + 1}`,
    phone: "+91-9876543210",
    email: `chair${i + 1}@gitam.in`
  }));
  
  const heads = Array(14).fill().map((_, i) => ({
    image: `/imgs/ContactUs/${(i % 6) + 1}.svg`,
    name: `Head ${i + 1}`,
    position: `Head, Division ${i + 1}`,
    phone: "+91-9876543210",
    email: `head${i + 1}@gitam.in`
  }));
  
  const leads = Array(40).fill().map((_, i) => ({
    image: `/imgs/ContactUs/${(i % 6) + 1}.svg`,
    name: `Lead ${i + 1}`,
    position: `Team Lead ${i + 1}`,
    phone: "+91-9876543210",
    email: `lead${i + 1}@gitam.in`
  }));

  return (
    <motion.section 
      className="py-8 relative overflow-hidden bg-[#f4e4c9]"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
          }
        }
      }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#a58255] rounded-full blur-3xl -translate-y-1/3 translate-x-1/3" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#a58255] rounded-full blur-3xl translate-y-1/3 -translate-x-1/3" />
      </div>

      {/* Sections Container */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-8 sm:space-y-12 md:space-y-16">
        <TeamSection title="MANAGERS" contacts={managers} cardsPerRow={3} />
        <TeamSection title="CHAIRS" contacts={chairs} cardsPerRow={4} />
        <TeamSection title="HEADS" contacts={heads} cardsPerRow={4} />
        <TeamSection title="LEADS" contacts={leads} cardsPerRow={5} />
      </div>
    </motion.section>
  );
};

export default OurTeam;