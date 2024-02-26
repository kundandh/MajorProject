const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
require('../ConnectionConfig/connect')
const ProductModel = require('../model/productModel')


const ex = express();
ex.use(express.json())
ex.use(cors())

ex.post('/addProduct',async (req,res) => {
    const product = new ProductModel(req.body);
    const result = await product.save();
    res.send(result)
})

ex.get('/addProduct',async (req,res) => {
    const result = await ProductModel.find();
    res.send(result)
})

ex.listen(4000)