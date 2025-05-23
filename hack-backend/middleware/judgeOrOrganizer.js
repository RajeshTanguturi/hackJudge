module.exports = function (req, res, next) {
  if (req.user && (req.user.role === 'judge' || req.user.role === 'organizer')) {
    return next();
  }
  return res.status(403).json({ msg: 'Access denied. Only judges and organizers can perform this action.' });
};