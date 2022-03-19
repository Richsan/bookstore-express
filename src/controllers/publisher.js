const publisherRepository = require('../repositories/publisher');

async function insert(publisher) {

    const db = await publisherRepository.insert(publisher);
    
    return db;
}

async function allPublishers() {
    return await publisherRepository.fetchAll();
}

async function deleteOne(publisherID) {
    return await publisherRepository.deleteOne(publisherID);
}

async function fetchOne(publisherID) {
    return await publisherRepository.fetchOne(publisherID);
}

async function update(publisher) {
    return await publisherRepository.update(publisher);
}

module.exports = {insert, allPublishers, deleteOne, fetchOne, update};