import React, { useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import './Error.css';

const Error = () => {
  useEffect(() => {
    document.title = '404 - Page Not Found';
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.3,
        delayChildren: 0.2 
      } 
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <motion.section 
      id="error-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="error-content"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div className="error-code" variants={itemVariants}>
          <span className="digit">4</span>
          <span className="digit">0</span>
          <motion.span 
            className="digit"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ repeat: Infinity, duration: 2, ease: 'easeInOut' }}
          >4</motion.span>
        </motion.div>
        
        <motion.h1 variants={itemVariants}>Page Not Found</motion.h1>
        
        <motion.p variants={itemVariants} className="error-message">
          The page you are looking for doesn't exist or has been moved.
        </motion.p>
        
        <motion.div className="error-buttons" variants={itemVariants}>
          <NavLink to="/" className="home-btn">
            <span>Back to Home</span>
          </NavLink>
        </motion.div>
      </motion.div>
    </motion.section>
  )
}

export default Error