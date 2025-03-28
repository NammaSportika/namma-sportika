import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Save, Edit, Trash2 } from 'lucide-react';
import { 
  signInWithPopup, 
  signOut, 
  GoogleAuthProvider, 
  getAuth 
} from 'firebase/auth';
import { 
  addScore, 
  fetchScores, 
  updateScore, 
  deleteScore,
  colleges 
} from './firebaseUtils';

const ADMIN_EMAILS = ['bgangadh2@gitam.edu','pkoola@gitam.in','vagrawal@gitam.in','kthota2@gitam.in'];

const SPORTS = [
  { 
    id: 'athletics-men-100', 
    name: 'Athletics Men 100', 
    type: 'track', 
    attributes: ['Rank', 'Name', 'Time'],
    icon: 'Running'
  },
  { 
    id: 'athletics-men-200', 
    name: 'Athletics Men 200', 
    type: 'track', 
    attributes: ['Rank', 'Name', 'Time'],
    icon: 'Running'
  },
  { 
    id: 'athletics-women-100', 
    name: 'Athletics Women 100', 
    type: 'track', 
    attributes: ['Rank', 'Name', 'Time'],
    icon: 'Running'
  },
  { 
    id: 'athletics-women-200', 
    name: 'Athletics Women 200', 
    type: 'track', 
    attributes: ['Rank', 'Name', 'Time'],
    icon: 'Running'
  },
  { 
    id: 'basketball-men', 
    name: 'Basketball Men', 
    type: 'team', 
    attributes: ['Team 1', 'Team 2', 'Score', 'Winner', 'Match Number'],
    icon: 'Basketball'
  },
  { 
    id: 'basketball-women', 
    name: 'Basketball Women', 
    type: 'team', 
    attributes: ['Team 1', 'Team 2', 'Score', 'Winner', 'Match Number'],
    icon: 'Basketball'
  },
  { 
    id: 'chess', 
    name: 'Chess', 
    type: 'team', 
    attributes: ['Team 1', 'Team 2', 'Score', 'Winner', 'Match Number', 'Match Type'],
    icon: 'CheckSquare'
  },
  { 
    id: 'cricket', 
    name: 'Cricket', 
    type: 'team', 
    attributes: ['Team 1', 'Team 2', 'Score', 'Winner', 'Match Number', 'Overs 1', 'Overs 2'],
    icon: 'Trophy'
  },
  { 
    id: 'football', 
    name: 'Football', 
    type: 'team', 
    attributes: ['Team 1', 'Team 2', 'Score', 'Winner', 'Match Number'],
    icon: 'Football'
  },
  { 
    id: 'kabaddi', 
    name: 'Kabaddi', 
    type: 'team', 
    attributes: ['Team 1', 'Team 2', 'Score', 'Winner', 'Match Number'],
    icon: 'Gamepad2'
  },
  { 
    id: 'throwball-men', 
    name: 'Throwball Men', 
    type: 'team', 
    attributes: ['Team 1', 'Team 2', 'Score', 'Winner', 'Match Number'],
    icon: 'Volleyball'
  },
  { 
    id: 'throwball-women', 
    name: 'Throwball Women', 
    type: 'team', 
    attributes: ['Team 1', 'Team 2', 'Score', 'Winner', 'Match Number'],
    icon: 'Volleyball'
  },
  { 
    id: 'volleyball', 
    name: 'Volleyball', 
    type: 'team', 
    attributes: ['Team 1', 'Team 2', 'Score', 'Winner', 'Match Number'],
    icon: 'Volleyball'
  }
];

