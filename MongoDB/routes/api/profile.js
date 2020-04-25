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
// @access  Private - getting user by token, meaning we have to bring in auth middleware.

//The auth in the second parameter indicates that you want this to be a protected route.
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name']); // Populate Profile with the user's name (can include other fields).

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
  // Use the auth and validation middleware, so you have to put the middleware in a set
  // of brackets.
  [
    auth,
    [
      // Makes sure that these fields have values since they are currently marked as required.
      check('bio', 'Bio is required.').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    // Pull all the fields from the reuqest body.
    const { bio, location, recipes } = req.body;

    // Build profile object and initialize to empty object.
    const profileFields = {};
    // User will be set by the token that is sent over.
    profileFields.user = req.user.id;

    if (bio) profileFields.bio = bio;
    if (location) profileFields.location = location;
    // Need to turn recipes into an array.
    if (recipes) {
      profileFields.recipes = recipes.split(',').map((recipe) => recipe.trim());
    }

    // Update and insert the data we got above.

    try {
      // Look for a profile by user ID.
      let profile = await Profile.findOne({ user: req.user.id });

      // If there is a profile, we want to update it.
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      // If the profile is not found, we want to create one.
      profile = new Profile(profileFields);

      await profile.save();
      return res.json(profile);
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public - no auth middleware needed

router.get('/', async (req, res) => {
  try {
    // Getting the profile, and also adding the user's name to the response.
    // This will be helpful later when you want to display the profiles by the
    // user's name.
    const profiles = await Profile.find().populate('user', ['name']);
    res.json(profiles);
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/profile/user/:user_id (Colon because this a placeholder)
// @desc    Get profile by the user ID
// @access  Public

router.get('/user/:user_id', async (req, res) => {
  try {
    // Find it by the user, and the ID is going to come for the URL, so we can
    // get it from the request parameters.
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name']);

    if (!profile) return res.status(400).json({ msg: 'Profile not found.' });
    res.json(profile);
    // If what we are passing in is not a valid user ID
  } catch (err) {
    console.log(err.message);
    if (err.kind == 'ObjectId') {
      return res.status(400).json({ msg: 'Profile not found.' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/profile
// @desc    Delete profile, user, and posts
// @access  Private

router.delete('/', auth, async (req, res) => {
  try {
    // Remove profile.
    // This is private, so we have access to the token.
    await Profile.findOneAndRemove({ user: req.user.id });
    // Remove the user associated with that profile.
    await User.findOneAndRemove({ _id: req.user.id });

    res.json({ msg: 'User deleted.' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
