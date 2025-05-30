const controller = require('./controller')
const postgres = require('../../postgres/controller')

let db = postgres;

module.exports = controller(db);
