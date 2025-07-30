const express = require('express');
const router = express.Router();
const { getAllProducts,getProductsByCategory,createOrder } = require('../Controllers/userProducts.controller.js');

// Order route
router.post('/orders', createOrder);

// Product routes
router.get('/products', getAllProducts);
router.get('/products/category/:categoryName', getProductsByCategory);

module.exports = router;