const authorRepository = require('../repositories/authors');

async function insert(author) {
    return await authorRepository.insert(author);
}

async function fetchAll() {
    return await authorRepository.fetchAll();
}

async function fetchOne(authorID) {
    return await authorRepository.fetchOne(authorID);
}

async function deleteOne(authorID) {
    return await authorRepository.deleteOne(authorID);
}

async function update(author) {
    return await authorRepository.update(author);
}


module.exports = {insert, fetchAll, fetchOne, deleteOne, update};
