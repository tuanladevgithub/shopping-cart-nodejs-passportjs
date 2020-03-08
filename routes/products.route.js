const express = require('express');
const router = express.Router();

const productsController = require('../controllers/products.controller');

/* GET product index page */
router.get('/', productsController.getAllProducts);

module.exports = router;