import React, { useState, useEffect, useRef } from 'react';

// ======================= COMPOSANT NAVBAR =======================
const Navbar = ({ isScrolled, isMenuOpen, setIsMenuOpen, currentPage, setCurrentPage, scrollToSection, activeSection }) => (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? "bg-white/90 shadow-lg backdrop-blur-sm" : "bg-transparent"}`}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
            <a href="#" className="flex items-center gap-2 text-2xl font-bold transition-colors duration-300 hover:text-sky-500" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
                <svg className="w-8 h-8 text-sky-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" /></svg>
            </a>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-sky-500" aria-label="Toggle menu">
                {isMenuOpen ? <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg> : <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>}
            </button>
            <nav className="hidden md:block">
                <ul className="flex items-center gap-8 list-none m-0 p-0">
                    <li><a href="#accueil" className={`font-medium transition-colors duration-300 ${currentPage === 'home' && activeSection === 'accueil' ? 'text-sky-500 link-active' : 'hover:text-sky-500'}`} onClick={(e) => scrollToSection(e, "accueil")}>Accueil</a></li>
                    <li><a href="#projets" className={`font-medium transition-colors duration-300 ${currentPage === 'home' && activeSection === 'projets' ? 'text-sky-500 link-active' : 'hover:text-sky-500'}`} onClick={(e) => scrollToSection(e, "projets")}>Projets</a></li>
                    <li><a href="#experience" className={`font-medium transition-colors duration-300 ${currentPage === 'home' && activeSection === 'experience' ? 'text-sky-500 link-active' : 'hover:text-sky-500'}`} onClick={(e) => scrollToSection(e, "experience")}>Expérience</a></li>
                    <li><a href="#apropos" className={`font-medium transition-colors duration-300 ${currentPage === 'home' && activeSection === 'apropos' ? 'text-sky-500 link-active' : 'hover:text-sky-500'}`} onClick={(e) => scrollToSection(e, "apropos")}>À propos</a></li>
                    <li><a href="#" className={`font-medium transition-colors duration-300 ${currentPage === 'coverLetter' ? 'text-sky-500 link-active' : 'hover:text-sky-500'}`} onClick={(e) => { e.preventDefault(); setCurrentPage('coverLetter'); }}>Lettre de présentation</a></li>
                    <li><a href="#contact" className={`font-medium transition-colors duration-300 ${currentPage === 'home' && activeSection === 'contact' ? 'text-sky-500 link-active' : 'hover:text-sky-500'}`} onClick={(e) => scrollToSection(e, "contact")}>Contact</a></li>
                    <li><a href="mailto:yasser.manouzi.pro@gmail.com" className="inline-block px-4 py-2 bg-sky-500 text-white rounded-full shadow-md hover:bg-sky-600 transition-colors transform hover:-translate-y-1">Me contacter</a></li>
                </ul>
            </nav>
        </div>
        <div className={`md:hidden absolute top-full left-0 w-full bg-white/95 shadow-lg border-t border-gray-200 transition-transform duration-300 ease-in-out ${isMenuOpen ? "transform translate-y-0" : "transform -translate-y-full"}`}>
            <ul className="flex flex-col gap-2 list-none p-4">
                <li><a href="#accueil" className={`block py-2 px-4 rounded-md transition-colors ${currentPage === 'home' && activeSection === 'accueil' ? 'bg-gray-100 text-sky-500' : 'hover:bg-gray-100'}`} onClick={(e) => { scrollToSection(e, "accueil"); setIsMenuOpen(false); }}>Accueil</a></li>
                <li><a href="#projets" className={`block py-2 px-4 rounded-md transition-colors ${currentPage === 'home' && activeSection === 'projets' ? 'bg-gray-100 text-sky-500' : 'hover:bg-gray-100'}`} onClick={(e) => { scrollToSection(e, "projets"); setIsMenuOpen(false); }}>Projets</a></li>
                <li><a href="#experience" className={`block py-2 px-4 rounded-md transition-colors ${currentPage === 'home' && activeSection === 'experience' ? 'bg-gray-100 text-sky-500' : 'hover:bg-gray-100'}`} onClick={(e) => { scrollToSection(e, "experience"); setIsMenuOpen(false); }}>Expérience</a></li>
                <li><a href="#apropos" className={`block py-2 px-4 rounded-md transition-colors ${currentPage === 'home' && activeSection === 'apropos' ? 'bg-gray-100 text-sky-500' : 'hover:bg-gray-100'}`} onClick={(e) => { scrollToSection(e, "apropos"); setIsMenuOpen(false); }}>À propos</a></li>
                <li><a href="#" className={`block py-2 px-4 rounded-md transition-colors ${currentPage === 'coverLetter' ? 'bg-gray-100 text-sky-500' : 'hover:bg-gray-100'}`} onClick={(e) => { e.preventDefault(); setCurrentPage('coverLetter'); setIsMenuOpen(false); }}>Lettre de présentation</a></li>
                <li><a href="#contact" className={`block py-2 px-4 rounded-md transition-colors ${currentPage === 'home' && activeSection === 'contact' ? 'bg-gray-100 text-sky-500' : 'hover:bg-gray-100'}`} onClick={(e) => { scrollToSection(e, "contact"); setIsMenuOpen(false); }}>Contact</a></li>
            </ul>
        </div>
    </header>
);

// ======================= COMPOSANT HOMEPAGE =======================
const HomePage = ({ accueilRef, projetsRef, experienceRef, aproposRef, contactRef, setCurrentPage }) => {
    const [phrases] = useState(["Étudiant et développeur junior", "Passionné par React et JavaScript", "Créateur d'expériences web"]);
    const [phraseIndex, setPhraseIndex] = useState(0);
    const [currentText, setCurrentText] = useState('');
    const [isDeleting, setIsDeleting] = useState(false);
    const [typingSpeed, setTypingSpeed] = useState(100);

    useEffect(() => {
        const handleTyping = () => {
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
            setPhraseIndex((prevIndex) => (prevIndex + 1) % phrases.length);
        }
        return () => clearTimeout(timeoutId);
    }, [currentText, isDeleting, typingSpeed, phraseIndex, phrases]);
    
    const projectsData = [
        { id: 'project1', title: 'Projet 1', description: 'Une courte description pour le premier projet. Technologies utilisées : React, Tailwind.' },
        { id: 'project2', title: 'Projet 2', description: 'Description de ce projet. C\'est une application de type [type]. Technologies : Node.js, Express.' },
        { id: 'project3', title: 'Projet 3', description: 'Un autre projet sympa. J\'ai utilisé des APIs pour celui-ci. Technologies : APIs REST, JavaScript.' },
    ];

    return (
        <>
            <section id="accueil" ref={accueilRef} className="flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 to-slate-800 text-white px-6 text-center pt-20 pb-20 relative overflow-hidden min-h-screen">
                <div className="relative z-10 animate-fade-in-up">
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-4 font-heading">Salut, je suis <span className="text-sky-500">Yasser</span></h1>
                    <p className="text-lg md:text-2xl font-semibold max-w-2xl h-8 mb-6">{currentText}<span className="typing-cursor text-sky-500">|</span></p>
                    <div className="flex flex-col md:flex-row gap-4 mb-8 justify-center">
                        <a href="#projets" onClick={(e) => { e.preventDefault(); projetsRef.current.scrollIntoView({ behavior: 'smooth' }); }} className="inline-block px-8 py-4 bg-sky-500 text-white rounded-full shadow-lg hover:bg-sky-600 transition-colors transform hover:-translate-y-1">Voir mes projets</a>
                        <a href="mailto:yasser.manouzi.pro@gmail.com" className="inline-block px-8 py-4 bg-transparent border-2 border-white text-white rounded-full hover:bg-white hover:text-gray-900 transition-colors transform hover:-translate-y-1">Contact</a>
                    </div>
                    {/* NOUVEAU : Liens vers GitHub et LinkedIn */}
                    <div className="flex justify-center gap-6 mt-8">
                        {/* Lien GitHub */}
                        <a href="https://github.com/YasserManouzi" target="_blank" rel="noopener noreferrer" aria-label="Mon profil GitHub" className="text-gray-300 hover:text-sky-500 transition-colors transform hover:-translate-y-1">
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.475.087.643-.206.643-.453 0-.222-.007-.975-.011-1.912-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.619.069-.608.069-.608 1.006.07 1.532 1.037 1.532 1.037.89 1.529 2.336 1.087 2.909.832.091-.649.351-1.087.636-1.338-2.22-.253-4.555-1.115-4.555-4.945 0-1.093.39-1.988 1.029-2.695-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.022A9.606 9.606 0 0112 5.044c.85.004 1.701.114 2.492.327 1.909-1.292 2.747-1.022 2.747-1.022.546 1.379.203 2.398.1 2.65.64.707 1.029 1.602 1.029 2.695 0 3.83-2.339 4.687-4.562 4.935.359.307.678.915.678 1.846 0 1.338-.012 2.419-.012 2.747 0 .247.169.542.648.452C19.146 20.19 22 16.438 22 12.017 22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                            </svg>
                        </a>
                        {/* Lien LinkedIn */}
                        <a href="https://www.linkedin.com/in/yasser-manouzi/" target="_blank" rel="noopener noreferrer" aria-label="Mon profil LinkedIn" className="text-gray-300 hover:text-sky-500 transition-colors transform hover:-translate-y-1">
                            <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M20.447 20.452h-3.554v-5.569c0-1.325-.028-3.044-1.852-3.044-1.853 0-2.136 1.445-2.136 2.939v5.674H9.357V9.41H12.9v1.64c.498-.934 1.377-1.64 3.138-1.64 3.765 0 4.47 2.492 4.47 5.774v6.883zM7.404 6.946c-1.226 0-2.221-.995-2.221-2.221s.995-2.22 2.221-2.22 2.221.995 2.221 2.221-.996 2.221-2.221 2.221zM5.557 9.409h3.766v11.043H5.557V9.409z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </section>

            <section id="projets" ref={projetsRef} className="py-24 bg-white">
                <div className="max-w-6xl mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-12 font-heading">Projets</h2>
                    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
                        {projectsData.map((project) => (
                            <article key={project.id} className="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-8 transform hover:-translate-y-2 cursor-pointer" onClick={() => setCurrentPage(project.id)}>
                                <div className="h-40 bg-gray-200 rounded-lg mb-6 flex items-center justify-center text-gray-500 font-bold text-2xl font-heading">Image du projet</div>
                                <h3 className="text-xl font-semibold mb-2 font-heading">{project.title}</h3>
                                <p className="text-gray-600 mb-4">{project.description}</p>
                                <span className="text-sky-500 hover:text-sky-600 font-semibold transition-colors">Voir →</span>
                            </article>
                        ))}
                    </div>
                </div>
            </section>

            <section id="experience" ref={experienceRef} className="py-24 bg-gray-50">
                <div className="max-w-4xl mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-12 font-heading">Expérience professionnelle</h2>
                    <div className="space-y-8">
                        <div className="bg-white p-8 rounded-xl shadow-lg">
                            <div className="flex justify-between items-start flex-wrap"><div><h3 className="text-xl font-semibold text-gray-900 font-heading">Développeur junior</h3><p className="text-lg text-sky-500">Nom de l'entreprise</p></div><span className="text-gray-500 mt-2 md:mt-0">Jan 2024 - Présent</span></div>
                            <p className="mt-4 text-gray-600 leading-relaxed">Description des responsabilités et des réalisations. Par exemple : Développement de nouvelles fonctionnalités en utilisant React et Tailwind CSS, participation aux revues de code, collaboration avec l'équipe design.</p>
                        </div>
                        <div className="bg-white p-8 rounded-xl shadow-lg">
                            <div className="flex justify-between items-start flex-wrap"><div><h3 className="text-xl font-semibold text-gray-900 font-heading">Stagiaire en développement web</h3><p className="text-lg text-sky-500">Autre entreprise</p></div><span className="text-gray-500 mt-2 md:mt-0">Été 2023</span></div>
                            <p className="mt-4 text-gray-600 leading-relaxed">Description du stage, des compétences acquises et des projets réalisés. Par exemple : Création de prototypes, intégration de maquettes, et débogage d'applications existantes.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id="apropos" ref={aproposRef} className="py-24 bg-white">
                <div className="max-w-6xl mx-auto px-6 grid lg:grid-cols-5 gap-x-16 items-center">
                    <div className="lg:col-span-3">
                        <h2 className="text-4xl font-bold mb-6 font-heading text-center lg:text-left">Plus qu'un simple développeur</h2>
                        <p className="text-gray-700 leading-relaxed mb-4">Passionné par le développement web, mon aventure a commencé avec une simple ligne de JavaScript qui a animé un élément sur une page. Depuis ce jour, je suis fasciné par la capacité du code à transformer des idées en expériences interactives et utiles. Mon objectif est de créer des interfaces non seulement fonctionnelles, mais aussi intuitives et agréables à utiliser.</p>
                        <div className="mt-8">
                            <h3 className="text-2xl font-semibold mb-4 font-heading text-center lg:text-left">Mes principes</h3>
                            <ul className="space-y-3">
                                <li className="flex items-start"><svg className="w-6 h-6 text-sky-500 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong className="font-semibold">Apprentissage continu :</strong> Le monde du web évolue vite, et j'adore ça.</span></li>
                                <li className="flex items-start"><svg className="w-6 h-6 text-sky-500 mr-3 flex-shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg><span><strong className="font-semibold">La collaboration avant tout :</strong> Les meilleures solutions naissent du travail d'équipe.</span></li>
                            </ul>
                        </div>
                    </div>
                    <div className="lg:col-span-2 mt-12 lg:mt-0">
                        <div className="bg-white p-8 rounded-xl shadow-lg text-center">
                            <img src="https://placehold.co/400x400/D1D5DB/4B5563?text=Profil+Picture" alt="Profil" className="rounded-full shadow-lg border-4 border-white w-32 h-32 object-cover mx-auto -mt-20 mb-4" />
                            <h3 className="text-2xl font-bold font-heading">Yasser Manouzi</h3>
                            <p className="text-gray-500 mb-6">Développeur Front-end</p>
                            <h4 className="text-xl font-semibold mb-4 font-heading">Technologies</h4>
                            <div className="flex flex-wrap justify-center gap-3"><span className="bg-sky-100 text-sky-800 text-sm font-medium px-3 py-1 rounded-full">React</span><span className="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">JavaScript</span><span className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">Tailwind CSS</span></div>
                        </div>
                    </div>
                </div>
            </section>

            <section id="contact" ref={contactRef} className="py-24 bg-gray-50">
                <div className="max-w-xl mx-auto px-6 text-center">
                    <h2 className="text-4xl font-bold mb-4 font-heading">Contact</h2>
                    <p className="text-gray-700 mb-6">Envie de collaborer ? Envoyez-moi un message !</p>
                    <a href="mailto:yasser.manouzi.pro@gmail.com" className="inline-block px-8 py-4 bg-sky-500 text-white rounded-full shadow-lg hover:bg-sky-600 transition-colors transform hover:-translate-y-1">Me contacter</a>
                </div>
            </section>
        </>
    );
};

// ======================= COMPOSANT PROJECTPAGE =======================
const ProjectPage = ({ title, description, setCurrentPage }) => (
    <div className="w-full max-w-4xl mx-auto px-6 py-12 animate-fade-in-up">
        <button onClick={() => setCurrentPage('home')} className="flex items-center gap-2 text-sky-500 hover:text-sky-600 font-semibold mb-8"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>Retour à l'accueil</button>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 font-heading">{title}</h1>
        <p className="text-lg text-gray-700 leading-relaxed mb-6">{description}</p>
        <div className="h-64 bg-gray-300 rounded-lg mb-8" />
        <div className="bg-white p-8 rounded-lg shadow-lg"><h3 className="text-2xl font-bold mb-4 font-heading">Détails du projet</h3><p className="text-gray-600">Vous pouvez ajouter ici plus de détails sur le projet, les technologies utilisées, le processus de développement et les défis rencontrés. Ceci est une page de démonstration. N'hésitez pas à la personnaliser !</p></div>
    </div>
);

// ======================= COMPOSANT COVERLETTERPAGE =======================
const CoverLetterPage = ({ setCurrentPage }) => (
    <div className="w-full max-w-4xl mx-auto px-6 py-12 animate-fade-in-up">
        <button onClick={() => setCurrentPage('home')} className="flex items-center gap-2 text-sky-500 hover:text-sky-600 font-semibold mb-8"><svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>Retour à l'accueil</button>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-4 font-heading">Lettre de présentation</h1>
        <div className="bg-white p-8 rounded-lg shadow-lg"><p className="text-lg text-gray-700 leading-relaxed whitespace-pre-wrap">
              Cher [Nom du recruteur/de l'entreprise],

              Je vous écris aujourd'hui pour exprimer mon vif intérêt pour le poste de [Nom du poste] que vous proposez... (votre lettre complète ici)
            </p></div>
    </div>
);

// ======================= COMPOSANT PRINCIPAL APP =======================
const App = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState('accueil');
    const [currentPage, setCurrentPage] = useState('home');

    const accueilRef = useRef(null);
    const projetsRef = useRef(null);
    const experienceRef = useRef(null);
    const aproposRef = useRef(null);
    const contactRef = useRef(null);

    const sections = { 'accueil': accueilRef, 'projets': projetsRef, 'experience': experienceRef, 'apropos': aproposRef, 'contact': contactRef };

    const scrollToSection = (e, id) => {
        e.preventDefault();
        setIsMenuOpen(false);
        if (currentPage !== 'home') {
            setCurrentPage('home');
            setTimeout(() => {
                const element = sections[id]?.current;
                if (element) {
                    const offsetTop = element.getBoundingClientRect().top + window.scrollY;
                    window.scrollTo({ top: offsetTop - 84, behavior: 'smooth' }); // Offset pour la navbar
                }
            }, 50);
        } else {
            const element = sections[id]?.current;
            if (element) {
                const offsetTop = element.getBoundingClientRect().top + window.scrollY;
                window.scrollTo({ top: offsetTop - 84, behavior: 'smooth' }); // Offset pour la navbar
            }
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
            if (currentPage === 'home') {
                let currentActiveSection = 'accueil';
                const scrollPosition = window.scrollY + 150;
                for (const sectionId in sections) {
                    const section = sections[sectionId].current;
                    if (section && section.offsetTop <= scrollPosition) {
                        currentActiveSection = sectionId;
                    }
                }
                setActiveSection(currentActiveSection);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [currentPage]);

    const renderContent = () => {
        switch (currentPage) {
            case 'project1': return <ProjectPage title="Projet 1 : Nom du projet" description="Ce projet a été créé avec [technologies] pour résoudre [problème]..." setCurrentPage={setCurrentPage} />;
            case 'project2': return <ProjectPage title="Projet 2 : Nom du projet" description="Ce projet est un [type de projet] développé avec [technologies]..." setCurrentPage={setCurrentPage} />;
            case 'project3': return <ProjectPage title="Projet 3 : Nom du projet" description="Ce projet est une application [type de projet] conçue pour [objectif]..." setCurrentPage={setCurrentPage} />;
            case 'coverLetter': return <CoverLetterPage setCurrentPage={setCurrentPage} />;
            default: return <HomePage accueilRef={accueilRef} projetsRef={projetsRef} experienceRef={experienceRef} aproposRef={aproposRef} contactRef={contactRef} setCurrentPage={setCurrentPage} />;
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-white text-gray-900 font-sans">
            <Navbar isScrolled={isScrolled} isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} currentPage={currentPage} setCurrentPage={setCurrentPage} scrollToSection={scrollToSection} activeSection={activeSection} />
            <main className="flex-grow pt-[84px]">
                {renderContent()}
            </main>
            <footer className="bg-gray-800 text-white py-6 text-center">
                <p className="text-sm text-gray-400">© 2025 Yasser. Tous droits réservés.</p>
            </footer>
        </div>
    );
};

export default App;