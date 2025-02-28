import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './pages/Navbar';
import LandingPage from './pages/LandingPage/LandingPage';
import ScrollToTop from './pages/ScrollToTop';
import Footer from './pages/Footer';
import AboutGitamSports from './pages/AboutGitamSports ';
import Events from './pages/Events/Events';
import ContactUs from './pages/ContactUs';
import Gallery from './pages/Gallery';
import NotFound from './pages/NotFound';
import Rulebook from './pages/Rulebook';
import AthleticsPage from './pages/Events/AthleticsPage';
import BasketballPage from './pages/Events/BasketballPage';
import ChessPage from './pages/Events/ChessPage';
import CricketPage from './pages/Events/CricketPage';
import FootballPage from './pages/Events/FootballPage';
import KabaddiPage from './pages/Events/KabaddiPage';
import VolleyballPage from './pages/Events/VolleyballPage';
import ThrowballPage from './pages/Events/ThrowballPage';
import RegistrationForm from './pages/RegistrationForm';
import AdminDashboard from './pages/AdminDashboard';
// Wrapper component to conditionally render the navbar
const AppContent = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen">
      {!isLandingPage && <Navbar />}
      <ScrollToTop />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutGitamSports />} />
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<ContactUs />} />         
          <Route path="/rulebook" element={<Rulebook />} />
          <Route path="/signup" element={<div>Sign Up Page</div>} />
          <Route path="/login" element={<div>Login Page</div>} />
          <Route path="/profile" element={<div>Profile Page</div>} />
          <Route path="/events/athletics" element={<AthleticsPage />} />
          <Route path="/events/basketball" element={<BasketballPage />} />
          <Route path="/events/chess" element={<ChessPage />} />
          <Route path="/events/cricket" element={<CricketPage />} />
          <Route path="/events/football" element={<FootballPage />} />
          <Route path="/events/kabaddi" element={<KabaddiPage />} />
          <Route path="/events/throwball" element={<ThrowballPage />} />
          <Route path="/events/volleyball" element={<VolleyballPage />} />
          <Route path='/registration' element={<RegistrationForm />} />
          <Route path='/admin' element={<AdminDashboard />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;