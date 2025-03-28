import React, { useState, useEffect } from 'react';
import { Trophy } from 'lucide-react';
import { motion } from 'framer-motion';
import { fetchScores } from '../../pages/ScoreBoardAdmin/firebaseUtils';

const ChessStandings = () => {
  const [chessStandings, setChessStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getScores = async () => {
      try {
        setLoading(true);
        // Use the sport ID that matches the ID in the SPORTS array in SportsAdmin.jsx
        const scores = await fetchScores('chess');
        
        if (scores.length === 0) {
          setChessStandings([]);
          return;
        }
        
        // Map the scores to match the expected format
        const formattedScores = scores.map(score => ({
          id: score.id,
          rank: parseInt(score.rank) || 0,
          name: score.name || '',
          score: score.score || '0'
        }));
        
        // Sort by rank
        const sortedScores = formattedScores.sort((a, b) => a.rank - b.rank);
        setChessStandings(sortedScores);
      } catch (err) {
        console.error('Error fetching chess scores:', err);
        setError('Failed to load scores. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    getScores();
  }, []);

  return (
    <main className="bg-[#f4e4c9] px-2 py-4 md:px-8 md:py-12 min-h-screen">
      <div className="container mx-auto max-w-4xl">
        {/* Header Section */}
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 flex items-center justify-center"
        >
          <div className="flex items-center bg-[#07534c] px-6 py-3 rounded-full shadow-md">
            <Trophy className="mr-2 h-6 w-6 text-[#a58255]" />
            <h1 className="text-2xl font-black text-[#e7fefe]">Chess Standings</h1>
          </div>
        </motion.header>

        {/* Loading and Error States */}
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-[#07534c] border-r-transparent"></div>
            <p className="mt-2 text-[#07534c]">Loading scores...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Standings Table */}
        {!loading && !error && chessStandings.length > 0 && (
          <div className="bg-gradient-to-br from-[#07534c] to-[#05433d] rounded-xl shadow-lg overflow-hidden">
            <table className="w-full text-[#e7fefe]">
              <thead className="bg-[#07534c]/90 border-b border-[#a58255]/20">
                <tr>
                  <th className="p-3 text-center">Rank</th>
                  <th className="p-3 text-center">Name</th>
                  <th className="p-3 text-center">Score</th>
                </tr>
              </thead>
              <tbody>
                {chessStandings.map((player, index) => (
                  <motion.tr 
                    key={player.id || index} 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-[#a58255]/20 last:border-b-0 hover:bg-[#a58255]/10 transition-colors"
                  >
                    <td className="p-3 text-center font-bold">{player.rank}</td>
                    <td className="p-3 text-center">{player.name}</td>
                    <td className="p-3 text-center font-bold">{player.score}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* No Data State */}
        {!loading && !error && chessStandings.length === 0 && (
          <div className="text-center py-8 bg-[#07534c]/10 rounded-xl">
            <p className="text-[#07534c]">No standings data available yet.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default ChessStandings;