const { Router } = require('express')
const Controller = require('./index')
const service = require('./service')
const response = require('../../network/response')
const quotes_productsController = require('../products/index')
const customersController = require('../customers/index')
const productsController = require('../products/index')

const router = Router();

router.get('/', list);
router.get('/:id', findOne);
router.post('/create', create);
router.post('/mail', mail);
router.put('/:id', update);
router.delete('/:id', remove);

function list (req, res, next) {
    Controller.list()
    .then(async (list) => {

        const quotes_products = await quotes_productsController.list();
        const customers = await customersController.list();
        const products = await productsController.list();

        const group = await service.groupData(list, quotes_products);
        const data = {"quotes": group, "products": products,"customers":customers};
        response.success(req, res, data, 200)
    })
    .catch(next);
}

function findOne (req, res, next) {
    if(req.params.id) {
        let { id } = req.params
        id = Number(id);
        Controller.list()
        .then(async (list) => {
            const products = await quotes_productsController.list();
            const group = await service.groupData(list, products);
            const find = await service.findOne(id, group);
            const productsDetail = await productsController.list();
            const findProducts = await service.findProducts(productsDetail, find[0].products)
            const customer = await customersController.findCustomer(find[0].sendto)
            const user = await customersController.findUser(find[0].sendfrom)
            find[0].customer = customer[0]
            find[0].user = user[0]
            find[0].productsDetail = findProducts
            response.success(req, res, find, 200)
        })
        .catch(next);
    }
}

function create (req, res, next) {
    if(req.body) {

        const { products } = req.body;

        const dataQuote = service.organizeQuoteData(req.body);
        const dataProducts = products;

        Controller.create(dataQuote)
        .then((createQuote) => {
            response.success(req, res, createQuote, 200);
            return quotes_productsController.create(0, dataProducts, "create")
        })
        .catch(next);
    }
}

function update (req, res, next) {
    if(req.params.id && req.body ) {

        const { id } = req.params;

        if(req.body.products) {
            const { products } = req.body;
            const dataProducts = products;
            delete req.body.products;
            quotes_productsController.remove(id)
            .then(() => {
                return quotes_productsController.create(id, dataProducts, "update");
            })
            .catch(next);
        }

        Controller.update(id, req.body)
        .then((update) => {
            response.success(req, res, update, 200);
        })
        .catch(next);
    }
}

function remove (req, res, next) {
    if(req.params.id) {
        const { id } = req.params;
        quotes_productsController.remove(id)
        .then((remove) => {
            response.success(req, res, remove, 200);
            return Controller.remove(id)
        })
        .catch(next);
    }
}

function mail (req, res, next) {
    const { data, sended, id } = req.body
    if(data && sended && id) {
        Controller.sendMail(data)
        .then((send) => {
            response.success(req, res, send, 200);
            return Controller.update(id, {sended: sended})
        })
        .catch(next)
    }
}

module.exports = router;