// controllers/product.controller.js

const pool = require('../database/db');

const getAllProducts = async (req, res) => {
    // console.log('Fetching all products');
  try {
    const result = await pool.query(`SELECT * FROM products WHERE status = 'active' AND is_deleted = false`); 
    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Failed to fetch products' });
  }
};

// src/Controllers/userProducts.controller.js
const getProductsByCategory = async (req, res) => {
  const { categoryName } = req.params;
  console.log('Category:', categoryName);

  try {
    const result = await pool.query(
      'SELECT * FROM products WHERE category = $1 AND status = $2',
      [categoryName, 'active']
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const createOrder = async (req, res) => {
  const user_id = req.user.id;
  const { product_id, quantity, total_price } = req.body;

  try {
    // Get the admin (who added the product)
    const productResult = await pool.query(
      'SELECT user_id FROM products WHERE id = $1 ',
      [product_id]
    );

    if (productResult.rows.length === 0) {
      return res.status(404).json({ message: 'Product not found or inactive' });
    }

    const admin_id = productResult.rows[0].user_id; // assuming admin is stored as user_id in products

    // Insert the order
    await pool.query(
      `INSERT INTO orders (user_id, admin_id, product_id, quantity, total_price, order_status)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [user_id, admin_id, product_id, quantity, total_price, 'pending']
    );

    res.status(201).json({ message: 'Order placed successfully' });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// This assumes your frontend:

// Calculates total price (quantity × selling_price)

// Sends product_id and total_price

// You don’t validate stock or whether product exists — just store the info
// for the frontend to handle later





module.exports = { getAllProducts, getProductsByCategory , createOrder};
