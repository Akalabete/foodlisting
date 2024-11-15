import React from "react";
import styles from './AddIngredient.module.scss';

const unityTypes = ['gramme(s)', 'unité(s)', 'petite cuillère', 'centilitre(s)', 'cuillère à soupe'];
const ingType = ['légume', 'fruit', 'oeuf', 'ingrédient végan', 'viande/poisson/lait d/origine animale'];
interface AddIngredientProps {

  onSuccess: () => Promise<void>;

  // other props

}

export default function AddIngredient( { onSuccess }: AddIngredientProps) {
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const name = (event.currentTarget.elements.namedItem('name') as HTMLInputElement).value;
      const unityType = (event.currentTarget.elements.namedItem('unitType') as HTMLSelectElement).value;
      const ingType = (event.currentTarget.elements.namedItem('ingType') as HTMLSelectElement).value;
      const ingredient = { name, unityType, ingType };

      const response = await fetch('http://localhost:3001/ingredients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(ingredient)
      });

      if (response.ok) {
        alert('Ingrédient ajouté avec succès');
        onSuccess();
      } else {
        const errorData = await response.json();
        alert(`Erreur: ${errorData.message}`);
      }
    } catch (error) {
      console.error('Une erreur est survenue:', error);
      alert('Une erreur est survenue. Veuillez réessayer.');
    }
  };

  return (
    <div>
      <h1 className={styles.title}>Ajouter un ingrédient à la liste</h1>
      <form className={styles.addIngredientForm} onSubmit={handleSubmit}>
        <div className={styles.formItem}>
          <label htmlFor="name">Nom de l&apos;ingrédient</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className={styles.formItem}>
          <label htmlFor="unitType">Unité de mesure</label>
          <select id="unitType" name="unitType" required>
            {unityTypes.map((unityType, index) => (
              <option key={index} value={unityType}>{unityType}</option>
            ))}
          </select>
        </div>
        <div className={styles.formItem}>
          <label htmlFor="ingType">Type d&apos;ingrédient</label>
          <select id="ingType" name="ingType" required>
            {ingType.map((ingType, index) => (
              <option key={index} value={ingType}>{ingType}</option>
            ))}
          </select>
        </div>
        <button type="submit">Ajouter</button>
      </form>
    </div>
  );
}