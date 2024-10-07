const mongoose = require('mongoose');
const connectDB = require('../db/mongoose');
const Recipe = require('../models/recipes');

const createRecipeWithIngredients = async () => {
  try {
    await connectDB();

    const newRecipe = new Recipe({
      recipeName: 'Salade de fruits',
      isVegan: true,
      isVegetarian: true,
      numberOfSpoon: 4,
      instructionPoints: [
        'Couper les pommes en morceaux.',
        'Éplucher et couper les bananes en rondelles.',
        'Peler les oranges et les séparer en quartiers.',
        'Mélanger tous les fruits dans un bol.'
      ],
      difficultyRate: 1,
      yummyRating: 5,
      bakingTime: 10,
      createdBy: 'Chef Anonyme',
      ingredients: [
        { name: 'Pommes', qty: 2, unityType: 'unité(s)', ingType: 'fruit' },
        { name: 'Bananes', qty: 3, unityType: 'unité(s)', ingType: 'fruit' },
        { name: 'Oranges', qty: 2, unityType: 'unité(s)', ingType: 'fruit' }
      ]
    });

    await newRecipe.save();
    console.log('Recipe and ingredients created successfully');
  } catch (err) {
    console.error('Error creating recipe and ingredients:', err);
  } finally {
    mongoose.connection.close(); 
  }
};

createRecipeWithIngredients();