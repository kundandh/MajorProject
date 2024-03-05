const mongoose = require('mongoose')
const express = require('express')
const cors = require('cors')
require('../ConnectionConfig/connect')
const ProductModel = require('../model/productModel')
const EventModel = require('../model/eventModel')


const ex = express();
ex.use(express.json())
ex.use(cors())

ex.get('/api/events',async (req,res) => {
    const result = await EventModel.find();
    res.send(result);
})


ex.get('/api/products',async (req,res) => {
    const result = await ProductModel.find();
    res.send(result);
})

ex.get('/api/products/category',async (req,res) => {
    const result = await ProductModel.aggregate([
        {
          $group: {
            _id: "$category",
            count: { $sum: 1 }
          }
        },
        {
          $project: {
            name: "$_id",
            count: 1,
            _id: 0
          }
        }
      ])
    res.send(result);
})

ex.post('/api/products',async (req,res) => {
    const product = new ProductModel(req.body);
    const result = await product.save();
    res.send(result)
})
ex.get('/api/products/:productId',async (req, res) => {
    const productId = req.params.productId;
    // const products = await ProductModel.find({ _id: productId });
    const result = await ProductModel.find();
    const products = result.find(product => product._id == productId)
    res.send(products);
})

ex.get('/api/products/search/:searchTerm', async(req, res) => {
    const searchTerm = req.params.searchTerm;
    const products = await ProductModel.find({
        productName: { $regex: new RegExp(searchTerm, 'i') }
    });
    res.send(products);
})

ex.get('/api/products/category/:categoryName',async (req, res) => {
    const category_ = req.params.categoryName;
    const products = await ProductModel.find({category:category_});
    res.send(products);
})



ex.listen(4000,()=>{
    console.log("Server running on port 4000");
});