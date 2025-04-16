import localFont from "next/font/local";
import "./globals.css";

import Menu from "./components/Menu/Menu";

export const metadata = {
  title: "Fayssal Bidari | Portfolio",
  description: "Welcome to my new Portfolio",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Menu />
        {children}
      </body>
    </html>
  );
}
