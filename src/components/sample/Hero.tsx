import React, { useEffect } from "react";
import { gsap } from "gsap";

export const Hero: React.FC = () => {
  useEffect(() => {
    // GSAP entrance animations
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
    <section className="h-screen flex flex-col justify-center items-center text-center px-6 bg-gray-50 dark:bg-gray-800 transition-colors duration-500">
      <h1 className="hero-text text-5xl md:text-7xl font-extrabold text-gray-900 dark:text-white mb-4">
        Welcome to{" "}
        <span className="text-indigo-600 dark:text-indigo-400">Your Brand</span>
      </h1>
      <p className="hero-subtext text-lg md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-2xl">
        Build modern experiences with Tailwind, GSAP, and React.
      </p>
      <button className="hero-btn bg-indigo-600 hover:bg-indigo-700 text-white dark:bg-indigo-500 dark:hover:bg-indigo-600 px-6 py-3 rounded-full text-lg font-medium transition-colors duration-300">
        Get Started
      </button>
    </section>
  );
};
