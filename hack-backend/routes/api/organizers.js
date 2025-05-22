const express = require('express');
const router = express.Router();
const Organizer = require('../../models/Organizer');
const auth = require('../../middleware/auth');

// @route   GET api/organizers
// @desc    Get all organizers (admin only, or for demo purposes)
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const organizers = await Organizer.find().select('-password');
    res.json(organizers);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/organizers/:id
// @desc    Get organizer by ID
// @access  Private
router.get('/:id', auth, async (req, res) => {
  try {
    const organizer = await Organizer.findById(req.params.id).select('-password');
    if (!organizer) {
      return res.status(404).json({ msg: 'Organizer not found' });
    }
    res.json(organizer);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Organizer not found' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;