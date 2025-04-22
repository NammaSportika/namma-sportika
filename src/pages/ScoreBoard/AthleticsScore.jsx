import React from 'react';
import { Trophy } from 'lucide-react';
import { motion } from 'framer-motion';

const AthleticsScore = () => {
  // Sample data for Athletics (M) 100Mts
  const athletics100MData = [
    {
      id: 1,
      name: "OPIO GLEN",
      college: "GITAM UNIVERSITY",
      position: "Winner",
      logo: "/imgs/icon/icon.svg" // Default logo path
    },
    {
      id: 2,
      name: "RAKESH",
      college: "GITAM UNIVERSITY",
      position: "Runner Up",
      logo: "/imgs/icon/icon.svg" // Default logo path
    }
  ];

  // Sample data for Athletics (M) 200Mts
  const athletics200MData = [
    {
      id: 1,
      name: "OPIO GLEN",
      college: "GITAM UNIVERSITY",
      position: "Winner",
      logo: "/imgs/icon/icon.svg" // Default logo path
    },
    {
      id: 2,
      name: "RAKESH",
      college: "GITAM UNIVERSITY",
      position: "Runner Up",
      logo: "/imgs/icon/icon.svg" // Default logo path
    }
  ];

  // Sample data for Athletics (W) 100Mts
  const athleticsW100MData = [
    {
      id: 1,
      name: "SUPRIYAT",
      college: "GITAM UNIVERSITY",
      position: "Winner",
      logo: "/imgs/icon/icon.svg" // Default logo path
    },
    {
      id: 2,
      name: "Angelin Elizabeth",
      college: "GITAM UNIVERSITY",
      position: "Runner Up",
      logo: "/imgs/icon/icon.svg" // Default logo path
    }
  ];

  const renderAthleticsTable = (title, data) => (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mb-8 px-3 md:px-8"
    >
      <div className="bg-[#07534c] rounded-xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
        <div className="bg-[#05433d] py-4 px-6 border-l-4 border-[#a58255]">
          <h2 className="text-xl font-bold text-[#e7fefe] tracking-wide">{title}</h2>
        </div>
        
        {/* Desktop Table (hidden on mobile) */}
        <div className="hidden md:block">
          <table className="w-full">
            <thead>
              <tr className="bg-[#07534c]/95 border-b-2 border-[#a58255]/30">
                <th className="p-4 text-center text-[#f4e4c9] font-semibold uppercase text-sm tracking-wider">College</th>
                <th className="p-4 text-center text-[#f4e4c9] font-semibold uppercase text-sm tracking-wider">Athlete</th>
                <th className="p-4 text-center text-[#f4e4c9] font-semibold uppercase text-sm tracking-wider">Position</th>
              </tr>
            </thead>
            <tbody>
              {data.map((athlete, index) => (
                <motion.tr 
                  key={athlete.id} 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="group even:bg-[#07534c]/80 hover:bg-[#05433d] transition-colors duration-200"
                >
                  <td className="p-4">
                    <div className="flex items-center space-x-4 justify-around">
                      <div className="h-12 w-12 rounded-full border-2 border-[#a58255] p-1 shadow-inner">
                        <img 
                          src={athlete.logo} 
                          alt={`${athlete.college} logo`}
                          className="h-full w-full rounded-full object-cover"
                          aria-label="College logo"
                        />
                      </div>
                      <span className="text-[#e7fefe] font-medium tracking-wide">{athlete.college}</span>
                    </div>
                  </td>
                  <td className="p-4 text-center text-[#e7fefe] font-medium group-hover:text-[#f4e4c9] transition-colors">
                    {athlete.name}
                  </td>
                  <td className="p-4 text-center">
                    <span className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-bold transition-transform hover:scale-105 ${
                      athlete.position === "Winner" 
                        ? "bg-[#a58255] text-[#05433d] shadow-md"
                        : "bg-[#a58255]/80 text-[#e7fefe] shadow-sm"
                    }`}>
                      <Trophy className="mr-2 h-4 w-4" />
                      {athlete.position}
                    </span>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Mobile Cards (shown only on mobile) */}
        <div className="md:hidden">
          {data.map((athlete, index) => (
            <motion.div
              key={athlete.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`p-4 border-b border-[#a58255]/20 ${index % 2 === 0 ? 'bg-[#07534c]/80' : 'bg-[#05433d]'}`}
            >
              <div className="flex flex-col space-y-3">
                {/* College with Logo */}
                <div className="flex items-center space-x-3">
                  <div className="h-10 w-10 rounded-full border-2 border-[#a58255] p-1 shadow-inner">
                    <img 
                      src={athlete.logo} 
                      alt={`${athlete.college} logo`}
                      className="h-full w-full rounded-full object-cover"
                    />
                  </div>
                  <span className="text-[#e7fefe] font-medium">{athlete.college}</span>
                </div>
                
                {/* Athlete Name */}
                <div className="flex justify-between items-center">
                  <span className="text-[#f4e4c9] font-semibold uppercase text-xs">Athlete</span>
                  <span className="text-[#e7fefe]">{athlete.name}</span>
                </div>
                
                {/* Position */}
                <div className="flex justify-between items-center">
                  <span className="text-[#f4e4c9] font-semibold uppercase text-xs">Position</span>
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${
                    athlete.position === "Winner" 
                      ? "bg-[#a58255] text-[#05433d]"
                      : "bg-[#a58255]/80 text-[#e7fefe]"
                  }`}>
                    <Trophy className="mr-1 h-3 w-3" />
                    {athlete.position}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );

  return (
    <main className="bg-[#f4e4c9] px-2 py-4 md:px-8 md:py-12 min-h-screen">
      <div className="container mx-auto max-w-4xl">
        <motion.header
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 100 }}
          className="mb-8 md:mb-12 flex justify-center"
        >
          <div className="flex items-center bg-[#07534c] px-4 md:px-8 py-3 md:py-4 rounded-xl shadow-2xl hover:scale-[1.02] transition-transform duration-300 border-2 border-[#a58255]/30">
            <Trophy className="mr-2 md:mr-3 h-6 w-6 md:h-8 md:w-8 text-[#a58255]" aria-label="Trophy icon" />
            <h1 className="text-lg md:text-3xl font-bold text-[#e7fefe]">
              Athletics Champions
            </h1>
          </div>
        </motion.header>

        {/* Event Tables (order remains same) */}
        {renderAthleticsTable("ATHLETICS (M) 100M", athletics100MData)}
        {renderAthleticsTable("ATHLETICS (M) 200M", athletics200MData)}
        {renderAthleticsTable("ATHLETICS (W) 100M", athleticsW100MData)}
      </div>
    </main>
  );
};

export default AthleticsScore;