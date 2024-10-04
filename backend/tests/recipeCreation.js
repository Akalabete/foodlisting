const { Recipe, Ingredient, authenticateDB, syncDB } = require('../db/sequelize');


authenticateDB();

syncDB();

const createRecipeWithIngredients = async () => {
  try {
    const newRecipe = await Recipe.create({
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
      bakingTime: 0,
      createdBy: 'Chef Anonyme'
    });

    const ingredients = [
      { name: 'Pommes', qty: 2, unityType: 'unité(s)', ingType: 'fruits', recipeId: newRecipe.recipeId },
      { name: 'Bananes', qty: 3, unityType: 'unité(s)', ingType: 'fruits', recipeId: newRecipe.recipeId },
      { name: 'Oranges', qty: 2, unityType: 'unité(s)', ingType: 'fruits', recipeId: newRecipe.recipeId }
    ];

    await Ingredient.bulkCreate(ingredients);

    console.log('Recipe and ingredients created successfully');
  } catch (err) {
    console.error('Error creating recipe and ingredients:', err);
  }
};

createRecipeWithIngredients();