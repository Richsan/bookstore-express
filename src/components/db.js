const { newDb }  = require('pg-mem');
const path = require('path');

const env = process.env.NODE_ENV || 'prod';
let knex;

async function getDBInstance() {
    if(knex !== undefined) {
        return knex;
    }

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
        knex = await pgMem.adapters.createKnex(); 
        await knex.migrate.latest().catch(console.error);
    }

    return knex;
}

module.exports = {getDBInstance: getDBInstance};