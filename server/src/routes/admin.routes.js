// controllers/product.controller.js
const express = require('express');
const router = express.Router(); 
const {createProduct,getAllProducts,getProductById,updateProduct,deleteProduct,getUserOrders} = require('../Controllers/adminProducts.controller.js')


// Route to create a new product (Admin only)
router.post('/products', createProduct);

// Route to fetch all products (Admin only)
router.get('/products', getAllProducts);

router.get('/products/:id',getProductById)
router.put('/products/:id',updateProduct)
router.delete('/products/:id',deleteProduct)

//to get the orders of the user
router.get('/orders', getUserOrders);
// Admin gets their orders
router.get('/orders', getUserOrders);

module.exports = router;
