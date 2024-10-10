import React from 'react';
import styles from './RecipeCard.module.scss';
import { RecipeCardProps } from '../../models/RecipeCard';

const RecipeCard: React.FC<RecipeCardProps> = ({ recipeName, numberOfSpoon, bakingTime, onClick, id }) => {
  const handleClick = () => {
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