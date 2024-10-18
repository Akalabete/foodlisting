const express = require('express');
const mongoose = require('mongoose');
const Ingredient = require('../../models/ingredient');

const router = express.Router();

router.get('/ingredients', async (req, res) => {
  try {
    const ingredients = await Ingredient.find();
    res.status(200).json(ingredients);
  } catch (error) {
    res.status(500).json({ message: 'Erreur lors de la récupération des ingrédients', error });
  }
});

module.exports = router;