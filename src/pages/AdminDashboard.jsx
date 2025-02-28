import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

const dummyRegistrations = [
  {
    id: '1',
    name: 'John Doe',
    university: 'University A',
    captainName: 'John Doe',
    captainMobile: '1234567890',
    coachName: 'Coach A',
    coachMobile: '1111111111',
    sport: 'Athletics - 100m',
    transactionId: 'TXN001',
    registrationDate: new Date(),
    paymentScreenshot: 'https://via.placeholder.com/150'
  },
  {
    id: '2',
    name: 'Jane Smith',
    university: 'University B',
    captainName: 'Jane Smith',
    captainMobile: '0987654321',
    coachName: 'Coach B',
    coachMobile: '2222222222',
    sport: 'Basketball Men',
    transactionId: 'TXN002',
    registrationDate: new Date(),
    paymentScreenshot: 'https://via.placeholder.com/150'
  },
  // Add more dummy data as needed...
];

const AdminDashboard = () => {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterSport, setFilterSport] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  // List of sports from your form
  const sports = [
    "All",
    "Athletics - 100m",
    "Athletics - 200m",
    "Basketball Men",
    "Basketball Women",
    "Chess",
    "Cricket",
    "Football",
    "Kabaddi",
    "Throwball Men",
    "Throwball Women",
    "Volleyball"
  ];

  useEffect(() => {
    // Simulate fetching data with a timeout
    setTimeout(() => {
      setRegistrations(dummyRegistrations);
      setLoading(false);
    }, 1000);
  }, []);

  // Filter registrations based on selected sport and search term
  const filteredRegistrations = registrations.filter(reg => {
    const matchesSport = filterSport === 'All' || reg.sport === filterSport;
    const lowerSearch = searchTerm.toLowerCase();
    const matchesSearch =
      searchTerm === '' ||
      reg.name?.toLowerCase().includes(lowerSearch) ||
      reg.university?.toLowerCase().includes(lowerSearch) ||
      reg.captainName?.toLowerCase().includes(lowerSearch) ||
      reg.coachName?.toLowerCase().includes(lowerSearch);
    return matchesSport && matchesSearch;
  });

  // Handle Excel export
  const exportToExcel = () => {
    const dataToExport = filteredRegistrations.map(reg => ({
      'Name': reg.name || '',
      'University/College': reg.university || '',
      'Team Captain': reg.captainName || '',
      'Captain Mobile': reg.captainMobile || '',
      'Coach Name': reg.coachName || '',
      'Coach Mobile': reg.coachMobile || '',
      'Sport': reg.sport || '',
      'Transaction ID': reg.transactionId || '',
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

  return (
    <section className="py-6 bg-[#F4E4CA] min-h-screen">
      {/* Page Heading */}
      <div className="w-full flex items-center justify-center my-8 md:my-12">
        <div className="relative flex items-center w-full max-w-7xl px-4">
          {/* Left Line */}
          <div className="flex-grow h-[2px] bg-gradient-to-r from-transparent to-[#004740]"></div>
          {/* Heading Text */}
          <h1 className="mx-8 text-4xl font-bold text-[#004740]">
            ADMIN DASHBOARD
          </h1>
          {/* Right Line */}
          <div className="flex-grow h-[2px] bg-gradient-to-r from-[#004740] to-transparent"></div>
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Controls Section */}
        <div className="bg-white shadow-md rounded-lg p-4 mb-6">
          <div className="grid gap-4 md:grid-cols-4">
            {/* Filter by Sport */}
            <div>
              <label htmlFor="sportFilter" className="block text-sm font-medium text-[#004740] mb-1">
                Filter by Sport
              </label>
              <select
                id="sportFilter"
                value={filterSport}
                onChange={(e) => setFilterSport(e.target.value)}
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
                Search
              </label>
              <input
                id="search"
                type="text"
                placeholder="Search by name, university, captain or coach..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#07534c]"
              />
            </div>

            {/* Export Button */}
            <div className="flex items-end">
              <button
                onClick={exportToExcel}
                className="w-full bg-[#07534c] hover:bg-[#004740] text-white font-medium py-2 px-4 rounded-md transition duration-300 flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Excel
              </button>
            </div>

            {/* Registration Count */}
            <div className="bg-[#07534c] text-white rounded-md p-3 flex flex-col justify-center">
              <div className="text-sm">Total Registrations</div>
              <div className="text-2xl font-bold">{filteredRegistrations.length}</div>
            </div>
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Transaction ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-white uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredRegistrations.length > 0 ? (
                  filteredRegistrations.map((reg) => (
                    <tr key={reg.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{reg.name || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reg.university || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reg.captainName || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reg.captainMobile || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reg.coachName || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reg.coachMobile || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reg.sport || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{reg.transactionId || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          className="text-[#07534c] hover:text-[#004740] mr-3"
                          onClick={() => alert(`View details for ID: ${reg.id}`)}
                        >
                          View
                        </button>
                        <a
                          href={reg.paymentScreenshot || '#'}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Payment Proof
                        </a>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="9" className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                      No registrations found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminDashboard;
