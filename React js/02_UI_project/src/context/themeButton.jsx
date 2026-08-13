import React from "react";
import { useTheme } from "./themeContext";
import { Sun, Moon } from "lucide-react";

const ThemeBtn = () => {
  let { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={() => toggleTheme()}
      className="outline-none cursor-pointer p-2 rounded-full bg-button hover:bg-button-hover text-button-text transition duration-500 ease-in-out"
    >
      {theme == "light" ? (
        <Moon className="animate-[fadeIn_0.5s_ease-out_forwards]" />
      ) : (
        <Sun className="animate-[fadeInAndRotate_0.5s_ease-out_forwards]" />
      )}
    </button>
  );
};

export default ThemeBtn;
