import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SportDetailPage = ({ 
  title, 
  category, 
  description, 
  rules, 
  teamComposition, 
  format, 
  entryFee, 
  prizes, 
  image 
}) => {
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
    <div className="w-full bg-[#f4e4c9] min-h-screen py-12 px-4 md:px-10">
      {/* Back Button */}
      <div className="container mx-auto mb-6">
        <Link to="/events" className="inline-flex items-center text-[#004740] hover:text-[#a58255] transition-colors">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
          </svg>
          Back to Events
        </Link>
      </div>

      {/* Page Header */}
      <div className="w-full flex items-center justify-center my-6 md:my-8">
        <div className="relative flex items-center w-full max-w-6xl px-4">
          <div className="flex-grow h-[2px] bg-gradient-to-r from-transparent to-[#004740]"></div>
          <h1 className="mx-8 text-4xl font-bold text-[#004740]">{title.toUpperCase()}</h1>
          <div className="flex-grow h-[2px] bg-gradient-to-r from-[#004740] to-transparent"></div>
        </div>
      </div>

      <motion.div
        className="container mx-auto px-4 max-w-6xl"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={containerVariants}
      >

        {/* Content Section */}
        <motion.div variants={itemVariants} className="flex flex-col gap-8 mb-12">
          <div className="w-full">
            <h2 className="text-2xl font-bold text-[#004740] mb-4">{description}</h2>
            
            {/* Team Composition */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h3 className="text-xl font-bold text-[#004740] mb-3">Team Composition</h3>
              <p className="text-[#a58255] pl-2">{teamComposition}</p>
            </div>

            {/* Prize Information */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-bold text-[#004740] mb-4">Prize Information</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full border-collapse">
                  <thead>
                    <tr className="bg-[#07534c] text-white">
                      <th className="border px-4 py-3">Category</th>
                      <th className="border px-4 py-3">Entry Fee</th>
                      <th className="border px-4 py-3">1st Prize</th>
                      <th className="border px-4 py-3">2nd Prize</th>
                    </tr>
                  </thead>
                  <tbody>
                    {prizes.map((prize, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-[#f4e4c9]/50" : "bg-white"}>
                        <td className="border px-4 py-3 font-medium">{prize.category}</td>
                        <td className="border px-4 py-3">₹ {prize.entryFee}</td>
                        <td className="border px-4 py-3">₹ {prize.firstPrize}</td>
                        <td className="border px-4 py-3">₹ {prize.secondPrize}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Rules Section */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-xl font-bold text-[#004740] mb-4">General Rules</h3>
            <ul className="list-disc pl-5 space-y-2 text-[#333]">
              {rules.generalRules.map((rule, index) => (
                <li key={index}>{rule}</li>
              ))}
            </ul>

            <h3 className="text-xl font-bold text-[#004740] mt-6 mb-4">Format & Participation</h3>
            <ul className="list-disc pl-5 space-y-2 text-[#333]">
              {rules.formatRules.map((rule, index) => (
                <li key={index}>{rule}</li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Registration CTA */}
        <motion.div variants={itemVariants} className="text-center mb-12">
          <Link 
            to="/registration" 
            className="inline-block bg-[#07534c] hover:bg-[#004740] text-white font-bold py-3 px-8 rounded-lg shadow-md transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg"
          >
            Register for {title}
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default SportDetailPage;