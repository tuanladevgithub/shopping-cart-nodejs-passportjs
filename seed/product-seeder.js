const Product = require('../models/product.model');

const mongoose = require('mongoose');
mongoose.connect('mongodb://admin:Fart_20011998@localhost:27017/shopping-cart?authSource=admin&readPreference=primary&ssl=false');

let products = [
    new Product({
        name: 'Product name test 1',
        imagePath: 'https://picsum.photos/200',
        description: 'Some quick example text to build on the card title and make up the bulk of the card&apos;s content.',
        price: 100000
    }),
    new Product({
        name: 'Product name test 2',
        imagePath: 'https://picsum.photos/200',
        description: 'Some quick example text to build on the card title and make up the bulk of the card&apos;s content.',
        price: 100000
    }),
    new Product({
        name: 'Product name test 3',
        imagePath: 'https://picsum.photos/200',
        description: 'Some quick example text to build on the card title and make up the bulk of the card&apos;s content.',
        price: 100000
    }),new Product({
        name: 'Product name test 4',
        imagePath: 'https://picsum.photos/200',
        description: 'Some quick example text to build on the card title and make up the bulk of the card&apos;s content.',
        price: 100000
    }),
    new Product({
        name: 'Product name test 5',
        imagePath: 'https://picsum.photos/200',
        description: 'Some quick example text to build on the card title and make up the bulk of the card&apos;s content.',
        price: 100000
    })
]

let count = 0;
for (let i = 0; i < products.length; i++) {
    products[i].save(function (err, res) {
        count++;
        if (count === products.length) {
            mongoose.disconnect();
        }
    });
}