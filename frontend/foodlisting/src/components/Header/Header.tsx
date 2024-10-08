import Image from 'next/image';
import React from 'react';
import Nav from '../Nav/Nav';
import styles from './Header.module.scss';
import { HeaderProps } from './Header.d';

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <header className={styles.headerLayout}>
      <div className={styles.logoWrapper}>
        <Image 
          className={styles.img}
          src="/images/logoFoodlisting.webp"
          width={250}
          height={250}
          alt="logo de l'application représentant une fourchette et un couteau croisés sur un calendrier"
        />
      </div>
      <div className={styles.titleWrapper}>
        <h1>{title}</h1>
        {subtitle && <h2>{subtitle}</h2>}
      </div>
      <Nav />
    </header>
  );
};

export default Header;