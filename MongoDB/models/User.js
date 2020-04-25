const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
    unique: true,
  },
  password: {
    type: String,
    required: true
    required: true,
  },
  //Can remove the Avatar.
  avatar: {
    type: String
    type: String,
  },
  date: {
    type: Date,
    default: Date.now
  }
  //Add more fields to the User Resource Schema such as cooking experience, etc.
    default: Date.now,
  },
});

module.exports = User = mongoose.model('user', UserSchema);
