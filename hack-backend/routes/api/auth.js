// routes/api/auth.js
const express = require('express');
const router = express.Router();
const authController = require('../../controllers/authController');
const auth = require('../../middleware/auth');



// @route   POST api/auth/register-organizer
// @desc    Register organizer
// @access  Public
router.post('/register-organizer', authController.registerOrganizer);

// @route   POST api/auth/login-organizer
// @desc    Login organizer
// @access  Public
router.post('/login-organizer', authController.loginOrganizer);


// @route   POST api/auth/register-student
// @desc    Register student
// @access  Public
router.post('/register-student', authController.registerStudent);

// @route   POST api/auth/login-student
// @desc    login student
// @access  Public
router.post('/login-student', authController.loginStudent);

// @route   POST api/auth/login
// @desc    Authenticate user & get token

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