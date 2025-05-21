// controllers/authController.js
const Judge = require('../models/Judge');
const jwt = require('jsonwebtoken');
const config = require('../config/default');
const bcrypt = require('bcryptjs');

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find judge by email
    const judge = await Judge.findOne({ email });
    
    if (!judge) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    
    // Check if account is active
    if (!judge.isActive) {
      return res.status(403).json({ msg: 'Account is inactive. Please contact an administrator.' });
    }
    
    // Check password
    const isMatch = await judge.comparePassword(password);
    
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    
    // Create JWT
    const payload = {
      user: {
        id: judge.id,
        role: judge.role
      }
    };
    
    jwt.sign(
      payload,
      config.jwtSecret,
      { expiresIn: '24h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get current user
exports.getCurrentUser = async (req, res) => {
  try {
    const judge = await Judge.findById(req.user.id).select('-password');
    
    if (!judge) {
      return res.status(404).json({ msg: 'Judge not found' });
    }
    
    res.json(judge);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Logout (stateless, simply inform client)
exports.logout = async (req, res) => {
  res.json({ msg: 'Logout successful' });
};

// Change password
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    // Find judge
    const judge = await Judge.findById(req.user.id);
    
    if (!judge) {
      return res.status(404).json({ msg: 'Judge not found' });
    }
    
    // Check current password
    const isMatch = await judge.comparePassword(currentPassword);
    
    if (!isMatch) {
      return res.status(400).json({ msg: 'Current password is incorrect' });
    }
    
    // Update password
    judge.password = newPassword;
    await judge.save();
    
    res.json({ msg: 'Password updated successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};