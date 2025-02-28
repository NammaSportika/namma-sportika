import React from 'react';
import { motion } from 'framer-motion';
export const TextAnimate = ({
  children,
  animation = 'blurInUp',
  by = 'character',
  once = true,
  className = ''
}) => {
  const text = children.toString();
  const elements = by === 'character' ? text.split('') : text.split(' ');

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        default: { type: 'spring', damping: 12, stiffness: 100 },
        filter: { type: 'tween', duration: 0.3, ease: 'easeOut' }
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      filter: 'blur(10px)',
      transition: {
        default: { type: 'spring', damping: 12, stiffness: 100 },
        filter: { type: 'tween', duration: 0.3, ease: 'easeOut' }
      },
    },
  };

  return (
    <motion.span
      style={{ display: 'inline-block' }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once }}
      className={className}
    >
      {elements.map((char, index) => (
        <motion.span
          key={index}
          variants={child}
          style={{ 
            display: 'inline-block',
            willChange: 'filter'
          }}
        >
          {char === ' ' ? '\u00A0' : char}
          {by === 'word' && index < elements.length - 1 ? '\u00A0' : ''}
        </motion.span>
      ))}
    </motion.span>
  );
};
