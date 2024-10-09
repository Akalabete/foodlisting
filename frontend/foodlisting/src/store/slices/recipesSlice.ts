import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Recipe } from '../../models/recipe.d';

interface RecipesState {
  recipes: Recipe[];
  selectedRecipe: Recipe | null;
  error: string | null;
}

const initialState: RecipesState = {
  recipes: [],
  selectedRecipe: null,
  error: null,
};

const recipesSlice = createSlice({
  name: 'recipes',
  initialState,
  reducers: {
    setRecipes(state, action: PayloadAction<Recipe[]>) {
      state.recipes = action.payload;
    },
    setSelectedRecipe(state, action: PayloadAction<Recipe | null>) {
      state.selectedRecipe = action.payload;
    },
    setError(state, action: PayloadAction<string | null>) {
      state.error = action.payload;
    },
  },
});

export const { setRecipes, setSelectedRecipe, setError } = recipesSlice.actions;
export default recipesSlice.reducer;