const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Register endpoint
router.post('/set-password', authController.setPassword);
router.get('/check-superadmin', authController.checkSuperAdmin);
router.post('/register', authController.createUser);
router.post('/login', authController.login);

module.exports = router;
