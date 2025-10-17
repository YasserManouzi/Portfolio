/**
 * @file HomePage.jsx
 * @description Composant qui affiche le contenu principal de la page d'accueil, 
 * incluant toutes les sections (Accueil, Projets, Expérience, etc.).
 */
import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Recycle, Users, Eye, Download } from 'lucide-react';
import FadeInSection from './FadeInSection';
import { technologies } from '../data/technologies';
import { toolsAndMethods } from '../data/toolsAndMethods';

/**
 * @param {object} props - Propriétés du composant.
 * @param {object} props.refs - Références vers les différentes sections de la page.
 * @param {function} props.setCurrentPage - Fonction pour naviguer vers une autre page (ex: un projet).
 * @param {Array<object>} props.projectsData - Données des projets.
 * @param {string} props.theme - Thème actuel.
 * @param {string} props.CV_FR - URL du CV français.
 * @param {string} props.CV_EN - URL du CV anglais.
 */
const HomePage = ({ refs, setCurrentPage, projectsData, theme, toolsAndMethods, CV_FR, CV_EN }) => {
    const { t, i18n } = useTranslation();
    const { accueilRef, projetsRef, experienceRef, formationRef, aproposRef, contactRef } = refs;

    // --- LOGIQUE POUR L'EFFET "MACHINE À ÉCRIRE" (TYPING) ---
    const phrases = useMemo(() => [t('hero_phrases.1'), t('hero_phrases.2'), t('hero_phrases.3')], [t]);
    const [currentText, setCurrentText] = useState('');
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(100);

    useEffect(() => {
        const handleTyping = () => {
            if (!phrases[phraseIndex]) return;
            const currentFullText = phrases[phraseIndex];
            if (isDeleting) {
                setCurrentText(currentFullText.substring(0, currentText.length - 1));
            } else {
                setCurrentText(currentFullText.substring(0, currentText.length + 1));
            }
            setTypingSpeed(isDeleting ? 50 : 100);
        };
        const timeoutId = setTimeout(handleTyping, typingSpeed);
        if (!isDeleting && currentText === phrases[phraseIndex]) {
            setTimeout(() => setIsDeleting(true), 2000);
        } else if (isDeleting && currentText === '') {
            setIsDeleting(false);
            setPhraseIndex((prev) => (prev + 1) % phrases.length);
        }
        return () => clearTimeout(timeoutId);
    }, [currentText, isDeleting, typingSpeed, phraseIndex, phrases]);

    // --- LOGIQUE POUR L'ANIMATION DE PARTICULES EN ARRIÈRE-PLAN ---
    const { ref: inViewRef, inView } = useInView({ threshold: 0 });
    const canvasRef = useRef(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let particles = [], animId = null;
        const particleColor = theme === 'dark' ? 'rgba(56, 189, 248, 0.7)' : 'rgba(2, 132, 199, 0.6)';
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            particles = [];
            for (let i = 0; i < 80; i++) {
                particles.push({ x: Math.random() * canvas.width, y: Math.random() * canvas.height, radius: Math.random() * 2 + 1, dx: (Math.random() - 0.5) * 1.5, dy: (Math.random() - 0.5) * 1.5 });
            }
        };
        const animate = () => {
            if (!inView) {
                animId = requestAnimationFrame(animate);
                return;
            }
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = particleColor;
                ctx.fill();
                p.x += p.dx;
                p.y += p.dy;
                if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
            });
            animId = requestAnimationFrame(animate);
        };
        resizeCanvas();
        animate();
        window.addEventListener('resize', resizeCanvas);
        return () => {
            window.removeEventListener('resize', resizeCanvas);
            if (animId) cancelAnimationFrame(animId);
        };
    }, [inView, theme]);


        // Sélectionne le bon CV en fonction de la langue active
    const cvPath = i18n.language.startsWith('fr') ? CV_FR : CV_EN;
    const downloadFilename = i18n.language.startsWith('fr') ? 'CV_Yasser_Manouzi_FR.pdf' : 'CV_Yasser_Manouzi_EN.pdf';

        // --- VARIANTES D'ANIMATION (FRAMER MOTION) ---
    const { ref: technologiesRef, inView: technologiesInView } = useInView({ triggerOnce: true, threshold: 0.2, rootMargin: '0px 0px -50px 0px' });
    const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.1 } } };
    const itemVariants = { hidden: { y: 20, opacity: 0 }, visible: { y: 0, opacity: 1 } };

    return (
        <>
            {/* ======================= SECTION ACCUEIL ======================= */}
            <section id="accueil" ref={(el) => { accueilRef.current = el; inViewRef(el); }} className={`flex flex-col items-center justify-center px-6 text-center pt-20 pb-20 relative overflow-hidden min-h-screen ${theme === 'dark' ? 'bg-gradient-to-br from-gray-900 to-slate-800 text-white' : 'bg-gradient-to-br from-white to-gray-100 text-gray-900'} after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-64 after:bg-gradient-to-t after:from-gray-100 after:to-transparent dark:after:from-slate-800`}>
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
                <div className="absolute inset-0 flex items-center justify-center z-0">
                    <div className={`w-96 h-96 bg-sky-500 rounded-full filter blur-3xl animate-pulse-slow ${theme === 'dark' ? 'mix-blend-lighten opacity-30' : 'mix-blend-multiply opacity-20'}`}></div>
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
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
                    <a href="#projets" onClick={(e) => { e.preventDefault(); projetsRef.current?.scrollIntoView({ behavior: 'smooth' }); }} aria-label="Faire défiler vers la section projets" className="p-2 text-gray-600/50 hover:text-gray-800 dark:text-white/50 dark:hover:text-white transition-colors animate-bounce">
                        <ChevronDown size={32} />
                    </a>
                </div>
            </section>

            {/* ======================= SECTION PROJETS ======================= */}
            <FadeInSection>
                <section id="projets" ref={projetsRef} className="relative overflow-hidden py-24 bg-gray-100 dark:bg-slate-800 transition-colors">
                    <div className="absolute inset-0 flex items-center justify-center z-0">
                        <div className="w-96 h-96 bg-sky-500 rounded-full mix-blend-lighten filter blur-3xl opacity-30 animate-pulse-slow"></div>
                    </div>
                    <div className="relative z-10 max-w-6xl mx-auto px-6">
                        <h2 className="text-4xl font-bold text-center mb-12 font-heading dark:text-white">{t('projects_title')}</h2>
                        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                            {projectsData.map((project) => (
                                <article key={project.id} className="group bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 transform hover:-translate-y-2 cursor-pointer" onClick={() => setCurrentPage(project.id)}>
                                    <div className="flex-grow">
                                        <div className="h-40 mb-6 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                                            <img src={project.image} alt={`${t('project_image_alt')} ${project.cardTitle}`} className={`w-full h-full object-contain transition-transform duration-300 group-hover:scale-105 border-4 ${project.borderColor}`} />
                                        </div>
                                        <h3 className="text-xl font-semibold mb-2 font-heading dark:text-white">{project.cardTitle}</h3>
                                        <p className="text-gray-600 dark:text-gray-400 mb-4">{project.description}</p>
                                        <div className="mt-auto pt-4 flex justify-between items-center">
                                            <span className="text-sky-500 hover:text-sky-600 font-semibold transition-colors">{t('project_view')}</span>
                                            {project.repoUrl && (
                                                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" aria-label={`Voir le code source de ${project.cardTitle} sur GitHub`} className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 hover:text-sky-500 dark:hover:text-sky-400 transition-colors font-semibold" onClick={(e) => e.stopPropagation()}>
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.475.087.643-.206.643-.453 0-.222-.007-.975-.011-1.912-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.619.069-.608.069-.608 1.006.07 1.532 1.037 1.532 1.037.89 1.529 2.336 1.087 2.909.832.091-.649.351-1.087.636-1.338-2.22-.253-4.555-1.115-4.555-4.945 0-1.093.39-1.988 1.029-2.695-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.022A9.606 9.606 0 0112 5.044c.85.004 1.701.114 2.492.327 1.909-1.292 2.747-1.022 2.747-1.022.546 1.379.203 2.398.1 2.65.64.707 1.029 1.602 1.029 2.695 0 3.83-2.339 4.687-4.562 4.935.359.307.678.915.678 1.846 0 1.338-.012 2.419-.012 2.747 0 .247.169.542.648.452C19.146 20.19 22 16.438 22 12.017 22 6.484 17.522 2 12 2z" clipRule="evenodd"/></svg>
                                                    <span>Code</span>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    </div>
                </section>
            </FadeInSection>

            {/* ======================= SECTION EXPÉRIENCE ======================= */}
            <FadeInSection>
                <section id="experience" ref={experienceRef} className="relative overflow-hidden py-24 bg-gray-50 dark:bg-gray-950 transition-colors">
                    <div className="relative z-10 max-w-4xl mx-auto px-6">
                        <h2 className="text-4xl font-bold text-center mb-12 font-heading dark:text-white">{t('experience_title')}</h2>
                        <div className="space-y-16">
                            <div className="flex flex-col sm:flex-row items-start gap-8">
                                <div className="w-24 h-24 flex-shrink-0 bg-white dark:bg-gray-800 rounded-xl shadow-md flex items-center justify-center p-2"><img src={t('experience_job1_logo')} alt={`Logo de ${t('experience_job1_company')}`} className="object-contain h-full w-full" /></div>
                                <div className="flex-grow">
                                    <div className="flex justify-between items-start flex-wrap gap-2">
                                        <div>
                                            <h3 className="text-xl font-semibold font-heading dark:text-white">{t('experience_job1_title')}</h3>
                                            <p className="text-lg text-sky-500">{t('experience_job1_company')}</p>
                                        </div>
                                        <span className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">{t('experience_job1_date')}</span>
                                    </div>
                                    <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">{t('experience_job1_desc')}</p>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row items-start gap-8">
                                <div className="w-24 h-24 flex-shrink-0 bg-white dark:bg-gray-800 rounded-xl shadow-md flex items-center justify-center p-2"><img src={t('experience_job2_logo')} alt={`Logo de ${t('experience_job2_company')}`} className="object-contain h-full w-full" /></div>
                                <div className="flex-grow">
                                    <div className="flex justify-between items-start flex-wrap gap-2">
                                        <div>
                                            <h3 className="text-xl font-semibold font-heading dark:text-white">{t('experience_job2_title')}</h3>
                                            <p className="text-lg text-sky-500">{t('experience_job2_company')}</p>
                                        </div>
                                        <span className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">{t('experience_job2_date')}</span>
                                    </div>
                                    <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">{t('experience_job2_desc')}</p>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row items-start gap-8">
                                <div className="w-24 h-24 flex-shrink-0 bg-white dark:bg-gray-800 rounded-xl shadow-md flex items-center justify-center p-2"><img src={t('experience_job3_logo')} alt={`Logo de ${t('experience_job3_company')}`} className="object-contain h-full w-full" /></div>
                                <div className="flex-grow">
                                    <div className="flex justify-between items-start flex-wrap gap-2">
                                        <div>
                                            <h3 className="text-xl font-semibold font-heading dark:text-white">{t('experience_job3_title')}</h3>
                                            <p className="text-lg text-sky-500">{t('experience_job3_company')}</p>
                                        </div>
                                        <span className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">{t('experience_job3_date')}</span>
                                    </div>
                                    <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">{t('experience_job3_desc')}</p>
                                </div>
                            </div>
                            <div className="flex flex-col sm:flex-row items-start gap-8">
                                <div className="w-24 h-24 flex-shrink-0 bg-white dark:bg-gray-800 rounded-xl shadow-md flex items-center justify-center p-2"><img src={t('experience_job4_logo')} alt={`Logo de ${t('experience_job4_company')}`} className="object-contain h-full w-full" /></div>
                                <div className="flex-grow">
                                    <div className="flex justify-between items-start flex-wrap gap-2">
                                        <div>
                                            <h3 className="text-xl font-semibold font-heading dark:text-white">{t('experience_job4_title')}</h3>
                                            <p className="text-lg text-sky-500">{t('experience_job4_company')}</p>
                                        </div>
                                        <span className="text-gray-500 dark:text-gray-400 text-sm sm:text-base">{t('experience_job4_date')}</span>
                                    </div>
                                    <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">{t('experience_job4_desc')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </FadeInSection>

            {/* ======================= SECTION FORMATION ======================= */}
            <FadeInSection>
                <section id="formation" ref={formationRef} className="relative overflow-hidden py-24 bg-white dark:bg-gray-950 transition-colors">
                    <div className="relative z-10 max-w-4xl mx-auto px-6">
                        <h2 className="text-4xl font-bold text-center mb-12 font-heading dark:text-white">{t('education_title')}</h2>
                        <div className="space-y-8">
                            <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg">
                                <div className="flex justify-between items-start flex-wrap gap-2">
                                    <div>
                                        <h3 className="text-xl font-semibold font-heading dark:text-white">{t('education_degree')}</h3>
                                        <p className="text-lg text-sky-500">{t('education_school')}</p>
                                    </div>
                                    <span className="text-gray-500 dark:text-gray-400 mt-2 sm:mt-0">{t('education_date')}</span>
                                </div>
                                <p className="mt-4 text-gray-600 dark:text-gray-300 leading-relaxed">{t('education_desc')}</p>
                                <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                                    <h4 className="text-lg font-semibold mb-4 text-gray-800 dark:text-gray-200">{t('education_courses_title')}</h4>
                                    <ul className="space-y-3 list-disc list-inside text-gray-600 dark:text-gray-300">
                                        <li><strong className="font-medium text-gray-900 dark:text-white">{t('course_project_dev_title')}:</strong> {t('course_project_dev_desc')}</li>
                                        <li><strong className="font-medium text-gray-900 dark:text-white">{t('course_data_structures_title')}:</strong> {t('course_data_structures_desc')}</li>
                                        <li><strong className="font-medium text-gray-900 dark:text-white">{t('course_mobile_app_title')}:</strong> {t('course_mobile_app_desc')}</li>
                                        <li><strong className="font-medium text-gray-900 dark:text-white">{t('course_iot_title')}:</strong> {t('course_iot_desc')}</li>
                                        <li><strong className="font-medium text-gray-900 dark:text-white">{t('course_communication_title')}:</strong> {t('course_communication_desc')}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </FadeInSection>

            {/* ======================= SECTION À PROPOS ======================= */}
            <FadeInSection>
                <section id="apropos" ref={aproposRef} className="relative overflow-hidden py-24 bg-gray-50 dark:bg-gray-950 transition-colors">
                    <div className="relative z-10 max-w-6xl mx-auto px-6 grid lg:grid-cols-5 gap-x-16 items-center">
                        <div className="lg:col-span-3">
                            <h2 className="text-4xl font-bold mb-6 font-heading text-center lg:text-left dark:text-white">{t('about_title')}</h2>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">{t('about_p1')}</p>
                            <div className="mt-8 mb-8 flex flex-col sm:flex-row gap-4">
                                <a href={cvPath} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-sky-500 text-white rounded-full shadow-lg hover:bg-sky-600 transition-colors transform hover:-translate-y-1"><Eye size={20} /><span>{t('about_cv_view')}</span></a>
                                <a href={cvPath} download={downloadFilename} className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-transparent border-2 border-gray-800 dark:border-white text-gray-800 dark:text-white rounded-full hover:bg-gray-800 dark:hover:bg-white hover:text-white dark:hover:text-gray-900 transition-colors transform hover:-translate-y-1"><Download size={20} /><span>{t('about_cv_download')}</span></a>
                            </div>
                            <div className="mt-8">
                                <h3 className="text-2xl font-semibold mb-4 font-heading text-center lg:text-left dark:text-white">{t('about_principles_title')}</h3>
                                <ul className="space-y-4">
                                    <li className="flex items-start"><svg className="w-6 h-6 text-sky-500 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span className="text-gray-700 dark:text-gray-300"><strong className="font-semibold text-gray-900 dark:text-white">{t('about_principle1_title')}</strong>{t('about_principle1_text')}</span></li>
                                    <li className="flex items-start"><svg className="w-6 h-6 text-sky-500 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span className="text-gray-700 dark:text-gray-300"><strong className="font-semibold text-gray-900 dark:text-white">{t('about_principle2_title')}</strong>{t('about_principle2_text')}</span></li>
                                    <li className="flex items-start"><svg className="w-6 h-6 text-sky-500 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span className="text-gray-700 dark:text-gray-300"><strong className="font-semibold text-gray-900 dark:text-white">{t('about_principle3_title')}</strong>{t('about_principle3_text')}</span></li>
                                    <li className="flex items-start"><svg className="w-6 h-6 text-sky-500 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span className="text-gray-700 dark:text-gray-300"><strong className="font-semibold text-gray-900 dark:text-white">{t('about_principle4_title')}</strong>{t('about_principle4_text')}</span></li>
                                    <li className="flex items-start"><svg className="w-6 h-6 text-sky-500 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span className="text-gray-700 dark:text-gray-300"><strong className="font-semibold text-gray-900 dark:text-white">{t('about_principle5_title')}</strong>{t('about_principle5_text')}</span></li>
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
                                <h4 className="text-xl font-semibold mt-6 mb-4 font-heading dark:text-white">{t('about_tools_title')}</h4>
                                <motion.div className="flex flex-wrap justify-center gap-2" variants={containerVariants} initial="hidden" animate={technologiesInView ? "visible" : "hidden"}>
                                    {toolsAndMethods.map((tool) => (
                                        <motion.div key={tool.name} variants={itemVariants} className="flex items-center gap-2 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 text-sm font-medium px-3 py-1 rounded-full transition-transform transform hover:scale-110">
                                            {tool.icon.startsWith('devicon') ? (<i className={`${tool.icon} text-lg`}></i>) : (tool.icon === 'Recycle' ? <Recycle size={16} className="text-sky-500" /> : <Users size={16} className="text-sky-500" />)}
                                            <span>{tool.name}</span>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        </div>
                    </div>
                </section>
            </FadeInSection>

            {/* ======================= SECTION CONTACT ======================= */}
            <FadeInSection>
                <section id="contact" ref={contactRef} className="relative overflow-hidden py-24 bg-gray-50 dark:bg-gray-950 transition-colors">
                   <div className="relative z-10 max-w-xl mx-auto px-6 text-center">
                        <h2 className="text-4xl font-bold mb-4 font-heading dark:text-white">{t('contact_title')}</h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-6">{t('contact_subtitle')}</p>
                        <a href="mailto:yasser.manouzi.pro@gmail.com" className="inline-block px-8 py-4 bg-sky-500 text-white rounded-full shadow-lg hover:bg-sky-600 transition-colors transform hover:-translate-y-1">{t('nav_contact_me')}</a>
                    </div>
                </section>
            </FadeInSection>
        </>
    );
};

export default HomePage;