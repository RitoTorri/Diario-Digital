require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

/* Configuraciones de las variables manejadas en el proyecto*/
module.exports = {
    app: {
        port: process.env.PORT
    },
    db : {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
}