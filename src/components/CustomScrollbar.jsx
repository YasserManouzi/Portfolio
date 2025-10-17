// src/components/CustomScrollbar.jsx

import React from 'react';
import { motion } from 'framer-motion';

/**
 * Affiche une barre de progression de défilement en haut de la page.
 * @param {object} props - Les propriétés du composant.
 * @param {object} props.scrollYProgress - La progression du défilement (de 0 à 1) fournie par useScroll de Framer Motion.
 * @param {string} props.theme - Le thème actuel ('light' ou 'dark').

 */
const CustomScrollbar = ({ scrollYProgress, theme }) => {
    
    // Choisir le dégradé en fonction du thème
    const gradientClass = theme === 'dark' 
        // Dégradé clair pour le mode sombre (bonne visibilité)
        ? 'bg-gradient-to-r from-sky-400 to-cyan-400' 
        // Dégradé plus foncé et vibrant pour le mode clair (bon contraste)
        : 'bg-gradient-to-r from-sky-500 to-indigo-500';

    return (
        <motion.div
            className={`fixed top-0 left-0 right-0 h-1.5 origin-left z-[60] ${gradientClass}`}
            style={{ scaleX: scrollYProgress }}
        />
    );
};

export default CustomScrollbar;