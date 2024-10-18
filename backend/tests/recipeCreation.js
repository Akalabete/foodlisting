const mongoose = require('mongoose');
const connectToDatabase = require('../db/mongoose');
const Recipe = require('../models/recipe');
const Ingredient = require('../models/ingredient');

const createRecipeWithIngredients = async () => {
  try {
    await connectToDatabase(); 

    console.log('Connected to database');

    const ingredient1 = await Ingredient.findOneAndUpdate(
      { name: 'Pommes', unityType: 'unité(s)' },
      { name: 'Pommes', unityType: 'unité(s)', ingType: 'fruit' },
      { upsert: true, new: true }
    );
    console.log('Ingredient 1 created/updated:', ingredient1);

    const ingredient2 = await Ingredient.findOneAndUpdate(
      { name: 'Bananes', unityType: 'unité(s)' },
      { name: 'Bananes', unityType: 'unité(s)', ingType: 'fruit' },
      { upsert: true, new: true }
    );
    console.log('Ingredient 2 created/updated:', ingredient2);

    const ingredient3 = await Ingredient.findOneAndUpdate(
      { name: 'Oranges', unityType: 'unité(s)' },
      { name: 'Oranges', unityType: 'unité(s)', ingType: 'fruit' },
      { upsert: true, new: true }
    );
    console.log('Ingredient 3 created/updated:', ingredient3);

    const ingredient4 = await Ingredient.findOneAndUpdate(
      { name: 'Sucre', unityType: 'cuillère à soupe' },
      { name: 'Sucre', unityType: 'cuillère à soupe', ingType: 'ingrédient végan' },
      { upsert: true, new: true }
    );
    console.log('Ingredient 4 created/updated:', ingredient4);

    const ingredient5 = await Ingredient.findOneAndUpdate(
      { name: 'Miel', unityType: 'cuillère à soupe' },
      { name: 'Miel', unityType: 'cuillère à soupe', ingType: 'ingrédient végan' },
      { upsert: true, new: true }
    );
    console.log('Ingredient 5 created/updated:', ingredient5);

    const recipe = new Recipe({
      recipeName: 'Salade de fruits',
      recipeDescription: 'Une salade de fruit frais maison',
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
        { ingredient: ingredient4._id, qty: 1 },
        { ingredient: ingredient5._id, qty: 1 }
      ]
    });

    await recipe.save();
    console.log('Recipe created successfully:', recipe);
    mongoose.disconnect();
  } catch (error) {
    console.error('Error creating recipe', error);
    mongoose.disconnect();
  }
};

createRecipeWithIngredients();