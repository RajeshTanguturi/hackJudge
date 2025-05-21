// routes/api/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');
const auth = require('../../middleware/auth');

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', authController.login);

// @route   GET api/auth/me
// @desc    Get current user
// @access  Private
router.get('/me', auth, authController.getCurrentUser);

// @route   POST api/auth/logout
// @desc    Logout user / Clear credentials
// @access  Private
router.post('/logout', auth, authController.logout);

// @route   POST api/auth/change-password
// @desc    Change user password
// @access  Private
router.post('/change-password', auth, authController.changePassword);

module.exports = router;