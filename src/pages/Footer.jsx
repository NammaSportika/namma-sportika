import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiFacebook, FiInstagram, FiLinkedin, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const FooterSection = ({ title, children, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="flex flex-col items-center w-full"
  >
    <h3 className="text-xl font-medium text-[#f9f871] mb-8 text-center">{title}</h3>
    {children}
  </motion.div>
);

const SocialIcon = ({ icon: Icon, href, label }) => (
  <motion.li
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="flex justify-center w-full"
  >
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-3 text-[#e7fefe] hover:text-[#f9f871] transition-colors"
      aria-label={label}
    >
      <Icon className="w-6 h-6" />
      <span>{label}</span>
    </a>
  </motion.li>
);

const Footer = () => {
  return (
    <footer className="bg-[#004740] border-t border-[#f4e4c9]/20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mx-auto max-w-6xl">
          {/* Quick Links Section */}
          <FooterSection title="Quick Access" delay={0.2}>
            <ul className="flex flex-col items-center space-y-4 w-full">
              {['Brochure', 'Info Poster', 'Rulebook', 'Registration'].map((item) => (
                <motion.li
                  key={item}
                  whileHover={{ y: -3 }}
                  className="w-full text-center"
                >
                  <Link 
                    to={`/${item.toLowerCase().replace(' ', '-')}`} 
                    className="text-[#e7fefe] hover:text-[#f9f871] text-base py-1 px-4 rounded-lg hover:bg-[#006056] transition-colors duration-300"

                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </FooterSection>

          {/* Contact Section */}
          <FooterSection title="Get in Touch" delay={0.3}>
            <ul className="flex flex-col items-center space-y-4 w-full">
              <motion.li whileHover={{ y: -3 }} className="w-full flex justify-center">
                <a href="mailto:nammasportika@gmail.com" className="flex items-center gap-3 text-[#e7fefe] hover:text-[#f9f871] text-base transition-all duration-300">
                  <FiMail className="w-5 h-5" />
                  <span>nammasportika@gmail.com</span>
                </a>
              </motion.li>

              <motion.li whileHover={{ y: -3 }} className="w-full flex justify-center">
                <a href="https://maps.app.goo.gl/R9UYYCn69TyvWGU56" className="flex items-center gap-3 text-[#e7fefe] hover:text-[#f9f871] text-base transition-all duration-300">
                  <FiMapPin className="w-5 h-5" />
                  <span>GITAM University, Bengaluru</span>
                </a>
              </motion.li>
            </ul>
          </FooterSection>
          
          {/* Social Media Section */}
          <FooterSection title="Social Media" delay={0.4}>
            <ul className="flex flex-col items-center space-y-4 w-full">
              <SocialIcon 
                icon={FiInstagram} 
                href="https://www.instagram.com/sportika.gitam" 
                label="Instagram" 
              />
              
              {/* <SocialIcon 
                icon={FiLinkedin} 
                href="https://www.linkedin.com/company/sportika-gitam" 
                label="LinkedIn" 
              /> */}
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
              <p className="text-sm text-[#e7fefe]">Developed with ❤️ by Directorate Of Sports, GITAM Bengaluru</p>                
            </div>
          </div>
        </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;

