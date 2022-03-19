const { db }  = require('../components/db');

const TABLE_NAME = 'book_language';

async function insert(lang, description) {
    return await db(TABLE_NAME).insert({
        "id": lang,
        "description": description
    });
}

async function update(lang, description) {
    return await db(TABLE_NAME).where({
        "id": lang
    })
    .update({
        "description": description
    });
}

async function upsert(lang, description) {
    return await insert(lang, description)
        .then((_v) => Object({updated: false}))
        .catch((_e) => update(lang, description)
                        .then((_v) => Object({updated: true}))); 
}

async function fetchAll() {
    return await db.select().table(TABLE_NAME);
}

async function fetchOne(id) {
    return await db.where({"id": id}).select().table(TABLE_NAME).first();
}

async function deleteOne(languageID) {
    return await db.table(TABLE_NAME)
    .where({id: languageID})
    .del("*").then((v) => v[0]);
}

module.exports = {insert, fetchAll, fetchOne, update, upsert, deleteOne};