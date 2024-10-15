'use client';

import  styles from './page.module.scss';
import { RootState, AppDispatch } from '../../store/store';
import { setIngredients, setError } from '../../store/slices/ingredientsSlice';
import { Ingredient } from '../../models/ingredient';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
interface SelectedIngredient {
    ingredient: Ingredient;
    qty: number;
  }
  
export default function AddNewRecipePage() {
    const dispatch = useDispatch<AppDispatch>();
    const ingredients = useSelector((state: RootState) => state.ingredients.ingredients);
    const [selectedIngredients, setSelectedIngredients] = useState<SelectedIngredient[]>([]);
    const [quantity, setQuantity] = useState<number>(0);
    const [instructions, setInstructions] = useState<string[]>([]);
    const [newInstruction, setNewInstruction] = useState<string>('');
  
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

    const addIngredient = () => {
        const selectedIngredientId = (document.getElementById('ingredients') as HTMLSelectElement).value;
        const selectedIngredient = ingredients.find(ingredient => ingredient._id === selectedIngredientId);
        if (selectedIngredient && quantity > 0) {
            setSelectedIngredients([...selectedIngredients, { ingredient: selectedIngredient, qty: quantity }]);
        }
    };
    const addInstruction = () => {
    if (newInstruction.trim() !== '') {
        setInstructions([...instructions, newInstruction]);
        setNewInstruction('');
    }
    };
    return (
        <div className={styles.newRecipeContainer}>
            <h1>Ajouter une nouvelle Recette</h1>
            <h2>Informations générales</h2>
            <div className={styles.newRecipeContainer__informations}>
                <div className={styles.newRecipeContainer__informations__shorts}>
                    <div className={styles.newRecipeContainer__informations__shorts__item}>
                        <label htmlFor="name">Nom de la recette : </label>
                        <input type="text" id="name"  name="name" />
                    </div>
                    <div className={styles.newRecipeContainer__informations__shorts__item}>
                        <label htmlFor="preparationTime">Temps de préparation en min : </label>
                        <input type="number" className={styles.short} id="preparationTime" name="preparationTime" />
                    </div>
                    <div className={styles.newRecipeContainer__informations__shorts__item}>
                        <label htmlFor="numberOfSpoon">Pour combien de personnes : </label>
                        <input type="number" className={styles.short} id="numberOfSpoon" name="numberOfSpoon" />
                    </div>
                    <div className={styles.newRecipeContainer__informations__shorts__item}>
                        <label htmlFor="difficulty">Difficulté : </label>
                        <select id="difficulty" name="difficulty">
                            <option value="1">Facile</option>
                            <option value="2">Moyen</option>
                            <option value="3">Difficile</option>
                            <option value="4">Très difficile</option>
                            <option value="5">Expert</option>
                        </select>
                    </div>
                    <div className={styles.newRecipeContainer__informations__shorts__item}>
                        <label htmlFor="yummyRating">Niveau de régal : </label>
                        <select id="yummyRating" name="yummyRating">
                            <option value="1">Pas bon</option>
                            <option value="2">Moyen</option>
                            <option value="3">Bon</option>
                            <option value="4">Très bon</option>
                            <option value="5">Excellent</option>
                        </select>
                    </div>
                </div>
                <div className={styles.newRecipeContainer__informations__long}>
                    <label htmlFor="description">Description : </label>
                    <textarea id="description" name="description" />
                </div>
            </div>
            <h2>Ingrédients</h2>
            <div className={styles.newRecipeContainer__ingredients}>
                <div className={styles.newRecipeContainer__ingredients__picker}>
                    <div className={styles.newRecipeContainer__ingredients__pickers__item}>
                        <label htmlFor="ingredients">Ingrédients</label>
                        <select id="ingredients" name="ingredients">
                            {ingredients.map((ingredient, index) => (
                                <option key={index} value={ingredient._id}>{ingredient.name}, {ingredient.ingType}, {ingredient.unityType}</option>
                            ))}
                        </select>
                    </div>
                    <div className={styles.newRecipeContainer__ingredients__pickers__item}>
                    <label htmlFor="quantity">Quantité</label>
                        <input
                            className={styles.short}
                            type="number"
                            id="quantity"
                            name="quantity"
                            value={quantity}
                            onChange={(e) => setQuantity(Number(e.target.value))}
                        />
                    </div>
                    <button type="button" onClick={addIngredient}>Ajouter Ingrédient</button>   
                </div>
                <div id="ingredientsContainer">
                    {selectedIngredients.map((selectedIngredient, index) => (
                        <div key={index}>
                            <p>{selectedIngredient.ingredient.name}, {selectedIngredient.qty} {selectedIngredient.ingredient.unityType}</p>
                        </div>
                    ))}
                    <button type="button" onClick={() => alert('Ouvrir la modale pour ajouter un nouvel ingrédient')}>Ajouter un nouvel ingrédient à la liste</button>
                </div>
            </div>
            <div>
                <h2>Instructions</h2> 
                <div>
                    <label htmlFor="instruction">Instruction</label>
                    <input
                        type="text"
                        id="instruction"
                        name="instruction"
                        value={newInstruction}
                        onChange={(e) => setNewInstruction(e.target.value)}
                    />
                    <button type="button" onClick={addInstruction}>Ajouter Instruction</button>
                </div>
                <div id="instructionsContainer">
                    {instructions.map((instruction, index) => (
                        <div key={index}>
                            <p>{instruction}</p>
                        </div>
                    ))}
                </div>
            </div>
            <button>Ajouter la recette</button>
        </div>
    );
}
