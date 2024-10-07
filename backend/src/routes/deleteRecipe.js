const express = require('express');
const mongoose = require('mongoose');
const Recipe = require('../../models/recipe');
const Ingredient = require('../../models/ingredient');

const router = express.Router();   

router.delete('/recipes/:id', async (req, res) => {
    try {
        const recipe = await Recipe.findByIdAndDelete(req.params.id);
        res.json(recipe);
    } catch (err) {
        console.error('Error deleting recipe:', err);
        res.status(500).json({ message: 'Server error' });
    } 
});

module.exports = router;
