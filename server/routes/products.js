const express = require('express');
const router = express.Router();
const upload = require('../config/s3');
const Product = require('../models/Product');

router.post('/add-product', upload.single('image'), async(req, res) => {
    try {
        const { name, category, supplier, price } = req.body;
        const imageUrl = req.file.location; // URL of the uploaded image
    
        const newProduct = new Product({
          name,
          category,
          supplier,
          price,
          imageUrl
        });
    
        const product = await newProduct.save();
        res.status(201).json({'product': product});

    } catch (error) {
        res.status(500).json({"message": "Error saving product"});
    }
});

router.get('/get-products', async(req, res) => {
    try {
        const products = await Product.find().populate('category', 'name').populate('supplier', 'name');
        products.forEach(element => {
            console.log(`PRODUCT = ${element.name}`)
        });
        //console.log('')
        res.status(200).json({'products': products});
    } catch(error) {
        res.status(500).json({message: error.message});
    }
});

module.exports = router;