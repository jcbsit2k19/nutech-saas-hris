// @hooks/useTheme.js
import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  // 1. Initialize state immediately from Local Storage
  const [theme, setTheme] = useState(() => {
    // Check if we are in the browser (to avoid server-side errors)
    if (typeof window !== "undefined") {
      // Return stored theme OR system preference if nothing stored
      if (localStorage.getItem("theme")) {
        return localStorage.getItem("theme");
      }
      if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
        return "dark";
      }
    }
    return "light";
  });

  // 2. Sync with the DOM (<html> tag) and LocalStorage whenever theme changes
  useEffect(() => {
    const root = window.document.documentElement;

    // Remove both to prevent conflicts, then add the active one
    root.classList.remove("light", "dark");
    root.classList.add(theme);

    // Save to local storage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. This is the hook your button uses
export default function useTheme() {
  return useContext(ThemeContext);
}
