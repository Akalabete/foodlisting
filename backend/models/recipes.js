const mongoose = require('mongoose');
const { Schema } = mongoose;
const ingredientSchema = require('./ingredients');

const recipeSchema = new Schema({
  recipeName: { type: String, required: true },
  isVegan: { type: Boolean, default: false },
  isVegetarian: { type: Boolean, default: false },
  numberOfSpoon: { type: Number, required: true },
  instructionPoints: { type: [String], required: true },
  difficultyRate: { type: Number, min: 1, max: 5 },
  yummyRating: { type: Number, min: 1, max: 5 },
  bakingTime: { type: Number, required: true },
  createdBy: { type: String, default: 'Anonyme' },
  ingredients: [ingredientSchema]
}, {
  timestamps: true
});

const Recipe = mongoose.model('Recipe', recipeSchema);

module.exports = Recipe;