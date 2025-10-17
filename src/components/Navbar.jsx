/**
 * @file Navbar.jsx
 * @description Affiche la barre de navigation principale du site.
 * Gère le style en fonction du défilement, le focus sur le lien actif, et le menu mobile.
 */
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

// Importation des composants enfants
import LanguageSwitcher from './LanguageSwitcher';
import ThemeToggle from './ThemeToggle';

/**
 * Affiche la barre de navigation principale du site.
 * S'adapte à l'état de défilement, à la page actuelle et à la section active.
 * Gère également l'affichage du menu mobile.
 * @param {object} props - Les propriétés du composant.
 * @param {boolean} props.isScrolled - Vrai si l'utilisateur a défilé vers le bas.
 * @param {string} props.currentPage - La page actuellement affichée ('home', 'projectX', etc.).
 * @param {function} props.setCurrentPage - Fonction pour changer la page actuelle.
 * @param {function} props.scrollToSection - Fonction pour faire défiler vers une section.
 * @param {string} props.activeSection - L'ID de la section actuellement visible.
 * @param {string} props.theme - Le thème actuel ('light' ou 'dark').
 * @param {function} props.setTheme - Fonction pour changer le thème.
 */
const Navbar = ({ isScrolled, currentPage, setCurrentPage, scrollToSection, activeSection, theme, setTheme }) => {
    const { t } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    /**
     * Gère le clic sur un lien dans le menu mobile :
     * fait défiler vers la cible et ferme le menu.
     */
    const handleMobileLinkClick = (e, target) => {
        if (typeof target === 'string') {
            scrollToSection(e, target);
        } else if (typeof target === 'function') {
            e.preventDefault();
            target();
        }
        setIsMenuOpen(false);
    };

      /**
     * Génère les classes CSS pour les liens de section, en gérant l'état actif/inactif.
     * @param {string} sectionId - L'ID de la section pour ce lien.
     * @returns {string} Les classes CSS Tailwind.
     */
    const getLinkClassName = (sectionId) => {
        const isActive = (currentPage === 'home' && activeSection === sectionId);
        return `transition-colors duration-300 dark:text-gray-300 ${
            isActive
                ? 'text-sky-500 dark:text-sky-400 font-semibold' // Style ACTIF (plus visible en sombre)
                : 'font-medium hover:text-sky-500 dark:hover:text-sky-400' // Style INACTIF
        }`;
    };

    /**
     * Génère les classes CSS pour le lien "Lettre de présentation".
     * @returns {string} Les classes CSS Tailwind.
     */
    const getCoverLetterClassName = () => {
        const isActive = currentPage === 'coverLetter';
        return `transition-colors duration-300 dark:text-gray-300 ${
            isActive
                ? 'text-sky-500 dark:text-sky-400 font-semibold'
                : 'font-medium hover:text-sky-500 dark:hover:text-sky-400'
        }`;
    }
    return (
                // L'en-tête devient semi-opaque et flouté au défilement
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 dark:bg-gray-900/80 shadow-lg backdrop-blur-sm' : 'bg-transparent'}`}>
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                {/* Logo cliquable pour revenir à l'accueil */}
                <a
                    href="#"
                    className="flex items-center gap-2 text-2xl font-bold transition-colors duration-300 text-gray-900 dark:text-gray-100 hover:text-sky-500"
                    onClick={(e) => {
                        e.preventDefault();
                         if (currentPage !== 'home') {
                            setCurrentPage('home');
                            // On attend que la page soit rendue pour scroller
                            setTimeout(() => {
                                sections['accueil']?.current?.scrollIntoView({ behavior: 'smooth' });
                            }, 50);
                        } else {
                             window.scrollTo({ top: 0, behavior: 'smooth' });
                        }
                    }}
                >
                    <motion.div
                        whileHover={{ scale: 1.15, rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="flex items-center"
                    >
                        <svg className="w-8 h-8 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                    </motion.div>
                </a>

                <div className="flex items-center gap-4">
                    {/* Navigation pour ordinateur */}
                    <nav className="hidden md:flex items-center gap-6">
                        <a href="#accueil" className={getLinkClassName('accueil')} onClick={(e) => scrollToSection(e, "accueil")}>{t('nav_home')}</a>
                        <a href="#projets" className={getLinkClassName('projets')} onClick={(e) => scrollToSection(e, "projets")}>{t('nav_projects')}</a>
                        <a href="#experience" className={getLinkClassName('experience')} onClick={(e) => scrollToSection(e, "experience")}>{t('nav_experience')}</a>
                        <a href="#formation" className={getLinkClassName('formation')} onClick={(e) => scrollToSection(e, "formation")}>{t('nav_education')}</a>
                        <a href="#apropos" className={getLinkClassName('apropos')} onClick={(e) => scrollToSection(e, "apropos")}>{t('nav_about')}</a>
                        <a href="#" className={getCoverLetterClassName()} onClick={(e) => { e.preventDefault(); setCurrentPage('coverLetter'); }}>{t('nav_coverLetter')}</a>
                        <a href="#contact" className={getLinkClassName('contact')} onClick={(e) => scrollToSection(e, "contact")}>{t('nav_contact')}</a>
                        <a href="mailto:yasser.manouzi.pro@gmail.com" className="inline-block px-4 py-2 bg-sky-500 text-white rounded-full shadow-md hover:bg-sky-600 transition-colors transform hover:-translate-y-1">{t('nav_contact_me')}</a>
                    </nav>

                    {/* Contrôles globaux */}
                    <LanguageSwitcher />
                    <ThemeToggle theme={theme} setTheme={setTheme} />

                    {/* Bouton du menu Hamburger pour mobile */}
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-md text-gray-800 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500" aria-label="Toggle menu">
                        {isMenuOpen ? <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg> : <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>}
                    </button>
                </div>
            </div>

            {/* Panneau du menu mobile */}
            <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out bg-white/95 dark:bg-gray-800/95 shadow-lg border-t border-gray-200 dark:border-gray-700 ${isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}>
                <ul className="flex flex-col gap-2 list-none p-4">
                    <li><a href="#accueil" className="block py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200" onClick={(e) => handleMobileLinkClick(e, "accueil")}>{t('nav_home')}</a></li>
                    <li><a href="#projets" className="block py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200" onClick={(e) => handleMobileLinkClick(e, "projets")}>{t('nav_projects')}</a></li>
                    <li><a href="#experience" className="block py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200" onClick={(e) => handleMobileLinkClick(e, "experience")}>{t('nav_experience')}</a></li>
                    <li><a href="#formation" className="block py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200" onClick={(e) => handleMobileLinkClick(e, "formation")}>{t('nav_education')}</a></li>
                    <li><a href="#apropos" className="block py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200" onClick={(e) => handleMobileLinkClick(e, "apropos")}>{t('nav_about')}</a></li>
                    <li><a href="#" className="block py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200" onClick={(e) => handleMobileLinkClick(e, () => setCurrentPage("coverLetter"))}>{t('nav_coverLetter')}</a></li>
                    <li><a href="#contact" className="block py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200" onClick={(e) => handleMobileLinkClick(e, "contact")}>{t('nav_contact')}</a></li>
                </ul>
            </div>
        </header>
    );
};

export default Navbar;