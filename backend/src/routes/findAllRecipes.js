const express = require('express');
const mongoose = require('mongoose');
const Recipe = require('../../models/recipe');
const Ingredient = require('../../models/ingredient');

const router = express.Router();


router.get('/recipes', async (req, res) => {
  try {
    const recipes = await Recipe.find().populate('ingredients.ingredient');
    res.json(recipes);
  } catch (err) {
    console.error('Error fetching recipes:', err);
    res.status(500).json({ message: 'Server error' });
  } 
});

module.exports = router;