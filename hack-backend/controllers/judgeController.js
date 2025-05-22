// controllers/judgeController.js
const Judge = require('../models/Judge');
const judgeService = require('../services/judgeService');
const Hackathon = require('../models/Hackathon');
const bcrypt = require('bcryptjs');
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


// Create a judge for a hackathon (Organizer only)
exports.createJudge = async (req, res) => {
  try {
    const { name, email, password, hackathonId } = req.body;
    const organizerId = req.user.id; // assuming req.user is set by auth middleware

    // Validate hackathon ownership
    const hackathon = await Hackathon.findOne({ _id: hackathonId, organizer: organizerId });
    if (!hackathon) {
      return res.status(403).json({ msg: 'You do not have permission to add judges to this hackathon.' });
    }

    // Check if judge already exists
    let judge = await Judge.findOne({ email, hackathon: hackathonId });
    if (judge) {
      return res.status(400).json({ msg: 'Judge with this email already exists for this hackathon.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create judge
    judge = new Judge({
      name,
      email,
      password: hashedPassword,
      hackathon: hackathonId,
      organizer: organizerId
    });

    await judge.save();

    // Optionally, add judge to hackathon's judges array
    hackathon.judges.push(judge._id);
    await hackathon.save();

    // Return judge info (excluding password)
    const { password: _, ...judgeData } = judge.toObject();
    res.status(201).json(judgeData);
  } catch (err) {
    console.error('Error creating judge:', err.message);
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
