const express = require('express');
const router = express.Router();
const Supplier = require('../models/Supplier');

// Endpoint to get all suppliers
router.get('/suppliers', async (req, res) => {
  try {
    const suppliers = await Supplier.find();
    res.json({'suppliers': suppliers});
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    res.status(500).json({"message": "Error getting suppliers"});
  }
});

module.exports = router;
