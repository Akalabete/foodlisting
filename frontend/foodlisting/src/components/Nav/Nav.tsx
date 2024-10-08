
import styles from './Nav.module.scss';
import Link from 'next/link';

export default function Nav() {
    return (

          <nav className={styles.nav}>
            <Link href="/recipes">
                Item 1
            </Link>
            <Link href="/recipes">
                Item 2
            </Link>
            <Link href="/recipes">
                Item 3
            </Link>
        </nav>
    );
}