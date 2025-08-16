/* eslint-disable @typescript-eslint/no-unused-vars */
import About from "./components/About"
import Contact from "./components/Contact"
import Features from "./components/Features"
import Footer from "./components/Footer"
import Hero from "./components/Hero"
import NavBar from "./components/Navbar"
import Story from "./components/Story"
import { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

function App() {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Apply dark mode to html tag + animate toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    if (toggleRef.current) {
      gsap.fromTo(
        toggleRef.current,
        { scale: 0.9 },
        {
          scale: 1,
          duration: 0.6,
          ease: "elastic.out(1, 0.5)",
        }
      );
    }
  }, [darkMode]);

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen transition-colors duration-500">
      <NavBar
        darkMode={darkMode}
        toggleDarkMode={() => setDarkMode(!darkMode)}
        toggleRef={toggleRef}
      />
      <Hero />
      <About />
      <Features />
      <Story />
      <Contact />
      <Footer />
    </div>
  );
}

export default App
