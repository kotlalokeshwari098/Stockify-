const bcrypt=require('bcryptjs');
const jwt =require('jsonwebtoken');
const  pool  =require('../database/db.js');
const dotenv=require('dotenv');
dotenv.config();

// SIGNUP
const registerUser = async (req, res) => {
    console.log('Registering user:', req.body);
  const { name, email, password, role } = req.body;
  const hashed = await bcrypt.hash(password, 10);
  console.log(pool)
  const result = await pool.query(
    `INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4)`,
    [name, email, hashed, role]
  );
 return res.json({ message: 'User registered', user: result.rows[0] });
};

// LOGIN
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
  const user = result.rows[0];
  if (!user) return res.status(400).json({ error: 'Invalid email' });

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return res.status(400).json({ error: 'Invalid password' });

  const token = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '1d',
  });
 return res.json({ message: 'Login success', token });
};

module.exports={loginUser, registerUser};
