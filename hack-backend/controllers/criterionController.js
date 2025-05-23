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
    const { name, description, weight, maxScore, hackathonId } = req.body;
    // Ensure only organizer of the hackathon can create
    if (req.user.role !== 'organizer') {
      return res.status(403).json({ msg: 'Only organizers can create criteria.' });
    }
    let criterion = await Criterion.findOne({ name, hackathon: hackathonId });
    if (criterion) {
      return res.status(400).json({ msg: 'Criterion already exists for this hackathon.' });
    }
    criterion = await criterionService.createCriterion({
      name,
      description,
      weight: weight || 10,
      maxScore: maxScore || 10,
      hackathon: hackathonId
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
    const { name, description, weight, maxScore, isActive } = req.body;
    
    const updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (weight) updateData.weight = weight;
    if (maxScore) updateData.maxScore = maxScore;
    if (isActive !== undefined) updateData.isActive = isActive;
    
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

// Get all criteria for a given hackathon
exports.getCriteriaByHackathon = async (req, res) => {
  try {
    const { hackathonId } = req.params;
    const criteria = await Criterion.find({ hackathon: hackathonId, isActive: true }).sort({ order: 1 });
    res.json(criteria);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};