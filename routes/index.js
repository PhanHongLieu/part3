// routes/index.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

// homepage: show search + featured product list
router.get('/', async (req, res) => {
  const products = await Product.find().limit(10).populate('supplier');
  res.render('index', { products });
});

module.exports = router;
