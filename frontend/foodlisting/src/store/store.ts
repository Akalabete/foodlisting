import { configureStore } from '@reduxjs/toolkit';
import recipesReducer from './slices/recipesSlice';
import ingredientsReducer from './slices/ingredientsSlice';
import modalReducer from './slices/modalSlice';

export const store = configureStore({
  reducer: {
    recipes: recipesReducer,
    ingredients: ingredientsReducer,
    modal: modalReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
