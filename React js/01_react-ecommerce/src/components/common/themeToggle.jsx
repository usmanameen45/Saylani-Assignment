import { Sun, Moon } from "lucide-react";
import { useTheme } from "../../hooks/useTheme";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      className="flex h-5 w-5 items-center justify-center text-ink hover:text-rose transition-colors duration-300 cursor-pointer relative focus:outline-none"
    >
      <Moon
        className={`absolute h-4.5 w-4.5 transition-all duration-500 ease-in-out transform ${
          theme === "dark"
            ? "rotate-0 scale-100 opacity-100"
            : "-rotate-90 scale-0 opacity-0"
        }`}
        strokeWidth={1.5}
      />
      <Sun
        className={`absolute h-4.5 w-4.5 transition-all duration-500 ease-in-out transform ${
          theme === "light"
            ? "rotate-0 scale-100 opacity-100"
            : "rotate-90 scale-0 opacity-0"
        }`}
        strokeWidth={1.5}
      />
    </button>
  );
}
