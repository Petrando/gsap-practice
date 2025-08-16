import React from "react";
import { FaMoon, FaSun } from "react-icons/fa";

type NavbarProps = {
  darkMode: boolean;
  toggleDarkMode: () => void;
  toggleRef: React.RefObject<HTMLButtonElement>;
};

export const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode, toggleRef }) => {
  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-4 z-50 bg-white/70 dark:bg-gray-900/70 backdrop-blur-md shadow-sm transition-colors duration-500">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
        MyBrand
      </h1>

      {/* Menu */}
      <ul className="flex gap-8 text-lg font-medium">
        <li className="cursor-pointer text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 transition">
          Home
        </li>
        <li className="cursor-pointer text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 transition">
          About
        </li>
        <li className="cursor-pointer text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 transition">
          Services
        </li>
        <li className="cursor-pointer text-gray-700 dark:text-gray-200 hover:text-indigo-500 dark:hover:text-indigo-400 transition">
          Contact
        </li>
      </ul>

      {/* Dark/Light toggle */}
      <button
        onClick={toggleDarkMode}
        ref={toggleRef}
        className="w-14 h-8 flex items-center rounded-full bg-gray-300 dark:bg-gray-700 px-1 relative transition-colors duration-300"
      >
        <div
          className={`absolute flex items-center justify-center w-6 h-6 rounded-full bg-white shadow-md transform transition-transform duration-500 ${
            darkMode ? "translate-x-6" : "translate-x-0"
          }`}
        >
          {darkMode ? (
            <FaMoon className="text-indigo-500" />
          ) : (
            <FaSun className="text-yellow-500" />
          )}
        </div>
      </button>
    </nav>
  );
};
