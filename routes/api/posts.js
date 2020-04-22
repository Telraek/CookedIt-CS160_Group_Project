const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator/check');

const Post = require('../../models/Post');
const Profile = require('../../models/Profile');
const User = require('../../models/User');

// @route   POST api/posts
// @desc    Create a post
// @access  Private - because you have to be logged in to create a post.
router.post(
  '/',
  [
    auth,
    [
      // Checking the title and text field, we will make a request from the user ID
      // we have from the token to get the other fields.
      check('title', 'Title is required').not().isEmpty(),
      check('text', 'Text is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    // Since we are using error checking. If there are errors, then display them.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // We are logged in, so we have the token, which gives us user ID and puts it
      // inside req.user.id
      const user = await User.findById(req.user.id).select('-password');

      const newPost = new Post({
        title: req.body.title,
        text: req.body.text,
        name: user.name,
        user: req.user.id,
      });

      const post = await newPost.save();

      res.json(post);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET api/posts
// @desc    Get all posts
// @access  Public - This means that you can get the posts even when you are not logged in.

router.get('/', async (req, res) => {
  try {
    // Currently it is returning the posts by the date they were created. From newest to oldest.
    // We can change it in the future so it returns by likes?
    const posts = await Post.find().sort({ date: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET api/posts/:id
// @desc    Get a post by the ID
// @access  Public - This means that you can get the posts even when you are not logged in.

router.get('/:id', async (req, res) => {
  try {
    // Currently it is returning the posts by the date they were created. From newest to oldest.
    // We can change it in the future so it returns by likes?
    const post = await Post.findById(req.params.id);

    // First check to see if there is a post with this ID.
    if (!post) {
      return res.status(404).json({ msg: 'Post not found.' });
    }
    res.json(post);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found.' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/posts/:id
// @desc    Delete a post by the ID
// @access  Private - A user has to be logged in to delete a post.

router.delete('/:id', auth, async (req, res) => {
  try {
    // Currently it is returning the posts by the date they were created. From newest to oldest.
    // We can change it in the future so it returns by likes?
    const post = await Post.findById(req.params.id);

    // First check to see if there is a post with this ID.
    if (!post) {
      return res.status(404).json({ msg: 'Post not found.' });
    }

    // Want to make sure that user thats deleting the post is the user that owns the post.
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized!' });
    }

    // Remove the post and display the message
    await post.remove();
    res.json({ msg: 'Post removed.' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found.' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/posts/like/:id (PUT request because we are essentially updating a post.)
// @desc    Like a post
// @access  Private - because you have to be logged in to like a post.
router.put('/like/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked by this user. Don't want user to like a post
    // multiple times.
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id).length >
      0
    ) {
      return res.status(400).json({ msg: 'Post already liked.' });
    }

    // Add the user that liked this to the beginning of the like's array. The users ID
    // can be gotten from the request.
    post.likes.unshift({ user: req.user.id });

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found.' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   PUT api/posts/unlike/:id (PUT request because we are essentially updating a post.)
// @desc    Unlike a post
// @access  Private - because you have to be logged in to like a post.
router.put('/unlike/:id', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if the post has already been liked by this user. You cannot unlike a post
    // that has not been liked.
    if (
      post.likes.filter((like) => like.user.toString() === req.user.id)
        .length === 0
    ) {
      return res.status(400).json({ msg: 'Post has not been liked' });
    }

    // Get the index of the like to remove.
    const removeIndex = post.likes
      .map((like) => like.user.toString())
      .indexOf(req.user.id);

    // Remove the index from the array once you have gotten it.
    post.likes.splice(removeIndex, 1);

    await post.save();

    res.json(post.likes);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Post not found.' });
    }
    res.status(500).send('Server Error');
  }
});

// @route   POST api/post/comment/:id
// @desc    Comment on a post
// @access  Private - because you have to be logged in to commont on post.
router.post(
  '/comment/:id',
  [
    auth,
    [
      // Checking that the comment has atext field, we will make a request from the user ID
      // we have from the token to get the other fields.
      check('text', 'Text is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    // Since we are using error checking. If there are errors, then display them.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      // We are logged in, so we have the token, which gives us user ID and puts it
      // inside req.user.id
      const user = await User.findById(req.user.id).select('-password');
      const post = await Post.findById(req.params.id);

      // Create a new comment object with the required information.
      const newComment = {
        text: req.body.text,
        name: user.name,
        user: req.user.id,
      };

      // Add this comment to the beginning of the comment array.
      post.comments.unshift(newComment);

      // Save the post and return the comments.
      await post.save();

      res.json(post.comments);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/post/comment/:id/:comment_id
// @desc    Delete comment
// @access  Private
router.delete('/comment/:id/:comment_id', auth, async (req, res) => {
  try {
    // Get the post that has the comment that we want to delete.
    const post = await Post.findById(req.params.id);

    // Pull out comment
    const comment = post.comments.find(
      (comment) => comment.id === req.params.comment_id
    );

    //Make sure the comment exists.
    if (!comment) {
      return res.status(400).json({ msg: 'Comment does not exist.' });
    }

    // Make sure that the user that is deleting the comment actually made the comment
    if (comment.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ msg: 'User not authorized to delete the comment.' });
    }

    // Get the index of the comment to remove.
    const removeIndex = post.comments
      .map((comment) => comment.user.toString())
      .indexOf(req.user.id);

    // Remove the index from the array once you have gotten it.
    post.comments.splice(removeIndex, 1);

    await post.save();

    res.json(post.comments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
