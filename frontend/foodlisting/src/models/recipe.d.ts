import { Ingredient } from "./ingredient.d";
export interface Recipe {
  _id: string;
  recipeName: string;
  recipeDescription: string;
  isVegan: boolean;
  isVegetarian: boolean;
  numberOfSpoon: number;
  instructionPoints: string[];
  difficultyRate: number;
  yummyRating: number;
  bakingTime: number;
  createdBy: string;
  ingredients: { ingredient: Ingredient; qty: number }[];
}