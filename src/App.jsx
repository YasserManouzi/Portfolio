import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronUp, ChevronDown } from 'lucide-react';

// Importation des données et des CV
import { getProjectsData } from './data/projectsData';
import CV_FR from '/cv_fr.pdf?url';
import CV_EN from '/cv_en.pdf?url';
import { toolsAndMethods } from './data/toolsAndMethods';


// Importation des composants
import CustomScrollbar from './components/CustomScrollbar';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ProjectPage from './components/ProjectPage';
import CoverLetterPage from './components/CoverLetterPage';

/**
 * Composant principal de l'application.
 * Gère l'état global (thème, page actuelle, état du scroll) et
 * orchestre l'affichage des différents composants.
 */
const App = () => {
    const { t } = useTranslation();

    // --- GESTION DE L'ÉTAT GLOBAL ---
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('accueil');
    const [currentPage, setCurrentPage] = useState('home'); // 'home', 'projectX', 'coverLetter'
    const [theme, setTheme] = useState(() => localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

    // --- GESTION DES RÉFÉRENCES POUR LE DÉFILEMENT ---
    const accueilRef = useRef(null);
    const projetsRef = useRef(null);
    const experienceRef = useRef(null);
    const formationRef = useRef(null);
    const aproposRef = useRef(null);
    const contactRef = useRef(null);
    const sections = useMemo(() => ({
        accueil: accueilRef, projets: projetsRef, experience: experienceRef,
        formation: formationRef, apropos: aproposRef, contact: contactRef
    }), []);
    const sectionOrder = useMemo(() => ['accueil', 'projets', 'experience', 'formation', 'apropos', 'contact'], []);
    const isScrollingProgrammatically = useRef(false);

    // --- GESTION DES DONNÉES DE PROJETS (MULTILINGUE) ---
    const projectsData = useMemo(() => getProjectsData(t), [t]);

    // --- EFFETS SECONDAIRES (HOOKS useEffect) ---

    // Applique le thème (dark/light) au document
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    // Gère l'état 'isScrolled' pour styliser la navbar
    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    // Remonte en haut de la page lors d'un changement de vue (ex: vers un projet)
    useEffect(() => {
        if (currentPage !== 'home') {
            window.scrollTo(0, 0);
        }
    }, [currentPage]);
    
    // Intersection Observer pour détecter la section active
    useEffect(() => {
        if (currentPage !== 'home') return; // Actif uniquement sur la page d'accueil

        const observer = new IntersectionObserver(
            (entries) => {
                if (isScrollingProgrammatically.current) return;
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setActiveSection(entry.target.id);
                    }
                });
            },
            { rootMargin: '-50% 0px -50% 0px' } // Déclenche au milieu de l'écran
        );

        const currentSections = sectionOrder.map(id => sections[id]?.current).filter(Boolean);
        currentSections.forEach(section => observer.observe(section));

        return () => currentSections.forEach(section => observer.unobserve(section));
    }, [currentPage, sections, sectionOrder]);

    // --- FONCTIONS DE NAVIGATION ---

    const scrollToSection = (e, id) => {
        e.preventDefault();
        setActiveSection(id);
        isScrollingProgrammatically.current = true;

        const performScroll = () => {
            const element = sections[id]?.current;
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setTimeout(() => { isScrollingProgrammatically.current = false; }, 1000);
            } else {
                isScrollingProgrammatically.current = false;
            }
        };

        if (currentPage !== 'home') {
            setCurrentPage('home');
            setTimeout(performScroll, 50); // Laisse le temps au DOM de se mettre à jour
        } else {
            performScroll();
        }
    };

    const currentIndex = sectionOrder.indexOf(activeSection);
    const previousSectionId = currentIndex > 0 ? sectionOrder[currentIndex - 1] : null;
    const nextSectionId = currentIndex < sectionOrder.length - 1 ? sectionOrder[currentIndex + 1] : null;

    const handleScrollUp = (e) => {
        if (previousSectionId) {
            scrollToSection(e, previousSectionId);
        }
    };
    
    const handleScrollDown = (e) => {
        if (nextSectionId) {
            scrollToSection(e, nextSectionId);
        }
    };
    
    // --- ROUTAGE ET AFFICHAGE CONDITIONNEL ---
    const renderContent = () => {
    const project = projectsData.find(p => p.id === currentPage);
    if (project) {
            return <ProjectPage scrollToSection={scrollToSection} title={project.pageTitle} description={project.description} fullImage={project.fullImage} details={project.details} />;
    }
    switch (currentPage) {
        case 'coverLetter':
            return <CoverLetterPage setCurrentPage={setCurrentPage} />;
        case 'home':
        default:
            return <HomePage
                refs={{ accueilRef, projetsRef, experienceRef, formationRef, aproposRef, contactRef }}
                setCurrentPage={setCurrentPage}
                projectsData={projectsData}
                theme={theme}
                CV_FR={CV_FR}
                CV_EN={CV_EN}
                toolsAndMethods={toolsAndMethods} 
            />;
    }
};
    // --- ANIMATION DE LA BARRE DE DÉFILEMENT ---
    const { scrollYProgress } = useScroll();
    const scaleY = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

    return (
        <>
            <CustomScrollbar scrollYProgress={scaleY} />
            <div className="transition-colors duration-300 bg-white dark:bg-gray-900">
                <Navbar isScrolled={isScrolled} currentPage={currentPage} setCurrentPage={setCurrentPage} scrollToSection={scrollToSection} activeSection={activeSection} theme={theme} setTheme={setTheme} />
                
                <div className="fixed bottom-6 right-6 z-40 flex flex-col gap-2">
                    <AnimatePresence>
                        {isScrolled && currentPage === 'home' && previousSectionId && (
                            <motion.button 
                                onClick={handleScrollUp}
                                className="bg-sky-500/80 hover:bg-sky-600 text-white p-3 rounded-full shadow-lg backdrop-blur-sm" 
                                aria-label="Aller à la section précédente"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.2, ease: "easeOut" }} 
                                whileHover={{ scale: 1.1 }} 
                                whileTap={{ scale: 0.9 }} 
                            >
                                <ChevronUp size={24} />
                            </motion.button>
                        )}
                    </AnimatePresence>
                    <AnimatePresence>
                        {isScrolled && currentPage === 'home' && nextSectionId && (
                            <motion.button 
                                onClick={handleScrollDown}
                                className="bg-sky-500/80 hover:bg-sky-600 text-white p-3 rounded-full shadow-lg backdrop-blur-sm" 
                                aria-label="Aller à la section suivante"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                transition={{ duration: 0.2, ease: "easeOut" }} 
                                whileHover={{ scale: 1.1 }} 
                                whileTap={{ scale: 0.9 }} 
                            >
                                <ChevronDown size={24} />
                            </motion.button>
                        )}
                    </AnimatePresence>
                </div>

                <main className="flex-grow">
                    {renderContent()}
                </main>

                <footer className="bg-gray-800 dark:bg-black text-white py-6 text-center border-t border-transparent dark:border-gray-800 transition-colors">
                    <p className="text-sm text-gray-400">{t('footer_text')}</p>
                </footer>
            </div>
        </>
    );
};

export default App;