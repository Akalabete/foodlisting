'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { Recipe } from '../../models/recipe.d';
import styles from './page.module.scss';


const formatTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours > 0) {
    return `${hours}H${remainingMinutes > 0 ? `${remainingMinutes}min` : ''}`;
  }
  return `${minutes}min`;
};

const RecipePage: React.FC = () => {
  const selectedRecipe = useSelector((state: RootState) => state.recipes.selectedRecipe) as Recipe;
  console.log(selectedRecipe);
  if (!selectedRecipe) {
    return <div>No recipe selected</div>;
  }
  const spoonIcons = [];
  for (let i = 0; i < selectedRecipe.numberOfSpoon; i++) {
    spoonIcons.push(<span key={i} role="img" aria-label="spoon">🥄</span>);
  }
  const starIcons = [];
  for (let i = 0; i < selectedRecipe.yummyRating; i++) {
    starIcons.push(<span key={i} role="img" aria-label="star">⭐</span>);
  }
  const potIcons = [];
  for (let i = 0; i < selectedRecipe.difficultyRate; i++) {
    potIcons.push(<span key={i} role="img" aria-label="pot">🍲</span>);
  }
  
  return (
    <div className={styles.recipeWrapper}>
      <h1>{selectedRecipe.recipeName}</h1>
      <div className={styles.recipeWrapper__information}>
        <div>
          <p>Recette pour: {spoonIcons}</p>
          <p>Niveau de régal: {starIcons}</p>
        </div>
        <div>
          <p>Temp de préparation: {formatTime(selectedRecipe.bakingTime)}</p>
          <p>Niveau de difficulté: {potIcons}</p>
        </div>
      </div>
      <p>{selectedRecipe.recipeDescription}</p>
      <div className={styles.recipeWrapper__lists}>
        <div className={styles.recipeWrapper__lists__ingredients}>
          <h2>Liste des ingrédients:</h2>
          <div className={styles.listContainer}>
            {selectedRecipe.ingredients.map((ingredient, index) => (
              <div key={index}>
                <ul>
                  <li>{ingredient.ingredient.name}</li>
                  <p>Quantité: {ingredient.qty} {ingredient.ingredient.unityType}</p>
                </ul>          
              </div>
            ))}
          </div>
          
        </div>

        <div className={styles.recipeWrapper__lists__instructions}>
          <h2>Instructions:</h2>
          <div className={styles.listContainer}>
            <ol>
              {selectedRecipe.instructionPoints.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipePage;