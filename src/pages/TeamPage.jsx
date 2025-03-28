import React from 'react';
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiUser, FiBriefcase } from 'react-icons/fi';

const TeamCard = ({ contact }) => {
  return (
    <motion.div
      className="h-full w-full"
      whileHover={{
        scale: 1.05,
        boxShadow: "0 15px 30px -10px rgba(0, 0, 0, 0.15)",
        transition: { duration: 0.3, ease: "easeOut" }
      }}
    >
      <div className="bg-[#a58255] rounded-xl overflow-hidden shadow-md h-full cursor-pointer flex flex-col">
        <div className="relative overflow-hidden">
          <div className="aspect-square bg-[#07534c]">
            <img
              src={contact.image || "/imgs/placeholder.svg"}
              alt={contact.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>

        <div className="p-3 sm:p-4 md:p-6 flex-grow">
          <div className="flex items-center gap-2 sm:gap-3 mb-1 sm:mb-2">
            <FiUser className="text-[#e7fefe] w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            <h3 className="text-[#e7fefe] font-semibold text-sm sm:text-base md:text-xl line-clamp-1">{contact.name}</h3>
          </div>
          <div className="flex items-center gap-2 sm:gap-3">
            <FiBriefcase className="text-[#e7fefe] w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
            <p className="text-[#e7fefe] text-xs sm:text-sm md:text-base font-medium line-clamp-1">{contact.position}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const SectionHeading = ({ title }) => (
  <div className="w-full flex items-center justify-center my-4 sm:my-6 md:my-8">
    <div className="relative flex items-center w-full max-w-5xl px-4">
      <div className="flex-grow h-[1px] bg-gradient-to-r from-transparent to-[#07534c]"></div>
      <h2 className="mx-3 sm:mx-4 md:mx-6 text-lg sm:text-xl md:text-3xl font-bold text-[#07534c]">
        {title}
      </h2>
      <div className="flex-grow h-[1px] bg-gradient-to-r from-[#07534c] to-transparent"></div>
    </div>
  </div>
);

const TeamSection = ({ title, contacts, cardsPerRow }) => {
  // Consistent width for 5 cards in a row
  const cardWidth = 'w-1/5 min-w-[140px]';

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
            className={cardWidth}
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
  // Sample data for different team sections
  const director = [
    {
      image: "/imgs/ContactUs/director.svg",
      name: "Dr. P. Rajendra Prasad",
      position: "Director, GITAM",
      phone: "+91-XXXXXXXXXX",
      email: "director@gitam.edu"
    }
  ];
  
  const management = [
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
  
  const coaches = Array(5).fill().map((_, i) => ({
    image: `/imgs/ContactUs/${(i % 6) + 1}.svg`,
    name: `Coach ${i + 1}`,
    position: `Sports Coach ${i + 1}`,
    phone: "+91-9876543210",
    email: `coach${i + 1}@gitam.in`
  }));
  
  const chairs = Array(4).fill().map((_, i) => ({
    image: `/imgs/ContactUs/${(i % 6) + 1}.svg`,
    name: `Chair ${i + 1}`,
    position: `Chair, Department ${i + 1}`,
    phone: "+91-9876543210",
    email: `chair${i + 1}@gitam.in`
  }));
  
  const heads1 = Array(5).fill().map((_, i) => ({
    image: `/imgs/ContactUs/${(i % 6) + 1}.svg`,
    name: `Head ${i + 1}`,
    position: `Head, Division ${i + 1}`,
    phone: "+91-9876543210",
    email: `head${i + 1}@gitam.in`
  }));
  
  const heads2 = Array(5).fill().map((_, i) => ({
    image: `/imgs/ContactUs/${(i % 6) + 1}.svg`,
    name: `Head ${i + 6}`,
    position: `Head, Division ${i + 6}`,
    phone: "+91-9876543210",
    email: `head${i + 6}@gitam.in`
  }));
  
  const heads3 = Array(2).fill().map((_, i) => ({
    image: `/imgs/ContactUs/${(i % 6) + 1}.svg`,
    name: `Head ${i + 11}`,
    position: `Head, Division ${i + 11}`,
    phone: "+91-9876543210",
    email: `head${i + 11}@gitam.in`
  }));

  return (
    <motion.section 
      className="py-8 sm:py-12 md:py-24 relative overflow-hidden bg-[#f4e4c9]"
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

      {/* Page Heading */}
      <div className="w-full flex items-center justify-center mb-8 sm:mb-12 md:mb-16">
        <div className="relative flex items-center w-full max-w-4xl px-4">
          <div className="flex-grow h-[2px] bg-gradient-to-r from-transparent to-[#07534c]"></div>
          <h1 className="mx-4 sm:mx-6 md:mx-8 text-2xl sm:text-3xl md:text-4xl font-bold text-[#07534c]">
            OUR TEAM
          </h1>
          <div className="flex-grow h-[2px] bg-gradient-to-r from-[#07534c] to-transparent"></div>
        </div>
      </div>

      {/* Sections Container */}
      <div className="container mx-auto px-2 sm:px-4 space-y-8 sm:space-y-12 md:space-y-16">
        <TeamSection title="DIRECTOR" contacts={director} cardsPerRow={1} />
        <TeamSection title="MANAGEMENT" contacts={management} cardsPerRow={3} />
        <TeamSection title="COACHES" contacts={coaches} cardsPerRow={5} />
        <TeamSection title="CHAIRS" contacts={chairs} cardsPerRow={4} />
        <TeamSection title="HEADS" contacts={heads1} cardsPerRow={5} />
        <TeamSection title="HEADS" contacts={heads2} cardsPerRow={5} />
        <TeamSection title="HEADS" contacts={heads3} cardsPerRow={2} />
      </div>
    </motion.section>
  );
};

export default OurTeam;