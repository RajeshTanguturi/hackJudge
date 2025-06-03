const Hackathon = require('../models/Hackathon');

// Get all hackathons
exports.getAllHackathons = async (req, res) => {
  try {
    const hackathons = await Hackathon.find()
      .populate('organizer', 'name email')
      .populate('judges', 'name email');
    res.json(hackathons);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};
// Get a hackathon by organizer ID (Organizer only)
exports.getHackathonsByOrganizer = async (req, res) => {
  try {
    console.log('get hackathons by organizer');
    console.log(req.user.id);
    const hackathons = await Hackathon.find({ organizer: req.user.id })
      .populate('judges', 'name email');
    res.json(hackathons);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

// Get a hackathon by ID
exports.getHackathonById = async (req, res) => {
  try {
    const hackathon = await Hackathon.findById(req.params.id)
      .populate('organizer', 'name email')
      .populate('judges', 'name email');
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
  console.log('create hackathon');
  try {
    const {
      name,
      description,
      location,
      websiteUrl,
      socialMediaUrls,
      maxMembersPerTeam,
      minMembersPerTeam,
      noOfWinners,
      prize,
      startDate,
      endDate,
      profileImgUrl,
      coverImgUrl
    } = req.body;

    const hackathon = new Hackathon({
      name,
      description,
      organizer: req.user.id,
      location,
      websiteUrl,
      socialMediaUrls,
      maxMembersPerTeam,
      minMembersPerTeam,
      noOfWinners,
      prize,
      startDate,
      endDate,
      profileImgUrl,
      coverImgUrl
    });

    await hackathon.save();
    res.status(201).json(hackathon);
  } catch (err) {
    console.error("error creating hackthon" , err.message);
    res.status(500).send('Server Error');
  }
};

// Update a hackathon (Organizer only)
exports.updateHackathon = async (req, res) => {
  try {
    const {
      name,
      description,
      location,
      websiteUrl,
      socialMediaUrls,
      maxMembersPerTeam,
      minMembersPerTeam,
      noOfWinners,
      prize,
      startDate,
      endDate,
      isActive,
      profileImgUrl,
      coverImgUrl
    } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (location) updateData.location = location;
    if (websiteUrl) updateData.websiteUrl = websiteUrl;
    if (socialMediaUrls) updateData.socialMediaUrls = socialMediaUrls;
    if (maxMembersPerTeam) updateData.maxMembersPerTeam = maxMembersPerTeam;
    if (minMembersPerTeam) updateData.minMembersPerTeam = minMembersPerTeam;
    if (noOfWinners !== undefined) updateData.noOfWinners = noOfWinners;
    if (prize !== undefined) updateData.prize = prize;
    if (startDate) updateData.startDate = startDate;
    if (endDate) updateData.endDate = endDate;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (profileImgUrl) updateData.profileImgUrl = profileImgUrl;
    if (coverImgUrl) updateData.coverImgUrl = coverImgUrl;

    const hackathon = await Hackathon.findOneAndUpdate(
      { _id: req.params.id, organizer: req.user.id },
      { $set: updateData },
      { new: true, runValidators: true }
    ).populate('organizer', 'name email')
     .populate('judges', 'name email');

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