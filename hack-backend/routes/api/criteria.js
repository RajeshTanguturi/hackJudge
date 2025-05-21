// routes/api/criteria.js
const express = require('express');
const router = express.Router();
const criterionController = require('../../controllers/criterionController');
const auth = require('../../middleware/auth');
const { adminOnly } = require('../../middleware/roles');

// @route   GET api/criteria
// @desc    Get all criteria
// @access  Private
router.get('/', auth, criterionController.getAllCriteria);

// @route   GET api/criteria/:id
// @desc    Get criterion by ID
// @access  Private
router.get('/:id', auth, criterionController.getCriterionById);

// @route   POST api/criteria
// @desc    Create a criterion
// @access  Admin only
router.post('/', auth, adminOnly, criterionController.createCriterion);

// @route   PUT api/criteria/:id
// @desc    Update a criterion
// @access  Admin only
router.put('/:id', auth, adminOnly, criterionController.updateCriterion);

// @route   DELETE api/criteria/:id
// @desc    Delete a criterion
// @access  Admin only
router.delete('/:id', auth, adminOnly, criterionController.deleteCriterion);

module.exports = router;