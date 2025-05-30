const { Client } = require('pg')
const config = require('../config')

async function getConnection() {
    const client = new Client({
        host: config.host,
        port: config.port,
        user: config.user,
        password: config.password,
        database: config.database,
    });
    await client.connect();
    return client;
}

module.exports = getConnection;