// controllers/evaluationController.js
const Evaluation = require('../models/Evaluation');
const evaluationService = require('../services/evaluationService');

// Get all evaluations
exports.getAllEvaluations = async (req, res) => {
  try {
    let evaluations;
    
    // If admin, get all evaluations, otherwise only get current user's evaluations
    if (req.user.role === 'admin') {
      evaluations = await evaluationService.getAllEvaluations();
    } else {
      evaluations = await evaluationService.getEvaluationsByJudge(req.user.id);
    }
    
    res.json(evaluations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get evaluation by ID
exports.getEvaluationById = async (req, res) => {
  try {
    const evaluation = await evaluationService.getEvaluationById(req.params.id);
    
    if (!evaluation) {
      return res.status(404).json({ msg: 'Evaluation not found' });
    }
    
    // Check if user is admin or the judge who created this evaluation
    if (req.user.role !== 'admin' && evaluation.judge.toString() !== req.user.id) {
      return res.status(403).json({ msg: 'Access denied' });
    }
    
    res.json(evaluation);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Evaluation not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Create an evaluation
exports.createEvaluation = async (req, res) => {
  try {
    const { project, scores, feedback } = req.body;
    
    // Check if evaluation already exists for this judge and project
    const existingEvaluation = await Evaluation.findOne({ 
      judge: req.user.id, 
      project 
    });
    
    if (existingEvaluation) {
      return res.status(400).json({ msg: 'You have already evaluated this project' });
    }
    
    // Calculate total score
    let totalScore = 0;
    for (const score of scores) {
      totalScore += score.score;
    }
    
    const evaluation = await evaluationService.createEvaluation({
      project,
      judge: req.user.id,
      scores,
      feedback,
      totalScore
    });
    
    // Update project average scores
    await evaluationService.updateProjectScores(project);
    
    res.json(evaluation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};