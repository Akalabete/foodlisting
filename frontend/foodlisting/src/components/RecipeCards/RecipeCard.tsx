import React from 'react';
import styles from './RecipeCard.module.scss';
import Link from 'next/link';
import { RecipeCardProps } from './RecipeCard.d';

const RecipeCard: React.FC<RecipeCardProps> = ({ title, numberOfSpoon, bakingTime }) => {
  return (
    <div className={styles.card}>
      
      <div className={styles.content}>
        <Link href="/recipes:{id}">
            <h2>{title}</h2>
        </Link>
        <p>{numberOfSpoon}</p>
        <p>{bakingTime}</p>
      </div>
    </div>
  );
};

export default RecipeCard;