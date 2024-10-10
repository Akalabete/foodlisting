'use client';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const formatTime = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours > 0) {
    return `${hours}H${remainingMinutes > 0 ? `${remainingMinutes}min` : ''}`;
  }
  return `${minutes}min`;
};

const RecipePage: React.FC = () => {
  const selectedRecipe = useSelector((state: RootState) => state.recipes.selectedRecipe);
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
    <div>
      <h1>{selectedRecipe.recipeName}</h1>
      <p>Recette pour: {spoonIcons}</p>
      <p>Niveau de régal: {starIcons}</p>
      <p>Temp de préparation: {formatTime(selectedRecipe.bakingTime)}</p>
      <p>Niveau de difficulté: {potIcons}</p>
      {selectedRecipe.ingredients.map((ingredient, index) => (
        <div key={index}>
          <ul>
            <li>{ingredient.ingredient.name}</li>
            <p>Quantité: {ingredient.qty} {ingredient.ingredient.unityType}</p>
          </ul>          
        </div>
      ))}
    </div>
  );
};

export default RecipePage;