'use client';

import React, { useEffect, useState } from 'react';
import { Ingredient } from '../../models/ingredient';



export default function IngredientsList() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchIngredients = async () => {
      try {
        const response = await fetch('/api/ingredients'); // Assurez-vous que l'URL est correcte
        if (!response.ok) {
          throw new Error('Erreur lors de la récupération des ingrédients');
        }
        const data = await response.json();
        setIngredients(data);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchIngredients();
  }, []);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>Erreur: {error}</div>;
  }

  return (
    <div>
      <h1>Liste des Ingrédients</h1>
      <ul>
        {ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient.name} - {ingredient.unityType} - {ingredient.ingType}</li>
        ))}
      </ul>
      
    </div>
  );
}