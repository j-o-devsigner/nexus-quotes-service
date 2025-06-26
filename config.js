const { config } = require('dotenv')

config();

module.exports = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    quotes_port: process.env.QUOTES_PORT,
    sendgrid_key: process.env.SENDGRID_KEY,
    ssl: process.env.DB_SSLMODE || 'disable',
};