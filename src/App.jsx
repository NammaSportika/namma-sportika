import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './pages/Navbar';
import LandingPage from './pages/LandingPage/LandingPage';
import ScrollToTop from './pages/ScrollToTop';
import Footer from './pages/Footer';
import AboutGitamSports from './pages/AboutGitamSports';
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
import AdminRegistrations from './pages/AdminRegistrations';
import FeedbackForm from './pages/FeedbackForm';
import AdminFeedback from './pages/AdminFeedback';

const AppContent = () => {
  const location = useLocation();
  const isLandingPage = location.pathname === '/';
  const hideNavFooter = ['/admin-registrations', '/admin-feedback'].includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Render Navbar only if it's not the landing page and not an admin page */}
      {!isLandingPage && !hideNavFooter && <Navbar />}
      <ScrollToTop />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutGitamSports />} />
          <Route path="/events" element={<Events />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/contact" element={<ContactUs />} />         
          <Route path="/rulebook" element={<Rulebook />} />
          <Route path="/events/athletics" element={<AthleticsPage />} />
          <Route path="/events/basketball" element={<BasketballPage />} />
          <Route path="/events/chess" element={<ChessPage />} />
          <Route path="/events/cricket" element={<CricketPage />} />
          <Route path="/events/football" element={<FootballPage />} />
          <Route path="/events/kabaddi" element={<KabaddiPage />} />
          <Route path="/events/throwball" element={<ThrowballPage />} />
          <Route path="/events/volleyball" element={<VolleyballPage />} />
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="/admin-registrations" element={<AdminRegistrations />} />
          <Route path="/admin-feedback" element={<AdminFeedback />} />
          {/* <Route path='/feedback' element={<FeedbackForm />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {/* Render Footer only if not on admin pages */}
      {!hideNavFooter && <Footer />}
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
