const mongoose = require('mongoose');

const user = {
    name: String,
    email: String,
    password: String,
    consumerId: String,
}

const userModel = mongoose.model('User', user);

module.exports = userModel;