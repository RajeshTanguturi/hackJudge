// services/resultService.js
const Project = require('../models/Project');
const Evaluation = require('../models/Evaluation');
const Criterion = require('../models/Criterion');

// Get results for a specific project
exports.getProjectResults = async (projectId) => {
  // Get project details
  const project = await Project.findById(projectId);
  
  if (!project) {
    return null;
  }
  
  // Get all evaluations for this project
  const evaluations = await Evaluation.find({ project: projectId })
    .populate('judge', 'name')
    .populate('scores.criterion', 'name weight');
  
  // Get all criteria
  const criteria = await Criterion.find({ isActive: true }).sort({ order: 1 });
  
  // Format results
  const judgeSummaries = evaluations.map(evaluation => {
    const criteriaScores = criteria.map(criterion => {
      const score = evaluation.scores.find(
        s => s.criterion._id.toString() === criterion._id.toString()
      );
      
      return {
        criterionId: criterion._id,
        criterionName: criterion.name,
        score: score ? score.score : null,
        comment: score ? score.comment : null
      };
    });
    
    return {
      judgeId: evaluation.judge._id,
      judgeName: evaluation.judge.name,
      totalScore: evaluation.totalScore,
      feedback: evaluation.feedback,
      criteriaScores
    };
  });
  
  // Format criteria summaries
  const criteriaSummaries = criteria.map(criterion => {
    const scores = evaluations.map(evaluation => {
      const score = evaluation.scores.find(
        s => s.criterion._id.toString() === criterion._id.toString()
      );
      
      return score ? score.score : null;
    }).filter(score => score !== null);
    
    const average = scores.length > 0
      ? scores.reduce((sum, score) => sum + score, 0) / scores.length
      : 0;
    
    const weightedAverage = average * criterion.weight;
    
    return {
      criterionId: criterion._id,
      criterionName: criterion.name,
      weight: criterion.weight,
      averageScore: average,
      weightedScore: weightedAverage,
      scores
    };
  });
  
  return {
    project: {
      id: project._id,
      name: project.name,
      teamName: project.teamName,
      totalScore: project.totalScore
    },
    evaluationsCount: evaluations.length,
    judgeSummaries,
    criteriaSummaries
  };
};

// Get overall rankings of all projects
exports.getProjectRankings = async () => {
  const projects = await Project.find({ isActive: true })
    .sort({ totalScore: -1 });
  
  return projects.map((project, index) => ({
    rank: index + 1,
    projectId: project._id,
    projectName: project.name,
    teamName: project.teamName,
    totalScore: project.totalScore,
    averageScores: project.averageScores
  }));
};