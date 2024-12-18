'use client';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RecipeCard from '../../components/RecipeCards/RecipeCard';
import { RootState, AppDispatch } from '../../store/store';
import { setRecipes, setSelectedRecipe, setError } from '../../store/slices/recipesSlice';
import type { Recipe } from '../../models/recipe.d';
import styles from './page.module.scss';
import { useRouter } from 'next/navigation';
const RecipesPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const recipes = useSelector((state: RootState) => state.recipes.recipes);
  const error = useSelector((state: RootState) => state.recipes.error);
  const router = useRouter();
  console.log('Recipes from store:', recipes); // Vérifiez que les données sont mises à jour

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const res = await fetch('http://localhost:3001/recipes');
        if (!res.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data: Recipe[] = await res.json();
        console.log('Fetched data:', data);
        dispatch(setRecipes(data));
      } catch (err) {
        if (err instanceof Error) {
          dispatch(setError(err.message));
        } else {
          dispatch(setError('An unknown error occurred'));
        }
      }
    }

    fetchRecipes();
  }, [dispatch]);

  const handleSelectRecipe = (id: string) => {
    const selectedRecipe = recipes.find(recipe => recipe._id === id);
    if (selectedRecipe) {
      dispatch(setSelectedRecipe(selectedRecipe));
      router.push(`/recipe`);
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.mainWindow}>
      <h1>Liste des Recettes</h1>
      <div className={styles.searchWrapper}>
        <label htmlFor="search-recipe">Rechercher une recette</label>
        <div className={styles.searchBar}>
          <input 
            type="search"
            id="search-recipe" 
            placeholder="Ce qui vous tente"
          />
          <button>Rechercher</button>
        </div>
      </div>
      <div className={styles.recipesWrapper}>
        {recipes.map((recipe) => {
          console.log(`Creating RecipeCard with ID: ${recipe._id}`); // Vérifiez que l'ID est bien passé
          return (
            <RecipeCard
              key={recipe._id}
              recipeName={recipe.recipeName}
              recipeDescription={recipe.recipeDescription}
              numberOfSpoon={recipe.numberOfSpoon}
              bakingTime={recipe.bakingTime}
              id={recipe._id}
              onClick={handleSelectRecipe}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RecipesPage;