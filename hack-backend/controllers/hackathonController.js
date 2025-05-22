const Hackathon = require('../models/Hackathon');

// Get all hackathons
exports.getAllHackathons = async (req, res) => {
  try {
    const hackathons = await Hackathon.find().populate('organizer', 'name email');
    res.json(hackathons);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get hackathon by ID
exports.getHackathonById = async (req, res) => {
  try {
    const hackathon = await Hackathon.findById(req.params.id).populate('organizer', 'name email');
    if (!hackathon) {
      return res.status(404).json({ msg: 'Hackathon not found' });
    }
    res.json(hackathon);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Hackathon not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Create a hackathon (Organizer only)
exports.createHackathon = async (req, res) => {
  try {
    const { name, description, startDate, endDate } = req.body;
    const organizer = req.user.id;
    const hackathon = new Hackathon({
      name,
      description,
      organizer,
      startDate,
      endDate
    });
    await hackathon.save();
    res.status(201).json(hackathon);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Update a hackathon (Organizer only)
exports.updateHackathon = async (req, res) => {
  try {
    const { name, description, startDate, endDate, isActive } = req.body;
    const updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (startDate) updateData.startDate = startDate;
    if (endDate) updateData.endDate = endDate;
    if (isActive !== undefined) updateData.isActive = isActive;

    const hackathon = await Hackathon.findOneAndUpdate(
      { _id: req.params.id, organizer: req.user.id },
      { $set: updateData },
      { new: true, runValidators: true }
    );
    if (!hackathon) {
      return res.status(404).json({ msg: 'Hackathon not found or not your hackathon' });
    }
    res.json(hackathon);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Hackathon not found' });
    }
    res.status(500).send('Server Error');
  }
};

// Delete a hackathon (Organizer only)
exports.deleteHackathon = async (req, res) => {
  try {
    const hackathon = await Hackathon.findOneAndDelete({ _id: req.params.id, organizer: req.user.id });
    if (!hackathon) {
      return res.status(404).json({ msg: 'Hackathon not found or not your hackathon' });
    }
    res.json({ msg: 'Hackathon removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Hackathon not found' });
    }
    res.status(500).send('Server Error');
  }
};