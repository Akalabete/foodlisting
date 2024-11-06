const express = require('express');
const mongoose = require('mongoose');
const Ingredient = require('../../models/ingredient');

const router = express.Router();

router.post('/ingredients', async (req, res) => {
  try {
    const { name, unityType, ingType } = req.body;

    // Vérification des champs requis
    if (!name || !unityType || !ingType) {
      return res.status(400).json({ message: 'Tous les champs sont requis' });
    }

    // Vérification de l'existence de l'ingrédient
    const existingIngredient = await Ingredient.findOne({ name, unityType, ingType }).exec();
    if (existingIngredient) {
      return res.status(400).json({ message: `L'ingrédient avec le nom ${name}, le type d'unité ${unitType}, et le type d'ingrédient ${ingType} existe déjà` });
    }

    // Création du nouvel ingrédient
    const newIngredient = new Ingredient({ name, unityType, ingType });
    await newIngredient.save();

    const message = `L'ingrédient ${name} a bien été ajouté`;
    res.status(201).json({ message, data: newIngredient });
  } catch (err) {
    console.error('Error saving ingredient:', err);
    res.status(500).json({ message: 'Erreur serveur' });
  }
});

module.exports = router;