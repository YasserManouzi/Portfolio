import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Affiche la page de détails pour un projet spécifique.
 * @param {object} props - Les propriétés du projet à afficher.
 * @param {string} props.title - Le titre complet du projet.
 * @param {string} props.description - La description courte du projet.
 * @param {string} props.details - La description détaillée du projet.
 * @param {string} props.fullImage - Le chemin vers l'image grand format du projet.
 * @param {function} props.scrollToSection - Fonction pour revenir à la section des projets.
 */
const ProjectPage = ({ title, description, details, fullImage, scrollToSection }) => {
    const { t } = useTranslation();

    return (
    
        <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors flex justify-center items-start py-12">
            <div className="w-full max-w-4xl mx-auto px-6 py-12 pt-24 animate-fade-in-up">
                {/* Bouton pour retourner à la liste des projets */}
                <button
                    onClick={(e) => scrollToSection(e, 'projets')}
                    className="flex items-center gap-2 text-sky-500 hover:text-sky-600 font-semibold mb-8"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
                    {t('project_page_back_to_projects')}
                </button>

                {/* Contenu du projet */}
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

export default ProjectPage;