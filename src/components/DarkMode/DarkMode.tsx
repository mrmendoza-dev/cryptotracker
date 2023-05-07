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
    shadow: "#999",
    row: "#F9FAFB",
    hr: "#F3F4F6",
  };

  const darkTheme = {
    scheme: "dark",
    font: "#EEEEEE",
    bg: "#121212",
    fontAccent: "#A0A0A0",
    shadow: "#333",
    row: "#1E1E1E",
    hr: "#2F2F2F",
  };

  function updateTheme(theme: any) {
    root.style.setProperty("color-scheme", theme.scheme);
    root.style.setProperty("--clr-font", theme.font);
    root.style.setProperty("--clr-fontAccent", theme.fontAccent);
    root.style.setProperty("--clr-bg", theme.bg);
    root.style.setProperty("--clr-shadow", theme.shadow);
    root.style.setProperty("--clr-row", theme.row);
    root.style.setProperty("--clr-hr", theme.hr);
    // Set the theme_color and background_color properties in the webmanifest

      const themeColorMeta = document.querySelector('meta[name="theme-color"]');
      if (themeColorMeta) {
        themeColorMeta.setAttribute("content", theme.bg);
      }

      const backgroundColorMeta = document.querySelector(
        'meta[name="background-color"]'
      );
      if (backgroundColorMeta) {
        backgroundColorMeta.setAttribute("content", theme.font);
      }

      const manifestLink = document.querySelector('link[rel="manifest"]');
      if (manifestLink) {
        const manifestHref: any = manifestLink.getAttribute("href");
        fetch(manifestHref)
          .then((response) => response.json())
          .then((manifest) => {
            manifest.theme_color = theme.bg;
            manifest.background_color = theme.font;
            const updatedManifest = JSON.stringify(manifest);
            const blob = new Blob([updatedManifest], {
              type: "application/manifest+json",
            });
            const manifestUrl = URL.createObjectURL(blob);
            manifestLink.setAttribute("href", manifestUrl);
          })
          .catch((error) => console.error(error));
      }


    
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



