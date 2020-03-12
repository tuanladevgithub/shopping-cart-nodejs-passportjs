const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products.controller');

/* GET product index page */
router.get('/', productsController.getAllProducts);

/* GET add product to cart */
router.get('/add-to-cart/:productId', productsController.addProductToCart);

module.exports = router;