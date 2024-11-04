const express = require('express');
const mongoose = require('mongoose');
const Recipe = require('../../models/recipe');
const Ingredient = require('../../models/ingredient');

const router = express.Router();


router.post('/recipes', async (req, res) => {
  try {
    const { recipeName, recipeDescription, isVegan, isVegetarian, numberOfSpoon, instructionPoints, difficultyRate, yummyRating, bakingTime, createdBy, ingredients } = req.body;

    const ingredientPromises = ingredients.map(async ing => {
      const ingredient = await Ingredient.findOneAndUpdate(
        { name: ing.name, unityType: ing.unityType },
        { name: ing.name, unityType: ing.unityType, ingType: ing.ingType },
        { upsert: true, new: true }
      );
      return { ingredient: ingredient._id, qty: ing.qty };
      console.log('Ingredient created/updated:', ingredient);
    });

    const ingredientRefs = await Promise.all(ingredientPromises);


    const newRecipe = new Recipe({
      recipeName,
      recipeDescription,
      isVegan,
      isVegetarian,
      numberOfSpoon,
      instructionPoints,
      difficultyRate,
      yummyRating,
      bakingTime,
      createdBy,
      ingredients: ingredientRefs
    });

    await newRecipe.save();
    const message = `Merci pour votre contribution, la recette ${recipeName} a bien été ajoutée`;
    res.json({ message, data: newRecipe })
  } catch (err) {
    console.error('Error saving recipe:', err);
    res.status(500).json({ message: 'Server error' });
  } 
});

module.exports = router;