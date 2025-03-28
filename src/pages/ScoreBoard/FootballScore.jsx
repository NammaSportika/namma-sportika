import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Trophy, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import { fetchScores } from '../../pages/ScoreBoardAdmin/firebaseUtils';

const FootballMatchCard = ({ match, index }) => {
  // Determine the match title based on matchType
  const matchTitle = match.matchType 
    ? `${match.matchType}` 
    : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="relative w-full max-w-2xl mx-auto mb-6 px-4"
    >
      {/* Main Card */}
      <motion.div
        whileHover={{ y: -2 }}
        className="overflow-hidden rounded-xl bg-gradient-to-br from-[#07534c] to-[#05433d] shadow-lg cursor-pointer"
      >
        {/* Match Type Banner */}
        <div className="border-b border-[#a58255]/20 bg-[#07534c]/90 py-2 text-center backdrop-blur-sm">
          <span className="text-sm font-bold text-[#e7fefe] tracking-wider">
            {matchTitle}
          </span>
        </div>

        {/* Card Content */}
        <div className="p-4">
          <div className="flex flex-col items-center">
            {/* Teams Scores */}
            <div className="flex w-full justify-between items-center relative">
              {/* Team 1 */}
              <div className="flex flex-col items-center w-[45%]">
                <div className="relative mb-2 h-16 w-16 md:h-20 md:w-20">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="absolute inset-0 rounded-full border-2 border-[#a58255] p-1"
                  >
                    <img 
                      src={match.team1?.logo || '/imgs/icon/icon.svg'} 
                      alt={`${match.team1?.name} logo`}
                      className="h-full w-full rounded-full object-cover"
                    />
                  </motion.div>
                </div>
                <h2 className="mb-2 text-center text-sm md:text-lg font-black text-[#e7fefe] truncate w-full">
                  {match.team1?.name}
                </h2>
                <div className="w-full rounded-lg bg-[#a58255]/20 p-2 text-center">
                  <p className="text-xl md:text-3xl font-black text-[#e7fefe]">{match.team1?.score}</p>
                </div>
              </div>

              {/* VS */}
              <div className="absolute left-1/2 -translate-x-1/2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#a58255] text-[#07534c] font-bold">
                  VS
                </div>
              </div>

              {/* Team 2 */}
              <div className="flex flex-col items-center w-[45%]">
                <div className="relative mb-2 h-16 w-16 md:h-20 md:w-20">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="absolute inset-0 rounded-full border-2 border-[#a58255] p-1"
                  >
                    <img 
                      src={match.team2?.logo || '/imgs/icon/icon.svg'} 
                      alt={`${match.team2?.name} logo`}
                      className="h-full w-full rounded-full object-cover"
                    />
                  </motion.div>
                </div>
                <h2 className="mb-2 text-center text-sm md:text-lg font-black text-[#e7fefe] truncate w-full">
                  {match.team2?.name}
                </h2>
                <div className="w-full rounded-lg bg-[#a58255]/20 p-2 text-center">
                  <p className="text-xl md:text-3xl font-black text-[#e7fefe]">{match.team2?.score}</p>
                </div>
              </div>
            </div>

            {/* Winner Display */}
            {match.winner && (
              <div className="mt-4 w-full px-4">
                <div className="flex items-center justify-center space-x-2 rounded-lg bg-[#a58255]/30 p-2">
                  <Award className="h-5 w-5 text-[#e7fefe]" />
                  <span className="text-sm font-bold text-[#e7fefe]">Winner: {match.winner}</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const FootballScore = () => {
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMatches = async () => {
      try {
        setLoading(true);
        // Fetch football matches from Firebase
        const scores = await fetchScores('football');
        
        if (scores.length === 0) {
          setMatches([]);
          return;
        }
        
        // Format the scores to match the expected structure
        const formattedMatches = scores.map(score => ({
          id: score.id,
          team1: score.team1 || { name: 'Team 1', logo: '/imgs/icon/icon.svg', score: '0' },
          team2: score.team2 || { name: 'Team 2', logo: '/imgs/icon/icon.svg', score: '0' },
          date: score.date || 'TBD',
          ground: score.ground || 'Main Ground',
          matchType: score.matchType || 'Football',
          winner: score.winner || ''
        }));
        
        setMatches(formattedMatches);
      } catch (err) {
        console.error('Error fetching football matches:', err);
        setError('Failed to load matches. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getMatches();
  }, []);

  return (
    <main className="bg-[#f4e4c9] px-2 py-4 md:px-8 md:py-12 min-h-screen">
      <div className="container mx-auto max-w-5xl">
        {/* Header Section */}
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 flex items-center justify-center"
        >
          <div className="flex items-center bg-[#07534c] px-6 py-3 rounded-full shadow-md">
            <Trophy className="mr-2 h-6 w-6 text-[#a58255]" />
            <h1 className="text-2xl font-black text-[#e7fefe]">Football</h1>
          </div>
        </motion.header>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#07534c] border-r-transparent"></div>
            <p className="mt-2 text-[#07534c]">Loading matches...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Matches Display */}
        {!loading && !error && matches.length > 0 && (
          <section className="space-y-6">
            {matches.map((match, index) => (
              <FootballMatchCard key={match.id || index} match={match} index={index} />
            ))}
          </section>
        )}

        {/* No Matches State */}
        {!loading && !error && matches.length === 0 && (
          <div className="text-center py-8 bg-[#07534c]/10 rounded-xl">
            <p className="text-[#07534c]">No matches scheduled yet.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default FootballScore;