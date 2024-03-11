const mongoose = require('mongoose');
require('../config/db.config');

const orderSchema = mongoose.Schema({
    user_Id: {
        type: String,
        required: true
    },
    products: {
        type: Array,
        required: true
    },
    orderValue: {
        type: Number,
        required: true
    },
    address: {
        type: Array,
        required: true
    },
    date: {
        type: String,
        required: true
    },
    promocode: {
        type: String,
    }
});

module.exports = mongoose.model("order", orderSchema);