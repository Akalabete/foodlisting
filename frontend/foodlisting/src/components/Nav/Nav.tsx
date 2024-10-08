
import styles from './Nav.module.scss';
import Link from 'next/link';

export default function Nav() {
    return (

          <nav className={styles.nav}>
            <Link href="api/recipes">
                Item 1
            </Link>
            <Link href="api/recipes">
                Item 2
            </Link>
            <Link href="api/recipes">
                Item 3
            </Link>
        </nav>
    );
}