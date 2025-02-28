import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import FuzzyText from '../components/ui/FuzzyText';

const NotFound = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const redirect = setTimeout(() => {
      navigate('/');
    }, 5000);

    return () => {
      clearInterval(timer);
      clearTimeout(redirect);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen bg-[#f4e4c9] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl w-full text-center"
      >
        {/* 404 Text */}
        <div className="mb-8 flex justify-center items-center">
          <div style={{ display: 'inline-block', textAlign: 'center' }}>
            <FuzzyText 
              fontSize="clamp(8rem, 20vw, 15rem)"
              fontWeight={900}
              color="#07534c"
              baseIntensity={0.2} 
              hoverIntensity={0.5} 
              enableHover={true}
            >
              404
            </FuzzyText>
          </div>
        </div>

        {/* Messages */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-6 mb-12"
        >
          <h2 className="text-[#07534c] text-3xl font-semibold">
            Oops! Page Not Found
          </h2>
          <p className="text-[#07534c] text-lg">
            Looks like you've ventured into unknown territory.
            <br />
            Let's get you back to the game!
          </p>
        </motion.div>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <Link
            to="/"
            className="inline-block bg-[#07534c] text-[#e7fefe] px-8 py-3 
                     rounded-full text-lg font-semibold transition-all duration-300
                     hover:bg-[#a58255] hover:shadow-xl transform hover:-translate-y-1"
          >
            Return to Home ({countdown}s)
          </Link>
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1 }}
          className="absolute left-0 top-0 w-96 h-96 bg-[#f9f871] rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="absolute right-0 bottom-0 w-96 h-96 bg-[#e7fefe] rounded-full blur-3xl translate-x-1/2 translate-y-1/2"
        />
      </div>
    </div>
  );
};

export default NotFound;