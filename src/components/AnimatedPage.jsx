import React from 'react';
import { motion } from 'framer-motion';

// Configuration variations for the animation behavior
const pageVariants = {
  initial: {
    opacity: 0,
    y: 15, // Starts slightly lower down the screen
  },
  animate: {
    opacity: 1,
    y: 0, // Glides up to its exact natural position
    transition: {
      duration: 0.35, // Speed of the transition (in seconds)
      ease: [0.25, 1, 0.5, 1], // Custom premium easing curve
    },
  },
  exit: {
    opacity: 0,
    y: -15, // Fades upward out of view when disappearing
    transition: {
      duration: 0.2,
    },
  },
};

const AnimatedPage = ({ children }) => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="w-full"
    >
      {children}
    </motion.div>
  );
};

export default AnimatedPage;