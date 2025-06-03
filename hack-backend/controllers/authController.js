// controllers/authController.js
const Judge = require('../models/Judge');
const jwt = require('jsonwebtoken');
const config = require('../config/default');
const bcrypt = require('bcryptjs');
const Student = require('../models/Student');
const Organizer = require('../models/Organizer');

// Register
exports.registerStudent = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let student = await Student.findOne({ email });
    if (student) {
      return res.status(400).json({ msg: 'Student already exists' });
    }
    student = new Student({ name, email, password });
    await student.save();
    // Create JWT
    const payload = {
      user: {
        id: student.id,
        role: 'student'
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
// Register Organizer
exports.registerOrganizer = async (req, res) => {
  try {
    const { name, email, password, organization } = req.body;
    let organizer = await Organizer.findOne({ email });
    if (organizer) {
      return res.status(400).json({ msg: 'Organizer already exists' });
    }
    organizer = new Organizer({ name, email, password, organization });
    await organizer.save();
    // Create JWT
    const payload = {
      user: {
        id: organizer.id,
        role: 'organizer'
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

// Student login
exports.loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Find judge by email
    const student = await Student.findOne({ email });
    
    if (!student) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Check password
    const isMatch = await student.comparePassword(password);
    
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    // Create JWT
    const payload = {
      user: {
        id: student.id,
        role: 'student'
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

// Organizer login
exports.loginOrganizer = async (req, res) => {
  try {
    const { email, password } = req.body;
    const organizer = await Organizer.findOne({ email });
    if (!organizer) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const isMatch = await organizer.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }
    const payload = {
      user: {
        id: organizer.id,
        role: 'organizer'
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
// Login Judge
exports.loginJudge = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    const judge = await Judge.findOne({ email });
    if (!judge) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    if (!judge.isActive) {
      return res.status(403).json({ message: 'Account is inactive. Please contact an administrator.' });
    }
    const isMatch = await judge.comparePassword(password);
    console.log(isMatch);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid Password' });
    }
    const payload = {
      user: {
        id: judge.id,
        role: "judge"
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

