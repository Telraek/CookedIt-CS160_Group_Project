const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  // We want post to be connected to User, so we do a reference to the User
  user: {
    type: Schema.Types.ObjectId,
    // Reference the users model, so we have user connected to post.
    // User can only delete their posts, and it will show which user made the post.
    ref: 'users',
  },
  // Title and text of the post.
  title: {
    type: String,
    required: true,
  },
  text: {
    type: String,
    required: true,
  },
  // Name of the user that makes the post. This gives us the option to not delete posts
  // even if the user deletes the account.
  name: {
    type: String,
  },
  // System to like and unlike.
  likes: [
    {
      // Include the user model so we know which likes came from which users, and they
      // can only like a certain post once.
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
    },
  ],
  // Allows comments associate with users to be added.
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
      },
      text: {
        type: String,
        required: true,
      },
      // Name of the user that makes the comment.
      name: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = Post = mongoose.model('post', PostSchema);
