const Product = require('../models/product.model');

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
