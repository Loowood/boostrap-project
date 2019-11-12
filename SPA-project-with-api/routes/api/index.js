const express = require('express')
const router = express.Router()
const Model = require('../../model')
const product = require('./product')
const users = require('./users')

router.get('/products', product.getProducts)
router.get('/product/:pid', product.getProduct)
router.get('/users/:uid/cart', users.getUserShoppingCart)
router.get('/users/:uid/cart/items', users.getUserShoppingCartItems)
router.post('/users/:uid/cart/items/:pid', users.addProductToShoppingCart)
module.exports = router;