// routes/api/projects.js
const express = require('express');
const router = express.Router();
const projectController = require('../../controllers/projectController');
const auth = require('../../middleware/auth');
const { adminOnly } = require('../../middleware/roles');

// @route   GET api/projects
// @desc    Get all projects
// @access  Private
router.get('/', auth, projectController.getAllProjects);

// @route   GET api/projects/:id
// @desc    Get project by ID
// @access  Private
router.get('/:id', auth, projectController.getProjectById);

// @route   POST api/projects
// @desc    Create a project
// @access  Admin only
router.post('/', auth, adminOnly, projectController.createProject);

// @route   PUT api/projects/:id
// @desc    Update a project
// @access  Admin only
router.put('/:id', auth, adminOnly, projectController.updateProject);

// @route   DELETE api/projects/:id
// @desc    Delete a project
// @access  Admin only
router.delete('/:id', auth, adminOnly, projectController.deleteProject);

// @route   GET api/projects/:id/results
// @desc    Get project evaluation results
// @access  Private
router.get('/:id/results', auth, projectController.getProjectResults);

module.exports = router;