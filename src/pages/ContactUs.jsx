import React from 'react';
import { FiPhone, FiMail, FiUser, FiBriefcase } from 'react-icons/fi';
import { motion } from 'framer-motion';

const ContactUs = () => {
  const brandColors = {
    primary: "#07534c",
    secondary: "#a58255",
    background: "#f4e4c9",
    accent: "#e7fefe",
    heading: "#f9f871"
  };

  return (
    <div className="w-full bg-[#f4e4c9] py-4 sm:py-6 md:py-8 min-h-screen px-3 sm:px-4 md:px-6">
      {/* CONTACT US Page Heading */}
      <div className="w-full flex items-center justify-center my-4 sm:my-6 md:my-8 lg:my-12">
        <div className="relative flex items-center w-full max-w-6xl">
          <div className="flex-grow h-[2px] bg-gradient-to-r from-transparent to-[#004740]"></div>
          <h1 className="mx-3 sm:mx-5 md:mx-8 text-2xl sm:text-3xl md:text-4xl font-bold text-[#004740] whitespace-nowrap">
            CONTACT US
          </h1>
          <div className="flex-grow h-[2px] bg-gradient-to-r from-[#004740] to-transparent"></div>
        </div>
      </div>

      {/* Contact Information Grid */}
      <div className="grid grid-cols-1 md:grid-cols-1  gap-4 sm:gap-5 md:gap-6 max-w-xl mx-auto">
        {/* Managers Card */}
        <div className="md:col-span-1 sm:w-3/4 mx-auto md:w-full">
          <div className="bg-[#07534c] rounded-lg shadow-md overflow-hidden">
            <div className="relative flex items-center justify-center py-3 sm:py-4 md:py-5">
              <div className="absolute left-4 sm:left-5 md:left-6 right-4 sm:right-5 md:right-6 h-[2px]"></div>
              <h2 className="font-bold text-xl sm:text-2xl text-[#f9f871] bg-[#07534c] px-3 sm:px-4 relative z-10">
                Staff
              </h2>
            </div>
            <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
              {/* Contact Card */}
              <div className="flex items-center justify-between bg-[#a58255] rounded-lg p-3 sm:p-4">
                <p className="text-[#e7fefe] font-medium text-base sm:text-lg truncate pr-2">
                  Mr. D. Vamsi
                </p>
                {/* <a
                  href="tel:7349495176"
                  className="flex items-center gap-1 sm:gap-2 text-[#e7fefe] hover:text-white transition-colors whitespace-nowrap"
                >
                  <FiPhone />
                  <span className="font-medium">7349495176</span>
                </a> */}
              </div>
              <div className="flex items-center justify-between bg-[#a58255] rounded-lg p-3 sm:p-4">
                <a
                  href="mailto:nammasportika@gmail.com"
                  className="flex items-center gap-1 sm:gap-2 w-full text-[#e7fefe] hover:text-white transition-colors"
                >
                  <FiMail className="shrink-0" />
                  <span className="font-medium text-sm sm:text-base md:text-base truncate">
                    nammasportika@gmail.com
                  </span>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Student Co-ordinators Card */}
        {/* <div className="md:col-span-1 sm:w-3/4 mx-auto md:w-full">
          <div className="bg-[#07534c] rounded-lg shadow-md overflow-hidden">
            <div className="relative flex items-center justify-center py-3 sm:py-4 md:py-5">
              <div className="absolute left-4 sm:left-5 md:left-6 right-4 sm:right-5 md:right-6 h-[2px]"></div>
              <h2 className="font-bold text-xl sm:text-2xl text-[#f9f871] bg-[#07534c] px-3 sm:px-4 relative z-10">
                Student Co-ordinators
              </h2>
            </div>
            <div className="p-3 sm:p-4 space-y-3 sm:space-y-4">
              <div className="flex items-center justify-between bg-[#a58255] rounded-lg p-3 sm:p-4">
                <p className="text-[#e7fefe] font-medium text-base sm:text-lg truncate pr-2">
                  Pushkar Desai
                </p>
                <a
                  href="tel:9013540059"
                  className="flex items-center gap-1 sm:gap-2 text-[#e7fefe] hover:text-white transition-colors whitespace-nowrap"
                >
                  <FiPhone />
                  <span className="font-medium">9013540059</span>
                </a>
              </div>
              <div className="flex items-center justify-between bg-[#a58255] rounded-lg p-3 sm:p-4">
                <p className="text-[#e7fefe] font-medium text-base sm:text-lg truncate pr-2">
                  K Phileman
                </p>
                <a
                  href="tel:9924156469"
                  className="flex items-center gap-1 sm:gap-2 text-[#e7fefe] hover:text-white transition-colors whitespace-nowrap"
                >
                  <FiPhone />
                  <span className="font-medium">9924156469</span>
                </a>
              </div>
              <div className="flex items-center justify-between bg-[#a58255] rounded-lg p-3 sm:p-4">
                <p className="text-[#e7fefe] font-medium text-base sm:text-lg truncate pr-2">
                  Thota Kishan
                </p>
                <a
                  href="tel:8790908330"
                  className="flex items-center gap-1 sm:gap-2 text-[#e7fefe] hover:text-white transition-colors whitespace-nowrap"
                >
                  <FiPhone />
                  <span className="font-medium">8790908330</span>
                </a>
              </div>
            </div>
          </div>
        </div> */}
      </div>

      {/* OUR TEAM Section */}
      <OurTeam />
    </div>
  );
};

