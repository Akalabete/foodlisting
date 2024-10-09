'use client';
import styles from "./page.module.scss";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../store/store';
import { Recipe } from '../../models/recipe';
import { setSelectedRecipe } from '../../store/slices/recipesSlice';

const RecipeTemplate: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const selectedRecipe = useSelector((state: RootState) => state.recipes.selectedRecipe);
    useEffect(() => {
        if (!selectedRecipe) {
          const emptyRecipe: Recipe = {
            _id: '',
            recipeName: '',
            isVegan: false,
            isVegetarian: false,
            numberOfSpoon: 0,
            instructionPoints: [],
            difficultyRate: 0,
            yummyRating: 0,
            bakingTime: 0,
            createdBy: '',
            ingredients: [],
            createdAt: '',
            updatedAt: '',
          };
          dispatch(setSelectedRecipe(emptyRecipe));
        }
      }, [dispatch, selectedRecipe]);
    
      const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (selectedRecipe) {
          const { name, value } = e.target;
          dispatch(setSelectedRecipe({ ...selectedRecipe, [name]: value }));
        }
      };
    
      return (
        <div className={styles.recipeTemplate}>
          <h1>{selectedRecipe ? 'Modifier la Recette' : 'Nouvelle Recette'}</h1>
          <form>
            <label>
              Nom de la recette:
              <input
                type="text"
                name="recipeName"
                value={selectedRecipe?.recipeName || ''}
                onChange={handleInputChange}
              />
            </label>
            {/* Ajoutez d'autres champs de formulaire ici */}
            <button type="submit">{selectedRecipe?._id ? 'Modifier' : 'Ajouter'}</button>
          </form>
        </div>
      );
    };
export default RecipeTemplate;