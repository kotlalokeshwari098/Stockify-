const pool = require('../database/db.js');

// Create product
const createProduct = async (req, res) => {
  try {
    const { product_name, selling_price, description, stock_quantity, product_image, category, status } = req.body;
    const user_id = req.user.id;

    const result = await pool.query(
      `INSERT INTO products 
      (user_id, product_name, selling_price, description, stock_quantity, product_image, category, status)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *`,
      [user_id, product_name, selling_price, description, stock_quantity, product_image, category, status || 'active']
    );

    res.status(201).json({ message: "Product created", product: result.rows[0] });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Error creating product" });
  }
};

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM products where user_id=$1 AND is_deleted = FALSE",[req.user.id]);
    res.json(result.rows);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Error fetching products" });
  }
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "SELECT * FROM products WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error fetching product:", error);
    res.status(500).json({ message: "Error fetching product" });
  }
};
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const {
    product_name,
    selling_price,
    description,
    stock_quantity,
    product_image,
    category,
    status,
  } = req.body;

  try {
    const result = await pool.query(
      `UPDATE products 
       SET product_name = $1,
           selling_price = $2,
           description = $3,
           stock_quantity = $4,
           product_image = $5,
           category = $6,
           status = $7
       WHERE id = $8
       RETURNING *`,
      [
        product_name,
        selling_price,
        description,
        stock_quantity,
        product_image,
        category,
        status,
        id,
      ]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: "Product not found or not updated" });
    }

    res.json({ message: "Product updated", product: result.rows[0] });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Error updating product" });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const result =  await pool.query("UPDATE products SET is_deleted = TRUE WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Product not found or already deleted" });
    }

    res.json({ message: "Product soft-deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ message: "Error deleting product" });
  }
};

const getUserOrders = async (req, res) => {
  const adminId = req.user.id; // token gives admin id
  console.log('Admin ID:', adminId);

  try {
    const result = await pool.query(
      `SELECT o.id AS order_id, o.product_id, o.quantity, o.total_price, o.order_status,
              o.order_date, u.name AS user_name,p.product_name AS product_name
       FROM orders o
       JOIN users u ON o.user_id = u.id
       JOIN products p ON o.product_id = p.id
       WHERE o.admin_id = $1
       ORDER BY o.order_date DESC`,
      [adminId]
    );

    res.status(200).json(result.rows);
  } catch (error) {
    console.error('Error fetching admin orders:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};




module.exports = { createProduct, getAllProducts, getProductById, updateProduct,deleteProduct, getUserOrders };
