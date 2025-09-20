// routes/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { isGuest } = require('../middleware/auth');

// Form login
router.get('/login', isGuest, authController.loginForm);
router.post('/login', isGuest, authController.login);

// Form register
router.get('/register', isGuest, authController.registerForm);
router.post('/register', isGuest, authController.register);

// Forgot password
router.get('/forgot', isGuest, authController.forgotForm);

// Logout
router.post('/logout', authController.logout);

module.exports = router;
