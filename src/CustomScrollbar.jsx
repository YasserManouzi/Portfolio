// src/CustomScrollbar.jsx

import React from 'react';
import { motion } from 'framer-motion';

const CustomScrollbar = ({ scrollYProgress }) => {
  return (
    <div className="fixed top-0 right-0 h-full w-3 bg-gray-200 dark:bg-gray-950 z-50">
      <motion.div
        className="w-full bg-sky-500 rounded-full"
        style={{ 
          scaleY: scrollYProgress, // La hauteur du pouce est liée à la progression du défilement
          transformOrigin: 'top' // L'animation de hauteur part du haut
        }} 
      />
    </div>
  );
};

export default CustomScrollbar;