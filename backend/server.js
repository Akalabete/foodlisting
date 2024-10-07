const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./db/mongoose');
const findAllRecipes = require('./src/routes/findAllRecipes');
const addNewRecipe = require('./src/routes/addNewRecipe');
const findRecipeByPk = require('./src/routes/findRecipeByPk');
const deleteRecipe = require('./src/routes/deleteRecipe');
const updateRecipe = require('./src/routes/updateRecipe');

const app = express();

app.use(bodyParser.json());

connectDB();

app.use('/api', findAllRecipes);
app.use('/api', addNewRecipe);
app.use('/api', findRecipeByPk);
app.use('/api', deleteRecipe);
app.use('/api', updateRecipe);
app.get('/', (req, res) => {
  res.send('Hello World!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});