const authorRepository = require('../../src/repositories/authors');

const { ExpectationFailed } = require("http-errors");

describe('Teste', () => {
    it('should sum two numbers', async () => {
       await authorRepository.insert({'name': 'Rafael','citation_name': 'zeca', 'biography': 'ele eh um cara legal'});
       const authors = await authorRepository.fetchAll();
       await expect(authors).toMatchObject([{'id': 1,'name': 'Rafael','citation_name': 'zeca', 'biography': 'ele eh um cara legal'}]);
    });
}); 