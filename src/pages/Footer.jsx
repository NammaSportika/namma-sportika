import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiFacebook, FiInstagram, FiLinkedin, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const FooterSection = ({ title, children, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="flex flex-col items-center md:items-start w-full"
  >
    <h3 className="text-xl font-medium text-[#f9f871] mb-8">{title}</h3>
    {children}
  </motion.div>
);

const SocialIcon = ({ icon: Icon, href, label }) => (
  <motion.li
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
  >
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-[#e7fefe] hover:text-[#f9f871] transition-colors"
      aria-label={label}
    >
      <Icon className="w-7 h-7" />
    </a>
  </motion.li>
);

const Footer = () => {
  return (
    <footer className="bg-[#004740] border-t border-[#f4e4c9]/20">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 lg:gap-16 mx-auto max-w-6xl">
          {/* Logo and Social Section */}
          <FooterSection title="About Us" delay={0.1}>
            <ul className="flex flex-col items-center md:items-start space-y-3 w-full">
              <motion.img
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                src="/imgs/BrandImgs/namma-sportika-icon.png"
                alt="Sportika Logo"
                className="h-28 w-auto mb-6"
              />
              <p className="text-xl font-bold text-[#f9f871] mb-4">
                Namma Sportika
              </p>
              <p className="text-center md:text-left text-[#e7fefe] max-w-xs mb-8">
                Join us in celebrating the spirit of sports and competition at Namma Sportika.
              </p>
              <ul className="flex gap-6">
                <SocialIcon 
                  icon={FiInstagram} 
                  href="https://www.instagram.com/sportika.gitam" 
                  label="Instagram" 
                />
                <SocialIcon 
                  icon={FiLinkedin} 
                  href="https://www.linkedin.com/company/namma-sportika" 
                  label="LinkedIn" 
                />
              </ul>
            </ul>
          </FooterSection>

          {/* Quick Links Section */}
          <FooterSection title="Quick Access" delay={0.2}>
            <ul className="flex flex-col items-center md:items-start space-y-3 w-full">
              {['Brochure', 'Info Poster', 'Rulebook', 'Registration'].map((item) => (
                <motion.li
                  key={item}
                  whileHover={{ x: 5 }}
                  className="w-full text-center md:text-left"
                >
                  <Link 
                    to={`/${item.toLowerCase().replace(' ', '-')}`} 
                    className="text-[#e7fefe] hover:text-[#f9f871] transition-colors text-base"
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </FooterSection>

          {/* Contact Section */}
          <FooterSection title="Get in Touch" delay={0.3}>
            <ul className="flex flex-col items-center md:items-start space-y-4 w-full">
              <motion.li whileHover={{ x: 5 }} className="w-full">
                <a href="mailto:nammasportika@gitam.edu" className="flex items-center justify-center md:justify-start gap-3 text-[#e7fefe] hover:text-[#f9f871] text-base">
                  <FiMail className="w-5 h-5" />
                  <span>nammasportika@gitam.edu</span>
                </a>
              </motion.li>

              <motion.li whileHover={{ x: 5 }} className="w-full">
                <a href="tel:+919876543210" className="flex items-center justify-center md:justify-start gap-3 text-[#e7fefe] hover:text-[#f9f871] text-base">
                  <FiPhone className="w-5 h-5" />
                  <span>+91 98765 43210</span>
                </a>
              </motion.li>

              <motion.li whileHover={{ x: 5 }} className="w-full">
                <address className="flex items-center justify-center md:justify-start gap-3 text-[#e7fefe] not-italic text-base">
                  <FiMapPin className="w-5 h-5" />
                  <span>GITAM University, Bengaluru</span>
                </address>
              </motion.li>
            </ul>
          </FooterSection>
        </div>

        {/* Footer Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-12 pt-8 border-t border-[#f4e4c9]/20"
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[#e7fefe] text-center md:text-left order-2 md:order-1">
              &copy; {new Date().getFullYear()} Namma Sportika - GITAM University
            </p>
            
            {/* Developers Section */}
            <div className="flex flex-col md:flex-row items-center gap-2 order-1 md:order-2">
              <div className="flex flex-col md:flex-row items-center gap-2 order-1 md:order-2">
                <p className="text-sm text-[#e7fefe]">Developed with ❤️ by</p>
                <div className="flex items-center gap-2">
                  <a
                    href="https://www.linkedin.com/in/sidhartha-varma-konduru-67224134a/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#f9f871] hover:text-[#e7fefe] transition-colors"
                  >
                    Sidhartha Varma
                  </a>
                  <span className="text-[#e7fefe]">&</span>
                  <a
                    href="https://linkedin.com/in/agrawalvansh/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-[#f9f871] hover:text-[#e7fefe] transition-colors"
                  >
                    Vansh Agrawal
                  </a>
                  <span className="text-[#e7fefe]">from GITAM University, Bengaluru</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;