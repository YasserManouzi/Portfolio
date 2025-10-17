/**
 * @file projectsData.js
 * @description Contient les données relatives aux projets.
 * Cette fonction permet de rendre les données dépendantes de la langue (i18n).
 * @param {function} t - La fonction de traduction de i18next.
 * @returns {Array<object>} Un tableau d'objets, chaque objet représentant un projet.
 */export const getProjectsData = (t) => [
    { id: 'project1', cardTitle: t('project1_card_title'), pageTitle: t('project1_page_title'), description: t('project1_description'), image: 'images/stageEtu.png', fullImage: 'images/imageAppStage.png', details: t('project1_details'), borderColor: 'border-red-500', repoUrl: 'https://github.com/YasserManouzi/StageEtu' },
    { id: 'project2', cardTitle: t('project2_card_title'), pageTitle: t('project2_page_title'), description: t('project2_description'), image: 'images/battleship.png', fullImage: 'images/battleship.png', details: t('project2_details'), borderColor: 'border-blue-500', repoUrl: 'https://github.com/YasserManouzi/Battleship' },
    { id: 'project3', cardTitle: t('project3_card_title'), pageTitle: t('project3_page_title'), description: t('project3_description'), image: 'images/gestionBanque.png', fullImage: 'images/imageGestionBanque.png', details: t('project3_details'), borderColor: 'border-red-500', repoUrl: 'https://github.com/YasserManouzi/GestionBanque' },
    { id: 'project4', cardTitle: t('project4_card_title'), pageTitle: t('project4_page_title'), description: t('project4_description'), image: 'images/diceGame.png', fullImage: 'images/imageDiceGame.png', details: t('project4_details'), borderColor: 'border-purple-500', repoUrl: 'https://github.com/YasserManouzi/Dice-game' },
];