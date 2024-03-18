const PostgreSQLDB = require('@bot-whatsapp/database/postgres')
require('dotenv').config();

const adapterDB = new PostgreSQLDB({
    host: process.env.POSTGRES_DB_HOST,
    user: process.env.POSTGRES_DB_USER,
    database: process.env.POSTGRES_DB_NAME,
    password: process.env.POSTGRES_DB_PASSWORD,
    port: +process.env.POSTGRES_DB_PORT,
})

module.exports = adapterDB;