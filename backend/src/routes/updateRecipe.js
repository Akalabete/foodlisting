const express = require('express');
const mongoose = require('mongoose');
const Recipe = require('../../models/recipe');
const Ingredient = require('../../models/ingredient');


const route = express.Router();

route.put('/recipes/:id', async (req, res) => {
    const id = req.params.id;
    const recipe = req.body;
    try {
        const updatedRecipe = await Recipe.findByIdAndUpdate(id, recipe, { new: true });
        if (!updatedRecipe) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.json(updatedRecipe);
    } catch (err) {
        console.error('Error updating recipe:', err);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = route;