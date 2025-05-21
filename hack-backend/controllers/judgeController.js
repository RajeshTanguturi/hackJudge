// controllers/judgeController.js
const Judge = require('../models/Judge');
const judgeService = require('../services/judgeService');

// Get all judges
exports.getAllJudges = async (req, res) => {
  try {
    const judges = await judgeService.getAllJudges();
    res.json(judges);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get judge by ID
exports.getJudgeById = async (req, res) => {
  try {
    // Check if user is admin or self
    if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
      return res.status(403).json({ msg: 'Access denied' });
    }

    const judge = await judgeService.getJudgeById(req.params.id);
    
    if (!judge) {
      return res.status(404).json({ msg: 'Judge not found' });
    }
    
    res.json(judge);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Judge not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Create a judge
exports.createJudge = async (req, res) => {
  try {
    const { name, email, password, role, organization, title } = req.body;
    
    // Check if judge already exists
    let judge = await Judge.findOne({ email });
    if (judge) {
      return res.status(400).json({ msg: 'Judge already exists' });
    }
    
    judge = await judgeService.createJudge({
      name,
      email,
      password,
      role: role || 'judge',
      organization,
      title
    });
    
    res.json(judge);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update a judge
exports.updateJudge = async (req, res) => {
  try {
    // Check if user is admin or self
    if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
      return res.status(403).json({ msg: 'Access denied' });
    }
    
    const { name, email, role, organization, title, isActive } = req.body;

    // Only admin can update role or active status
    if ((role || isActive !== undefined) && req.user.role !== 'admin') {
      return res.status(403).json({ msg: 'Only admins can update role or active status' });
    }
    
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (role) updateData.role = role;
    if (organization) updateData.organization = organization;
    if (title) updateData.title = title;
    if (isActive !== undefined) updateData.isActive = isActive;
    
    const judge = await judgeService.updateJudge(req.params.id, updateData);
    
    if (!judge) {
      return res.status(404).json({ msg: 'Judge not found' });
    }
    
    res.json(judge);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Judge not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Delete a judge
exports.deleteJudge = async (req, res) => {
  try {
    const judge = await judgeService.deleteJudge(req.params.id);
    
    if (!judge) {
      return res.status(404).json({ msg: 'Judge not found' });
    }
    
    res.json({ msg: 'Judge removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Judge not found' });
    }
    res.status(500).send('Server Error');
  }
};
