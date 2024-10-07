const mongoose = require('mongoose');
const connectDB = require('../db/mongoose');
const Recipe = require('../models/recipe');
const Ingredient = require('../models/ingredient');

const createRecipeWithIngredients = async () => {
  try {
    await connectDB(); 

    const ingredient1 = await Ingredient.findOneAndUpdate(
      { name: 'Pommes', unityType: 'unité(s)' },
      { name: 'Pommes', unityType: 'unité(s)', ingType: 'fruit' },
      { upsert: true, new: true }
    );
    const ingredient2 = await Ingredient.findOneAndUpdate(
      { name: 'Bananes', unityType: 'unité(s)' },
      { name: 'Bananes', unityType: 'unité(s)', ingType: 'fruit' },
      { upsert: true, new: true }
    );
    const ingredient3 = await Ingredient.findOneAndUpdate(
      { name: 'Oranges', unityType: 'unité(s)' },
      { name: 'Oranges', unityType: 'unité(s)', ingType: 'fruit' },
      { upsert: true, new: true }
    );
    const ingredient4 = await Ingredient.findOneAndUpdate(
      { name: 'Sucre', unityType: 'cuillère à soupe' },
      { name: 'Sucre', unityType: 'cuillère à soupe', ingType: 'ingrédient végan' },
      { upsert: true, new: true }
    );
    const ingredient5 = await Ingredient.findOneAndUpdate(
      { name: 'Sucre', unityType: 'gramme(s)' },
      { name: 'Sucre', unityType: 'gramme(s)', ingType: 'ingrédient végan' },
      { upsert: true, new: true }
    );

    const newRecipe = new Recipe({
      recipeName: 'Salade de fruits',
      isVegan: true,
      isVegetarian: true,
      numberOfSpoon: 4,
      instructionPoints: [
        'Couper les pommes en morceaux.',
        'Éplucher et couper les bananes en rondelles.',
        'Peler les oranges et les séparer en quartiers.',
        'Ajouter le sucre.',
        'Mélanger tous les fruits dans un bol.'
      ],
      difficultyRate: 1,
      yummyRating: 5,
      bakingTime: 10,
      createdBy: 'Chef Anonyme',
      ingredients: [
        { ingredient: ingredient1._id, qty: 2 },
        { ingredient: ingredient2._id, qty: 3 },
        { ingredient: ingredient3._id, qty: 2 },
        { ingredient: ingredient4._id, qty: 3 }, 
        { ingredient: ingredient5._id, qty: 300 } 
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