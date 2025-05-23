
// routes/api/index.js
const express = require('express');
const router = express.Router();

router.use('/judges', require('./judges'));
router.use('/projects', require('./projects'));
router.use('/criteria', require('./criteria'));
router.use('/evaluations', require('./evaluations'));
router.use('/auth', require('./auth'));
router.use('/organizers', require('./organizers'));
router.use('/hackathons', require('./hackathons'));
module.exports = router;