var Pg = require('pg').Pool;
const pool = new Pg({
    user: 'postgres',
    host: 'localhost',
    database: 'db',
    password: '2710',
    port: 5432
})

module.exports = pool;