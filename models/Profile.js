const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  //Want to create a reference to user model, because every profile should be associated with a User.
  user: {
    //Connect to a ID in the User model -> new User has _id field.
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
  bio: {
    type: String,
    required: true,
  },
  location: {
    tpye: String,
  },
  //There favorite recipes to cook/learn about.
  recipes: {
    type: [String],
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);
