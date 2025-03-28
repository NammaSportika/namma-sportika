import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const sportsList = [
  { id: 'athletics-men-100', name: 'Athletics Men 100', route: '/scoreboard/athletics-men-100' },
  { id: 'athletics-women-100', name: 'Athletics Women 100', route: '/scoreboard/athletics-women-100' },
  { id: 'athletics-men-200', name: 'Athletics Men 200', route: '/scoreboard/athletics-men-200' },
  { id: 'athletics-women-200', name: 'Athletics Women 200', route: '/scoreboard/athletics-women-200' },
  { id: 'basketball-men', name: 'Basketball Men', route: '/scoreboard/basketball-men' },
  { id: 'basketball-women', name: 'Basketball Women', route: '/scoreboard/basketball-women' },
  { id: 'chess', name: 'Chess', route: '/scoreboard/chess' },
  { id: 'cricket', name: 'Cricket', route: '/scoreboard/cricket' },
  { id: 'football', name: 'Football', route: '/scoreboard/football' },
  { id: 'throwball-men', name: 'Throwball Men', route: '/scoreboard/throwball-men' },
  { id: 'throwball-women', name: 'Throwball Women', route: '/scoreboard/throwball-women' },
  { id: 'kabaddi', name: 'Kabaddi', route: '/scoreboard/kabaddi' },
  { id: 'volleyball', name: 'Volleyball', route: '/scoreboard/volleyball' }
];

const SportsList = () => {
  return (
    <main className="bg-[#f4e4c9] min-h-screen px-4 py-8 md:px-8 md:py-12">
      <div className="container mx-auto max-w-4xl">
        {/* Header Section */}
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 flex items-center justify-center"
        >
          <div className="flex items-center bg-[#07534c] px-6 py-3 rounded-full shadow-md">
            <Trophy className="mr-2 h-6 w-6 text-[#a58255]" />
            <h1 className="text-2xl font-black text-[#e7fefe]">Namma Sportika 2025</h1>
          </div>
        </motion.header>

        {/* Sports Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-2 gap-4"
        >
          {sportsList.map((sport, index) => (
            <motion.div
              key={sport.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: index * 0.1 }}
              className={index === 6 ? 'col-span-2' : ''}
            >
              <Link to={sport.route} className="block">
                <div className="bg-gradient-to-br from-[#07534c] to-[#05433d] rounded-xl shadow-md hover:shadow-lg transition-all duration-300 ease-in-out transform hover:-translate-y-1">
                  <div className="flex items-center justify-between p-4">
                    <span className="text-lg font-bold text-[#e7fefe]">
                      {sport.name}
                    </span>
                    <ChevronRight className="text-[#a58255] h-6 w-6" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </main>
  );
};

export default SportsList;