const Hackathon = require('../models/Hackathon');

module.exports = async function(req, res, next) {
  // const hackathonId = req.params.hackathonId || req.body.hackathonId;
  const hackathonId =  req.body.hackathonId || req.params.hackathonId || req.params.id;
  if (!hackathonId) {
    if (req.user && req.user.role === 'organizer') {
      return next();
    }
    return res.status(400).json({ msg: 'Hackathon ID required' });
  }
  const hackathon = await Hackathon.findById(hackathonId);
  if (!hackathon) {
    return res.status(404).json({ msg: 'Hackathon not found' });
  }
  if (hackathon.organizer.toString() !== req.user.id) {
    return res.status(403).json({ msg: 'Access denied. Not your hackathon.' });
  }
  next();
};