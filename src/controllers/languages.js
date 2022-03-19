const languageRepository = require('../repositories/languages');

async function upsertLanguage(lang, description) {
        
    const db = await languageRepository.upsert(lang, description);

    return {id: lang, description: description, updated: db.updated};
}

async function allLangs() {
    return languageRepository.fetchAll();
}

async function oneLang(lang) {
    return languageRepository.fetchOne(lang);
}

async function deleteOne(languageID) {
    return await languageRepository.deleteOne(languageID);
}

module.exports = {upsertLanguage, allLangs, oneLang, deleteOne};