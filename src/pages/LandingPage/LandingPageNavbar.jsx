import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

const LandingPageNavbar = ({ user, handleLogout }) => {
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle scroll effects
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuOpen && !event.target.closest('.profile-menu-container')) {
        setProfileMenuOpen(false);
      }
      if (mobileMenuOpen && !event.target.closest('.mobile-menu-container')) {
        setMobileMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [profileMenuOpen, mobileMenuOpen]);

  const toggleProfileMenu = () => setProfileMenuOpen(!profileMenuOpen);
  const toggleMobileMenu = () => setMobileMenuOpen(!mobileMenuOpen);

  // Navigation links with proper capitalization
  const navLinks = [
    { to: '/', label: 'Home', onClick: () => navigate('/') },
    { to: '/about', label: 'About', onClick: () => navigate('/about') },
    { to: '/events', label: 'Events', onClick: () => navigate('/events') },
    { to: '/gallery', label: 'Gallery', onClick: () => navigate('/gallery') },
    { to: '/team', label: 'Team', onClick: () => navigate('/team') },
    { to: '/rulebook', label: 'Rulebook', onClick: () => navigate('/rulebook') },
    { to: '/contact', label: 'Contact', onClick: () => navigate('/contact') },
    { to: '/feedback', label: 'Feedback', onClick: () => navigate('/feedback') },
  ];

  // Check if the link is active
  const isActive = (path) => location.pathname === path;

  return (
    <>
      <div className="fixed top-0 left-0 w-full flex justify-center z-30">
        <nav 
          className={`rounded-full my-2 sm:my-3 px-4 sm:px-6 py-2 sm:py-3 shadow-lg transition-all duration-300 ${
            scrolled ? 'bg-opacity-95' : 'bg-opacity-85'
          }`}
          style={{ backgroundColor: '#004740' }}
          aria-label="Main navigation"
        >
          <div className="flex items-center justify-center">
            {navLinks.map((link, index) => (
              <Link
              key={index}
              to={link.to}
              className={`px-2 sm:px-3 py-1 sm:py-2 mx-1 text-sm sm:text-base rounded-md transition-colors duration-200 focus:outline-none  ${
                isActive(link.to) 
                  ? 'text-[#f9f871] font-semibold' 
                  : 'text-[#e7fefe] font-medium hover:text-[#f4e4c9]'
              }`}
              onClick={link.onClick}
              aria-current={isActive(link.to) ? "page" : undefined}
              style={{ textTransform: 'capitalize' }}
            >
              {link.label}
            </Link>
            ))}
          </div>
        </nav>
      </div>
    </>
  );
};

export default LandingPageNavbar;
