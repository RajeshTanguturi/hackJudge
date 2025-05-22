const express = require('express');
const router = express.Router();
const judgeController = require('../../controllers/judgeController');
const auth = require('../../middleware/auth');
const organizerAuth = require('../../middleware/organizerAuth');

// @route   GET api/judges
// @desc    Get all judges
// @access  Organizer only
router.get('/', auth, organizerAuth, judgeController.getAllJudges);

// @route   GET api/judges/:id
// @desc    Get judge by ID
// @access  Organizer only
router.get('/:id', auth, organizerAuth, judgeController.getJudgeById);

// @route   POST api/judges
// @desc    Create a judge
// @access  Organizer only
router.post('/', auth, organizerAuth, judgeController.createJudge);

// @route   PUT api/judges/:id
// @desc    Update a judge
// @access  Organizer only
router.put('/:id', auth, organizerAuth, judgeController.updateJudge);

// @route   DELETE api/judges/:id
// @desc    Delete a judge
// @access  Organizer only
router.delete('/:id', auth, organizerAuth, judgeController.deleteJudge);

module.exports = router;