const quotes_productsController = require('./controller')
const postgres = require('../../postgres/controller')

let db = postgres;

module.exports = quotes_productsController(db);
