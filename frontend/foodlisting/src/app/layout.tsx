import type { Metadata } from "next";
import "./page.module.scss";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import Menu from "../components/Menu/Menu";


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
    <html lang="fr">
      <body>
      <Header title="Welcome to Food Listing" subtitle="Your weekly menu planner" />
        <Menu />
        {children}
        <Footer />
      </body>
    </html>
  );
}
