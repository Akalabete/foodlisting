import { Recipe } from '../../models/recipe';
  export async function getAllRecipes(): Promise<Recipe[]> {
    const res = await fetch('http://localhost:3001/recipes');
    if (!res.ok) {
      throw new Error('Failed to fetch recipes');
    }
    const recipes = await res.json();
    return recipes;
  }