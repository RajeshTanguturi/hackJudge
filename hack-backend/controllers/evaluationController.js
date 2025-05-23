// controllers/evaluationController.js
const Evaluation = require('../models/Evaluation');
const evaluationService = require('../services/evaluationService');
const Project = require('../models/Project');
const Criterion = require('../models/Criterion');
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
    const judgeId = req.user.id;
    // Check if evaluation already exists for this judge and project
    const existingEvaluation = await Evaluation.findOne({ judge: judgeId, project });
    if (existingEvaluation) {
      return res.status(400).json({ msg: 'You have already evaluated this project' });
    }
    // Get the project and its hackathon
    const projectDoc = await Project.findById(project);
    if (!projectDoc) {
      return res.status(404).json({ msg: 'Project not found' });
    }
    const hackathonId = projectDoc.hackathonId;

     // Get all active criteria for this hackathon
     const criteria = await Criterion.find({ hackathon: hackathonId, isActive: true });
     if (criteria.length === 0) {
       return res.status(400).json({ msg: 'No active criteria for this hackathon' });
     }

     // Check weights sum to 100
     const totalWeight = criteria.reduce((sum, c) => sum + c.weight, 0);
     if (totalWeight !== 100) {
       return res.status(400).json({ msg: 'Criteria weights must sum to 100' });
     }

     // Ensure all criteria are scored and scores are 1-10
    for (const criterion of criteria) {
      const scoreObj = scores.find(s => s.criterion.toString() === criterion._id.toString());
      if (!scoreObj) {
        return res.status(400).json({ msg: `Missing score for criterion: ${criterion.name}` });
      }
      if (scoreObj.score < 1 || scoreObj.score > 10) {
        return res.status(400).json({ msg: `Score for ${criterion.name} must be between 1 and 10` });
      }
    }
     // Calculate weighted total score out of 10
     let totalScore = 0;
     for (const criterion of criteria) {
       const scoreObj = scores.find(s => s.criterion.toString() === criterion._id.toString());
       totalScore += (scoreObj.score * criterion.weight) / 100;
     }

     const evaluation = await evaluationService.createEvaluation({
      project,
      judge: judgeId,
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

exports.updateEvaluation = async (req, res) => {
  try {
    const { scores, feedback } = req.body;
    const evaluation = await evaluationService.updateEvaluation(req.params.id, { scores, feedback });
    if (!evaluation) {
      return res.status(404).json({ msg: 'Evaluation not found' });
    }
    // Recalculate project scores
    await evaluationService.updateProjectScores(evaluation.project);
    res.json(evaluation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.deleteEvaluation = async (req, res) => {
  try {
    const evaluation = await evaluationService.deleteEvaluation(req.params.id);
    if (!evaluation) {
      return res.status(404).json({ msg: 'Evaluation not found' });
    }
    // Recalculate project scores
    await evaluationService.updateProjectScores(evaluation.project);
    res.json({ msg: 'Evaluation removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

exports.getEvaluationsByProject = async (req, res) => {
  try {
    const evaluations = await evaluationService.getEvaluationsByProject(req.params.projectId);
    res.json(evaluations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};