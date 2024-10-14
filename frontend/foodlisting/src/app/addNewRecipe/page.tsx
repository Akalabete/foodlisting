

import React from 'react'

export default function recipeCreation() {
  return (
    <div>
        <h1>Ajouter une nouvelle Recette</h1>
        <div>
            <form>
                <div>
                    <label htmlFor="recipeName">Nom de la recette</label>
                    <input type="text" id="recipeName" name="recipeName" />
                </div>
                <div>
                    <label htmlFor="numberOfSpoon">Recette pour combien de personnes:</label>
                    <input type="number" id="numberOfSpoon" name="numberOfSpoon" />
                </div>
                <div>
                    <label htmlFor="yummyRating">Niveau de régal</label>
                    <input type="number" id="yummyRating" name="yummyRating" />
                </div>
                <div>
                    <label htmlFor="bakingTime">Temps de préparation</label>
                    <input type="time" id="bakingTime" name="bakingTime" />
                </div>
                <div>
                    <label htmlFor="difficultyRate">Niveau de difficulté</label>
                    <input type="number" id="difficultyRate" name="difficultyRate" />
                </div>
                <div>
                    <label htmlFor="ingredients">Ingrédients</label>
                    <input type="text" id="ingredients" name="ingredients" />
                </div>
                <div>
                    <label htmlFor="instructions">Instructions</label>
                    <input type="text" id="instructions" name="instructions" />
                </div>
                <button type="submit">Ajouter</button>
            </form>
        </div>
    </div>
  )
}
