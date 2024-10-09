import React from 'react';
import styles from './RecipeCard.module.scss';
import { RecipeCardProps } from './RecipeCard.d';

const RecipeCard: React.FC<RecipeCardProps> = ({ recipeName, numberOfSpoon, bakingTime, onClick, id }) => {
  const handleClick = () => {
    console.log(`RecipeCard ID: ${id}`);
    onClick(id);
  };

  return (
    <div className={styles.card} onClick={handleClick}>
      <div className={styles.content}>
        <h2>{recipeName}</h2>
        <p>{numberOfSpoon}</p>
        <p>{bakingTime}</p>
      </div>
    </div>
  );
};

export default RecipeCard;