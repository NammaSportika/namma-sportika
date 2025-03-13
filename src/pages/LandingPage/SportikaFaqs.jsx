import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronDown, FiSearch, FiInstagram } from 'react-icons/fi';
import { FaTrophy } from 'react-icons/fa';
import { RiTeamFill } from 'react-icons/ri';
import { MdSportsHandball, MdOutlineSchool } from 'react-icons/md';
import { FaRegQuestionCircle, FaRegListAlt } from 'react-icons/fa';

const SportikaFaqs = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredFaqs, setFilteredFaqs] = useState([]);

  const faqs = [
    {
      icon: <FaRegQuestionCircle className="text-[#004740] text-xl" />,
      question: "What is Sportika?",
      answer: "NammaSportika is GITAM's sports meet platform, dedicated to promoting a competitive sporting culture through various sports events."
    },
    {
      icon: <RiTeamFill className="text-[#004740] text-xl" />,
      question: "How can I register for a Sportika event?",
      answer: "Visit our website <br /> <a href='https://namma-sportika.gitam.edu' target='_blank' rel='noopener noreferrer' class='text-[#a0ffff] hover:underline'>🔗namma-sportika.gitam.edu</a><br />Click on <a href='https://namma-sportika.gitam.edu/registration' target='_blank' rel='noopener noreferrer' class='text-[#a0ffff] hover:underline'>Registration</a>, fill out the Form and complete the payment."
    },
    {
      icon: <FaRegListAlt className="text-[#004740] text-xl" />,
      question: "What sports activities does Sportika offer?",
      answer: "Sportika features a wide range of sports, including football, basketball, chess, cricket, and more. Check our brochure for complete details."
    },
    {
      icon: <MdOutlineSchool className="text-[#004740] text-xl" />,
      question: "Is Sportika open to all universities and engineering colleges?",
      answer: "Yes, it is open to all universities and engineering colleges."
    },
    {
      icon: <FiInstagram className="text-[#004740] text-xl" />,
      question: "How can I get updates on Sportika?",
      answer: "Follow us on Instagram: <a href='https://www.instagram.com/sportika.gitam' target='_blank' rel='noopener noreferrer' class='text-[#a0ffff] hover:underline'>Sportika Instagram</a>"
    },
    {
      icon: <FaTrophy className="text-[#004740] text-xl" />,
      question: "Are there prizes for the winners?",
      answer: "Yes!\n Athletics: ₹2500 (Winner), ₹1500 (Runner-up)\nChess: ₹5000 (Winner), ₹3000 (Runner-up)\nOther sports: ₹10,000 (Winner), ₹7,000 (Runner-up)"
    }
  ];

  // Filter FAQs based on search term
  useEffect(() => {
    const filtered = faqs.filter(faq => 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredFaqs(filtered);
  }, [searchTerm]);

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
      y: 10 
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4
      }
    }
  };

  // Format the answer text to handle newlines and HTML properly
  const formatAnswer = (answer) => {
    if (answer.includes('<a href')) {
      return <div dangerouslySetInnerHTML={{ __html: answer }} />;
    }
    
    return answer.split('\n').map((line, i) => (
      <React.Fragment key={i}>
        {line}
        {i < answer.split('\n').length - 1 && <br />}
      </React.Fragment>
    ));
  };

  return (
    <motion.section 
      className="bg-gradient-to-b from-[#f4e4c9] to-[#f9edd8] pb-10 px-4 md:px-8 relative overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header with Page Heading */}
        <motion.header 
          className="mb-12 text-center"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-full flex items-center justify-center my-8 md:my-12">
            <div className="relative flex items-center w-full max-w-4xl px-4">
              {/* Left Line */}
              <div className="flex-grow h-[2px] bg-gradient-to-r from-transparent to-[#004740]"></div>
              {/* Heading Text */}
              <h1 className="mx-8 text-4xl font-bold text-[#004740]">
                FAQs
              </h1>
              {/* Right Line */}
              <div className="flex-grow h-[2px] bg-gradient-to-r from-[#004740] to-transparent"></div>
            </div>
          </div>                   
        </motion.header>

        {/* FAQ Items */}
        <div className="space-y-4">
          {(searchTerm ? filteredFaqs : faqs).length > 0 ? (
            (searchTerm ? filteredFaqs : faqs).map((faq, index) => (
              <motion.div
                key={index}
                className="rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                variants={itemVariants}
              >
                <motion.button
                  className={`w-full p-6 text-left bg-white bg-opacity-70 backdrop-blur-sm rounded-2xl flex items-center justify-between ${
                    openIndex === index ? 'rounded-b-none border-b border-[#004740] border-opacity-10' : ''
                  }`}
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.85)" }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="flex items-center">
                    <div className="mr-4 bg-[#f4e4c9] p-2 rounded-full">
                      {faq.icon}
                    </div>
                    <span className="text-[#004740] font-semibold text-lg">{faq.question}</span>
                  </div>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="bg-[#f4e4c9] p-2 rounded-full flex-shrink-0 ml-2"
                  >
                    <FiChevronDown className="text-[#004740] text-lg" />
                  </motion.div>
                </motion.button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-[#07534c] overflow-hidden"
                    >
                      <div className="p-6 text-[#e7fefe] leading-relaxed">
                        {formatAnswer(faq.answer)}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          ) : (
            <motion.div 
              className="text-center py-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <p className="text-[#004740] text-lg">No FAQs match your search. Try different keywords.</p>
              <button 
                onClick={() => setSearchTerm('')}
                className="mt-4 px-6 py-2 bg-[#004740] text-white rounded-full hover:bg-[#07534c] transition-colors duration-300"
              >
                Show all FAQs
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default SportikaFaqs;