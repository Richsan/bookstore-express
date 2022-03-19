const { newDb }  = require('pg-mem');
const path = require('path');
const dbMigrate = require('db-migrate');
//dbMigrate.getInstance(true).config.db;

const env = process.env.NODE_ENV || 'prod';
let knex;
if (env === 'prod') {
    knex = require('knex')({
        client: 'pg',
        connection: {
            host: 'localhost',
            port: '5432',
            user: 'postgres',
            password: 'mysecretpassword',
            database: 'migration'
        }
    });
} else {
    const pgMem = newDb();
    pgMem.public.migrate({migrationsPath: path.resolve('migrations')});
    knex = pgMem.adapters.createKnex(); 
}

module.exports = {db: knex};