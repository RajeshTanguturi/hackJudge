const express = require('express');
const router = express.Router();
const judgeController = require('../../controllers/judgeController');
const auth = require('../../middleware/auth');
const { adminOnly } = require('../../middleware/roles');

// @route   GET api/judges
// @desc    Get all judges
// @access  Admin only
router.get('/', auth, adminOnly, judgeController.getAllJudges);

// @route   GET api/judges/:id
// @desc    Get judge by ID
// @access  Admin or Self
router.get('/:id', auth, judgeController.getJudgeById);

// @route   POST api/judges
// @desc    Create a judge
// @access  Admin only
router.post('/', auth, adminOnly, judgeController.createJudge);

// @route   PUT api/judges/:id
// @desc    Update a judge
// @access  Admin or Self
router.put('/:id', auth, judgeController.updateJudge);

// @route   DELETE api/judges/:id
// @desc    Delete a judge
// @access  Admin only
router.delete('/:id', auth, adminOnly, judgeController.deleteJudge);

module.exports = router;