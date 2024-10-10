import { Recipe } from '../../models/recipe.d';

export async function getRecipeById(id: string): Promise<Recipe | null> {
  const res = await fetch(`http://localhost:3001/api/recipes/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch recipe');
  }
  const recipe = await res.json();
  return recipe;
}