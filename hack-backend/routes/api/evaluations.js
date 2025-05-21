// routes/api/evaluations.js
const express = require('express');
const router = express.Router();
const evaluationController = require('../../controllers/evaluationController');
const auth = require('../../middleware/auth');
const { adminOnly } = require('../../middleware/roles');

// @route   GET api/evaluations
// @desc    Get all evaluations (admin) or evaluations by current judge
// @access  Private
router.get('/', auth, evaluationController.getAllEvaluations);

// @route   GET api/evaluations/:id
// @desc    Get evaluation by ID
// @access  Admin or Owner Judge
router.get('/:id', auth, evaluationController.getEvaluationById);

// @route   POST api/evaluations
// @desc    Create an evaluation
// @access  Private (Judges only)
router.post('/', auth, evaluationController.createEvaluation);

// @route   PUT api/evaluations/:id
// @desc    Update an evaluation
// @access  Admin or Owner Judge
// router.put('/:id', auth, evaluationController.updateEvaluation);

// @route   DELETE api/evaluations/:id
// @desc    Delete an evaluation
// @access  Admin only
// router.delete('/:id', auth, adminOnly, evaluationController.deleteEvaluation);

// @route   GET api/evaluations/project/:projectId
// @desc    Get evaluations for a project
// @access  Admin only
// router.get('/project/:projectId', auth, adminOnly, evaluationController.getEvaluationsByProject);

// @route   GET api/evaluations/judge/:judgeId
// @desc    Get evaluations by a judge
// @access  Admin or Self
// router.get('/judge/:judgeId', auth, evaluationController.getEvaluationsByJudge);

module.exports = router;