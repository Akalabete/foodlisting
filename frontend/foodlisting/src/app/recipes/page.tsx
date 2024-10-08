'use client';
import React, { useEffect, useState } from 'react';
import RecipeCard from '../../components/RecipeCards/RecipeCard';
import { Recipe } from '../api/getAllRecipe';

const RecipesPage: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchRecipes() {
      try {
        const res = await fetch('api/recipes');
        if (!res.ok) {
          throw new Error('Failed to fetch recipes');
        }
        const data = await res.json();
        setRecipes(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      }
    }

    fetchRecipes();
  }, []);

  if (error) {
    return <div>Errorxxx: {error}</div>;
  }

  return (
    <div>
      <h1>Liste des Recettes</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {recipes.map((recipe) => (
            <RecipeCard
                key={recipe.id}
                title={recipe.recipeName}
                numberOfSpoon={recipe.numberOfSpoon}
                bakingTime={recipe.bakingTime}
                id={recipe.id}
            />
        ))}
      </div>
    </div>
  );
};

export default RecipesPage;