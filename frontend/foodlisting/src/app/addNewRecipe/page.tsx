'use client';


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
        <div>
            <h1>Ajouter une nouvelle Recette</h1>
            <div>
                <label htmlFor="name">Nom de la recette</label>
                <input type="text" id="name" name="name" />
                <label htmlFor="description">Description</label>
                <textarea id="description" name="description" />
                <label htmlFor="preparationTime">Temps de préparation</label>
                <input type="number" id="preparationTime" name="preparationTime" />
                <label htmlFor="numberOfSpoon">Pour combien de personnes</label>
                <input type="number" id="numberOfSpoon" name="numberOfSpoon" />
                <label htmlFor="difficulty">Difficulté</label>
                <select id="difficulty" name="difficulty">
                    <option value="1">Facile</option>
                    <option value="2">Moyen</option>
                    <option value="3">Difficile</option>
                    <option value="4">Très difficile</option>
                    <option value="5">Expert</option>
                </select>
                <label htmlFor="yummyRating">Niveau de régal:</label>
                <select id="yummyRating" name="yummyRating">
                    <option value="1">Pas bon</option>
                    <option value="2">Moyen</option>
                    <option value="3">Bon</option>
                    <option value="4">Très bon</option>
                    <option value="5">Excellent</option>
                </select>
                <div>
                    <h2>Ingrédients</h2>
                    <label htmlFor="ingredients">Ingrédients</label>
                    <select id="ingredients" name="ingredients">
                        {ingredients.map((ingredient, index) => (
                            <option key={index} value={ingredient._id}>{ingredient.name}, {ingredient.ingType}, {ingredient.unityType}</option>
                        ))}
                    </select>
                    <label htmlFor="quantity">Quantité</label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                    />
                    <button type="button" onClick={addIngredient}>Ajouter Ingrédient</button>
                    <button type="button" onClick={() => alert('Ouvrir la modale pour ajouter un nouvel ingrédient')}>Ajouter un nouvel ingrédient à la liste</button>
                </div>
                <div id="ingredientsContainer">
                    {selectedIngredients.map((selectedIngredient, index) => (
                        <div key={index}>
                            <p>{selectedIngredient.ingredient.name}, {selectedIngredient.qty} {selectedIngredient.ingredient.unityType}</p>
                        </div>
                    ))}
                </div>
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
                <button>Ajouter la recette</button>
            </div>
        </div>
    );
}
