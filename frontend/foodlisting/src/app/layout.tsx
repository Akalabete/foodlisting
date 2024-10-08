import type { Metadata } from "next";
import "./globals.css";



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
    <html lang="en">
      <body
        className={` antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
