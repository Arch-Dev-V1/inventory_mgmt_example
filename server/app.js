const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import cors

const authRoutes = require('./routes/auth');
const categoryRoutes = require('./routes/categories');
const supplierRoutes = require('./routes/suppliers');
const productRoute = require('./routes/products')
require('dotenv').config();

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


module.exports = app;