const ObjectId = require('mongoose').Types.ObjectId;

const Product = require('../models/product.model');
const Cart = require('../models/cart.model');

module.exports.getAllProducts = async function (req, res, next) {
    try {
        let products = await Product.find();
        res.render('product/index', { 
            title: "Products",
            products: products
        });
    } catch (error) {
        console.log(error + '');
    }   
}

module.exports.addProductToCart = async function (req, res, next) {
    let id = req.params.productId;
    let cart = new Cart( req.session.cart ? req.session.cart : {});
    try {
        let product = await Product.findById(id);
        cart.addOne(product, product.id);
    } catch (error) {
        console.log(error + '');
        return res.redirect('/products');
    }

    req.session.cart = cart;
    // console.log(req.session.cart);
    res.redirect('/products')
}
