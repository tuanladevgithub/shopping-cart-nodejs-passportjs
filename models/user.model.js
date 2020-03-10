const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

let userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

userSchema.methods.validPassword = function (paramPassword) {
    //return a promise for passport process
    return bcrypt.compare(paramPassword, this.password);
}

module.exports = mongoose.model('User', userSchema);