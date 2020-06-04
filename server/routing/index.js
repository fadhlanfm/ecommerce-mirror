const router = require('express').Router();
const product = require('./product');
const user = require('./user');
const cart = require('./cart');

router.use('/users', user);
router.use('/products', product);
router.use('/carts', cart);

module.exports = router;