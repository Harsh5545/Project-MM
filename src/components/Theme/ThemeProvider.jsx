"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("light");

  // Detect system's theme preference
  useEffect(() => {
    const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)").matches;
    
    // Get saved theme from localStorage or default to system preference
    const savedTheme = localStorage.getItem("theme");
    const initialTheme = savedTheme || (prefersDarkScheme ? "dark" : "light");
    
    setTheme(initialTheme);
    document.documentElement.className = initialTheme;
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.className = newTheme;
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div>
      {children}
      <Button
        onClick={toggleTheme}
        className="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-full shadow-lg"
      >
        Toggle Theme
      </Button>
    </div>
  );
};
