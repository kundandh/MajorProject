const mongoose = require('mongoose')
require('../config/db.config')

const promocodeSchema = mongoose.Schema({
    "promocode" : String,
    "discount" : Number,
})

module.exports = mongoose.model("promocode",promocodeSchema)