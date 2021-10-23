const knex = require('knex')({
    client: 'pg',
    connection: {
        host: 'localhost',
        port: '5432',
        user: 'postgres',
        password: 'changeme',
        database: 'migration'
    }
});

module.exports = {db: knex};
