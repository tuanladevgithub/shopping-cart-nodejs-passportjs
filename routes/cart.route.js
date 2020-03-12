const express = require('express');
const router = express.Router();

const Cart = require('../models/cart.model');

/* GET cart view */
router.get('/', function (req, res, next) {
    // check cart in session:
    if (!req.session.cart) {
        return res.render('cart/cart-view', { itemCarts: null });
    }
    let cart = new Cart(req.session.cart);
    let itemCarts = cart.getListItem();
    let totalPrice = cart.totalPrice;
    res.render('cart/cart-view', {
        itemCarts: itemCarts, 
        totalPrice: totalPrice
    });
});

module.exports = router;