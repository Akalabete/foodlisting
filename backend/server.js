const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db/mongoose');
const findAllRecipes = require('./src/routes/findAllRecipes');
const addNewRecipe = require('./src/routes/addNewRecipe');
const findRecipeByPk = require('./src/routes/findRecipeByPk');
const deleteRecipe = require('./src/routes/deleteRecipe');
const updateRecipe = require('./src/routes/updateRecipe');
const getAllIngredients = require('./src/routes/getAllIngredients');


const app = express();

app.use(bodyParser.json());

connectDB();

app.use('/', findAllRecipes);
app.use('/', addNewRecipe);
app.use('/', findRecipeByPk);
app.use('/', deleteRecipe);
app.use('/', updateRecipe);
app.use('/', getAllIngredients);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});