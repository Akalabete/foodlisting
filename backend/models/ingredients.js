const mongoose = require('mongoose');
const { Schema } = mongoose;

const ingredientSchema = new Schema({
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  unityType: { type: String, enum: ['gramme(s)', 'unité(s)', 'petite cuillère', 'centilitre(s)', 'grosse cuillère'], required: true },
  ingType: { type: String, enum: ['légume', 'fruit', 'oeuf', 'ingrédient végan', 'viande/poisson/lait d/origine animale'], required: true }
});

module.exports = ingredientSchema;