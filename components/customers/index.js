const customersController = require('./controller')
const postgres = require('../../postgres/controller')

let db = postgres;

module.exports = customersController(db);
