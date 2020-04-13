const express = require('express');
const router = express.Router();
const cors = require('cors');
// @route   GET api/posts
// @desc    Test route
// @access  Public
var dummyRecipe = require('./dummyData/dummyRecipe.json');
router.get('/', (req, res)=> {
    res.send(dummyRecipe);


});

module.exports = router;