const TeamCard = ({ contact }) => {
  return (
    <div className="h-full w-full px-4 py-3">
      <div className="bg-[#a58255] rounded-xl overflow-hidden shadow-md h-full flex flex-col">
        <div className="aspect-square bg-[#07534c]">
          <img
            src={contact.image || "/imgs/placeholder.svg"}
            alt={contact.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </div>

        {/* Always visible content */}
        <div className="p-3 flex flex-col gap-2">
          <div className="flex items-center gap-2">
            <FiUser className="text-[#e7fefe] w-4 h-4" />
            <h3 className="text-[#e7fefe] font-semibold text-sm line-clamp-1">
              {contact.name}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <FiBriefcase className="text-[#e7fefe] w-4 h-4" />
            <a
              href={contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#e7fefe] text-xs line-clamp-1 hover:underline"
            >
              LinkedIn Profile
            </a>
          </div>

          <div className="flex items-center gap-2">
            <FiMail className="text-[#e7fefe] w-4 h-4" />
            <p className="text-[#e7fefe] text-xs line-clamp-1">
              {contact.email}
            </p>
          </div>

          {/* <div className="flex items-center gap-2">
            <FiPhone className="text-[#e7fefe] w-4 h-4" />
            <p className="text-[#e7fefe] text-xs">
              {contact.phone}
            </p>
          </div> */}
        </div>
      </div>
    </div>
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


const TeamSection = ({ title, contacts }) => {
  return (
    <motion.div
      className="w-full"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.1, delayChildren: 0.2 }
        }
      }}
    >
      <SectionHeading title={title} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mx-auto max-w-5xl">
        {contacts.map((contact, index) => (
          <motion.div
            key={index}
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
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
  const developers = [
    {
      image: "/imgs/TeamPics/1.svg",
      name: "Vansh Agrawal",
      linkedin: "https://www.linkedin.com/in/agrawalvansh/",
      // phone: "+91-7378882317",
      email: "agrawalvanshn@gmail.com"
    },
    {
      image: "/imgs/TeamPics/3.svg",
      name: "Adarsha T A",
      linkedin: "https://www.linkedin.com/in/adarsha-thonder/",
      // phone: "+91-8073638086",
      email: "athonder@gitam.in"
    },
    {
      image: "/imgs/TeamPics/2.svg",
      name: "Sidhartha Varma",
      linkedin: "https://www.linkedin.com/in/sidhartha-varma-konduru-67224134a/",
      // phone: "+91-7032192991",
      email: "skonduru2005@gmail.com"
    }
  ];

  return (
    <motion.section 
      className="py-8 sm:py-12 md:py-12 relative overflow-hidden bg-[#f4e4c9]"
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
      {/* Team Section */}
      <div className="container mx-auto px-2 sm:px-4">
        <TeamSection title="DEVELOPERS" contacts={developers} />
      </div>
    </motion.section>
  );
};

export default ContactUs;