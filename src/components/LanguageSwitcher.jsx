import { useTranslation } from 'react-i18next';

/**
 * Composant pour changer la langue du site (FR/EN).
 */
const LanguageSwitcher = () => {
    const { i18n } = useTranslation();
    const handleLanguageChange = (lang) => {
        i18n.changeLanguage(lang);
    };

    return (
        <div className="flex items-center text-sm font-medium">
            <button
                onClick={() => handleLanguageChange('fr')}
                className={`px-2 py-1 rounded-l-md transition-colors ${i18n.language.startsWith('fr') ? 'bg-sky-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
            >
                FR
            </button>
            <button
                onClick={() => handleLanguageChange('en')}
                className={`px-2 py-1 rounded-r-md transition-colors ${i18n.language.startsWith('en') ? 'bg-sky-500 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
            >
                EN
            </button>
        </div>
    );
};

export default LanguageSwitcher;