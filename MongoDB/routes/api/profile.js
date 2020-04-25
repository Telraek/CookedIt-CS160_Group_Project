//Handle routes that have anything to do with profiles. (Fetching them, adding them, updating them, etc)
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const cors = require('cors');
// @route   GET api/profile/me (Just our profile based on User ID that is in the token.)
// @desc    Get current users profile
// @access  Private

//The auth in the second parameter indicates that you want this to be a protected route.
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name']);

    if (!profile) {
      return res
        .status(400)
        .json({ msg: 'There is no profile for this user.' });
    }

    res.json(profile);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   POST api/profile
// @desc    Create or update a user profile
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      //Makes sure that these fields have values since they are currently marked as required.
      check('experience', 'Experience is required.').not().isEmpty(),
      check('recipes', 'Recipes is required.').not().isEmpty(),
    ],
  ],
  async (req, res) => {}
);

module.exports = router;
