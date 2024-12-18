import { icons } from "@/assets/icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useTheme } from "@/contexts/ThemeContext";

const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();

  const toggleTheme = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <button
      type="button"
      onClick={() => toggleTheme()}
      className="flex items-center justify-center w-10 h-10 rounded-lg
        text-gray-500 dark:text-gray-400 
        hover:bg-gray-100 dark:hover:bg-gray-800
        focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700
        transition-colors"
    >
      <FontAwesomeIcon
        icon={theme === "dark" ? icons.faMoon : icons.faSun}
        className="text-xl"
      />
    </button>
  );
};

export default ThemeToggle;
