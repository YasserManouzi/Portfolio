/**
 * @file CustomScrollbar.jsx
 * @description Affiche une barre de progression de défilement en haut de la page.
 * La couleur de la barre s'adapte au thème (clair/sombre) pour une meilleure visibilité.
 */
import React from 'react';
import { motion } from 'framer-motion';

/**
 * @param {object} props - Les propriétés du composant.
 * @param {import('framer-motion').MotionValue<number>} props.scrollYProgress - La progression du défilement (de 0 à 1).
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