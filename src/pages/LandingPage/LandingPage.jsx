import React from 'react';
import { motion } from 'framer-motion';
import SportikaBanner from './SportikaBanner';
import SportikaHero from './SportikaHero';
import SportikaHighlights from './SportikaHighlights';
import SportikaSponsor from './SportikaSponsor';
import SportikaFaqs from './SportikaFaqs';
import LandingPageNavbar from './LandingPageNavbar';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
};

const fadeInRight = {
  initial: { opacity: 0, x: 20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -20 }
};

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-[#004740] overflow-x-hidden">
      <LandingPageNavbar />
      <SportikaBanner />
      <SportikaHero />
      <SportikaHighlights />
      {/* <SportikaSponsor /> */}
      <SportikaFaqs />
    </div>
  );
};

export default LandingPage;