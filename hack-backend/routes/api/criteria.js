// routes/api/criteria.js
const express = require('express');
const router = express.Router();
const criterionController = require('../../controllers/criterionController');
const auth = require('../../middleware/auth');
const organizerAuth = require('../../middleware/organizerAuth');

// @route   GET api/criteria
// @desc    Get all criteria
// @access  Private
router.get('/', auth, criterionController.getAllCriteria);

// @route   GET api/criteria/:id
// @desc    Get criterion by ID
// @access  Private
router.get('/:id', auth, criterionController.getCriterionById);


// @route   GET api/criteria/hackathon/:hackathonId
// @desc    Get all criteria for a given hackathon
// @access  Private
router.get('/hackathon/:hackathonId', auth, criterionController.getCriteriaByHackathon);

// @route   POST api/criteria
// @desc    Create a criterion
// @access  Admin only
router.post('/', auth, organizerAuth, criterionController.createCriterion);

// @route   PUT api/criteria/:id
// @desc    Update a criterion
// @access  Admin only
router.put('/:id', auth, organizerAuth, criterionController.updateCriterion);

// @route   DELETE api/criteria/:id
// @desc    Delete a criterion
// @access  Admin only
router.delete('/:id', auth, organizerAuth, criterionController.deleteCriterion);

module.exports = router;