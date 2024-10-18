import React from "react";
import Link from 'next/link';
import styles from "./Menu.module.scss";


export default function Menu() {
    return (
        <div className={styles.menuWrapper}>
            <h1>Bonjour</h1>
            <p>que faisons nous aujourd&apos;hui</p>
            <Link href="/addNewRecipe">
                <button>Ajouter une recette</button>
            </Link>
            <button>Prévoir des menus</button>
            <button>Consulter des menus</button>
            <button>Voir ma liste de courses</button>
            <button>Ma famille</button>
        </div>
    );
}