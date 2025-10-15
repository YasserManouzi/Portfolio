// src/CustomScrollbar.jsx

import React from 'react';
import { motion } from 'framer-motion';

const CustomScrollbar = ({ scrollYProgress }) => (
    <motion.div className="fixed top-0 left-0 right-0 h-1 bg-sky-500 origin-left z-[60]" style={{ scaleX: scrollYProgress }} />
);

export default CustomScrollbar;