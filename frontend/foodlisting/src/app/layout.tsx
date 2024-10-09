import type { Metadata } from "next";
import "./page.module.scss";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Menu from "../components/Menu/Menu";
import styles from "./page.module.scss";

export const metadata: Metadata = {
  title: "Food Listing",
  description: "De la plannification à la liste de courses de vos menus hebdomadaires",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={styles.body} lang="fr">
      <body className={styles.body}>
      <Header title="Welcome to Food Listing" subtitle="Your weekly menu planner" />
        <div className={styles.appLayout}>
          <div className={styles.menuWindow}>
            <Menu />
          </div>
          <div className={styles.mainContent}>
            {children}
          </div>
        </div>
        <Footer />
      </body>
    </html>
  );
}
