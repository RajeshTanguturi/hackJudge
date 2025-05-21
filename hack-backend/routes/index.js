// routes/index.js
const express = require('express');
const router = express.Router();

router.use('/api', require('./api'));

// Health check route
router.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running routes folder' });
});

module.exports = router;