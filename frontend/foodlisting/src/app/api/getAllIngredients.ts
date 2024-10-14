import { Ingredient } from '../../models/ingredient';
  export async function getAllIngredients(): Promise<Ingredient[]> {
    const res = await fetch('http://localhost:3001/ingredients');
    if (!res.ok) {
      throw new Error('Failed to fetch recipes');
    }
    const ingredients = await res.json();
    return ingredients;
  }