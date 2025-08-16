/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { TiLocationArrow } from "react-icons/ti";
import { FaMoon, FaSun } from "react-icons/fa";
import Button from "./Button";

type NavbarProps = {
  darkMode: boolean;
  toggleDarkMode: () => void;
  toggleRef: React.RefObject<HTMLButtonElement>;
};

const Navbar: React.FC<NavbarProps> = ({ darkMode, toggleDarkMode, toggleRef }) => {
  // State for toggling audio and visual indicator
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);

  // Refs for audio and navigation container
  const audioElementRef = useRef<HTMLAudioElement>(null);
  const navContainerRef = useRef<HTMLDivElement>(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const sunRef = useRef<HTMLDivElement>(null);
  const moonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (darkMode) {
      // Light → Dark: sun exits left, moon enters from right
      gsap.to(sunRef.current, { x: -40, opacity: 0, duration: 0.35, ease: "power2.inOut" });
      gsap.fromTo(
        moonRef.current,
        { x: 40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.35, ease: "power2.inOut" }
      );
    } else {
      // Dark → Light: moon exits right, sun enters from left
      gsap.to(moonRef.current, { x: 40, opacity: 0, duration: 0.35, ease: "power2.inOut" });
      gsap.fromTo(
        sunRef.current,
        { x: -40, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.35, ease: "power2.inOut" }
      );
    }
  }, [darkMode]);

  // Toggle audio and visual indicator
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  // Manage audio playback
  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current?.play();
    } else {
      audioElementRef.current?.pause();
    }
  }, [isAudioPlaying]);

  // Handle scroll hide/show navbar
  useEffect(() => {
    if (currentScrollY === 0) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setIsNavVisible(false);
      navContainerRef.current?.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      setIsNavVisible(true);
      navContainerRef.current?.classList.add("floating-nav");
    }

    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  // Animate navbar visibility
  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  // Animate toggle button when darkMode changes
  useEffect(() => {
    if (toggleRef.current) {
      gsap.fromTo(
        toggleRef.current,
        { scale: 0.9 },
        { scale: 1, duration: 0.6, ease: "elastic.out(1, 0.5)" }
      );
    }
  }, [darkMode]);

  const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav
          className="flex size-full items-center justify-between p-4 sm:p-0 
                     bg-white/70 dark:bg-gray-900/70 backdrop-blur-md rounded-2xl shadow-md 
                     transition-colors duration-500"
        >
          {/* Logo and Product button */}
          <div className="flex items-center gap-7">
            <img src="/img/logo.png" alt="logo" className="w-10" />

            <Button
              id="product-button"
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 dark:bg-gray-800 md:flex hidden items-center justify-center gap-1"
            />
          </div>

          {/* Navigation Links + Toggles */}
          <div className="flex h-full items-center gap-6">
            <div className="hidden md:flex gap-6">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  className="nav-hover-btn
                             hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors"
                >
                  {item}
                </a>
              ))}
            </div>

            {/* Dark/Light mode toggle */}
            <button
                onClick={toggleDarkMode}
                ref={toggleRef}
                className="relative flex items-center justify-center w-10 h-10 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700 shadow-md"
            >
                <div ref={sunRef} className="absolute">
                    <FaSun className="text-yellow-500" />
                </div>
                <div ref={moonRef} className="absolute opacity-0">
                    <FaMoon className="text-indigo-400" />
                </div>
            </button>

            {/* Audio toggle */}
            <button
              onClick={toggleAudioIndicator}
              className="ml-4 flex items-center space-x-0.5"
            >
              <audio
                ref={audioElementRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop
              />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={clsx("indicator-line", {
                    active: isIndicatorActive,
                  })}
                  style={{
                    animationDelay: `${bar * 0.1}s`,
                  }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
