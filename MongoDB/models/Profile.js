const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  //Want to create a reference to user model, because every profile should be associated with a User.
  user: {
    //Connect to a ID in the User model -> new User has _id field.
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  website: {
  bio: {
    type: String,
    required: true,
  },
  location: {
    tpye: String,
  },
  //How experienced they are with cooking.
  experience: {
    type: String,
    required: true,
  },
  //There favorite recipes to cook/learn about.
  recipes: {
    type: [String],
    required: true,
  },
  bio: {
    type: String,
  },
  //An object with all their social media links.
  social: {
    twitter: {
      type: String,
    },
    facebook: {
      type: String,
    },
    instagrams: {
      type: String,
    },
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