const SportsAdmin = () => {
  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [loading, setLoading] = useState(true);

  // Scoring state
  const [selectedSport, setSelectedSport] = useState('');
  const [scores, setScores] = useState([]);
  const [editingScore, setEditingScore] = useState(null);

  // Dynamic form state
  const [formData, setFormData] = useState({
    sport: '',
    team1: '',
    team2: '',
    score1: '',
    score2: '',
    rank: '',
    name: '',
    time: '',
    matchNumber: '',
    matchType: '',
    winner: '',
    date: '',
    overs1: '',
    overs2: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Firebase authentication setup
  const auth = getAuth();
  const provider = new GoogleAuthProvider();

  // Sign in handler
  const handleSignIn = async () => {
    try {
      setIsLoggingIn(true);
      setLoginError('');
      const result = await signInWithPopup(auth, provider);
      const userEmail = result.user.email;
      
      if (ADMIN_EMAILS.includes(userEmail)) {
        setIsAuthenticated(true);
      } else {
        setLoginError('You are not authorized to access this page');
        await signOut(auth);
      }
    } catch (error) {
      console.error('Error signing in:', error);
      setLoginError('Error signing in. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Logout handler
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
      setScores([]);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Fetch scores for selected sport
  const fetchScoresForSport = async (sportId) => {
    try {
      const fetchedScores = await fetchScores(sportId);
      setScores(fetchedScores);
    } catch (error) {
      console.error('Error fetching scores:', error);
    }
  };

  // Handle sport selection and reset form data
  const handleSportSelect = (sport) => {
    setSelectedSport(sport);
    fetchScoresForSport(sport);
    setFormData({
      sport: sport,
      team1: '',
      team2: '',
      score1: '',
      score2: '',
      rank: '',
      name: '',
      time: '',
      matchNumber: '',
      matchType: '',
      winner: '',
      date: '',
      overs1: '',
      overs2: ''
    });
    setEditingScore(null);
  };

  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Submit handler including cricket overs if needed
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');

    if (!selectedSport) {
      setErrorMessage('Please select a sport first');
      return;
    }

    try {
      setIsSubmitting(true);
      
      const selectedSportConfig = SPORTS.find(s => s.id === selectedSport);
      
      let scoreData = {
        sportId: selectedSport,
        date: formData.date || new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
      };

      if (selectedSportConfig.type === 'team') {
        // Find the college objects to get their logos
        const team1College = colleges.find(college => college.name === formData.team1);
        const team2College = colleges.find(college => college.name === formData.team2);
        
        scoreData = {
          ...scoreData,
          team1: {
            name: formData.team1,
            score: formData.score1,
            logo: team1College?.logo || '/imgs/icon/icon.svg'
          },
          team2: {
            name: formData.team2,
            score: formData.score2,
            logo: team2College?.logo || '/imgs/icon/icon.svg'
          },
          winner: formData.winner,
          matchNumber: formData.matchNumber,
          matchType: formData.matchType || ''
        };

        // Add overs for cricket
        if (selectedSport === 'cricket') {
          scoreData.team1.overs = formData.overs1;
          scoreData.team2.overs = formData.overs2;
        }
      } else if (selectedSportConfig.type === 'track' || selectedSportConfig.type === 'individual') {
        // Base data for individual sports
        scoreData = {
          ...scoreData,
          rank: formData.rank,
          name: formData.name
        };
        
        // Add the appropriate score field based on sport type
        if (selectedSport === 'chess') {
          scoreData.score = formData.score || formData.time || '0';
        } else {
          // For athletics and other time-based sports
          scoreData.time = formData.time || formData.score || '0';
        }
      }

      if (editingScore) {
        // Update existing score
        await updateScore(editingScore.id, scoreData);
        alert('Score updated successfully!');
      } else {
        // Add new score
        await addScore(scoreData);
        alert('Score added successfully!');
      }
      
      // Refresh scores
      await fetchScoresForSport(selectedSport);
      
      // Reset form
      setFormData({
        sport: selectedSport,
        team1: '',
        team2: '',
        score1: '',
        score2: '',
        rank: '',
        name: '',
        time: '',
        matchNumber: '',
        matchType: '',
        winner: '',
        date: '',
        overs1: '',
        overs2: ''
      });
      setEditingScore(null);
    } catch (error) {
      console.error('Error processing score', error);
      setErrorMessage(`Failed to process score: ${error.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Edit score handler – populate form based on sport type
  const handleEditScore = (score) => {
    setEditingScore(score);
    
    const selectedSportConfig = SPORTS.find(s => s.id === selectedSport);
    
    if (selectedSportConfig.type === 'team') {
      setFormData({
        sport: selectedSport,
        team1: score.team1.name,
        team2: score.team2.name,
        score1: score.team1.score,
        score2: score.team2.score,
        winner: score.winner,
        matchNumber: score.matchNumber,
        matchType: score.matchType || '',
        date: score.date,
        overs1: score.team1?.overs || '',
        overs2: score.team2?.overs || ''
      });
    } else {
      // For individual sports like chess and athletics
      if (selectedSport === 'chess') {
        setFormData({
          sport: selectedSport,
          rank: score.rank,
          name: score.name,
          score: score.score || score.time || '', // Use score field for chess
          date: score.date
        });
      } else {
        // For athletics and other time-based sports
        setFormData({
          sport: selectedSport,
          rank: score.rank,
          name: score.name,
          time: score.time || score.score || '', // Use time field for athletics
          date: score.date
        });
      }
    }
  };

  // Delete score handler
  const handleDeleteScore = async (scoreId) => {
    if (window.confirm('Are you sure you want to delete this score?')) {
      try {
        await deleteScore(scoreId, selectedSport);
        await fetchScoresForSport(selectedSport);
        alert('Score deleted successfully!');
      } catch (error) {
        console.error('Error deleting score', error);
        setErrorMessage(`Failed to delete score: ${error.message}`);
      }
    }
  };

  // Render dynamic form fields based on sport type, including overs for cricket
  const renderFormFields = () => {
    const selectedSportConfig = SPORTS.find(s => s.id === selectedSport);
    
    if (!selectedSportConfig) return null;

    if (selectedSportConfig.type === 'team') {
      return (
        <>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-[#05433d] rounded-lg p-4">
              <h2 className="text-xl font-bold text-[#e7fefe] mb-4">Team 1</h2>
              <select 
                name="team1"
                value={formData.team1} 
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-[#07534c] text-[#e7fefe] border-[#a58255] mb-4"
                required
              >
                <option value="">Select Team 1</option>
                {colleges.map((college) => (
                  <option key={college.name} value={college.name}>
                    {college.name}
                  </option>
                ))}
              </select>
              <input 
                type="text" 
                name="score1"
                placeholder="Team 1 Score" 
                value={formData.score1}
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-[#07534c] text-[#e7fefe] mb-3"
                required
              />
              {selectedSport === 'cricket' && (
                <input 
                  type="text" 
                  name="overs1"
                  placeholder="Team 1 Overs (e.g., 20.0)" 
                  value={formData.overs1}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-[#07534c] text-[#e7fefe]"
                />
              )}
            </div>

            <div className="bg-[#05433d] rounded-lg p-4">
              <h2 className="text-xl font-bold text-[#e7fefe] mb-4">Team 2</h2>
              <select 
                name="team2"
                value={formData.team2} 
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-[#07534c] text-[#e7fefe] border-[#a58255] mb-4"
                required
              >
                <option value="">Select Team 2</option>
                {colleges.map((college) => (
                  <option key={college.name} value={college.name}>
                    {college.name}
                  </option>
                ))}
              </select>
              <input 
                type="text" 
                name="score2"
                placeholder="Team 2 Score" 
                value={formData.score2}
                onChange={handleInputChange}
                className="w-full p-2 rounded bg-[#07534d] text-[#e7fefe] mb-3"
                required
              />
              {selectedSport === 'cricket' && (
                <input 
                  type="text" 
                  name="overs2"
                  placeholder="Team 2 Overs (e.g., 20.0)" 
                  value={formData.overs2}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-[#07534d] text-[#e7fefe]"
                />
              )}
            </div>
          </div>
          <div className="grid md:grid-cols-4 gap-4">
            <select 
              name="winner"
              value={formData.winner}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-[#05433d] text-[#e7fefe]"
            >
              <option value="">Select Winner</option>
              {colleges.map((college) => (
                <option key={college.name} value={college.name}>
                  {college.name}
                </option>
              ))}
            </select>
            <input 
              type="text" 
              name="matchNumber"
              placeholder="Match Number" 
              value={formData.matchNumber}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-[#05433d] text-[#e7fefe]"
            />
            <select 
              name="matchType"
              value={formData.matchType}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-[#05433d] text-[#e7fefe]"
            >
              <option value="">Regular Match</option>
              <option value="Semi-Final">Semi-Final</option>
              <option value="Final">Final</option>
            </select>
            <input 
              type="text" 
              name="date"
              placeholder="Date (e.g., 17 Dec)" 
              value={formData.date}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-[#05433d] text-[#e7fefe]"
            />
          </div>
        </>
      );
    } else if (selectedSportConfig.type === 'track' || selectedSportConfig.type === 'individual') {
      return (
        <div className="grid md:grid-cols-4 gap-4">
          <input 
            type="text" 
            name="rank"
            placeholder="Rank" 
            value={formData.rank}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-[#05433d] text-[#e7fefe]"
            required
          />
          <input 
            type="text" 
            name="name"
            placeholder="Name" 
            value={formData.name}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-[#05433d] text-[#e7fefe]"
            required
          />
          {selectedSport === 'chess' ? (
            <input 
              type="text" 
              name="score"
              placeholder="Score" 
              value={formData.score}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-[#05433d] text-[#e7fefe]"
              required
            />
          ) : (
            <input 
              type="text" 
              name="time"
              placeholder="Time (e.g., 10.2s)" 
              value={formData.time}
              onChange={handleInputChange}
              className="w-full p-2 rounded bg-[#05433d] text-[#e7fefe]"
              required
            />
          )}
          <input 
            type="text" 
            name="date"
            placeholder="Date (e.g., 17 Dec)" 
            value={formData.date}
            onChange={handleInputChange}
            className="w-full p-2 rounded bg-[#05433d] text-[#e7fefe]"
          />
        </div>
      );
    }
  };

  // Render scores list based on sport type
  const renderScoresList = () => {
    if (!selectedSport || scores.length === 0) return null;

    const selectedSportConfig = SPORTS.find(s => s.id === selectedSport);
    
    if (selectedSportConfig.type === 'team') {
      return (
        <div className="mt-8">
          <h3 className="text-lg font-bold text-[#07534c] mb-4">Existing Scores</h3>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg overflow-hidden shadow-md">
              <thead className="bg-[#07534c] text-white">
                <tr>
                  <th className="px-4 py-2">Match</th>
                  <th className="px-4 py-2">Team 1</th>
                  <th className="px-4 py-2">Score</th>
                  {selectedSport === 'cricket' && <th className="px-4 py-2">Overs</th>}
                  <th className="px-4 py-2">Team 2</th>
                  <th className="px-4 py-2">Score</th>
                  {selectedSport === 'cricket' && <th className="px-4 py-2">Overs</th>}
                  <th className="px-4 py-2">Winner</th>
                  <th className="px-4 py-2">Match Type</th>
                  <th className="px-4 py-2">Date</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {scores.map((score) => (
                  <tr key={score.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-2 text-center">{score.matchNumber || '-'}</td>
                    <td className="px-4 py-2 text-center">{score.team1?.name || '-'}</td>
                    <td className="px-4 py-2 text-center">{score.team1?.score || '-'}</td>
                    {selectedSport === 'cricket' && 
                      <td className="px-4 py-2 text-center">{score.team1?.overs || '-'}</td>
                    }
                    <td className="px-4 py-2 text-center">{score.team2?.name || '-'}</td>
                    <td className="px-4 py-2 text-center">{score.team2?.score || '-'}</td>
                    {selectedSport === 'cricket' && 
                      <td className="px-4 py-2 text-center">{score.team2?.overs || '-'}</td>
                    }
                    <td className="px-4 py-2 text-center">{score.winner || '-'}</td>
                    <td className="px-4 py-2 text-center">{score.matchType || '-'}</td>
                    <td className="px-4 py-2">{score.date || '-'}</td>
                    <td className="px-4 py-2">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleEditScore(score)}
                          className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteScore(score.id)}
                          className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    } else {
      return (
        <div className="mt-8">
          <h3 className="text-lg font-bold text-[#07534c] mb-4">Existing Records</h3>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg overflow-hidden shadow-md">
              <thead className="bg-[#07534c] text-white">
                <tr>
                  <th className="px-4 py-2">Rank</th>
                  <th className="px-4 py-2">Name</th>
                  <th className="px-4 py-2">{selectedSportConfig.type === 'track' ? 'Time' : 'Score'}</th>
                  <th className="px-4 py-2 text-center">Date</th>
                  <th className="px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {scores.map((score) => (
                  <tr key={score.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="px-4 py-2 text-center">{score.rank || '-'}</td>
                    <td className="px-4 py-2 text-center">{score.name || '-'}</td>
                    <td className="px-4 py-2 text-center">{score.time || '-'}</td>
                    <td className="px-4 py-2 text-center">{score.date || '-'}</td>
                    <td className="px-4 py-2 align-center">
                      <div className="flex space-x-2 text-center">
                        <button 
                          onClick={() => handleEditScore(score)}
                          className="p-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                          <Edit size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteScore(score.id)}
                          className="p-1 bg-red-500 text-white rounded hover:bg-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }
  };

  return (
    <main className="bg-[#f4e4c9] min-h-screen px-2 py-4 md:px-8 md:py-12">
      <div className="container mx-auto max-w-6xl">
        {/* Header Section */}
        <motion.header
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-8 flex items-center justify-center"
        >
          <div className="flex items-center bg-[#07534c] px-6 py-3 rounded-full shadow-md">
            <Trophy className="mr-2 h-6 w-6 text-[#a58255]" />
            <h1 className="text-2xl font-black text-[#e7fefe]">Sports Admin Panel</h1>
          </div>
        </motion.header>

        {/* Authentication Section */}
        {!isAuthenticated ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl p-8 shadow-lg text-center"
          >
            <h2 className="text-xl font-bold text-[#07534c] mb-6">Admin Authentication Required</h2>
            {loginError && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                <p>{loginError}</p>
              </div>
            )}
            <button
              onClick={handleSignIn}
              disabled={isLoggingIn}
              className={`px-6 py-3 bg-[#07534c] text-white rounded-lg font-bold hover:bg-[#064239] transition-colors ${
                isLoggingIn ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {isLoggingIn ? 'Signing In...' : 'Sign In with Google'}
            </button>
          </motion.div>
        ) : (
          <>
            {/* Sport Selection */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-6 shadow-lg mb-6"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-bold text-[#07534c]">Select Sport</h2>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition-colors"
                >
                  Logout
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {SPORTS.map((sport) => (
                  <button
                    key={sport.id}
                    onClick={() => handleSportSelect(sport.id)}
                    className={`p-3 rounded-lg text-center transition-colors ${
                      selectedSport === sport.id
                        ? 'bg-[#07534c] text-white'
                        : 'bg-gray-100 text-[#07534c] hover:bg-gray-200'
                    }`}
                  >
                    {sport.name}
                  </button>
                ))}
              </div>
            </motion.div>

            {selectedSport && (
              <>
                {/* Score Form */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#07534c] rounded-xl p-6 shadow-lg mb-6"
                >
                  <h2 className="text-xl font-bold text-[#e7fefe] mb-4">
                    {editingScore ? 'Edit Score' : 'Add New Score'}
                  </h2>
                  
                  {errorMessage && (
                    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                      <p>{errorMessage}</p>
                    </div>
                  )}
                  
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {renderFormFields()}
                    
                    <div className="flex justify-center">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="submit"
                        disabled={isSubmitting}
                        className={`flex items-center bg-[#a58255] text-[#07534c] px-6 py-3 rounded-full font-bold transition-colors ${
                          isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-[#c6a377]'
                        }`}
                      >
                        <Save className="mr-2 h-5 w-5" />
                        {isSubmitting ? 'Saving...' : (editingScore ? 'Update Score' : 'Save Score')}
                      </motion.button>
                      
                      {editingScore && (
                        <button
                          type="button"
                          onClick={() => setEditingScore(null)}
                          className="ml-4 px-6 py-3 bg-gray-300 text-gray-700 rounded-full font-bold hover:bg-gray-400 transition-colors"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </form>
                </motion.div>

                {/* Scores List */}
                {renderScoresList()}
              </>
            )}
          </>
        )}
      </div>
    </main>
  );
};

export default SportsAdmin;
