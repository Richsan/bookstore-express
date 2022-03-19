const { db }  = require('../components/db');

const TABLE_NAME = 'book_publisher';

async function insert(publisher) {
    return await db(TABLE_NAME).insert({
        "name": publisher.name
    }, "*").then((v) => v[0]);
}

async function fetchAll() {
    return await db.select().table(TABLE_NAME);
}

async function deleteOne(publisherID) {
    return await db.table(TABLE_NAME)
    .where({id: publisherID})
    .del("*").then((v) => v[0]);
}

async function fetchOne(publisherID) {
    return await db.where({"id": publisherID}).select().table(TABLE_NAME).first();
}

async function update(publisher) {
    return await db(TABLE_NAME).where({
        "id": publisher.id
    })
    .update({
        "name": publisher.name
    }, "*").then((v) => v[0]);
}

module.exports = {insert, fetchAll, deleteOne, fetchOne, update};