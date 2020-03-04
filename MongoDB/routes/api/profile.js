//Handle routes that have anything to do with profiles. (Fetching them, adding them, updating them, etc)
const express = require('express');
const router = express.Router();

// @route   GET api/profile
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('Profile route'));

module.exports = router;
