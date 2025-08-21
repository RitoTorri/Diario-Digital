const config = require('../config');
const pg = require('pg')

/* pool para las consultas a la data base */
const pool = new pg.Pool({
    host: config.db.host,
    port: config.db.port,
    user: config.db.user,
    password: config.db.password,
    database: config.db.database
})

module.exports = pool