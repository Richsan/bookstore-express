const { db }  = require('../components/db');

const TABLE_NAME = 'book_author';

async function insert(author) {
    return await db(TABLE_NAME).insert({
        "name": author.name,
        "citation_name": author.citation_name,
        "biography": author.biography
    }, "*").then((v) => v[0]);
}

async function fetchAll() {
    return await db.select().table(TABLE_NAME);
}

async function fetchOne(authorID) {
    return await db.where({"id": authorID}).select().table(TABLE_NAME).first();
}

async function deleteOne(authorID) {
    return await db.table(TABLE_NAME)
    .where({id: authorID})
    .del("*").then((v) => v[0]);
}

async function update(author) {
    return await db(TABLE_NAME).where({
        "id": author.id
    })
    .update({
        "name": author.name,
        "citation_name": author.citation_name,
        "biography": author.biography
    }, "*").then((v) => v[0]);
}

module.exports = {insert, fetchAll, fetchOne, deleteOne, update};