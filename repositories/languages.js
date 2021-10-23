const { db }  = require('../components/db');

const TABLE_NAME = 'book_language';

async function insert(lang, description) {
    return await db(TABLE_NAME).insert({
        "id": lang,
        "description": description
    });
}

async function fetchAll() {
    return await db.select().table(TABLE_NAME);
}

async function fetchOne(id) {
    return await db.where({"id": id}).select().table(TABLE_NAME).first();
}

module.exports = {insert, fetchAll, fetchOne};