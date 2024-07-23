const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors

const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/categories');
const supplierRoutes = require('./routes/suppliers');
const productRoute = require('./routes/products')
const db = require('./config/db');
require('dotenv').config();
const port = process.env.PORT || 3000;

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', categoryRoutes);
app.use('/api/products', supplierRoutes);
app.use('/api/products', productRoute);

// Database Connection
db();
app.listen(port, async () => {
    console.log(`Server running on port ${port}`);
});
