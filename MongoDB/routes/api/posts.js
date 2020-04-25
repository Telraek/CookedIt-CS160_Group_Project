const express = require('express');
const router = express.Router();
const cors = require('cors');
// @route   GET api/posts
// @desc    Test route
// @access  Public
var dummyRecipe = require('./dummyData/dummyRecipe.json');
var properties = dummyRecipe.properties;
var recipe = dummyRecipe.recipe;
var ingredients = dummyRecipe.ingredients;

var propString = '/properties';
var recipeString = '/recipe'
router.get('/', (req, res)=> {
    res.json(dummyRecipe);


});
router.get('/id', (req, res)=> {
    res.json(dummyRecipe._id);


});

//Properties
router.get(propString+'/name', (req, res)=> {
    res.json(properties.name);
});

router.get(propString+'/difficulty', (req, res)=> {
    res.json(properties.difficulty);
});
router.get(propString+'/duration', (req, res)=> {
    res.json(properties.duration);
});
router.get(propString+'/avg_stars', (req, res)=> {
    res.json(properties.avg_stars);
});
router.get(propString+'/stars_count', (req, res)=> {
    res.json(properties.stars_count);
});
router.get(propString +'/tags', (req, res)=> {
    res.json(properties.tags);
});


//Recipe
router.get(recipeString+'/ingredients/ingredient_list', (req, res)=> {
    res.json(recipe.ingredients.ingredient_list);
});

router.get(recipeString+'/ingredients/ingredient_measurements', (req, res)=> {
    res.json(recipe.ingredients.ingredient_measurements);
});
router.get(recipeString+'/appliances', (req, res)=> {
    res.json(recipe.appliances);
});
router.get(recipeString+'/instructions', (req, res)=> {
    res.json(recipe.instructions);
});





module.exports = router;
