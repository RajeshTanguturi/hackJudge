const express = require('express');
const router = express.Router();
const hackathonController = require('../../controllers/hackathonController');
const auth = require('../../middleware/auth');
const organizerAuth = require('../../middleware/organizerAuth');
// @route   GET api/hackathons
// @desc    Get all hackathons
// @access  Public
router.get('/', hackathonController.getAllHackathons);

// @route   GET api/hackathons/:id
// @desc    Get hackathon by ID
// @access  Public
router.get('/:id', hackathonController.getHackathonById);

// @route   GET api/hackathons/myhackathons
// @desc    Get hackathons by current organizer
// @access  Organizer only
router.get('/my/myhackathons', auth, hackathonController.getHackathonsByOrganizer);

// @route   POST api/hackathons
// @desc    Create a hackathon
// @access  Organizer only
router.post('/', auth, organizerAuth, hackathonController.createHackathon);
// @route   PUT api/hackathons/:id
// @desc    Update a hackathon
// @access  Organizer only
router.put('/:id', auth, organizerAuth, hackathonController.updateHackathon);

// @route   DELETE api/hackathons/:id
// @desc    Delete a hackathon
// @access  Organizer only
router.delete('/:id', auth , organizerAuth, hackathonController.deleteHackathon);

module.exports = router;