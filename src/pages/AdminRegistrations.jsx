import React, { useState, useEffect, useCallback, useMemo } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { collection, query, orderBy, getDocs } from 'firebase/firestore';
import { signInWithPopup, signOut } from 'firebase/auth';
import { db, auth, provider } from '../firebase/config';
import { FiDownload, FiLogOut, FiSearch, FiLock, FiMail, FiChevronLeft, FiChevronRight, FiFilter, FiFileText, FiAlertCircle, FiEye, FiCheckCircle, FiActivity, FiDatabase } from 'react-icons/fi';

const AdminRegistrations = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterSport, setFilterSport] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [lastActivity, setLastActivity] = useState(Date.now());
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage, setRecordsPerPage] = useState(20);

  const ADMIN_EMAILS = ['bgangadh2@gitam.edu','pkoola@gitam.in','vagrawal@gitam.in'];

  const sports = [
    "All",
    "Athletics - 100m - 500/-",
    "Athletics - 200m - 500/-",
    "Basketball Men - 1500/-",
    "Basketball Women - 1500/-",
    "Chess - 500/-",
    "Cricket - 1500/-",
    "Football - 1500/-",
    "Kabaddi - 1500/-",
    "Throwball Men - 1500/-",
    "Throwball Women - 1500/-",
    "Volleyball - 1500/-"
  ];

  const handleSignIn = async () => {
    try {
      setIsLoggingIn(true);
      setLoginError('');
      const result = await signInWithPopup(auth, provider);
      const userEmail = result.user.email;
      
      if (ADMIN_EMAILS.includes(userEmail)) {
        setIsAuthenticated(true);
        fetchAllRegistrations();
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

  const fetchAllRegistrations = async () => {
    try {
      setLoading(true);
      const registrationsRef = collection(db, 'registrations');
      
      const registrationsQuery = query(
        registrationsRef,
        orderBy('timestamp', 'desc')
      );
      
      const querySnapshot = await getDocs(registrationsQuery);
      
      const allRegistrations = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || '',
          university: data.university || '',
          captainName: data.captainName || '',
          captainMobile: data.captainMobile || '',
          coachName: data.coachName || '',
          coachMobile: data.coachMobile || '',
          sport: data.sport || '',
          email: data.email || '',
          registrationDate: data.timestamp?.toDate() || new Date(),
        };
      });

      setRegistrations(allRegistrations);
      setCurrentPage(1);
    } catch (error) {
      console.error('Error fetching registrations:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let unsubscribe;
    const setupAuth = async () => {
      unsubscribe = auth.onAuthStateChanged(async (user) => {
        try {
          if (user && ADMIN_EMAILS.includes(user.email)) {
            setIsAuthenticated(true);
            await fetchAllRegistrations();
          } else {
            setIsAuthenticated(false);
            setRegistrations([]);
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

  const filteredRegistrations = useMemo(() => {
    return registrations.filter(reg => {
      const matchesSport = filterSport === 'All' || reg.sport === filterSport;

      if (!searchTerm) return matchesSport;

      const searchLower = searchTerm.toLowerCase();
      return (
        matchesSport && (
          (reg.name && reg.name.toLowerCase().includes(searchLower)) ||
          (reg.university && reg.university.toLowerCase().includes(searchLower)) ||
          (reg.captainName && reg.captainName.toLowerCase().includes(searchLower)) ||
          (reg.coachName && reg.coachName.toLowerCase().includes(searchLower)) ||
          (reg.email && reg.email.toLowerCase().includes(searchLower))
        )
      );
    });
  }, [registrations, filterSport, searchTerm]);

  const currentRecords = useMemo(() => {
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    return filteredRegistrations.slice(indexOfFirstRecord, indexOfLastRecord);
  }, [filteredRegistrations, currentPage, recordsPerPage]);


  const totalPages = useMemo(() => {
    return Math.ceil(filteredRegistrations.length / recordsPerPage);
  }, [filteredRegistrations, recordsPerPage]);


  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    setCurrentPage(1);
  }, [filterSport, searchTerm]);
  const handleSportFilter = (sport) => {
    setFilterSport(sport);
  };

  const handleRecordsPerPageChange = (e) => {
    const value = parseInt(e.target.value);
    setRecordsPerPage(value);
    setCurrentPage(1);
  };

  const exportToExcel = () => {
    const dataToExport = filteredRegistrations.map(reg => ({
      'Name': reg.name || '',
      'University/College': reg.university || '',
      'Team Captain': reg.captainName || '',
      'Captain Mobile': reg.captainMobile || '',
      'Coach Name': reg.coachName || '',
      'Coach Mobile': reg.coachMobile || '',
      'Sport': reg.sport || '',
      'Registration Date': reg.registrationDate
        ? new Date(reg.registrationDate).toLocaleString()
        : ''
    }));

    const ws = XLSX.utils.json_to_sheet(dataToExport);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Registrations");
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, `Sports_Registrations_${new Date().toISOString().split('T')[0]}.xlsx`);
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
              ADMIN PORTAL
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
                Please sign in with your authorized admin account to access the dashboard.
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
                Secured access to GITAM Sports Registration Dashboard
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
      <div className="w-full flex items-center justify-between my-4 md:my-8 px-4 container mx-auto max-w-7xl">
        <h1 className="text-2xl sm:text-4xl font-bold text-[#004740]">
          REGISTRATIONS DASHBOARD
        </h1>
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

            {/* Search */}
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-[#004740] mb-1">
                <FiSearch className="inline mr-1" /> Search
              </label>
              <div className="relative">
                <input
                  id="search"
                  type="text"
                  placeholder="Search by name, university, captain or coach..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#07534c] transition-colors"
                />
                <FiSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
              </div>
            </div>

            {/* Records Per Page */}
            <div>
              <label htmlFor="recordsPerPage" className="block text-sm font-medium text-[#004740] mb-1">
                <FiEye className="inline mr-1" /> Records Per Page
              </label>
              <select
                id="recordsPerPage"
                value={recordsPerPage}
                onChange={handleRecordsPerPageChange}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#07534c]"
              >
                <option value={20}>20 Records</option>
                <option value={50}>50 Records</option>
                <option value={100}>100 Records</option>
                <option value={200}>200 Records</option>
                <option value={filteredRegistrations.length}>All Records</option>
              </select>
            </div>

            {/* Export Button */}
            <div className="flex items-end">
              <button
                onClick={exportToExcel}
                className="w-full bg-[#07534c] hover:bg-[#004740] text-white font-medium py-7 px-4 rounded-md transition duration-300 flex items-center justify-center shadow-md hover:shadow-lg"
              >
                <FiDownload className="h-5 w-5 mr-2" />
                Download Excel
              </button>
            </div>

            {/* Registration Count */}
            <div className="bg-[#07534c] text-white rounded-md p-3 flex flex-col justify-center shadow-md">
              <div className="text-sm flex items-center">
                <FiDatabase className="mr-2" />
                Total Registrations
              </div>
              <div className="text-2xl font-bold flex items-center">
                <FiActivity className="mr-2 text-[#a58255]" />
                {filteredRegistrations.length}
              </div>
              <div className="text-xs text-gray-300 mt-1">
                Showing page {currentPage} of {totalPages || 1}
              </div>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden border border-[#a58255]/20">
          <div className="px-4 py-3 bg-[#07534c]/10 border-b border-[#07534c]/20">
            <div className="flex items-center text-[#004740] font-medium">
              <FiFileText className="mr-2" />
              Registration Records
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-[#07534c]">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">University/College</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Team Captain</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Captain Mobile</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Coach Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Coach Mobile</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Sport</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentRecords.length > 0 ? (
                  currentRecords.map((reg) => (
                    <tr key={reg.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-black">{reg.name || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{reg.university || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{reg.captainName || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{reg.captainMobile || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{reg.coachName || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{reg.coachMobile || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-black">{reg.sport || '-'}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-8 whitespace-nowrap text-sm text-black text-center">
                      <div className="flex flex-col items-center">
                        <FiAlertCircle className="text-gray-400 text-4xl mb-2" />
                        <p>No registrations found matching your criteria</p>
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
            Page {currentPage} of {totalPages || 1}
          </span>
        </div>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages || totalPages === 0}
          className={`bg-[#07534c] text-white font-medium py-2 px-4 rounded-md transition duration-300 flex items-center ${
            currentPage === totalPages || totalPages === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#004740] hover:shadow-md'
          }`}
        >
          Next <FiChevronRight className="ml-1" />
        </button>
      </div>
    </section>
  );
};

export default AdminRegistrations;