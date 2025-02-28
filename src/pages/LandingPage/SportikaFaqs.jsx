import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown } from 'react-icons/fi';
import { FlipText } from '../../components/ui/flip-text';

const SportikaFaqs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "What is Sportika 2025?",
      answer: "Sportika 2025 is an annual sports and cultural festival hosted by the Academy of Technology, focusing on collaboration, teamwork, and competition in various events.",
    },
    {
      question: "How can I register for Sportika 2025?",
      answer: "You can register for Sportika 2025 through our official website. Look for the 'Registration' tab to fill out the form and secure your participation.",
    },
    {
      question: "What events are included in Sportika 2025?",
      answer: "Sportika 2025 includes a variety of sports events, cultural activities, workshops, and team-building challenges designed to promote creativity and sportsmanship.",
    },
    {
      question: "What is Sportika 2025?",
      answer: "Sportika 2025 is GITAM's flagship sports festival that brings together athletes and sports enthusiasts from across the country.",
    },
    {
      question: "What is Sportika 2025?",
      answer: "Sportika 2025 is an annual sports and cultural festival hosted by the Academy of Technology, focusing on collaboration, teamwork, and competition in various events.",
    },
    {
      question: "How can I register for Sportika 2025?",
      answer: "You can register for Sportika 2025 through our official website. Look for the 'Registration' tab to fill out the form and secure your participation.",
    },
    {
      question: "What events are included in Sportika 2025?",
      answer: "Sportika 2025 includes a variety of sports events, cultural activities, workshops, and team-building challenges designed to promote creativity and sportsmanship.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { 
      opacity: 0,
      x: -20 
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.section 
      className="bg-[#f4e4c9] py-16 px-4 md:px-8 relative overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Film strip design elements */}
      <div className="absolute top-0 right-0 flex gap-4">
        {[...Array(8)].map((_, i) => (
          <div key={i} className="w-16 h-16 bg-white opacity-10" />
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header with Page Heading */}
        <header className="py-8">
          <div className="flex items-center justify-center w-full max-w-5xl px-4 mx-auto">
            <div className="flex-grow h-px bg-gradient-to-r from-transparent to-[#004740]"></div>
            <h1 className="mx-8 text-4xl font-bold text-[#004740]">
              FAQS
            </h1>
            <div className="flex-grow h-px bg-gradient-to-r from-[#004740] to-transparent"></div>
          </div>
        </header>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              className="rounded-2xl overflow-hidden"
              variants={itemVariants}
            >
              <motion.button
                className={`w-full p-6 text-left bg-[#f4e4c9] rounded-2xl flex items-center justify-between ${
                  openIndex === index ? 'rounded-b-none' : ''
                }`}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                whileHover={{ scale: 1.01 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-[#004740] font-bold text-lg">{faq.question}</span>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiChevronDown className="text-[#004740] text-2xl" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-[#e7fefe] overflow-hidden"
                  >
                    <p className="p-6 text-[#004740]">{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default SportikaFaqs;
