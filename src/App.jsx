import React, { useState, useEffect, useRef } from 'react';
import ThemeToggle from './ThemeToggle';
import { motion, useScroll, useSpring } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import CustomScrollbar from './CustomScrollbar';

// COMPOSANT POUR L'ANIMATION D'APPARITION
const FadeInSection = ({ children }) => {
    const { ref, inView } = useInView({
        triggerOnce: true,
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
    });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: inView ? 1 : 0, y: inView ? 0 : 30 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
        >
            {children}
        </motion.div>
    );
};

const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const handleLanguageChange = (lang) => { i18n.changeLanguage(lang); };

    return (
        <div className="flex items-center text-sm font-medium">
            <button onClick={() => handleLanguageChange('fr')} className={`px-2 py-1 rounded-l-md transition-colors ${i18n.language.startsWith('fr') ? 'bg-sky-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}>FR</button>
            <button onClick={() => handleLanguageChange('en')} className={`px-2 py-1 rounded-r-md transition-colors ${i18n.language.startsWith('en') ? 'bg-sky-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}>EN</button>
        </div>
    );
};

// ======================= COMPOSANT NAVBAR =======================
const Navbar = ({ isScrolled, currentPage, setCurrentPage, scrollToSection, activeSection, theme, setTheme }) => {
    const { t } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleMobileLinkClick = (e, target) => {
        if (typeof target === 'string') scrollToSection(e, target);
        else if (typeof target === 'function') { e.preventDefault(); target(); }
        setIsMenuOpen(false);
    };

    return (
        <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white/90 dark:bg-gray-900/80 shadow-lg backdrop-blur-sm' : 'bg-transparent'}`}>
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                <a href="#" className="flex items-center gap-2 text-2xl font-bold transition-colors duration-300 text-gray-900 dark:text-gray-100 hover:text-sky-500" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                    <motion.div whileHover={{ scale: 1.15, rotate: 10 }} whileTap={{ scale: 0.9 }} transition={{ type: "spring", stiffness: 300, damping: 20 }} className="flex items-center">
                        <svg className="w-8 h-8 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
                    </motion.div>
                </a>
                <div className="flex items-center gap-4">
                    <nav className="hidden md:flex items-center gap-6">
                        <a href="#accueil" className={`font-medium transition-colors duration-300 dark:text-gray-300 ${currentPage === 'home' && activeSection === 'accueil' ? 'text-sky-500 link-active' : 'hover:text-sky-500 dark:hover:text-sky-400'}`} onClick={(e) => scrollToSection(e, "accueil")}>{t('nav_home')}</a>
                        <a href="#projets" className={`font-medium transition-colors duration-300 dark:text-gray-300 ${currentPage === 'home' && activeSection === 'projets' ? 'text-sky-500 link-active' : 'hover:text-sky-500 dark:hover:text-sky-400'}`} onClick={(e) => scrollToSection(e, "projets")}>{t('nav_projects')}</a>
                        <a href="#experience" className={`font-medium transition-colors duration-300 dark:text-gray-300 ${currentPage === 'home' && activeSection === 'experience' ? 'text-sky-500 link-active' : 'hover:text-sky-500 dark:hover:text-sky-400'}`} onClick={(e) => scrollToSection(e, "experience")}>{t('nav_experience')}</a>
                        <a href="#apropos" className={`font-medium transition-colors duration-300 dark:text-gray-300 ${currentPage === 'home' && activeSection === 'apropos' ? 'text-sky-500 link-active' : 'hover:text-sky-500 dark:hover:text-sky-400'}`} onClick={(e) => scrollToSection(e, "apropos")}>{t('nav_about')}</a>
                        <a href="#" className={`font-medium transition-colors duration-300 dark:text-gray-300 ${currentPage === 'coverLetter' ? 'text-sky-500 link-active' : 'hover:text-sky-500 dark:hover:text-sky-400'}`} onClick={(e) => { e.preventDefault(); setCurrentPage('coverLetter'); }}>{t('nav_coverLetter')}</a>
                        <a href="#contact" className={`font-medium transition-colors duration-300 dark:text-gray-300 ${currentPage === 'home' && activeSection === 'contact' ? 'text-sky-500 link-active' : 'hover:text-sky-500 dark:hover:text-sky-400'}`} onClick={(e) => scrollToSection(e, "contact")}>{t('nav_contact')}</a>
                        <a href="mailto:yasser.manouzi.pro@gmail.com" className="inline-block px-4 py-2 bg-sky-500 text-white rounded-full shadow-md hover:bg-sky-600 transition-colors transform hover:-translate-y-1">{t('nav_contact_me')}</a>
                    </nav>
                    <LanguageSwitcher />
                    <ThemeToggle theme={theme} setTheme={setTheme} />
                    <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-md text-gray-800 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500" aria-label="Toggle menu">
                        {isMenuOpen ? <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg> : <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>}
                    </button>
                </div>
            </div>
            <div className={`md:hidden overflow-hidden transition-all duration-500 ease-in-out bg-white/95 dark:bg-gray-800/95 shadow-lg border-t border-gray-200 dark:border-gray-700 ${isMenuOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"}`}>
                <ul className="flex flex-col gap-2 list-none p-4">
                    <li><a href="#accueil" className="block py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200" onClick={(e) => handleMobileLinkClick(e, "accueil")}>{t('nav_home')}</a></li>
                    <li><a href="#projets" className="block py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200" onClick={(e) => handleMobileLinkClick(e, "projets")}>{t('nav_projects')}</a></li>
                    <li><a href="#experience" className="block py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200" onClick={(e) => handleMobileLinkClick(e, "experience")}>{t('nav_experience')}</a></li>
                    <li><a href="#apropos" className="block py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200" onClick={(e) => handleMobileLinkClick(e, "apropos")}>{t('nav_about')}</a></li>
                    <li><a href="#" className="block py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200" onClick={(e) => handleMobileLinkClick(e, () => setCurrentPage("coverLetter"))}>{t('nav_coverLetter')}</a></li>
                    <li><a href="#contact" className="block py-2 px-4 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-gray-200" onClick={(e) => handleMobileLinkClick(e, "contact")}>{t('nav_contact')}</a></li>
                    <li className="flex justify-center mt-4"><LanguageSwitcher /></li>
                </ul>
            </div>
        </header>
    );
};

// ======================= COMPOSANT HOMEPAGE =======================
const HomePage = ({ accueilRef, projetsRef, experienceRef, aproposRef, contactRef, setCurrentPage, projectsData, technologies }) => {
    const { t } = useTranslation();
    const phrases = [t('hero_phrases.1'), t('hero_phrases.2'), t('hero_phrases.3')];
    const [currentText, setCurrentText] = useState('');
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(100);

    useEffect(() => {
        const handleTyping = () => {
            if (!phrases[phraseIndex]) return;
            const currentFullText = phrases[phraseIndex];
            if (isDeleting) setCurrentText(currentFullText.substring(0, currentText.length - 1));
            else setCurrentText(currentFullText.substring(0, currentText.length + 1));
            setTypingSpeed(isDeleting ? 50 : 100);
        };
        const timeoutId = setTimeout(handleTyping, typingSpeed);
        if (!isDeleting && currentText === phrases[phraseIndex]) setTimeout(() => setIsDeleting(true), 2000);
        else if (isDeleting && currentText === '') {
            setIsDeleting(false);
            setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
        return () => clearTimeout(timeoutId);
    }, [currentText, isDeleting, typingSpeed, phraseIndex, phrases]);
    
    const canvasRef = useRef(null);
    useEffect(() => { /* ... code du canvas inchangé ... */ }, []);

    const { ref: technologiesRef, inView: technologiesInView } = useInView({ triggerOnce: true, threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
    const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };

    return (
        <>
            <section id="accueil" ref={accueilRef} className="flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-slate-800 text-white px-6 text-center pt-20 pb-20 relative overflow-hidden min-h-screen">
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
                <div className="absolute inset-0 flex items-center justify-center z-0">
                    <div className="w-96 h-96 bg-sky-500 rounded-full mix-blend-lighten filter blur-3xl opacity-30 animate-pulse-slow"></div>
                </div>
                <div className="relative z-10 animate-fade-in-up">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4 font-heading">{t('hero_greeting')} <span className="text-sky-500">Yasser Manouzi</span></h1>
                    <p className="text-lg md:text-2xl font-semibold max-w-2xl h-8 mb-6">{currentText}<span className="typing-cursor text-sky-500">|</span></p>
                    <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
                        <a href="#projets" onClick={(e) => { e.preventDefault(); projetsRef.current.scrollIntoView({ behavior: 'smooth' }); }} className="inline-block px-8 py-4 bg-sky-500 text-white rounded-full shadow-lg hover:bg-sky-600 transition-colors transform hover:-translate-y-1">{t('hero_button_projects')}</a>
                        <a href="#contact" onClick={(e) => { e.preventDefault(); contactRef.current.scrollIntoView({ behavior: 'smooth' }); }} className="inline-block px-8 py-4 bg-transparent border-2 border-white text-white rounded-full hover:bg-white hover:text-gray-900 transition-colors transform hover:-translate-y-1">{t('hero_button_contact')}</a>
                    </div>
                    <div className="flex justify-center gap-6 mt-8">
                        <a href="https://github.com/YasserManouzi" target="_blank" rel="noopener noreferrer" aria-label="Mon profil GitHub" className="text-gray-300 hover:text-sky-500 transition-colors transform hover:-translate-y-1"><svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.475.087.643-.206.643-.453 0-.222-.007-.975-.011-1.912-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.619.069-.608.069-.608 1.006.07 1.532 1.037 1.532 1.037.89 1.529 2.336 1.087 2.909.832.091-.649.351-1.087.636-1.338-2.22-.253-4.555-1.115-4.555-4.945 0-1.093.39-1.988 1.029-2.695-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.022A9.606 9.606 0 0112 5.044c.85.004 1.701.114 2.492.327 1.909-1.292 2.747-1.022 2.747-1.022.546 1.379.203 2.398.1 2.65.64.707 1.029 1.602 1.029 2.695 0 3.83-2.339 4.687-4.562 4.935.359.307.678.915.678 1.846 0 1.338-.012 2.419-.012 2.747 0 .247.169.542.648.452C19.146 20.19 22 16.438 22 12.017 22 6.484 17.522 2 12 2z" clipRule="evenodd"/></svg></a>
                        <a href="https://linkedin.com/in/yasser-manouzi" target="_blank" rel="noopener noreferrer" aria-label="Mon profil LinkedIn" className="text-gray-300 hover:text-sky-500 transition-colors transform hover:-translate-y-1"><svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.766s.784-1.766 1.75-1.766 1.75.79 1.75 1.766-.783 1.766-1.75 1.766zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg></a>
                    </div>
                </div>
            </section>

            <FadeInSection>
                <section id="projets" ref={projetsRef} className="py-24 bg-white dark:bg-gray-900 transition-colors">
                    <div className="absolute inset-0 flex items-center justify-center z-0">
                    <div className="w-96 h-96 bg-sky-500 rounded-full mix-blend-lighten filter blur-3xl opacity-30 animate-pulse-slow"></div>
                </div>
                    <div className="max-w-6xl mx-auto px-6">
                        <h2 className="text-4xl font-bold text-center mb-12 font-heading dark:text-white">{t('projects_title')}</h2>
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                            {projectsData.map((project) => (
                                <article key={project.id} className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 transform hover:-translate-y-2 cursor-pointer" onClick={() => setCurrentPage(project.id)}>
                                    <div className="h-40 mb-6 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                                        <img src={project.image} alt={`${t('project_image_alt')} ${project.cardTitle}`} className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 font-heading dark:text-white">{project.cardTitle}</h3>
                                    <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                                    <span className="text-sky-500 hover:text-sky-600 font-semibold transition-colors">{t('project_view')}</span>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            </FadeInSection>
            
            <FadeInSection>
                <section id="experience" ref={experienceRef} className="py-24 bg-gray-50 dark:bg-gray-950 transition-colors">
                    <div className="max-w-4xl mx-auto px-6">
                        <h2 className="text-4xl font-bold text-center mb-12 font-heading dark:text-white">{t('experience_title')}</h2>
                        <div className="space-y-8">
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                                <div className="flex justify-between items-start flex-wrap"><div><h3 className="text-xl font-semibold font-heading dark:text-white">{t('experience_job1_title')}</h3><p className="text-lg text-sky-500">{t('experience_job1_company')}</p></div><span className="text-gray-500 dark:text-gray-400 mt-2 md:mt-0">{t('experience_job1_date')}</span></div>
                                <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">{t('experience_job1_desc')}</p>
                            </div>
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                                 <div className="flex justify-between items-start flex-wrap"><div><h3 className="text-xl font-semibold font-heading dark:text-white">{t('experience_job2_title')}</h3><p className="text-lg text-sky-500">{t('experience_job2_company')}</p></div><span className="text-gray-500 dark:text-gray-400 mt-2 md:mt-0">{t('experience_job2_date')}</span></div>
                                <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">{t('experience_job2_desc')}</p>
                            </div>
                        </div>
                    </div>
                </section>
            </FadeInSection>

            <FadeInSection>
                <section id="apropos" ref={aproposRef} className="py-24 bg-white dark:bg-gray-900 transition-colors">
                     <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-5 gap-x-16 items-center">
                        <div className="lg:col-span-3">
                            <h2 className="text-4xl font-bold mb-6 font-heading text-center lg:text-left dark:text-white">{t('about_title')}</h2>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{t('about_p1')}</p>
                            <div className="mt-8">
                                <h3 className="text-2xl font-semibold mb-4 font-heading text-center lg:text-left dark:text-white">{t('about_principles_title')}</h3>
                                <ul className="space-y-3">
                                    <li className="flex items-start"><svg className="w-6 h-6 text-sky-500 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span className="text-gray-700 dark:text-gray-300"><strong className="font-semibold text-gray-900 dark:text-white">{t('about_principle1_title')}</strong>{t('about_principle1_text')}</span></li>
                                    <li className="flex items-start"><svg className="w-6 h-6 text-sky-500 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span className="text-gray-700 dark:text-gray-300"><strong className="font-semibold text-gray-900 dark:text-white">{t('about_principle2_title')}</strong>{t('about_principle2_text')}</span></li>
                                </ul>
                            </div>
                        </div>
                        <div className="lg:col-span-2 mt-12 lg:mt-0">
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg text-center">
                                 <img src="images/imageProfil.jpg" alt={t('about_profile_alt')} className="rounded-full shadow-xl border-4 border-sky-500 dark:border-sky-400 w-32 h-32 object-cover mx-auto -mt-20 mb-4 transform transition-transform hover:scale-105" />
                                <h3 className="text-2xl font-bold font-heading dark:text-white">{t('about_name')}</h3>
                                <p className="text-gray-500 dark:text-gray-400 mb-6">{t('about_job_title')}</p>
                                <h4 className="text-xl font-semibold mb-4 font-heading dark:text-white">{t('about_tech_title')}</h4>
                                <motion.div ref={technologiesRef} className="flex flex-wrap justify-center gap-2" variants={containerVariants} initial="hidden" animate={technologiesInView ? "visible" : "hidden"}>
                                    {technologies.map((tech) => (
                                        <motion.div key={tech.name} variants={itemVariants} className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm font-medium px-3 py-1 rounded-full transition-transform transform hover:scale-110">
                                            <i className={`${tech.icon} text-lg`}></i>
                                            <span>{tech.name}</span>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>
            </FadeInSection>

            <FadeInSection>
                <section id="contact" ref={contactRef} className="py-24 bg-gray-50 dark:bg-gray-950 transition-colors">
                    <div className="max-w-xl mx-auto px-6 text-center">
                        <h2 className="text-4xl font-bold mb-4 font-heading dark:text-white">{t('contact_title')}</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">{t('contact_subtitle')}</p>
                        <a href="mailto:yasser.manouzi.pro@gmail.com" className="inline-block px-8 py-4 bg-sky-500 text-white rounded-full shadow-lg hover:bg-sky-600 transition-colors transform hover:-translate-y-1">{t('nav_contact_me')}</a>
                    </div>
                </section>
            </FadeInSection>
        </>
    );
};

// ======================= COMPOSANT PROJECTPAGE =======================
const ProjectPage = ({ title, description, details, fullImage, setCurrentPage }) => {
    const { t } = useTranslation();
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
            <div className="w-full max-w-4xl mx-auto px-6 py-12 pt-24 animate-fade-in-up">
                <button onClick={() => setCurrentPage('home')} className="flex items-center gap-2 text-sky-500 hover:text-sky-600 font-semibold mb-8">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    {t('project_page_back')}
                </button>
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 font-heading">{title}</h1>
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mb-6">{description}</p>
                <div className="mb-8 rounded-lg overflow-hidden shadow-lg bg-gray-100 dark:bg-gray-800 flex justify-center items-center p-4">
                    <img src={fullImage} alt={`${t('project_page_image_alt')} ${title}`} className="max-h-96 object-contain rounded-lg" />
                </div>
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                    <h3 className="text-2xl font-bold mb-4 font-heading dark:text-white">{t('project_page_details_title')}</h3>
                    <p className="text-gray-600 dark:text-gray-400">{details}</p>
                </div>
            </div>
        </div>
    );
};

// ======================= COMPOSANT COVERLETTERPAGE =======================
const CoverLetterPage = ({ setCurrentPage }) => {
    const { t } = useTranslation();
    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors flex justify-center items-center">
            <div className="w-full max-w-4xl mx-auto px-6 py-12 animate-fade-in-up">
                <button onClick={() => setCurrentPage('home')} className="flex items-center gap-2 text-sky-500 hover:text-sky-600 font-semibold mb-8">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    {t('project_page_back')}
                </button>
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-4 font-heading">{t('nav_coverLetter')}</h1>
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">{t('cover_letter_content')}</p>
                </div>
            </div>
        </div>
    );
};

// ======================= COMPOSANT PRINCIPAL APP =======================
const App = () => {
    const { t, i18n } = useTranslation();

    const projectsData = [
        { id: 'project1', cardTitle: t('project1_card_title'), pageTitle: t('project1_page_title'), description: t('project1_description'), image: 'images/stageEtu.png', fullImage: 'images/imageAppStage.png', details: t('project1_details') },
        { id: 'project2', cardTitle: t('project2_card_title'), pageTitle: t('project2_page_title'), description: t('project2_description'), image: 'images/battleship.png', fullImage: 'images/battleship.png', details: t('project2_details') },
        { id: 'project3', cardTitle: t('project3_card_title'), pageTitle: t('project3_page_title'), description: t('project3_description'), image: 'images/gestionBanque.png', fullImage: 'images/gestionBanque.png', details: t('project3_details') },
        { id: 'project4', cardTitle: t('project4_card_title'), pageTitle: t('project4_page_title'), description: t('project4_description'), image: 'images/diceGame.png', fullImage: 'images/diceGame.png', details: t('project4_details') },
    ];
    
    const technologies = [
        { name: "HTML", icon: "devicon-html5-plain" },
        { name: "CSS", icon: "devicon-css3-plain" },
        { name: "JavaScript", icon: "devicon-javascript-plain" },
        { name: "React", icon: "devicon-react-original" },
        { name: "TailwindCSS", icon: "devicon-tailwindcss-plain" },
        { name: "Node.js", icon: "devicon-nodejs-plain" },
        { name: "Java", icon: "devicon-java-plain" },
        { name: "C#", icon: "devicon-csharp-plain" },
        { name: "Git", icon: "devicon-git-plain" },
    ];

    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('accueil');
    const [currentPage, setCurrentPage] = useState('home');
    const [theme, setTheme] = useState(() => {
        if (localStorage.getItem('theme')) return localStorage.getItem('theme');
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });

    const accueilRef = useRef(null), projetsRef = useRef(null), experienceRef = useRef(null), aproposRef = useRef(null), contactRef = useRef(null);
    const sections = { 'accueil': accueilRef, 'projets': projetsRef, 'experience': experienceRef, 'apropos': aproposRef, 'contact': contactRef };

    const scrollToSection = (e, id) => {
    e.preventDefault();

    // Si on n'est pas sur la page d'accueil, on change d'abord de page
    if (currentPage !== 'home') {
        setCurrentPage('home');

        // On attend un tout petit peu que React affiche la HomePage
        setTimeout(() => {
            // Méthode "brutale" mais infaillible : on utilise les sélecteurs du DOM
            const sectionElement = document.getElementById(id);
            if (sectionElement) {
                sectionElement.scrollIntoView({ behavior: 'smooth' });
            }
        }, 100); // 100ms est un délai sûr
    } else {
        // Si on est déjà sur la page d'accueil, la méthode avec les refs fonctionne bien
        const element = sections[id]?.current;
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
};

    useEffect(() => {
        if (theme === 'dark') document.documentElement.classList.add('dark');
        else document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', theme);
    }, [theme]);

   useEffect(() => {
    const handleScroll = () => {
        setIsScrolled(window.scrollY > 50);

        if (currentPage === 'home') {
            let currentSectionId = '';
            
            // On vérifie si l'utilisateur est tout en bas de la page
            // (window.innerHeight + window.scrollY) >= document.body.offsetHeight
            // C'est une condition pour détecter si on a atteint le bas
            const isAtBottom = (window.innerHeight + Math.ceil(window.scrollY)) >= document.documentElement.scrollHeight;

            if (isAtBottom) {
                currentSectionId = 'contact'; // Si on est en bas, on force la section "Contact"
            } else {
                const scrollPosition = window.scrollY + 150;
                // On garde la logique précédente pour les autres cas
                for (const sectionId in sections) {
                    const section = sections[sectionId].current;
                    if (section && section.offsetTop <= scrollPosition) {
                        currentSectionId = sectionId;
                    }
                }
            }
            setActiveSection(currentSectionId || 'accueil');
        }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
}, [currentPage, sections]);

    const renderContent = () => {
        const project = projectsData.find(p => p.id === currentPage);
        if (project) {
            return <ProjectPage setCurrentPage={setCurrentPage} title={project.pageTitle} description={project.description} fullImage={project.fullImage} details={project.details} />;
        }
        switch (currentPage) {
            case 'coverLetter': 
                return <CoverLetterPage setCurrentPage={setCurrentPage} />;
            case 'home':
            default: 
                return <HomePage 
                    accueilRef={accueilRef} projetsRef={projetsRef} experienceRef={experienceRef}
                    aproposRef={aproposRef} contactRef={contactRef} setCurrentPage={setCurrentPage}
                    projectsData={projectsData}
                    technologies={technologies}
                />;
        }
    };

    const { scrollYProgress } = useScroll();
    const scaleY = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <>
            <CustomScrollbar scrollYProgress={scaleY} />
            <div className="transition-colors duration-300">
                <Navbar
                    isScrolled={isScrolled}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    scrollToSection={scrollToSection}
                    activeSection={activeSection}
                    theme={theme}
                    setTheme={setTheme}
                />
                <main className="flex-grow pt-[84px] bg-white dark:bg-gray-900">
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