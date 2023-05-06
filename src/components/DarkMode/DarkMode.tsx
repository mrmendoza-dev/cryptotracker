import { useEffect, useState } from "react";
import "./DarkMode.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { icons } from "../../assets/icons";
import useLocalStorage from "../../hooks/useLocalStorage";

export default function DarkMode() {
  const root: any = document.querySelector(":root");
  const rootStyles = getComputedStyle(root);
  const [darkMode, setDarkMode] = useLocalStorage("darkMode", false);
  useEffect(setTheme, [darkMode]);

  const lightTheme = {
    scheme: "light",
    font: "#111827",
    bg: "#ffffff",
    fontAccent: "#6B7280",
    contrast: "#ad1c11",
    accent1: "#bfc0c0",
    accent2: "#4f5d75",
    shadow: "#999",
    row: "#F9FAFB",
    hr: "#F3F4F6",
  };

  const darkTheme = {
    scheme: "dark",
    font: "#EEEEEE",
    bg: "#121212",
    fontAccent: "#A0A0A0",
    contrast: "#641ddf",
    accent1: "#2f5270",
    accent2: "#1e375a",
    shadow: "#333",
    row: "#1E1E1E",
    hr: "#2F2F2F",
  };

  function updateTheme(theme: any) {
    root.style.setProperty("color-scheme", theme.scheme);
    root.style.setProperty("--clr-font", theme.font);
    root.style.setProperty("--clr-fontAccent", theme.fontAccent);
    root.style.setProperty("--clr-bg", theme.bg);
    root.style.setProperty("--clr-contrast", theme.contrast);
    root.style.setProperty("--clr-accent1", theme.accent1);
    root.style.setProperty("--clr-accent2", theme.accent2);
    root.style.setProperty("--clr-shadow", theme.shadow);
    root.style.setProperty("--clr-row", theme.row);
    root.style.setProperty("--clr-hr", theme.hr);
  }

  function setTheme() {
    darkMode ? updateTheme(darkTheme) : updateTheme(lightTheme);
  }

  function changeTheme() {
    setDarkMode((prevTheme: any) => !prevTheme);
  }

  return (
    <button className="theme-btn nav-icon" onClick={changeTheme}>
      {darkMode ? (
        <div style={{ color: "white" }}>
          <FontAwesomeIcon icon={icons.faSun} />
        </div>
      ) : (
        <div style={{ color: "black" }}>
          <FontAwesomeIcon icon={icons.faMoon} />
        </div>
      )}
    </button>
  );
}
