import { 
  collection, 
  addDoc, 
  getDocs, 
  doc, 
  updateDoc, 
  deleteDoc, 
  query, 
  where,
  orderBy,
  serverTimestamp
} from 'firebase/firestore';
import { db } from '../../firebase/config'; // Adjust this import path based on where your Firebase config is

// Predefined colleges with logos and additional details
export const colleges = [
  { 
    name: 'ACHARYA INSTITUTE', 
    logo: '/imgs/collegeLogos/ACHARYA INSTITUTE.png'
  },
  { 
    name: 'ADITYA GROUP OF INST.', 
    logo: '/imgs/collegeLogos/ADITYA GROUP OF INST.png'
  },
  { 
    name: 'ALLIANCE UNIVERSITY', 
    logo: '/imgs/collegeLogos/ALLIANCE UNIVERSITY.png'
  },
  { 
    name: 'ATRIA INSTITUE OF TECH', 
    logo: '/imgs/collegeLogos/ATRIA INSTITUE OF TECH.png'
  },
  { 
    name: 'CAMBRIDGE NORTH CAM', 
    logo: '/imgs/collegeLogos/CAMBRIDGE NORTH CAM.png'
  },
  { 
    name: 'CHANAKYA UNIVERSITY', 
    logo: '/imgs/collegeLogos/CHANAKYA UNIVERSITY.png'
  },
  { 
    name: 'GARDEN CITY UNIVERSITY', 
    logo: '/imgs/collegeLogos/GARDEN CITY UNIVERSITY.png'
  },
  { 
    name: 'GITAM Team A', 
    logo: '/imgs/collegeLogos/GITAM.png'
  },
  { 
    name: 'GITAM Team B', 
    logo: '/imgs/collegeLogos/GITAM.png'
  },
  { 
    name: 'HKBK COLLEGE', 
    logo: '/imgs/collegeLogos/HKBK COLLEGE.png'
  },
  { 
    name: 'M S Ramaiah', 
    logo: '/imgs/collegeLogos/M S Ramaiah.png'
  },
  { 
    name: 'MANIPAL ACADEMY', 
    logo: '/imgs/collegeLogos/MANIPAL ACADEMY.png'
  },
  { 
    name: 'NAGARJUNA COLLEGE', 
    logo: '/imgs/collegeLogos/nagarjuna college.png'
  },
  { 
    name: 'NEW HORIZON COLLEGE', 
    logo: '/imgs/collegeLogos/NEW HORIZON COLLEGE.png'
  },
  { 
    name: 'NSB ACADEMY', 
    logo: '/imgs/collegeLogos/NSB ACADEMY.png'
  },
  { 
    name: 'PRESIDENCY COLLEGE', 
    logo: '/imgs/collegeLogos/PRESIDENCY COLLEGE.png'
  },
  { 
    name: 'PRESIDENCY UNIVERSITY', 
    logo: '/imgs/collegeLogos/PRESIDENCY UNIVERSITY.png'
  },
  { 
    name: 'RAI UNIVERSITY', 
    logo: '/imgs/collegeLogos/rai University.png'
  },
  { 
    name: 'REVA UNIVERSITY', 
    logo: '/imgs/collegeLogos/REVA UNIVERSITY.png'
  },
  { 
    name: 'SAI VIDHYA INSTITUTE', 
    logo: '/imgs/collegeLogos/Sai Vidhya Institute.png'
  },
  { 
    name: 'SESHADRIPURAM MAIN', 
    logo: '/imgs/collegeLogos/SESHADRIPURAM MAIN.png'
  },
  { 
    name: 'SINDHI COLLEGE', 
    logo: '/imgs/collegeLogos/SINDHI COLLEGE.png'
  },
  { 
    name: 'SIR M.V.I.T', 
    logo: '/imgs/collegeLogos/sir m.v.i.t.png'
  },
  { 
    name: 'SRI KRISHNA', 
    logo: '/imgs/collegeLogos/sri krishna.png'
  },
  { 
    name: 'ST.PAULS COLLEGE', 
    logo: '/imgs/collegeLogos/ST.PAuls COLLEGE.png'
  },
  { 
    name: 'UVCE', 
    logo: '/imgs/collegeLogos/UVCE.png'
  }
];

