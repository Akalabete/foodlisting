export interface RecipeCardProps {
  recipeName: string;
  numberOfSpoon: number;
  bakingTime: number;
  onClick: (id: string) => void;
  id: string;
}