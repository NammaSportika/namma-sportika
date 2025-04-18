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
import { db } from '../../firebase/config';

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
    name: 'SESHADRIPURAM COLLEGE', 
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
      
      const isRetriable = retriableErrors.some(errType => 
        error.message.toLowerCase().includes(errType)
      );
      
      if (isRetriable && attempt < maxRetries) {
        const delay = baseDelay * Math.pow(2, attempt - 1);
        console.log(`Retrying in ${delay}ms...`);
        await new Promise(resolve => setTimeout(resolve, delay));
      } else {
        break;
      }
    }
  }
  throw lastError;
};

const validateMatchData = (matchData) => {
  const errors = [];

  if (!matchData.team1?.name) errors.push('Team 1 name is required');
  if (!matchData.team2?.name) errors.push('Team 2 name is required');
  
  if (matchData.team1?.score && !/^\d+\/\d+$/.test(matchData.team1.score)) {
    errors.push('Team 1 score should be in format "runs/wickets"');
  }
  
  if (matchData.team2?.score && !/^\d+\/\d+$/.test(matchData.team2.score)) {
    errors.push('Team 2 score should be in format "runs/wickets"');
  }

  if (matchData.team1?.overs && !/^\d+(\.\d)?$/.test(matchData.team1.overs)) {
    errors.push('Team 1 overs should be in decimal format (e.g., 20.0)');
  }
  
  if (matchData.team2?.overs && !/^\d+(\.\d)?$/.test(matchData.team2.overs)) {
    errors.push('Team 2 overs should be in decimal format (e.g., 20.0)');
  }

  if (matchData.date && isNaN(Date.parse(matchData.date))) {
    errors.push('Invalid date format');
  }

  if (errors.length > 0) {
    throw new Error(`Match data validation failed: ${errors.join('; ')}`);
  }
};

export const addMatch = async (matchData) => {
  try {
    validateMatchData(matchData);
    
    console.log('Adding match data:', matchData);
    
    const dataToAdd = {
      ...matchData,
      createdAt: matchData.createdAt || new Date(),
      updatedAt: new Date()
    };
    
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
      
      let q = query(matchesRef);
      
      Object.entries(filterBy).forEach(([field, value]) => {
        q = query(q, where(`team1.${field}`, '==', value));
      });
      
      q = query(q, orderBy(sortBy, sortOrder));
      
      q = query(q, limit);
      
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

export const updateMatch = async (matchId, updateData) => {
  try {
    validateMatchData(updateData);
    
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

export const getMatchStatistics = async () => {
  try {
    const matches = await fetchMatches();
    
    const stats = {
      totalMatches: matches.length,
      teamStats: {},
      recentMatches: matches.slice(0, 5)
    };
    
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

export const addScore = async (scoreData) => {
  try {
    if (scoreData.team1) {
      const scoresRef = collection(db, 'score_board', scoreData.sportId, 'teams');
      return await addDoc(scoresRef, scoreData);
    } else {
      const scoresRef = collection(db, 'score_board', scoreData.sportId, 'scores');
      return await addDoc(scoresRef, scoreData);
    }
  } catch (error) {
    console.error('Error adding score:', error);
    throw error;
  }
};

export const fetchScores = async (sportId) => {
  try {
    const scoresRef = collection(db, 'score_board', sportId, 'scores');
    const scoresSnapshot = await getDocs(scoresRef);
    
    if (!scoresSnapshot.empty) {
      const scores = scoresSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      if (sportId.includes('basketball') || 
          sportId.includes('football') || 
          sportId.includes('throwball') || 
          sportId.includes('kabaddi') || 
          sportId.includes('volleyball') || 
          sportId.includes('cricket')) {
        return scores.sort((a, b) => {
          const matchNumA = parseInt(a.matchNumber) || 0;
          const matchNumB = parseInt(b.matchNumber) || 0;
          return matchNumB - matchNumA;
        });
      }
      
      return scores;
    }

    const teamsRef = collection(db, 'score_board', sportId, 'teams');
    const teamsSnapshot = await getDocs(teamsRef);
    
    if (!teamsSnapshot.empty) {
      const scores = teamsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      
      if (sportId.includes('basketball') || 
          sportId.includes('football') || 
          sportId.includes('throwball') || 
          sportId.includes('kabaddi') || 
          sportId.includes('volleyball') || 
          sportId.includes('cricket')) {
        return scores.sort((a, b) => {
          const matchNumA = parseInt(a.matchNumber) || 0;
          const matchNumB = parseInt(b.matchNumber) || 0;
          return matchNumB - matchNumA;
        });
      }
      
      return scores;
    }

    const legacyQuery = query(
      collection(db, 'sports_scores'), 
      where('sportId', '==', sportId)
    );
    const legacySnapshot = await getDocs(legacyQuery);
    
    const scores = legacySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    if (sportId.includes('basketball') || 
        sportId.includes('football') || 
        sportId.includes('throwball') || 
        sportId.includes('kabaddi') || 
        sportId.includes('volleyball') || 
        sportId.includes('cricket')) {
      return scores.sort((a, b) => {
        const matchNumA = parseInt(a.matchNumber) || 0;
        const matchNumB = parseInt(b.matchNumber) || 0;
        return matchNumB - matchNumA;
      });
    }
    
    return scores;
  } catch (error) {
    console.error('Error fetching scores:', error);
    throw error;
  }
};

export const updateScore = async (scoreId, updatedData) => {
  try {
    if (updatedData.team1) {
      const scoreRef = doc(db, 'score_board', updatedData.sportId, 'teams', scoreId);
      return await updateDoc(scoreRef, updatedData);
    } else {
      const scoreRef = doc(db, 'score_board', updatedData.sportId, 'scores', scoreId);
      return await updateDoc(scoreRef, updatedData);
    }
  } catch (error) {
    try {
      const scoreRef = doc(db, 'sports_scores', scoreId);
      return await updateDoc(scoreRef, updatedData);
    } catch (fallbackError) {
      console.error('Error updating score:', error, fallbackError);
      throw error;
    }
  }
};

export const deleteScore = async (scoreId, sportId) => {
  try {
    const isTeamSport = sportId.includes('basketball') || 
                        sportId.includes('football') || 
                        sportId.includes('throwball') || 
                        sportId.includes('kabaddi') || 
                        sportId.includes('volleyball') || 
                        sportId.includes('cricket');
    
    try {
      if (isTeamSport) {
        const teamRef = doc(db, `score_board/${sportId}/teams`, scoreId);
        return await deleteDoc(teamRef);
      } else {
        const scoreRef = doc(db, `score_board/${sportId}/scores`, scoreId);
        return await deleteDoc(scoreRef);
      }
    } catch (primaryError) {
      console.warn('Primary deletion path failed:', primaryError);
      
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