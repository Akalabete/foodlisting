import { configureStore } from '@reduxjs/toolkit';
import recipesReducer from './slices/recipesSlice';
import ingredientsReducer from './slices/ingredientsSlice';

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    ingredients: ingredientsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
