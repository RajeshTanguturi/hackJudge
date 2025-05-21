// services/judgeService.js
const Judge = require('../models/Judge');

// Get all judges
exports.getAllJudges = async () => {
  return await Judge.find().select('-password').sort({ name: 1 });
};

// Get judge by ID
exports.getJudgeById = async (id) => {
  return await Judge.findById(id).select('-password');
};

// Create a judge
exports.createJudge = async (judgeData) => {
  const judge = new Judge(judgeData);
  await judge.save();
  return judge;
};

// Update a judge
exports.updateJudge = async (id, updateData) => {
  return await Judge.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true }
  ).select('-password');
};

// Delete a judge
exports.deleteJudge = async (id) => {
  return await Judge.findByIdAndDelete(id);
};