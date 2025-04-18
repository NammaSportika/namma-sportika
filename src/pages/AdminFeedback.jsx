import React, { useState, useEffect, useCallback } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { collection, query, orderBy, limit, getDocs, startAfter } from 'firebase/firestore';
import { signInWithPopup, signOut } from 'firebase/auth';
import { db, auth, provider } from '../firebase/config';
import { FiDownload, FiLogOut, FiSearch, FiLock, FiMail, FiChevronLeft, FiChevronRight, FiFilter, FiFileText, FiAlertCircle, FiStar, FiCheckCircle, FiActivity, FiDatabase, FiMessageSquare } from 'react-icons/fi';

const AdminFeedback = () => {
  const [feedback, setFeedback] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterSport, setFilterSport] = useState('All');
  const [filterCollege, setFilterCollege] = useState('All');
  const [filterRating, setFilterRating] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [lastDoc, setLastDoc] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);


  const ADMIN_EMAILS = ['bgangadh2@gitam.edu','pkoola@gitam.in','vagrawal@gitam.in'];

  const sports = [
    "All",
    "Cricket",
    "Football",
    "Basketball",
    "Volleyball",
    "Tennis",
    "Badminton",
    "Table Tennis",
    "Athletics",
    "Chess",
    "Carrom"
  ];

  const colleges = [
    "All",
    "GITAM School of Technology",
    "GITAM Institute of Management",
    "GITAM School of Science",
    "GITAM School of Architecture",
    "GITAM School of Pharmacy",
    "GITAM School of Law",
    "GITAM School of Humanities"
  ];

  const ratings = ["All", "1", "2", "3", "4", "5"];

  const handleSignIn = async () => {
    try {
      setIsLoggingIn(true);
      setLoginError('');
      const result = await signInWithPopup(auth, provider);
      const userEmail = result.user.email;
      
      if (ADMIN_EMAILS.includes(userEmail)) {
        setIsAuthenticated(true);
        fetchFeedback();
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

  useEffect(() => {
    const inactivityTimeout = 15 * 60 * 1000; 
    const checkActivity = () => {
      if (Date.now() - lastActivity > inactivityTimeout) {
        handleLogout();
      }
    };

    const interval = setInterval(checkActivity, 60000);
    const activityEvents = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    
    const updateActivity = () => {
      setLastActivity(Date.now());
    };

    activityEvents.forEach(event => {
      document.addEventListener(event, updateActivity);
    });

    return () => {
      clearInterval(interval);
      activityEvents.forEach(event => {
        document.removeEventListener(event, updateActivity);
      });
    };
  }, [lastActivity]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const fetchFeedback = async (page = 1) => {
    try {
      setLoading(true);
      const feedbackRef = collection(db, 'feedback');
      
      let queryConstraints = [orderBy('timestamp', 'desc')];

      const countQuery = query(feedbackRef, ...queryConstraints);
      const snapshot = await getDocs(countQuery);
      const total = snapshot.size;
      setTotalPages(Math.ceil(total / 20));

      queryConstraints.push(limit(20));
      
      if (page > 1) {
        const previousPageQuery = query(
          feedbackRef,
          ...queryConstraints,
          limit((page - 1) * 20)
        );
        const previousPageDocs = await getDocs(previousPageQuery);
        const lastVisible = previousPageDocs.docs[previousPageDocs.docs.length - 1];
        
        if (lastVisible) {
          queryConstraints.push(startAfter(lastVisible));
        }
      }

      const finalQuery = query(feedbackRef, ...queryConstraints);
      const querySnapshot = await getDocs(finalQuery);

      if (querySnapshot.empty && page > 1) {
        return fetchFeedback(1);
      }

      const newFeedback = querySnapshot.docs.map(doc => {
        const data = doc.data();
        let timestamp = null;
        if (data.timestamp) {
          timestamp = data.timestamp.toDate ? data.timestamp.toDate() : new Date(data.timestamp);
        }

        return {
          id: doc.id,
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          college: data.college || '',
          sport: data.sport || '',
          rating: data.rating || 0,
          feedback: data.message || '',
          submissionDate: timestamp || new Date(),
        };
      });

      setFeedback(newFeedback);
      setCurrentPage(page);
    } catch (error) {
      console.error('Error fetching feedback:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePrevPage = async () => {
    if (currentPage > 1) {
      await fetchFeedback(currentPage - 1);
    }
  };

  const handleNextPage = async () => {
    if (currentPage < totalPages) {
      await fetchFeedback(currentPage + 1);
    }
  };

  useEffect(() => {
    let unsubscribe;
    const setupAuth = async () => {
      unsubscribe = auth.onAuthStateChanged(async (user) => {
        try {
          if (user && ADMIN_EMAILS.includes(user.email)) {
            setIsAuthenticated(true);
            await fetchFeedback(1);
          } else {
            setIsAuthenticated(false);
            setFeedback([]);
          }
        } catch (error) {
          console.error('Auth error:', error);
          setIsAuthenticated(false);
        } finally {
          setLoading(false);
        }
      });
    };

    setupAuth();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetchFeedback(1);
    }
  }, [filterSport, filterCollege, filterRating]);

  const getFilteredFeedback = useCallback(() => {
    return feedback.filter(entry => {
      const matchesSport = filterSport === 'All' || entry.sport === filterSport;
      const matchesCollege = filterCollege === 'All' || entry.college === filterCollege;
      const matchesRating = filterRating === 'All' || entry.rating.toString() === filterRating;

      if (!searchTerm) return matchesSport && matchesCollege && matchesRating;

      const searchLower = searchTerm.toLowerCase();
      const searchFields = [
        entry.name,
        entry.email,
        entry.phone,
        entry.feedback
      ];

      const matchesSearch = searchFields.some(
        field => field && field.toLowerCase().includes(searchLower)
      );

      return matchesSport && matchesCollege && matchesRating && matchesSearch;
    });
  }, [feedback, filterSport, filterCollege, filterRating, searchTerm]);

  const filteredFeedback = getFilteredFeedback();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchTerm) {
        setCurrentPage(1);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleSportFilter = (sport) => {
    setFilterSport(sport);
    setCurrentPage(1);
  };

  const handleCollegeFilter = (college) => {
    setFilterCollege(college);
    setCurrentPage(1);
  };
  
  const handleRatingFilter = (rating) => {
    setFilterRating(rating);
    setCurrentPage(1);
  };
  const exportToExcel = () => {
    const dataToExport = filteredFeedback.map(entry => ({
      'Name': entry.name || '',
      'Email': entry.email || '',
      'Phone': entry.phone || '',
      'College': entry.college || '',
      'Sport': entry.sport || '',
      'Rating': entry.rating || '',
      'Feedback': entry.feedback || '',
      'Submission Date': entry.submissionDate
        ? new Date(entry.submissionDate).toLocaleString()
        : ''
    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Feedback");
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, `GITAM_Sports_Feedback_${new Date().toISOString().split('T')[0]}.xlsx`);
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<FiStar key={i} className="text-yellow-500 fill-current" />);
      } else {
        stars.push(<FiStar key={i} className="text-gray-300" />);
      }
    }
    return <div className="flex">{stars}</div>;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F4E4CA] flex items-center justify-center">
        <div className="p-8 rounded-lg bg-white shadow-lg text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#004740] mx-auto"></div>
          <p className="mt-4 text-[#004740] font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen w-full bg-[#f4e4c9] bg-gradient-to-b from-[#f4e4c9] to-[#e7d3b8] flex flex-col p-3 sm:p-6 md:p-8">
        {/* Page Heading */}
        <div className="w-full flex items-center justify-center mb-8">
          <div className="relative flex items-center w-full max-w-4xl px-2 sm:px-4">
            {/* Left Line */}
            <div className="flex-grow h-[2px] bg-gradient-to-r from-transparent to-[#004740]"></div>
            {/* Heading Text */}
            <h1 className="mx-2 sm:mx-8 text-xl sm:text-2xl md:text-4xl font-bold text-[#004740] text-center whitespace-nowrap">
              FEEDBACK ADMIN PORTAL
            </h1>
            {/* Right Line */}
            <div className="flex-grow h-[2px] bg-gradient-to-r from-[#004740] to-transparent"></div>
          </div>
        </div>

        <div className="w-full max-w-md mx-auto transition-all duration-300 transform hover:scale-[1.02]">
          <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border-2 border-[#a58255]">
            <div className="p-6 sm:p-8 bg-[#07534c] text-center">
              <div className="mb-6 relative inline-block">
                <div className="w-20 h-20 rounded-full bg-[#e7fefe]/10 flex items-center justify-center mx-auto">
                  <FiMail className="w-10 h-10 text-[#e7fefe]" />
                </div>
                <div className="absolute -bottom-1 -right-1 bg-[#a58255] rounded-full p-2">
                  <FiLock className="w-4 h-4 text-white" />
                </div>
              </div>
              
              <h2 className="text-xl sm:text-2xl font-bold text-[#e7fefe] mb-2">
                Admin Authentication
              </h2>
              
              <p className="text-[#e7fefe]/80 mb-6 text-sm sm:text-base">
                Please sign in with your authorized admin account to access the feedback dashboard.
              </p>

              {loginError && (
                <div className="mb-6 p-3 bg-red-500/20 border border-red-500/30 rounded-lg flex items-center">
                  <FiAlertCircle className="text-red-200 mr-2 flex-shrink-0" />
                  <p className="text-red-100 text-sm">{loginError}</p>
                </div>
              )}

              <button
                onClick={handleSignIn}
                disabled={isLoggingIn}
                className="w-full bg-[#a58255] hover:bg-[#9b774a] text-[#e7fefe] font-semibold text-sm py-3 px-8 rounded-lg transition-all duration-200 flex items-center justify-center shadow-md hover:shadow-lg disabled:opacity-70"
              >
                {isLoggingIn ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-2 border-t-transparent border-[#e7fefe] mr-2"></div>
                    Signing in...
                  </>
                ) : (
                  <>
                    <FiMail className="mr-2" />
                    Sign in with Google
                  </>
                )}
              </button>

              <p className="mt-6 text-xs text-[#e7fefe]/60">
                Secured access to GITAM Sports Feedback Dashboard
              </p>
            </div>
            
            <div className="px-6 sm:px-8 py-4 bg-white border-t border-gray-200">
              <div className="flex items-center text-xs text-gray-500">
                <FiAlertCircle className="text-[#004740] mr-2" />
                <p>Only authorized administrators can access this portal.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-6 bg-[#F4E4CA] min-h-screen">
      {/* Page Heading with Logout Button */}
      <div className="w-full flex items-center justify-between px-4 md:px-8 mb-6">
        {/* Left side with heading */}
        <div className="flex items-center">
          <h1 className="text-2xl sm:text-4xl font-bold text-[#004740]">
            FEEDBACK DASHBOARD
          </h1>
        </div>

        {/* Right side with logout button */}
        <button
          onClick={handleLogout}
          className="bg-[#a58255] hover:bg-[#9b774a] text-[#e7fefe] font-semibold text-sm py-2 px-4 rounded-lg transition-all duration-200 hover:scale-[1.02] shadow-md hover:shadow-lg flex items-center"
        >
          <FiLogOut className="mr-2" />
          Logout
        </button>
      </div>

      <div className="container mx-auto px-4">
        {/* Controls Section */}
        <div className="bg-white shadow-lg rounded-lg p-4 mb-6 border border-[#a58255]/20">
          <div className="grid gap-4 md:grid-cols-5">
            {/* Filter by Sport */}
            <div>
              <label htmlFor="sportFilter" className="block text-sm font-medium text-[#004740] mb-1">
                <FiFilter className="inline mr-1" /> Filter by Sport
              </label>
              <select
                id="sportFilter"
                value={filterSport}
                onChange={(e) => handleSportFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#07534c]"
              >
                {sports.map((sport) => (
                  <option key={sport} value={sport}>
                    {sport}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter by College */}
            <div>
              <label htmlFor="collegeFilter" className="block text-sm font-medium text-[#004740] mb-1">
                <FiFilter className="inline mr-1" /> Filter by College
              </label>
              <select
                id="collegeFilter"
                value={filterCollege}
                onChange={(e) => handleCollegeFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#07534c]"
              >
                {colleges.map((college) => (
                  <option key={college} value={college}>
                    {college}
                  </option>
                ))}
              </select>
            </div>

            {/* Filter by Rating */}
            <div>
              <label htmlFor="ratingFilter" className="block text-sm font-medium text-[#004740] mb-1">
                <FiStar className="inline mr-1" /> Filter by Rating
              </label>
              <select
                id="ratingFilter"
                value={filterRating}
                onChange={(e) => handleRatingFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#07534c]"
              >
                {ratings.map((rating) => (
                  <option key={rating} value={rating}>
                    {rating === 'All' ? 'All Ratings' : `${rating} Star${rating !== '1' ? 's' : ''}`}
                  </option>
                ))}
              </select>
            </div>

            {/* Search */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-[#004740] mb-1">
                <FiSearch className="inline mr-1" /> Search
              </label>
              <div className="relative">
                <input
                  id="search"
                  type="text"
                  placeholder="Search by name, email, phone or feedback content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#07534c] transition-colors"
                />
                <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Export Button */}
            <div className="flex items-end">
              <button
                onClick={exportToExcel}
                className="w-full bg-[#07534c] hover:bg-[#004740] text-white font-medium py-2 px-4 rounded-md transition duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
              >
                <FiDownload className="h-5 w-5 mr-2" />
                Download Excel
              </button>
            </div>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
            {/* Total Feedback Count */}
            <div className="bg-[#07534c] text-white rounded-md p-3 flex items-center shadow-md">
              <div className="bg-[#07534c]/40 p-3 rounded-full mr-3">
                <FiMessageSquare className="h-6 w-6 text-[#e7fefe]" />
              </div>
              <div>
                <div className="text-sm text-[#e7fefe]/80">Total Feedback</div>
                <div className="text-2xl font-bold">{filteredFeedback.length}</div>
              </div>
            </div>
            
            {/* Average Rating */}
            <div className="bg-[#a58255] text-white rounded-md p-3 flex items-center shadow-md">
              <div className="bg-[#a58255]/40 p-3 rounded-full mr-3">
                <FiStar className="h-6 w-6 text-[#e7fefe]" />
              </div>
              <div>
                <div className="text-sm text-[#e7fefe]/80">Average Rating</div>
                <div className="text-2xl font-bold">
                  {filteredFeedback.length ? 
                    (filteredFeedback.reduce((sum, item) => sum + (item.rating || 0), 0) / filteredFeedback.length).toFixed(1) : 
                    '0.0'}
                </div>
              </div>
            </div>
            
            {/* Most Popular Sport */}
            <div className="bg-[#004740] text-white rounded-md p-3 flex items-center shadow-md">
              <div className="bg-[#004740]/40 p-3 rounded-full mr-3">
                <FiActivity className="h-6 w-6 text-[#e7fefe]" />
              </div>
              <div>
                <div className="text-sm text-[#e7fefe]/80">Most Popular Sport</div>
                <div className="text-xl font-bold truncate">
                  {filteredFeedback.length ? 
                    Object.entries(
                      filteredFeedback.reduce((acc, item) => {
                        if (item.sport) {
                          acc[item.sport] = (acc[item.sport] || 0) + 1;
                        }
                        return acc;
                      }, {})
                    ).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None' : 
                    'None'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-[#a58255]/20">
          <div className="px-4 py-3 bg-[#07534c]/10 border-b border-[#07534c]/20">
            <div className="flex items-center text-[#004740] font-medium">
              <FiFileText className="mr-2" />
              Feedback Records
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#07534c]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">College</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Sport</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Rating</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Feedback</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredFeedback.length > 0 ? (
                  filteredFeedback.map((entry) => (
                    <tr key={entry.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{entry.name || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.email || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.phone || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.college || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{entry.sport || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {renderStars(entry.rating)}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs truncate">
                        <div className="max-h-16 overflow-y-auto">
                          {entry.feedback || '-'}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {entry.submissionDate ? new Date(entry.submissionDate).toLocaleDateString() : '-'}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="px-6 py-8 whitespace-nowrap text-sm text-gray-500 text-center">
                      <div className="flex flex-col items-center">
                        <FiAlertCircle className="text-gray-400 text-4xl mb-2" />
                        <p>No feedback found matching your criteria</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 p-6">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className={`bg-[#07534c] text-white font-medium py-2 px-4 rounded-md transition duration-300 flex items-center ${
            currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#004740] hover:shadow-md'
          }`}
        >
          <FiChevronLeft className="mr-1" /> Previous
        </button>
        <div className="flex items-center bg-white px-4 py-2 rounded-md shadow-md border border-[#a58255]/20">
          <span className="text-[#004740] font-medium flex items-center">
            <FiCheckCircle className="text-[#a58255] mr-2" />
            Page {currentPage} of {totalPages}
          </span>
        </div>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className={`bg-[#07534c] text-white font-medium py-2 px-4 rounded-md transition duration-300 flex items-center ${
            currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#004740] hover:shadow-md'
          }`}
        >
          Next <FiChevronRight className="ml-1" />
        </button>
      </div>
    </section>
  );
};

export default AdminFeedback;