const mongoose = require('mongoose')
require('../config/db.config')

const productSchema = mongoose.Schema({
    "productName" : String,
    "brandName" : String,
    "price" : Number,
    "category":String,
    "description": String,
    "size" : String,
    "stars": Number,
    "imageUrl": String
})

module.exports = mongoose.model("product",productSchema)
