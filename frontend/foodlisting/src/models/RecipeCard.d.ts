export interface RecipeCardProps {
  recipeName: string;
  recipeDescription: string;
  numberOfSpoon: number;
  bakingTime: number;
  onClick: (id: string) => void;
  id: string;
}