// services/evaluationService.js
const Evaluation = require('../models/Evaluation');
const Project = require('../models/Project');
const Criterion = require('../models/Criterion');

// Get all evaluations
exports.getAllEvaluations = async () => {
  return await Evaluation.find()
    .populate('project', 'name teamName')
    .populate('judge', 'name email')
    .populate('scores.criterion', 'name description')
    .sort({ submittedAt: -1 });
};

// Get evaluation by ID
exports.getEvaluationById = async (id) => {
  return await Evaluation.findById(id)
    .populate('project', 'name teamName')
    .populate('judge', 'name email')
    .populate('scores.criterion', 'name description');
};

// Create an evaluation
exports.createEvaluation = async (evaluationData) => {
  const evaluation = new Evaluation(evaluationData);
  await evaluation.save();
  return evaluation;
};

// Update an evaluation
exports.updateEvaluation = async (id, updateData) => {
  return await Evaluation.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true }
  )
    .populate('project', 'name teamName')
    .populate('judge', 'name email')
    .populate('scores.criterion', 'name description');
};

// Delete an evaluation
exports.deleteEvaluation = async (id) => {
  return await Evaluation.findByIdAndDelete(id);
};

// Get evaluations by project
exports.getEvaluationsByProject = async (projectId) => {
  return await Evaluation.find({ project: projectId })
    .populate('judge', 'name email')
    .populate('scores.criterion', 'name description')
    .sort({ submittedAt: -1 });
};

// Get evaluations by judge
exports.getEvaluationsByJudge = async (judgeId) => {
  return await Evaluation.find({ judge: judgeId })
    .populate('project', 'name teamName')
    .populate('scores.criterion', 'name description')
    .sort({ submittedAt: -1 });
};

// Update project scores when evaluations change
exports.updateProjectScores = async (projectId) => {
  // Get all evaluations for this project
  const evaluations = await Evaluation.find({ project: projectId })
    .populate('scores.criterion');
  
  if (evaluations.length === 0) {
    // If no evaluations, reset scores
    await Project.findByIdAndUpdate(projectId, {
      averageScores: {},
      totalScore: 0
    });
    return;
  }
  
  // Get all criteria
  const criteria = await Criterion.find({ isActive: true });
  
  // Calculate average scores for each criterion
  const averageScores = new Map();
  let totalScore = 0;
  
  for (const criterion of criteria) {
    const criterionId = criterion._id.toString();
    let sum = 0;
    let count = 0;
    
    for (const evaluation of evaluations) {
      const score = evaluation.scores.find(
        s => s.criterion._id.toString() === criterionId
      );
      
      if (score) {
        sum += score.score;
        count++;
      }
    }
    
    if (count > 0) {
      const average = sum / count;
      const weightedScore = average * criterion.weight;
      averageScores.set(criterionId, weightedScore);
      totalScore += weightedScore;
    }
  }
  
  // Update project with average scores
  await Project.findByIdAndUpdate(projectId, {
    averageScores: Object.fromEntries(averageScores),
    totalScore
  });
};
