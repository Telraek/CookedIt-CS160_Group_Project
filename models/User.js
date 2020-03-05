const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  //Can remove the Avatar.
  avatar: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
  //Add more fields to the User Resource Schema such as cooking experience, etc.
});

module.exports = User = mongoose.model('user', UserSchema);
