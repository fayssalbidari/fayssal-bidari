import React from "react";
import Link from "next/link";
import "./MenuBar.css";
import MenuBtn from "../MenuBtn/MenuBtn";

const MenuBar = ({ isOpen, toggleMenu, closeMenu }) => {
  return (
    <div className="menu-bar">
      
      <div className="portfolio-year">
        <p>&copy; 2025</p>
      </div>

      <div className="logo" onClick={closeMenu}>
        <Link href="/">Fayssal Bidari</Link>
      </div>

      <div className="menu-toggle-wrapper">
        <MenuBtn isOpen={isOpen} toggleMenu={toggleMenu} />
      </div>
    </div>
  );
};

export default MenuBar;
