"use client";
import React, { useState } from "react";

type HamburgerMenuProps = {
  links: { label: string; href: string }[]; 
};

const HamburgerMenu: React.FC<HamburgerMenuProps> = ({ links }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div>
      {/* Hamburger Button (Visible on top) */}
      <div className="fixed top-2 left-2 z-50 bg-white rounded-full p-2 max-h-[40px]">
        <button
          onClick={toggleMenu}
          className="text-gray-800 rounded-md mt-[2px]"
          aria-label="Toggle Menu"
        >
          <div className="space-y-1">
            <div
              className={`h-1 w-6 bg-gray-800 transition-all ${
                isOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></div>
            <div
              className={`h-1 w-6 bg-gray-800 transition-all ${
                isOpen ? "opacity-0" : ""
              }`}
            ></div>
            <div
              className={`h-1 w-6 bg-gray-800 transition-all ${
                isOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></div>
          </div>
        </button>
      </div>

      {/* Fullscreen Menu */}
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-white-800 bg-opacity-80 z-40 flex items-center justify-center">
          <div className="menu-open p-8 shadow-lg w-full h-full">
            <ul className="flex flex-col pt-40 space-y-6 text-center">
              {links.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.href}
                    className="block px-4 py-2 text-white-700 hover:bg-white-200 rounded-md"
                    onClick={() => setIsOpen(false)} 
                  >
                    <h1>{link.label}</h1>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
