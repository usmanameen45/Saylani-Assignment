import { useState, useEffect } from "react";
import { ThemeContext } from "./ThemeContext";


function getInitialTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light" || savedTheme === "dark") {
    return savedTheme;
  }
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

export const ThemeContextProvider = ({ children }) => {
  const [theme, settheme] = useState(getInitialTheme());

  function toggleTheme() {
    settheme(theme === "light" ? "dark" : "light");
  }

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-theme", theme);

    localStorage.setItem("theme", theme);
  }, [theme]);

  return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>;
};

export default ThemeContextProvider;
