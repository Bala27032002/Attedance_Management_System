const express = require('express');
const router = express.Router();
const authController = require('..//Controller/UserController');

// Sign-up route
router.post('/signup', authController.signup);

// Login route
router.post('/login', authController.login);

// Protected profile route
router.get('/profile', authController.verifyToken, authController.profile);

module.exports = router;