// Enhanced retry operation with more flexible error handling
const retryOperation = async (
  operation, 
  {
    maxRetries = 3, 
    baseDelay = 1000, 
    retriableErrors = ['network', 'unavailable', 'deadline-exceeded']
  } = {}
) => {
  let lastError;
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await operation();
    } catch (error) {
      console.warn(`Attempt ${attempt} failed:`, error);
      lastError = error;
      
      // Check if error is retriable
      const isRetriable = retriableErrors.some(errType => 
        error.message.toLowerCase().includes(errType)
      );
      
      if (isRetriable && attempt < maxRetries) {
        const delay = baseDelay * Math.pow(2, attempt - 1); // Exponential backoff
        console.log(`Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        break;
      }
    }
  }
  throw lastError;
};

// Comprehensive match validation
const validateMatchData = (matchData) => {
  const errors = [];

  // Team name validation
  if (!matchData.team1?.name) errors.push('Team 1 name is required');
  if (!matchData.team2?.name) errors.push('Team 2 name is required');
  
  // Score validation (optional but recommended)
  if (matchData.team1?.score && !/^\d+\/\d+$/.test(matchData.team1.score)) {
    errors.push('Team 1 score should be in format "runs/wickets"');
  }
  
  if (matchData.team2?.score && !/^\d+\/\d+$/.test(matchData.team2.score)) {
    errors.push('Team 2 score should be in format "runs/wickets"');
  }

  // Overs validation
  if (matchData.team1?.overs && !/^\d+(\.\d)?$/.test(matchData.team1.overs)) {
    errors.push('Team 1 overs should be in decimal format (e.g., 20.0)');
  }
  
  if (matchData.team2?.overs && !/^\d+(\.\d)?$/.test(matchData.team2.overs)) {
    errors.push('Team 2 overs should be in decimal format (e.g., 20.0)');
  }

  // Date validation
  if (matchData.date && isNaN(Date.parse(matchData.date))) {
    errors.push('Invalid date format');
  }

  if (errors.length > 0) {
    throw new Error(`Match data validation failed: ${errors.join('; ')}`);
  }
};

// Add a new match to Firestore with comprehensive error handling
export const addMatch = async (matchData) => {
  try {
    // Validate match data
    validateMatchData(matchData);
    
    console.log('Adding match data:', matchData);
    
    // Ensure createdAt is set
    const dataToAdd = {
      ...matchData,
      createdAt: matchData.createdAt || new Date(),
      updatedAt: new Date()
    };
    
    // Use retry logic for the Firestore operation
    const docRef = await retryOperation(
      async () => {
        const matchesRef = collection(db, 'cricket-matches');
        return await addDoc(matchesRef, dataToAdd);
      },
      { 
        maxRetries: 3,
        retriableErrors: ['network', 'unavailable']
      }
    );
    
    console.log('Match added with ID:', docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding match: ", error);
    throw error;
  }
};

// Fetch matches with advanced filtering and pagination
export const fetchMatches = async (options = {}) => {
  const {
    limit = 50,
    startAfter = null,
    filterBy = {},
    sortBy = 'createdAt',
    sortOrder = 'desc'
  } = options;

  try {
    const matches = await retryOperation(async () => {
      const matchesRef = collection(db, 'cricket-matches');
      
      // Build query with optional filters
      let q = query(matchesRef);
      
      // Add where clauses for filtering
      Object.entries(filterBy).forEach(([field, value]) => {
        q = query(q, where(`team1.${field}`, '==', value));
      });
      
      // Add ordering
      q = query(q, orderBy(sortBy, sortOrder));
      
      // Add limit
      q = query(q, limit);
      
      // Optional: start after a specific document for pagination
      if (startAfter) {
        q = query(q, startAfter(startAfter));
      }
      
      const querySnapshot = await getDocs(q);
      
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    });
    
    console.log('Fetched matches:', matches.length);
    return matches;
  } catch (error) {
    console.error("Error fetching matches: ", error);
    throw error;
  }
};

// Update an existing match
export const updateMatch = async (matchId, updateData) => {
  try {
    // Validate updated match data
    validateMatchData(updateData);
    
    // Add updatedAt timestamp
    const dataToUpdate = {
      ...updateData,
      updatedAt: new Date()
    };
    
    const matchRef = doc(db, 'cricket-matches', matchId);
    
    await retryOperation(
      async () => await updateDoc(matchRef, dataToUpdate),
      { 
        maxRetries: 3,
        retriableErrors: ['network', 'unavailable']
      }
    );
    
    console.log('Match updated:', matchId);
    return matchId;
  } catch (error) {
    console.error("Error updating match: ", error);
    throw error;
  }
};

// Delete a match
export const deleteMatch = async (matchId) => {
  try {
    const matchRef = doc(db, 'cricket-matches', matchId);
    
    await retryOperation(
      async () => await deleteDoc(matchRef),
      { 
        maxRetries: 3,
        retriableErrors: ['network', 'unavailable']
      }
    );
    
    console.log('Match deleted:', matchId);
    return matchId;
  } catch (error) {
    console.error("Error deleting match: ", error);
    throw error;
  }
};

// Utility to get match statistics
export const getMatchStatistics = async () => {
  try {
    const matches = await fetchMatches();
    
    const stats = {
      totalMatches: matches.length,
      teamStats: {},
      recentMatches: matches.slice(0, 5)
    };
    
    // Aggregate team statistics
    matches.forEach(match => {
      const teams = [match.team1, match.team2];
      
      teams.forEach(team => {
        if (!stats.teamStats[team.name]) {
          stats.teamStats[team.name] = {
            matchesPlayed: 0,
            totalRuns: 0,
            averageScore: 0
          };
        }
        
        const teamStats = stats.teamStats[team.name];
        teamStats.matchesPlayed++;
        
        // Parse score
        const scoreMatch = team.score.match(/(\d+)\/\d+/);
        if (scoreMatch) {
          teamStats.totalRuns += parseInt(scoreMatch[1], 10);
          teamStats.averageScore = teamStats.totalRuns / teamStats.matchesPlayed;
        }
      });
    });
    
    return stats;
  } catch (error) {
    console.error("Error getting match statistics: ", error);
    throw error;
  }
};

// Add a new score
export const addScore = async (scoreData) => {
  try {
    // For team sports vs individual sports
    if (scoreData.team1) {
      // Team sports go to score_board/{sportId}/teams
      const scoresRef = collection(db, 'score_board', scoreData.sportId, 'teams');
      return await addDoc(scoresRef, scoreData);
    } else {
      // Individual sports go to score_board/{sportId}/scores
      const scoresRef = collection(db, 'score_board', scoreData.sportId, 'scores');
      return await addDoc(scoresRef, scoreData);
    }
  } catch (error) {
    console.error('Error adding score:', error);
    throw error;
  }
};

// Fetch scores for a specific sport
export const fetchScores = async (sportId) => {
  try {
    // First, try fetching from the new score_board/sportId/scores structure
    const scoresRef = collection(db, 'score_board', sportId, 'scores');
    const scoresSnapshot = await getDocs(scoresRef);
    
    if (!scoresSnapshot.empty) {
      const scores = scoresSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Sort by match number in descending order if it's a team sport
      if (sportId.includes('basketball') || 
          sportId.includes('football') || 
          sportId.includes('throwball') || 
          sportId.includes('kabaddi') || 
          sportId.includes('volleyball') || 
          sportId.includes('cricket')) {
        return scores.sort((a, b) => {
          // Convert match numbers to integers for proper numerical sorting
          const matchNumA = parseInt(a.matchNumber) || 0;
          const matchNumB = parseInt(b.matchNumber) || 0;
          return matchNumB - matchNumA; // Descending order
        });
      }
      
      return scores;
    }

    // If no data in scores subcollection, try teams subcollection
    const teamsRef = collection(db, 'score_board', sportId, 'teams');
    const teamsSnapshot = await getDocs(teamsRef);
    
    if (!teamsSnapshot.empty) {
      const scores = teamsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      // Sort by match number in descending order if it's a team sport
      if (sportId.includes('basketball') || 
          sportId.includes('football') || 
          sportId.includes('throwball') || 
          sportId.includes('kabaddi') || 
          sportId.includes('volleyball') || 
          sportId.includes('cricket')) {
        return scores.sort((a, b) => {
          // Convert match numbers to integers for proper numerical sorting
          const matchNumA = parseInt(a.matchNumber) || 0;
          const matchNumB = parseInt(b.matchNumber) || 0;
          return matchNumB - matchNumA; // Descending order
        });
      }
      
      return scores;
    }

    // If no data in new structure, fall back to legacy sports_scores collection
    const legacyQuery = query(
      collection(db, 'sports_scores'), 
      where('sportId', '==', sportId)
    );
    const legacySnapshot = await getDocs(legacyQuery);
    
    const scores = legacySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    // Sort by match number in descending order if it's a team sport
    if (sportId.includes('basketball') || 
        sportId.includes('football') || 
        sportId.includes('throwball') || 
        sportId.includes('kabaddi') || 
        sportId.includes('volleyball') || 
        sportId.includes('cricket')) {
      return scores.sort((a, b) => {
        // Convert match numbers to integers for proper numerical sorting
        const matchNumA = parseInt(a.matchNumber) || 0;
        const matchNumB = parseInt(b.matchNumber) || 0;
        return matchNumB - matchNumA; // Descending order
      });
    }
    
    return scores;
  } catch (error) {
    console.error('Error fetching scores:', error);
    throw error;
  }
};

// Update an existing score
export const updateScore = async (scoreId, updatedData) => {
  try {
    // Determine the correct collection path
    if (updatedData.team1) {
      // Team sports
      const scoreRef = doc(db, 'score_board', updatedData.sportId, 'teams', scoreId);
      return await updateDoc(scoreRef, updatedData);
    } else {
      // Individual sports
      const scoreRef = doc(db, 'score_board', updatedData.sportId, 'scores', scoreId);
      return await updateDoc(scoreRef, updatedData);
    }
  } catch (error) {
    // If error, try the legacy collection
    try {
      const scoreRef = doc(db, 'sports_scores', scoreId);
      return await updateDoc(scoreRef, updatedData);
    } catch (fallbackError) {
      console.error('Error updating score:', error, fallbackError);
      throw error;
    }
  }
};

// Delete a score
export const deleteScore = async (scoreId, sportId) => {
  try {
    // First try to determine if it's a team sport based on the sportId
    const isTeamSport = sportId.includes('basketball') || 
                        sportId.includes('football') || 
                        sportId.includes('throwball') || 
                        sportId.includes('kabaddi') || 
                        sportId.includes('volleyball') || 
                        sportId.includes('cricket');
    
    // Determine the correct collection path based on sport type
    try {
      if (isTeamSport) {
        // For team sports, check in teams subcollection
        const teamRef = doc(db, `score_board/${sportId}/teams`, scoreId);
        return await deleteDoc(teamRef);
      } else {
        // For individual sports, check in scores subcollection
        const scoreRef = doc(db, `score_board/${sportId}/scores`, scoreId);
        return await deleteDoc(scoreRef);
      }
    } catch (primaryError) {
      console.warn('Primary deletion path failed:', primaryError);
      
      // Fallback to legacy collection if the primary path fails
      try {
        const legacyRef = doc(db, 'sports_scores', scoreId);
        return await deleteDoc(legacyRef);
      } catch (legacyError) {
        console.error('All deletion attempts failed:', legacyError);
        throw new Error('Could not delete score from any location');
      }
    }
  } catch (error) {
    console.error('Error deleting score:', error);
    throw error;
  }
};