'use client';
import { useCallback } from 'react';
import styles from './page.module.scss';
import { RootState, AppDispatch } from '../../store/store';
import { setIngredients, setError } from '../../store/slices/ingredientsSlice';
import { Ingredient } from '../../models/ingredient';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { openModal, closeModal } from '../../store/slices/modalSlice';
import Modal from '../../components/Modal/Modal';
import AddIngredient from '../../components/AddIngredient/AddIngredient';

interface SelectedIngredient {
  ingredient: Ingredient;
  qty: number;
}

export default function AddNewRecipePage() {
  const dispatch = useDispatch<AppDispatch>();
  const ingredients = useSelector((state: RootState) => state.ingredients.ingredients);
  const modal = useSelector((state: RootState) => state.modal);
  const [selectedIngredients, setSelectedIngredients] = useState<SelectedIngredient[]>([]);
  const [quantity, setQuantity] = useState<number>(0);
  const [instructions, setInstructions] = useState<string[]>([]);
  const [newInstruction, setNewInstruction] = useState<string>('');

  const fetchIngredients = useCallback(async () => {
    try {
      const res = await fetch('http://localhost:3001/ingredients');
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
  }, [dispatch]);
  // fetch ingredients when the page is loaded  
  useEffect(() => {
    fetchIngredients();
  }, [fetchIngredients]);
  // load selected ingredients from local storage when the page is loaded
  useEffect(() => {
    const savedSelectedIngredients = localStorage.getItem('selectedIngredients');
    if (savedSelectedIngredients) {
      setSelectedIngredients(JSON.parse(savedSelectedIngredients));
    }
  }, []);
  // save selected ingredients to local storage when the selected ingredients change
  const addIngredient = () => {
    const selectedIngredientId = (document.getElementById('ingredients') as HTMLSelectElement).value;
    const selectedIngredient = ingredients.find(ingredient => ingredient._id === selectedIngredientId);
    if (selectedIngredient && quantity > 0) {
      const newSelectedIngredients = [...selectedIngredients, { ingredient: selectedIngredient, qty: quantity }];
      setSelectedIngredients(newSelectedIngredients);
      localStorage.setItem('selectedIngredients', JSON.stringify(newSelectedIngredients));
    }
  };
  // add instruction to the list of instructions
  const addInstruction = () => {
    if (newInstruction.trim() !== '') {
      setInstructions([...instructions, newInstruction]);
      setNewInstruction('');
    }
  };
  // remove ingredient from the list of selected ingredients
  const removeIngredient = (id: string) => {
    const newSelectedIngredients = selectedIngredients.filter(item => item.ingredient._id !== id);
    setSelectedIngredients(newSelectedIngredients);
    localStorage.setItem('selectedIngredients', JSON.stringify(newSelectedIngredients));
  };

    const removeInstruction = (index: number) => {
      setInstructions(instructions.filter((_, i) => i !== index));
    };
  // add new recipe
  const addNewRecipe = async () => {
    const recipeName = (document.getElementById('name') as HTMLInputElement).value;
    const bakingTime = Number((document.getElementById('preparationTime') as HTMLInputElement).value);
    const numberOfSpoon = Number((document.getElementById('numberOfSpoon') as HTMLInputElement).value);
    const difficultyRate = Number((document.getElementById('difficulty') as HTMLSelectElement).value);
    const yummyRating = Number((document.getElementById('yummyRating') as HTMLSelectElement).value);
    const recipeDescription = (document.getElementById('description') as HTMLTextAreaElement).value;
    const ingredients = selectedIngredients.map(selectedIngredient => ({
      ingredient: selectedIngredient.ingredient._id,
      qty: selectedIngredient.qty
    }));
    const instructionPoints = instructions;
    const newRecipe = {
      recipeName,
      recipeDescription,
      bakingTime,
      numberOfSpoon,
      difficultyRate,
      yummyRating,
      ingredients,
      instructionPoints
    };
    try {
      console.log('Adding new recipe:', newRecipe);
      const response = await fetch('http://localhost:3001/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(newRecipe)
      });

      if (!response.ok) {
        throw new Error('Failed to add new recipe');
      }
      const result = await response.json();
      console.log('Recipe added successfully:', result);
      alert('Recipe added successfully');
      window.location.reload();
    } catch (error) {
      console.error('Error adding new recipe:', error);
    }
  };
  // open modal to add new ingredient
  const openModalIngredient = () => {
    dispatch(openModal('ADD_NEW_INGREDIENT'));
  };
  // close modal
  const handleCloseModal = () => {
    dispatch(closeModal());
  };
        
    return (
        <div className={styles.newRecipeContainer}>
            {modal.isOpen && (
                <Modal isOpen={modal.isOpen} onClose={handleCloseModal}>
                {modal.modalType === 'ADD_NEW_INGREDIENT' && <AddIngredient onSuccess={fetchIngredients}/>}
                </Modal>
            )}
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
                <div className={styles.newRecipeContainer__ingredients__pickers}>
                    <div className={styles.newRecipeContainer__ingredients__pickers__item}>
                        <label htmlFor="ingredients">Ingrédients</label>
                        <select id="ingredients" name="ingredients">
                            {ingredients.map(ingredient => (
                                <option key={ingredient._id} value={ingredient._id}>{ingredient.name}, {ingredient.ingType}, {ingredient.unityType}</option>
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
                    
                </div>
                <div id="ingredientsContainer" className={styles.subContainer}>
                <button type="button" onClick={openModalIngredient}>Ajouter un nouvel ingrédient à la liste</button>
                    {[...selectedIngredients].reverse().map((selectedIngredient) => (
                        <div className={styles.subContainerItem} key={selectedIngredient.ingredient._id}>
                            <p>{selectedIngredient.ingredient.name}, {selectedIngredient.qty} {selectedIngredient.ingredient.unityType}</p>
                            <button type="button" onClick={() => removeIngredient(selectedIngredient.ingredient._id)}>X</button>
                        </div>
                    ))}
                </div>
            </div>
            <h2>Instructions</h2> 
            <div className={styles.newRecipeContainer__instructions}>
                <div className={styles.newRecipeContainer__instructions__pickers}>
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
                <div id="instructionsContainer" className={styles.subContainer}>
                    <p>Dans l&apos;ordre : </p>
                    <ol>
                        {instructions.map((instruction, index) => (
                            <li className={styles.subContainerItem} key={index}>
                                <p>{instruction}</p>
                                <span>
                                    <button type="button" onClick={() => removeInstruction(index)}>X</button>
                                </span>
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
            <button onClick={addNewRecipe}>Ajouter la recette</button>
        </div>
    );
}

