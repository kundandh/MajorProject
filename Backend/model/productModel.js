const mongoose = require('mongoose')
require('../ConnectionConfig/connect')

const productSchema = mongoose.Schema({
    "productName" : String,
    "brandName" : String,
    "price" : Number
})

module.exports = mongoose.model("product",productSchema)