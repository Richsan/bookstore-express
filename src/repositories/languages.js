const {
    getDBInstance
} = require('../components/db');

const TABLE_NAME = 'book_language';

async function insert(lang, description) {
    const db = await getDBInstance();
    return await db(TABLE_NAME).insert({
        "id": lang,
        "description": description
    });
}

async function update(lang, description) {
    const db = await getDBInstance();

    return await db(TABLE_NAME).where({
            "id": lang
        })
        .update({
            "description": description
        });
}

async function upsert(lang, description) {
    const db = await getDBInstance();

    return await insert(lang, description)
        .then((_v) => Object({
            updated: false
        }))
        .catch((_e) => update(lang, description)
            .then((_v) => Object({
                updated: true
            })));
}

async function fetchAll() {
    const db = await getDBInstance();

    return await db.select().table(TABLE_NAME);
}

async function fetchOne(id) {
    const db = await getDBInstance();

    return await db.where({
        "id": id
    }).select().table(TABLE_NAME).first();
}

async function deleteOne(languageID) {
    const db = await getDBInstance();

    return await db.table(TABLE_NAME)
        .where({
            id: languageID
        })
        .del("*").then((v) => v[0]);
}

module.exports = {
    insert,
    fetchAll,
    fetchOne,
    update,
    upsert,
    deleteOne
};