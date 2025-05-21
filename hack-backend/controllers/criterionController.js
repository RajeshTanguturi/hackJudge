// controllers/criterionController.js
const Criterion = require('../models/Criterion');
const criterionService = require('../services/criterionService');

// Get all criteria
exports.getAllCriteria = async (req, res) => {
  try {
    const criteria = await criterionService.getAllCriteria();
    res.json(criteria);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get criterion by ID
exports.getCriterionById = async (req, res) => {
  try {
    const criterion = await criterionService.getCriterionById(req.params.id);
    
    if (!criterion) {
      return res.status(404).json({ msg: 'Criterion not found' });
    }
    
    res.json(criterion);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Criterion not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Create a criterion
exports.createCriterion = async (req, res) => {
  try {
    const { name, description, weight, maxScore, order, category } = req.body;
    
    // Check if criterion already exists
    let criterion = await Criterion.findOne({ name });
    if (criterion) {
      return res.status(400).json({ msg: 'Criterion already exists' });
    }
    
    criterion = await criterionService.createCriterion({
      name,
      description,
      weight: weight || 1,
      maxScore: maxScore || 10,
      order: order || 0,
      category
    });
    
    res.json(criterion);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update a criterion
exports.updateCriterion = async (req, res) => {
  try {
    const { name, description, weight, maxScore, order, isActive, category } = req.body;
    
    const updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (weight) updateData.weight = weight;
    if (maxScore) updateData.maxScore = maxScore;
    if (order !== undefined) updateData.order = order;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (category) updateData.category = category;
    
    const criterion = await criterionService.updateCriterion(req.params.id, updateData);
    
    if (!criterion) {
      return res.status(404).json({ msg: 'Criterion not found' });
    }
    
    res.json(criterion);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Criterion not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Delete a criterion
exports.deleteCriterion = async (req, res) => {
  try {
    const criterion = await criterionService.deleteCriterion(req.params.id);
    
    if (!criterion) {
      return res.status(404).json({ msg: 'Criterion not found' });
    }
    
    res.json({ msg: 'Criterion removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Criterion not found' });
    }
    res.status(500).send('Server Error');
  }
};
