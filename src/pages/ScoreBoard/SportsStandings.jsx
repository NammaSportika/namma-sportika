import React, { useState, useEffect } from 'react';
import { Trophy, Medal, Loader2, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import { fetchScores } from '../../pages/ScoreBoardAdmin/firebaseUtils';
import { colleges } from '../../pages/ScoreBoardAdmin/firebaseUtils';

const SportsStandings = () => {
  const [standings, setStandings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sportCategories, setSportCategories] = useState([
    { id: 'all', name: 'All Sports' },
    { id: 'team', name: 'Team Sports' },
    { id: 'track', name: 'Track Events' },
    { id: 'chess', name: 'Chess' }
  ]);
  const [allScoresData, setAllScoresData] = useState({});

  useEffect(() => {
    const fetchAllScores = async () => {
      try {
        setLoading(true);
        
        // Define all sport IDs to fetch
        const sportIds = [
          'basketball-men', 'basketball-women', 'football', 'cricket',
          'kabaddi', 'throwball-men', 'throwball-women', 'volleyball',
          'athletics-men-100', 'athletics-women-100', 'athletics-men-200', 'athletics-women-200',
          'chess'
        ];
        
        // Create an object to store all scores
        const allScores = {};
        
        // Fetch scores for each sport
        for (const sportId of sportIds) {
          const scores = await fetchScores(sportId);
          allScores[sportId] = scores;
        }
        
        // Save all scores data for filtering later
        setAllScoresData(allScores);
        
        // Calculate standings
        const collegeStandings = calculateStandings(allScores, 'all');
        
        // Sort by total medals/points
        const sortedStandings = collegeStandings.sort((a, b) => {
          // First sort by gold medals
          if (b.gold !== a.gold) return b.gold - a.gold;
          // Then by silver medals
          if (b.silver !== a.silver) return b.silver - a.silver;
          // Then by bronze medals
          if (b.bronze !== a.bronze) return b.bronze - a.bronze;
          // Finally by total points
          return b.totalPoints - a.totalPoints;
        });
        
        // Add ranks
        const rankedStandings = sortedStandings.map((college, index) => ({
          ...college,
          rank: index + 1
        }));
        
        setStandings(rankedStandings);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching scores:', error);
        setError('Failed to load standings. Please try again later.');
        setLoading(false);
      }
    };
    
    fetchAllScores();
  }, []);
  
  // Effect to recalculate standings when category changes
  useEffect(() => {
    if (!loading && Object.keys(allScoresData).length > 0) {
      // Calculate standings for the selected category
      const collegeStandings = calculateStandings(allScoresData, selectedCategory);
      
      // Sort by total medals/points
      const sortedStandings = collegeStandings.sort((a, b) => {
        // First sort by gold medals
        if (b.gold !== a.gold) return b.gold - a.gold;
        // Then by silver medals
        if (b.silver !== a.silver) return b.silver - a.silver;
        // Then by bronze medals
        if (b.bronze !== a.bronze) return b.bronze - a.bronze;
        // Finally by total points
        return b.totalPoints - a.totalPoints;
      });
      
      // Add ranks
      const rankedStandings = sortedStandings.map((college, index) => ({
        ...college,
        rank: index + 1
      }));
      
      setStandings(rankedStandings);
    }
  }, [selectedCategory, allScoresData, loading]);
  
  // Helper function to get base college name (remove "Team A", "Team B", etc.)
  const getBaseCollegeName = (collegeName) => {
    // Check if the college name contains "Team"
    if (collegeName && collegeName.includes('Team')) {
      // Extract the base name (everything before "Team")
      const baseName = collegeName.split('Team')[0].trim();
      return baseName;
    }
    return collegeName;
  };
  
  // Function to calculate standings based on all scores
  const calculateStandings = (allScores, category) => {
    // Initialize a map to consolidate college data
    const collegeMap = new Map();
    
    // Initialize entries for all colleges
    colleges.forEach(college => {
      const baseName = getBaseCollegeName(college.name);
      
      if (!collegeMap.has(baseName)) {
        collegeMap.set(baseName, {
          name: baseName,
          logo: college.logo,
          gold: 0,
          silver: 0,
          bronze: 0,
          totalPoints: 0,
          variants: [college.name]
        });
      } else {
        // Add this variant to the existing college entry
        const existing = collegeMap.get(baseName);
        if (!existing.variants.includes(college.name)) {
          existing.variants.push(college.name);
        }
      }
    });
    
    // Convert map to array for processing
    const collegeStandings = Array.from(collegeMap.values());
    
    // Define sport categories
    const teamSports = ['basketball-men', 'basketball-women', 'football', 'cricket', 
                        'kabaddi', 'throwball-men', 'throwball-women', 'volleyball'];
    const trackEvents = ['athletics-men-100', 'athletics-women-100', 'athletics-men-200', 'athletics-women-200'];
    const chessEvents = ['chess'];
    
    // Filter sports based on selected category
    let sportsToProcess = [];
    
    if (category === 'all') {
      sportsToProcess = [...teamSports, ...trackEvents, ...chessEvents];
    } else if (category === 'team') {
      sportsToProcess = teamSports;
    } else if (category === 'track') {
      sportsToProcess = trackEvents;
    } else if (category === 'chess') {
      sportsToProcess = chessEvents;
    }
    
    // Process team sports (finals winners get gold, runners-up get silver)
    const teamSportsToProcess = sportsToProcess.filter(sport => teamSports.includes(sport));
    
    for (const sportId of teamSportsToProcess) {
      const scores = allScores[sportId] || [];
      
      // Find final match (usually has matchType = "Final")
      const finalMatch = scores.find(match => match.matchType === "Final");
      
      if (finalMatch && finalMatch.winner) {
        // Winner gets gold
        const winnerBaseName = getBaseCollegeName(finalMatch.winner);
        const winnerCollege = collegeStandings.find(c => 
          c.name === winnerBaseName || c.variants.includes(finalMatch.winner)
        );
        
        if (winnerCollege) {
          winnerCollege.gold += 1;
          winnerCollege.totalPoints += 5; // 5 points for gold
        }
        
        // Runner-up gets silver (the other team in the final)
        const runnerUpName = finalMatch.team1.name === finalMatch.winner 
          ? finalMatch.team2.name 
          : finalMatch.team1.name;
          
        const runnerUpBaseName = getBaseCollegeName(runnerUpName);
        const runnerUpCollege = collegeStandings.find(c => 
          c.name === runnerUpBaseName || c.variants.includes(runnerUpName)
        );
        
        if (runnerUpCollege) {
          runnerUpCollege.silver += 1;
          runnerUpCollege.totalPoints += 3; // 3 points for silver
        }
        
        // Find semi-final matches to determine bronze
        const semiFinals = scores.filter(match => match.matchType === "Semi-Final");
        
        if (semiFinals.length >= 2) {
          // Get the losers from semi-finals
          const semiFinalLosers = semiFinals.map(match => {
            return match.team1.name === match.winner 
              ? match.team2.name 
              : match.team1.name;
          });
          
          // Both semi-final losers get bronze
          semiFinalLosers.forEach(loserName => {
            const loserBaseName = getBaseCollegeName(loserName);
            const loserCollege = collegeStandings.find(c => 
              c.name === loserBaseName || c.variants.includes(loserName)
            );
            
            if (loserCollege) {
              loserCollege.bronze += 1;
              loserCollege.totalPoints += 1; // 1 point for bronze
            }
          });
        }
      } else {
        // If no final match found, use regular matches and count winners
        const uniqueWinners = new Set();
        scores.forEach(match => {
          if (match.winner) {
            uniqueWinners.add(match.winner);
          }
        });
        
        // Add points for each unique winner
        uniqueWinners.forEach(winnerName => {
          const winnerBaseName = getBaseCollegeName(winnerName);
          const winnerCollege = collegeStandings.find(c => 
            c.name === winnerBaseName || c.variants.includes(winnerName)
          );
          
          if (winnerCollege) {
            winnerCollege.totalPoints += 1; // 1 point per win
          }
        });
      }
    }
    
    // Process track events (rank 1 gets gold, rank 2 gets silver, rank 3 gets bronze)
    const trackEventsToProcess = sportsToProcess.filter(sport => trackEvents.includes(sport));
    
    for (const eventId of trackEventsToProcess) {
      const results = allScores[eventId] || [];
      
      // Sort by rank
      const sortedResults = [...results].sort((a, b) => {
        const rankA = parseInt(a.rank) || 999;
        const rankB = parseInt(b.rank) || 999;
        return rankA - rankB;
      });
      
      // Gold for rank 1
      if (sortedResults[0] && sortedResults[0].name) {
        const goldBaseName = getBaseCollegeName(sortedResults[0].name);
        const goldCollege = collegeStandings.find(c => 
          c.name === goldBaseName || c.variants.includes(sortedResults[0].name)
        );
        
        if (goldCollege) {
          goldCollege.gold += 1;
          goldCollege.totalPoints += 5; // 5 points for gold
        }
      }
      
      // Silver for rank 2
      if (sortedResults[1] && sortedResults[1].name) {
        const silverBaseName = getBaseCollegeName(sortedResults[1].name);
        const silverCollege = collegeStandings.find(c => 
          c.name === silverBaseName || c.variants.includes(sortedResults[1].name)
        );
        
        if (silverCollege) {
          silverCollege.silver += 1;
          silverCollege.totalPoints += 3; // 3 points for silver
        }
      }
      
      // Bronze for rank 3
      if (sortedResults[2] && sortedResults[2].name) {
        const bronzeBaseName = getBaseCollegeName(sortedResults[2].name);
        const bronzeCollege = collegeStandings.find(c => 
          c.name === bronzeBaseName || c.variants.includes(sortedResults[2].name)
        );
        
        if (bronzeCollege) {
          bronzeCollege.bronze += 1;
          bronzeCollege.totalPoints += 1; // 1 point for bronze
        }
      }
    }
    
    // Process chess (similar to track events)
    const chessEventsToProcess = sportsToProcess.filter(sport => chessEvents.includes(sport));
    
    for (const eventId of chessEventsToProcess) {
      const chessResults = allScores[eventId] || [];
      
      // Sort by rank
      const sortedChessResults = [...chessResults].sort((a, b) => {
        const rankA = parseInt(a.rank) || 999;
        const rankB = parseInt(b.rank) || 999;
        return rankA - rankB;
      });
      
      // Gold for rank 1
      if (sortedChessResults[0] && sortedChessResults[0].name) {
        const goldBaseName = getBaseCollegeName(sortedChessResults[0].name);
        const goldCollege = collegeStandings.find(c => 
          c.name === goldBaseName || c.variants.includes(sortedChessResults[0].name)
        );
        
        if (goldCollege) {
          goldCollege.gold += 1;
          goldCollege.totalPoints += 5; // 5 points for gold
        }
      }
      
      // Silver for rank 2
      if (sortedChessResults[1] && sortedChessResults[1].name) {
        const silverBaseName = getBaseCollegeName(sortedChessResults[1].name);
        const silverCollege = collegeStandings.find(c => 
          c.name === silverBaseName || c.variants.includes(sortedChessResults[1].name)
        );
        
        if (silverCollege) {
          silverCollege.silver += 1;
          silverCollege.totalPoints += 3; // 3 points for silver
        }
      }
      
      // Bronze for rank 3
      if (sortedChessResults[2] && sortedChessResults[2].name) {
        const bronzeBaseName = getBaseCollegeName(sortedChessResults[2].name);
        const bronzeCollege = collegeStandings.find(c => 
          c.name === bronzeBaseName || c.variants.includes(sortedChessResults[2].name)
        );
        
        if (bronzeCollege) {
          bronzeCollege.bronze += 1;
          bronzeCollege.totalPoints += 1; // 1 point for bronze
        }
      }
    }
    
    // Filter out colleges with no points
    return collegeStandings.filter(college => 
      college.gold > 0 || college.silver > 0 || college.bronze > 0 || college.totalPoints > 0
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f4e4c9]">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-[#07534c] mx-auto" />
          <p className="mt-4 text-lg font-semibold text-[#07534c]">Loading standings...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f4e4c9]">
        <div className="text-center max-w-md p-6 bg-white rounded-lg shadow-lg">
          <p className="text-red-600 font-semibold text-lg">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-[#07534c] text-white rounded-md hover:bg-[#05433d]"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-[#f4e4c9] px-4 py-8"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 flex items-center justify-center"
        >
          <div className="flex items-center bg-[#07534c] px-6 py-3 rounded-full shadow-md">
            <Trophy className="mr-2 h-6 w-6 text-[#a58255]" />
            <h1 className="text-2xl font-black text-[#e7fefe]">Overall Championship Standings</h1>
          </div>
        </motion.header>
        
        {/* Category Filter */}
        <div className="mb-6 flex justify-end">
          <div className="relative inline-block">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="appearance-none bg-[#07534c] text-[#e7fefe] px-4 py-2 pr-8 rounded-md shadow-md cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#a58255]"
            >
              {sportCategories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-[#e7fefe]">
              <Filter className="h-4 w-4" />
            </div>
          </div>
        </div>

        {standings.length === 0 ? (
          <div className="bg-gradient-to-br from-[#07534c] to-[#05433d] rounded-xl shadow-lg p-8 text-center">
            <p className="text-[#e7fefe] text-lg">No standings data available yet.</p>
          </div>
        ) : (
          <div className="bg-gradient-to-br from-[#07534c] to-[#05433d] rounded-xl shadow-lg overflow-hidden">
            <table className="w-full text-[#e7fefe]">
              <thead className="bg-[#07534c]/90 border-b border-[#a58255]/20">
                <tr>
                  <th className="p-3 text-left">Rank</th>
                  <th className="p-3 text-left">College</th>
                  <th className="p-3 text-center">Gold</th>
                  <th className="p-3 text-center">Silver</th>
                  <th className="p-3 text-center">Bronze</th>
                  <th className="p-3 text-center">Total Points</th>
                </tr>
              </thead>
              <tbody>
                {standings.map((college, index) => (
                  <tr 
                    key={index} 
                    className="border-b border-[#a58255]/20 last:border-b-0 hover:bg-[#a58255]/10 transition-colors"
                  >
                    <td className="p-3 font-bold">{college.rank}</td>
                    <td className="p-3">
                      <div className="flex items-center">
                        <div className="w-8 h-8 mr-3 rounded-full overflow-hidden bg-white flex-shrink-0">
                          <img 
                            src={college.logo} 
                            alt={`${college.name} logo`} 
                            className="w-full h-full object-contain"
                          />
                        </div>
                        <span>{college.name}</span>
                      </div>
                    </td>
                    <td className="p-3 text-center font-bold text-yellow-300">{college.gold}</td>
                    <td className="p-3 text-center text-gray-300">{college.silver}</td>
                    <td className="p-3 text-center text-orange-300">{college.bronze}</td>
                    <td className="p-3 text-center font-bold">{college.totalPoints}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        <div className="mt-6 bg-[#07534c]/10 p-4 rounded-lg">
          <h2 className="text-[#07534c] font-bold mb-2">Scoring System</h2>
          <ul className="text-[#05433d] text-sm">
            <li>• Gold Medal: 5 points</li>
            <li>• Silver Medal: 3 points</li>
            <li>• Bronze Medal: 1 point</li>
            <li>• Regular Match Win: 1 point</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default SportsStandings;