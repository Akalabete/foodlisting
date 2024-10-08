export interface Recipe {
    id: string;
    recipeName: string;
    isVegan: boolean;
    isVegetarian: boolean;
    numberOfSpoon: number;
    instructionPoints: string[];
    difficultyRate: number;
    yummyRating: number;
    bakingTime: number;
    createdBy: string;
    ingredients: {
      ingredient: {
        id: string;
        name: string;
        unityType: string;
        ingType: string;
      };
      qty: number;
    }[];
    createdAt: string;
    updatedAt: string;
  }
  
  export async function getAllRecipes(): Promise<Recipe[]> {
    const res = await fetch('http://localhost:3001/recipes');
    if (!res.ok) {
      throw new Error('Failed to fetch recipes');
    }
    const recipes = await res.json();
    return recipes;
  }