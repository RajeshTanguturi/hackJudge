// services/criterionService.js
const Criterion = require('../models/Criterion');

// Get all criteria
exports.getAllCriteria = async () => {
  return await Criterion.find({ isActive: true }).sort({ order: 1 });
};

// Get criterion by ID
exports.getCriterionById = async (id) => {
  return await Criterion.findById(id);
};

// Create a criterion
exports.createCriterion = async (criterionData) => {
  const criterion = new Criterion(criterionData);
  await criterion.save();
  return criterion;
}
// Update a criterion
exports.updateCriterion = async (id, updateData) => {
  return await Criterion.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true }
  );
};

// Delete a criterion
exports.deleteCriterion = async (id) => {
  return await Criterion.findByIdAndDelete(id);
};
