const express = require('express');
const cors=require('cors');
const pool = require('./database/db.js');
const app=express();
app.use(express.json());
app.use(cors());
const { registerUser, loginUser } =require('./Controllers/auth.controllers.js');
const { verifyToken, verifyUser, verifyAdmin }=require('./middleware/auth.middleware.js');
const router = require('./routes/admin.routes.js');
const userRouter = require('./routes/user.routes.js');

const PORT= 5000

app.use(cors());

app.post('/register', registerUser);
app.post('/login', loginUser);

// User-only route
app.use('/user', verifyToken, verifyUser, userRouter);

// Admin-only route
app.use('/admin', verifyToken, verifyAdmin, router);

pool.connect().then(()=>console.log('Database connected!!'))

app.listen(PORT ,()=>console.log(`listening on port ${PORT}`))