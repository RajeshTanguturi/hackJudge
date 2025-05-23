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


exports.updateProjectScores = async (projectId) => {
  const evaluations = await Evaluation.find({ project: projectId });
  if (evaluations.length === 0) {
    await Project.findByIdAndUpdate(projectId, {
      totalScore: 0
    });
    return;
  }
  const totalScore = evaluations.reduce((sum, evalDoc) => sum + evalDoc.totalScore, 0) / evaluations.length;
  await Project.findByIdAndUpdate(projectId, {
    totalScore: Math.round(totalScore * 100) / 100
  });
};

