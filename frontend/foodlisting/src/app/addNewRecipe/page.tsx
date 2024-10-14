'use client';


import { RootState, AppDispatch } from '../../store/store';
import { setIngredients, setError } from '../../store/slices/ingredientsSlice';
import { Ingredient } from '../../models/ingredient';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

export default function AddNewRecipePage() {
    const dispatch = useDispatch<AppDispatch>();
    const ingredients = useSelector((state: RootState) => state.ingredients.ingredients);
    
    useEffect(() => {
        async function fetchIngredients() {
            try {
                const res = await fetch('/api/ingredients');
                if (!res.ok) {
                    throw new Error('Failed to fetch ingredients');
                }
                const data: Ingredient[] = await res.json();
                dispatch(setIngredients(data));
            } catch (err) {
                if (err instanceof Error) {
                    dispatch(setError(err.message));
                } else {
                    dispatch(setError('An unknown error occurred'));
                }
            }
        }

        fetchIngredients();
    }, [dispatch]);

    console.log(ingredients);

    return (
        <div>
            <h1>Ajouter une nouvelle Recette</h1>
            <div>
                <ul>
                    {ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient.name} {ingredient.ingType} {ingredient.unityType}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
}