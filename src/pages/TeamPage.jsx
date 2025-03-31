import React from 'react';
import { motion } from 'framer-motion';
import { FiPhone, FiMail, FiUser, FiBriefcase } from 'react-icons/fi';

const TeamCard = ({ contact }) => {
  return (
    <motion.div
      className="h-full w-full min-w-0"
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

        <div className="p-2 sm:p-3 md:p-4 flex-grow">
          <div className="flex items-start gap-1 sm:gap-2 mb-1">
            <FiUser className="text-[#e7fefe] w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-1" />
            <h3 className="text-[#e7fefe] font-semibold text-xs sm:text-sm md:text-base break-words">{contact.name}</h3>
          </div>
          <div className="flex items-start gap-1 sm:gap-2">
            <FiBriefcase className="text-[#e7fefe] w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0 mt-1" />
            <p className="text-[#e7fefe] text-xs sm:text-sm break-words">{contact.position}</p>
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

const TeamSection = ({ title, contacts, cardsPerRow, noHeading }) => {
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
      {!noHeading && <SectionHeading title={title} />}
      <div 
        className="grid gap-3 mx-auto" 
        style={{ 
          gridTemplateColumns: `repeat(${cardsPerRow}, minmax(0, 1fr))`,
          maxWidth: `calc(${cardsPerRow} * 240px)` // Adjust based on max card width
        }}
      >
        {contacts.map((contact, index) => (
          <motion.div
            key={index}
            className="min-w-0" // Allow card to shrink below default size
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
      image: "/imgs/Team/1.png",
      name: "Dr. Reema Chaudhury",
      position: "Director - Campus Life"
    }
  ];
  
  const management = [
    {
      image: "/imgs/Team/9.png",
      name: "Luther",
      position: "Manager - DOS"
    },
    {
      image: "/imgs/Team/8.png",
      name: "Vamsi",
      position: "Assistant Director - PEY"
    },
    {
      image: "/imgs/Team/7.png",
      name: "Bharath K G",
      position: "Assistant Manager - DOS"
    }
  ];
  
  const coaches = [
    {
      image: "/imgs/Team/3.png",
      name: "Chandranand",
      position: "Kabaddi Coach"
    },
    {
      image: "/imgs/Team/2.png",
      name: "Pagutharivalan",
      position: "Football Coach"
    },
    {
      image: "/imgs/Team/4.png",
      name: "Nagarjun",
      position: "Basketball Coach"
    },
    {
      image: "/imgs/Team/5.png",
      name: "Nisha",
      position: "Fitness Coach"
    },
    {
      image: "/imgs/Team/6.png",
      name: "Kiran",
      position: "Volleyball Coach"
    }
  ]
  
  const chairs = [
    {
      image: "/imgs/Team/10.png",
      name: "Phileman",
      position: "Chair"
    },
    {
      image: "/imgs/Team/11.png",
      name: "Kishan",
      position: "Chair"
    },
    {
      image: "/imgs/Team/12.png",
      name: "Pushkar",
      position: "Chair"
    },
    {
      image: "/imgs/Team/13.png",
      name: "Nehitha",
      position: "Chair"
    }
  ]

  const heads = [
    {
      image: "/imgs/Team/14.png",
      name: "Sunanda",
      position: "Design & Media"
    },
    {
      image: "/imgs/Team/17.png",
      name: "Manya",
      position: "Marketing"
    },
    {
      image: "/imgs/Team/16.png",
      name: "Vanshika",
      position: "Marketing"
    },
    {
      image: "/imgs/TeamPics/2.svg",
      name: "Sidhartha",
      position: "Technology"
    },
    {
      image: "/imgs/Team/18.png",
      name: "Thanmai",
      position: "Food & Accommodation"
    },
    {
      image: "/imgs/Team/19.png",
      name: "Prajwal",
      position: "Officiating Committee"
    },
    {
      image: "/imgs/Team/20.png",
      name: "Ravitreni",
      position: "Finance & Budgeting"
    },
    {
      image: "/imgs/Team/21.png",
      name: "Srimaan",
      position: "Volunteers / Medic"
    },
    {
      image: "/imgs/Team/22.png",
      name: "Karthik",
      position: "Inauguration & Prize Distribution"
    },
    {
      image: "/imgs/Team/15.png",
      name: "Kundan",
      position: "Materials & Logistics"
    },
    {
      image: "/imgs/Team/23.png",
      name: "Harsha",
      position: "External Relations"
    },
    {
      image: "/imgs/Team/24.png",
      name: "Sudarshan",
      position: "Printing & Stationery"
    },
    {
      image: "/imgs/Team/25.png",
      name: "Chirag",
      position: "Press & Outreach"
    },
    {
      image: "/imgs/Team/26.png",
      name: "Aryaman",
      position: "Registration & Transportation"
    }
  ]
  
  return (
    <motion.section 
      className="py-8 sm:py-12 md:py-10 relative overflow-hidden bg-[#f4e4c9]"
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
      <div className="container mx-auto px-2 space-y-8 sm:space-y-12 md:space-y-16">
        <TeamSection title="DIRECTOR" contacts={director} cardsPerRow={1} />
        <TeamSection title="MANAGEMENT" contacts={management} cardsPerRow={3} />
        <TeamSection title="COACHES" contacts={coaches} cardsPerRow={5} />
        <TeamSection title="CHAIRS" contacts={chairs} cardsPerRow={4} />
        
        {/* Modified HEADS section - With responsive grid for mobile */}
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
          <SectionHeading title="HEADS" />
          {/* Responsive grid that shows 3 cards per row on mobile, 5 on larger screens */}
          <div className="grid grid-cols-3 md:grid-cols-5 gap-3 mx-auto max-w-full md:max-w-[calc(5*240px)]">
            {heads.map((contact, index) => (
              <motion.div
                key={index}
                className="min-w-0"
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
      </div>
    </motion.section>
  );
};

export default OurTeam;