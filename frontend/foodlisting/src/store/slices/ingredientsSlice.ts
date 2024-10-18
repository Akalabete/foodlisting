import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ingredient } from '../../models/ingredient';

interface IngredientsState {
  ingredients: Ingredient[];
  error: string | null;
}

const initialState: IngredientsState = {
  ingredients: [],
  error: null,
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {
    setIngredients(state, action: PayloadAction<Ingredient[]>) {
      state.ingredients = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
  },
});

export const { setIngredients, setError } = ingredientsSlice.actions;
export default ingredientsSlice.reducer;