const mongoose = require('mongoose')
require('../config/db.config')

const eventSchema = mongoose.Schema({
    "date" : Date,
    "title" : String,
    "price" : Number,
    "description": String,
    "imageUrl": String
})

module.exports = mongoose.model("event",eventSchema)
