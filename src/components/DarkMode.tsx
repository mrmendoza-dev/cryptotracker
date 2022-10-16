import { useEffect, useState } from "react";
import "../css/index.css";
import "../css/Nav.css";

export default function DarkMode() {
  const root: any = document.querySelector(":root");
  const rootStyles = getComputedStyle(root);
  const [darkMode, setDarkMode] = useState(loadTheme);

  function loadTheme() {
    let savedTheme: any = JSON.parse(
      localStorage.getItem("darkMode") || "false"
    );
    if (savedTheme != undefined) {
      return savedTheme;
    } else {
      localStorage.setItem("darkMode", JSON.stringify(false));
      return false;
    }
  }

  useEffect(setTheme, [darkMode]);


  const lightTheme = {
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



  const colors = [
    "--clr-font",
    "--clr-bg",
    "--clr-contrast",
    "--clr-accent1",
    "--clr-accent2",
    "--clr-shadow",
  ];

  function updateTheme(theme: any) {
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
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
    darkMode ? updateTheme(darkTheme) : updateTheme(lightTheme);
  }

  function changeTheme() {
    setDarkMode((prevTheme: any) => !prevTheme);
  }

  return (
    <button className="theme-btn" onClick={changeTheme}>
      {darkMode ? (
        <i style={{ color: "white" }} className="fa-solid fa-sun"></i>
      ) : (
        <i style={{ color: "black" }} className="fa-solid fa-moon"></i>
      )}
    </button>
  );
}
