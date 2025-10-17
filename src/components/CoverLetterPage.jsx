import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Affiche une page dédiée à la lettre de présentation.
 * @param {object} props - Les propriétés du composant.
 * @param {function} props.setCurrentPage - Fonction pour changer la page actuelle et retourner à l'accueil.
 */
const CoverLetterPage = ({ setCurrentPage }) => {
    const { t } = useTranslation();

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors pt-24 pb-12">
            <div className="w-full max-w-4xl mx-auto px-6 animate-fade-in-up">
                {/* Bouton de retour qui reste visible sous la navbar lors du défilement.
                  Le 'sticky top-24' assure qu'il se fixe à 24 unités du haut de la fenêtre.
                */}
                <div className="sticky top-24 z-30 self-start mb-6">
                    <button
                        onClick={() => setCurrentPage?.('home')}
                        className="flex items-center gap-2 text-sky-500 hover:text-sky-600 font-semibold"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        {t('project_page_back')}
                    </button>
                </div>

                {/* Titre de la page */}
                <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-6 font-heading">
                    {t('nav_coverLetter')}
                </h1>

                {/* Contenu de la lettre de présentation */}
                <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                        {t('cover_letter_content')}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default CoverLetterPage;