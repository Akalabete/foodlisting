const express = require('express');
const mongoose = require('mongoose');
const Recipe = require('../../models/recipe');
const Ingredient = require('../../models/ingredient');



const router = express.Router();

router.get('/recipes/:id', async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate('ingredients.ingredient');
    res.json(recipe);
  } catch (err) {
    console.error('Error fetching recipe:', err);
    res.status(500).json({ message: 'Server error' });
  } 
});

module.exports = router;