const User = require('../models/user.model');

const mongoose = require('mongoose');
mongoose.connect('mongodb://admin:Fart_20011998@localhost:27017/shopping-cart?authSource=admin&readPreference=primary&ssl=false');

let users = [
    new User({
        name: 'User 1',
        email: 'test1@gmail.com',
        password: 'test1'
    }),
    new User({
        name: 'User 2',
        email: 'test2@gmail.com',
        password: 'test2'
    }),
    new User({
        name: 'User 3',
        email: 'test3@gmail.com',
        password: 'test3'
    })
]

let count = 0;
for (let i = 0; i < users.length; i++) {
    users[i].save(function (err, res) {
        count++;
        if (count === users.length) {
            mongoose.disconnect();  
        }
    });
}