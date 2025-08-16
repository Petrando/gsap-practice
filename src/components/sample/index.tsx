import React, { useEffect } from "react";
import { FaMoon, FaSun } from "react-icons/fa";
import { gsap } from "gsap";

type NavbarProps = {
  darkMode: boolean;
  toggleDarkMode: () => void;
  toggleRef: React.RefObject<HTMLButtonElement>;
};

export const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode, toggleRef }) => {
  return (
    <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-8 py-4 z-50 bg-transparent">
      {/* Logo */}
      <h1 className="text-2xl font-bold text-indigo-600 dark:text-indigo-400">
        MyBrand
      </h1>

      {/* Menu */}
      <ul className="flex gap-8 text-lg font-medium">
        <li className="cursor-pointer hover:text-indigo-500 dark:hover:text-indigo-400 transition">
          Home
        </li>
        <li className="cursor-pointer hover:text-indigo-500 dark:hover:text-indigo-400 transition">
          About
        </li>
        <li className="cursor-pointer hover:text-indigo-500 dark:hover:text-indigo-400 transition">
          Services
        </li>
        <li className="cursor-pointer hover:text-indigo-500 dark:hover:text-indigo-400 transition">
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

export const Hero: React.FC = () => {
  useEffect(() => {
    // GSAP animations
    gsap.fromTo(
      ".hero-text",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    );
    gsap.fromTo(
      ".hero-subtext",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, delay: 0.5, duration: 1, ease: "power3.out" }
    );
    gsap.fromTo(
      ".hero-btn",
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, delay: 1, duration: 0.8, ease: "back.out(1.7)" }
    );
  }, []);

  return (
    <section className="h-screen flex flex-col justify-center items-center text-center px-6">
      <h1 className="hero-text text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-4">
        Welcome to{" "}
        <span className="text-indigo-600 dark:text-indigo-400">Your Brand</span>
      </h1>
      <p className="hero-subtext text-lg md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-2xl">
        Build modern experiences with Tailwind, GSAP, and React.
      </p>
      <button className="hero-btn bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-full text-lg font-medium transition">
        Get Started
      </button>
    </section>
  );
};
