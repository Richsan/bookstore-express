const languageRepository = require('../repositories/languages');

async function insertLanguage(lang, description) {
    
    await languageRepository.insert(lang, description);

    return {id: lang, description: description};
}


async function allLangs() {
    return languageRepository.fetchAll();
}

async function oneLang(lang) {
    return languageRepository.fetchOne(lang);
}

module.exports = {insertLanguage, allLangs, oneLang};