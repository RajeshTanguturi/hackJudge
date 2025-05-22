// middleware/roles.js
// Admin only middleware
exports.adminOnly = (req, res, next) => {
  if (req.user.role !== 'admin') {
    return res.status(403).json({ msg: 'Access denied. Admin only.' });
  }
  next();
};
exports.studentOnly = (req, res, next) => {
  if (req.user.role !== 'student') {
    return res.status(403).json({ msg: 'Access denied. Student only.' });
  }
  next();
};
// Judge only middleware
exports.judgeOnly = (req, res, next) => {
  if (req.user.role !== 'judge') {
    return res.status(403).json({ msg: 'Access denied. Judge only.' });
  }
  next();
};
