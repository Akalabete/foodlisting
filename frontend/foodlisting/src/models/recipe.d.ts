export interface Recipe {
    _id: string;
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
